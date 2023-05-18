from app import app, db, bcrypt, jwt
from app.db import User, TypeOfUser, Room, Booking, TypeOfRoom, PromoCode
from flask import request, send_file
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from sqlalchemy import or_, and_
from datetime import datetime
from werkzeug.utils import secure_filename
import os
import ntpath

ALLOWED_EXTENSIONS = {'heic', 'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def roles_required(*roles):
    '''Function wrapper for protected routes'''
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            # Verifying JWT
            verify_jwt_in_request()
            claims = get_jwt()

            # Check if the role sufficient enough
            if claims.get('user_type') not in set(roles):
                return {'message' : 'Insufficient permission'}

            return fn(*args, **kwargs)
        return decorator
    return wrapper

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    '''Automatic User loading in protected routes'''
    identity = jwt_data["sub"]
    return User.query.filter_by(username=identity).one_or_none()

''' PUBLIC ROUTES '''

@app.route('/api/test')
def test():
    return {'status': 'Success'}

@app.route('/api/register', methods=['POST'])
def register():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Check whether username or email is already in the database (must be unique)
    username_in_database = User.query.filter_by(username=username).one_or_none()
    email_in_database = User.query.filter_by(email=email).one_or_none()
    
    if username_in_database or email_in_database:
        return {'message' : 'username or email are already registered', 'success' : False}

    # If register is successful, create new user
    new_user = User(
        username=username,
        email=email,
        userType=TypeOfUser.STUDENT,
        password=bcrypt.generate_password_hash(password)
    )
    with app.app_context():
        db.session.add(new_user)
        db.session.commit()

    access_token = create_access_token(
        identity=username,
        additional_claims={
            'email': email,
            'user_type': 'Student'
        }
    )
    return {'message' : 'User successfully registered', 'success' : True, 'access_token' : access_token}

@app.route("/api/check_unique_email/<string:email>")
def check_email(email):
    with app.app_context():
        if User.query.filter_by(email=email).one_or_none() == None:
            return {"unique" : True}
        return {"unique" : False}

@app.route("/api/check_unique_username/<string:username>")
def check_username(username):
    with app.app_context():
        if User.query.filter_by(username=username).one_or_none() == None:
            return {"unique" : True}
        return {"unique" : False}

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    
    # Check if user is invalid
    user = User.query.filter_by(username=username).one_or_none()
    if not user or not bcrypt.check_password_hash(pw_hash=user.password, password=password):
        return {'message' : 'username or password incorrect', 'success' : False}
    
    # when login is sucessful
    access_token = create_access_token(
        identity=username, 
        additional_claims={
            'email': user.email,
            'user_type': str(user.userType.value)
            }
        )
    return {'access_token' : access_token, 'success' : True}

''' PROTECTED ROUTES'''

@app.route("/api/verify_token")
@jwt_required()
def verify_token():
    verify_jwt_in_request()
    return {'success' : True}

def get_booking_slots(room_name, date, user):
    startDateLow = datetime.strptime(f"{date} 09", '%Y-%m-%d %H')
    startDateUp = datetime.strptime(f"{date} 17", '%Y-%m-%d %H')

    bookings = Booking.query.filter(and_(Booking.roomName == room_name, Booking.startDateTime.between(startDateLow, startDateUp))).all()

    booking_slots = [0,0,0,0,0,0,0,0,0]

    for booking in bookings:
        time_diff = booking.endDateTime.hour-booking.startDateTime.hour
        if booking.userId == user:
            booking_slots[booking.startDateTime.hour-9:booking.endDateTime.hour-9] = [2] * time_diff
        else:
            booking_slots[booking.startDateTime.hour-9:booking.endDateTime.hour-9] = [1] * time_diff
    today = datetime.now()
    if today.date() == datetime.strptime(date, '%Y-%m-%d').date() and today.hour < 17:
        today_hour = today.hour - 9
        for i in range(today_hour + 1):
            if booking_slots[i] == 0:
                booking_slots[i] = 1
    return booking_slots


@app.route("/api/search", methods=['GET'])
@jwt_required()
@roles_required('Student')
def search():
    args = request.args
    userRoomName = args.get('roomName').lower()
    capacity_list = args.getlist('capacity')
    userDateTimeString = args.get('dateTime')

    room_list = []
    
    if userRoomName == None or userRoomName == "": #if room name is not defined
        room_sql_list = Room.query.filter(and_(
            Room.capacity.in_(capacity_list), 
            Room.isLaunched == True, 
            Room.isApproved == True)).all()
    else:
        room_sql_list = Room.query.filter(and_(
            Room.name.like(f"%{userRoomName}%"), 
            Room.capacity.in_(capacity_list), 
            Room.isLaunched == True, 
            Room.isApproved == True)).all()

    for room in room_sql_list:
        booking_slots = get_booking_slots(room_name=room.name, date=userDateTimeString, user=get_jwt().get('sub'))
        if 0 in booking_slots:  # if there is a booking slot
            room_list.append(room)
    
    for i in range(len(room_list)):
        r = room_list[i]
        room_list[i] = {"name": r.name.title(), "imgUrl": r.imgUrl, "roomType": r.roomType.value, "price": r.price, "capacity": r.capacity, "description": r.description}
    
    return {"rooms": room_list}


#user current booking
@app.route("/api/current_bookings", methods=['GET'])
@jwt_required()
@roles_required('Student')
def view_current_bookings():
    userId = userId = get_jwt().get('sub')
    currentDateTime = datetime.now()

    bookings_sql_list = Booking.query.filter(and_(Booking.endDateTime > currentDateTime), Booking.userId == userId).all()
    booking_list = []
    for booking in bookings_sql_list:
        booking_list.append({"roomName": booking.roomName.title(), 
        "startDateTime": str(booking.startDateTime.replace(tzinfo=None)), 
        "endDateTime": str(booking.endDateTime.replace(tzinfo=None)),
        "bookingPrice" : booking.bookingPrice})
    
    return {"bookings": booking_list}


#user past booking
@app.route("/api/view_past_bookings", methods=['GET'])
@jwt_required()
@roles_required('Student')
def view_past_bookings():
    userId = get_jwt().get('sub')
    currentDateTime = datetime.now()

    bookings_sql_list = Booking.query.filter(and_(Booking.endDateTime <= currentDateTime), Booking.userId == userId)
    booking_list = []
    for booking in bookings_sql_list:
        booking_list.append({"roomName": booking.roomName.title(), 
        "startDateTime": str(booking.startDateTime.replace(tzinfo=None)), 
        "endDateTime": str(booking.endDateTime.replace(tzinfo=None)),
        "bookingPrice" : booking.bookingPrice})
    
    return {"bookings": booking_list}

#cancel booking
@app.route("/api/cancel_bookings", methods=['DELETE'])
@jwt_required()
@roles_required('Student')
def cancel_booking():
    userId = get_jwt().get('sub')
    roomName = request.json.get('roomName').lower()
    startDateTimeString = request.json.get('startDateTime')

    currentStartDateTime = datetime.now()

    startDateTime = datetime.strptime(startDateTimeString, '%Y-%m-%d %H')
    if currentStartDateTime > startDateTime:
        return {"success": False, "message": "You cannot cancel a booking which has already passed"}
    
    with app.app_context():
        booking = Booking.query.filter(and_(Booking.userId == userId, Booking.roomName == roomName, Booking.startDateTime == startDateTime)).first()
        if booking == None:
            return {"success": False, "message": "Booking is not found"}
        if booking.userId != userId:
            return {"success": False, "message": "Booking is not found"}
        db.session.delete(booking)
        db.session.commit()
        return {"success": True, "message": "Booking successfully deleted"}

#modify booking
@app.route("/api/modify_bookings", methods=['PATCH'])
@jwt_required()
@roles_required('Student')
def modify_booking():
    #Conditions
    # new start date cannot be interfere in a previously booked room
        # query Booking table and check newStartDateTime and newEndDateTime

    # duration cannot be longer than previous duration
    userId = get_jwt().get('sub')
    roomName = request.json.get('roomName').lower()
    currStartDateTime = request.json.get('startDateTime')
    newStartDateTime = request.json.get('newStartDateTime')
    newEndDateTime = request.json.get('newEndDateTime')
    

    currStartDateTime = datetime.strptime(currStartDateTime, '%Y-%m-%d %H')
    newStartDateTime = datetime.strptime(newStartDateTime, '%Y-%m-%d %H')
    newEndDateTime = datetime.strptime(newEndDateTime, '%Y-%m-%d %H')
    with app.app_context():
        booking_to_change = Booking.query.filter_by(roomName = roomName, startDateTime = currStartDateTime).one_or_none()
        
        if booking_to_change == None:
            return {"success" : False, "message" : "Booking is not found"}
        
        if booking_to_change.userId != userId:
            return {"success" : False, "message" : "You only can change your own booking"}

        currEndDateTime = booking_to_change.endDateTime
        currDifference = currEndDateTime - currStartDateTime
        if (newEndDateTime - newStartDateTime) > currDifference:
            return {"status": False, "message": f"The duration chosen is too long. Try again"}
        else:
            clashed_bookings = Booking.query.filter(
            Booking.roomName == roomName,
            or_(
                and_(Booking.startDateTime >= newStartDateTime, Booking.startDateTime < newEndDateTime),
                and_(Booking.endDateTime > newStartDateTime, Booking.endDateTime <= newEndDateTime)
            )
        ).first()
            if clashed_bookings != None and (clashed_bookings.roomName != roomName or clashed_bookings.startDateTime != currStartDateTime):
                return {"success": False, "message": "The inputted time clashes with another booking time"}
            
            #if program ends up here, no interfering bookings
            #query booking
            booking_to_change.startDateTime = newStartDateTime
            booking_to_change.endDateTime = newEndDateTime
            db.session.commit()
            return {"success": True, "message": "Booking successfully modified"}

#get schedule(date) 
# - get list of rooms 
# - and list of slots status (vacant, taken, users)

#Room union Booking 
# any records from booking will have a status of booked
# any records from Room not in booking will have a status of vacant
@app.route("/api/room_details", methods=['GET'])
@jwt_required()
@roles_required('Student')
def get_scheduled_bookings():
    dateString = request.args.get('dateTime')
    user = get_jwt().get('sub')

    room_list = []

    list_of_rooms = Room.query.filter(and_(Room.isLaunched == True, Room.isApproved == True)).all()
    for room in list_of_rooms:
        booking_slots = get_booking_slots(room_name=room.name, date=dateString, user=user)
        room_list.append({"roomName": room.name.title(), "roomDescription": room.description, "roomType": room.roomType.value, "price": room.price, "bookingSlots": booking_slots})

    return {"rooms": room_list}

#get distinct type of rooms
#get rooms not booked (rooms not in the Booking table), get their distinct roomType
#meeting room
#meeting pod
# type 3
@app.route("/api/types_of_rooms", methods=['GET'])
@jwt_required()
@roles_required('Student')
def get_type_of_rooms():
    #return {"typesOfRooms": [room.value for room in TypeOfRoom]}
    type_sql_list = db.session.query(Room.roomType).distinct().all()
    list_of_room_types = [item[0].value for item in type_sql_list]
    print(list_of_room_types)
    return {"type_of_rooms": list_of_room_types}

    

@app.route("/api/create_booking", methods=['POST'])
@jwt_required()
@roles_required('Student')
def create_booking():
    roomName = request.json.get('roomName').lower()
    startDateTimeString = request.json.get('startDateTime')
    endDateTimeString = request.json.get('endDateTime')
    promoCode = None if request.json.get('promoCode') == None else request.json.get('promoCode').upper()
    user = get_jwt().get('sub')

    #convert the datetimes into object
    startDateTime = datetime.strptime(startDateTimeString, '%Y-%m-%d %H')
    endDateTime = datetime.strptime(endDateTimeString, '%Y-%m-%d %H')
    duration = endDateTime.hour - startDateTime.hour

    if startDateTime.hour < 9 or endDateTime.hour > 17:
        return {"success": False, "message": "The time chosen is invalid"}

    # check promo code
    if promoCode == None:
        discount = 1
    else:
        promo = PromoCode.query.filter_by(promoCode = promoCode).one_or_none()
        if promo == None:
            return {"success": False, "message": "Promo code invalid"}
        if startDateTime < promo.startDate or startDateTime >= promo.endDate:
            return {"success": False, "message": "Promo code expired"}
        discount = (100 - promo.discountPercentage) / 100

    clashed_bookings = Booking.query.filter(
        Booking.roomName == roomName,
        or_(
            and_(Booking.startDateTime >= startDateTime, Booking.startDateTime < endDateTime),
            and_(Booking.endDateTime > startDateTime, Booking.endDateTime <= endDateTime)
        )
    ).first()

    if clashed_bookings != None:
        return {"success": False, "message": "Failed because of clashed bookings"}
    else:
        with app.app_context():
            new_booking = Booking(userId = user, 
                                roomName = roomName, 
                                startDateTime = startDateTime, 
                                endDateTime = endDateTime,
                                bookingPrice = Room.query.get(roomName).price * discount * duration)
            db.session.add(new_booking)
            db.session.commit()

        return {"success": True, "message": "Sucessful"}


@app.route("/api/create_room", methods=['POST'])
@jwt_required()
@roles_required('Staff')
def create_room():
    room_name = request.form.get('roomName').lower()
    if Room.query.filter_by(name = room_name).one_or_none():
        return {"success" : False, "message" : "Room already exist"}
    if 'file' not in request.files:
        return {"success" : False, "message" : "No file part"}
    file = request.files['file']
    if file.filename == '':
        return {"success" : False, "message" : "No selected file"}
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename))
        new_room = Room(
            name = room_name,
            imgUrl = os.path.join(app.config['UPLOAD_FOLDER'], filename),
            roomType = TypeOfRoom.__members__.get(request.form.get('roomType')),
            price = request.form.get('price'),
            capacity = request.form.get('capacity'),
            description = request.form.get('description'),
        )
        with app.app_context():
            db.session.add(new_room)
            db.session.commit()
        return {"success" : True, "message" : "Room successfully created"}

@app.route("/api/launch_room", methods=['PATCH'])
@jwt_required()
@roles_required('Staff')
def launch_room():
    user = get_jwt().get('sub')
    name = request.json.get("roomName").lower()
    with app.app_context():
        room = Room.query.filter_by(name = name).one_or_none()
        if room == None:
            return {"success" : False, "message" : "Room does not exist"}
        if room.isLaunched:
            return {"success" : False, "message" : "Room is already launched"}
        room.isLaunched = True
        room.launchDateTime = datetime.now()
        room.launchedByUsername = user
        db.session.commit()
        return {"success" : True, "message" : "Room successfully launched"}

@app.route("/api/approve_room", methods=['PATCH'])
@jwt_required()
@roles_required('Administrator')
def approve_room():
    user = get_jwt().get('sub')
    name = request.json.get("roomName").lower()
    with app.app_context():
        room = Room.query.filter_by(name = name).one_or_none()
        if room == None:
            return {"success" : False, "message" : "Room does not exist"}
        if not room.isLaunched:
            return {"success" : False, "message" : "Room has not been launched"}
        if room.isApproved:
            return {"success" : False, "message" : "Room is already approved"}
        room.isApproved = True
        room.approvedDateTime = datetime.now()
        room.approvedByUsername = user
        db.session.commit()
        return {"success" : True, "message" : "Room approved"}

@app.route("/api/list_of_rooms", methods=['GET'])
@jwt_required()
@roles_required('Staff', 'Administrator')
def get_list_of_rooms():
    user = get_jwt().get('user_type')
    room_list = []
    if user == 'Staff':
        accessible_rooms = Room.query.all()
    else:
        accessible_rooms = Room.query.filter(Room.isLaunched == True).all()
    
    for room in accessible_rooms:
        room_list.append({"roomName": room.name.title(), 
                        "imgUrl":room.imgUrl, "roomType":room.roomType.value, 
                        "price": room.price, "capacity": room.capacity, 
                        "description": room.description, "isLaunched": room.isLaunched, 
                        "launchDateTime": str(room.launchDateTime.replace(tzinfo=None)) if room.launchDateTime  else None, 
                        "isApproved": room.isApproved, 
                        "approvedDateTime": str(room.approvedDateTime.replace(tzinfo=None)) if room.approvedDateTime else None, 
                        "approvedByUsername" : room.approvedByUsername,
                        "launchedByUsername" : room.launchedByUsername})
    
    return {"rooms": room_list}


@app.route("/api/modify_room", methods=['GET', 'PATCH'])
@jwt_required()
@roles_required('Staff')
def modify_room():
    roomName = request.args.get('roomName').lower()
    with app.app_context():
        room = Room.query.filter(Room.name == roomName).one_or_none()
        if room == None:
                return {"success": False, "message": "Room does not exist"}
        if request.method == 'GET':
            file_path = room.imgUrl
            head, tail = ntpath.split(file_path)
            filename = tail or ntpath.basename(head)
            
            headers = {
                'Content-Disposition': f'attachment; filename={filename}',
                "roomType" : str(room.roomType.value),
                "price" : room.price,
                "capacity" : room.capacity,
                "description" : room.description,
                'file' : send_file(path_or_file=file_path)
            }
            return send_file(file_path, as_attachment=True), 200, headers
            

        elif request.method == 'PATCH':
            roomType = request.form.get('roomType')
            price = request.form.get('price')
            capacity = request.form.get('capacity')
            description = request.form.get('description')
            newRoomName = request.form.get('newRoomName').lower()

            if roomName != newRoomName:
                if (Room.query.filter(Room.name == newRoomName).one_or_none() != None):
                    return {"success": False, "message": "New room name specified already exists"}
            if 'file' not in request.files:
                return {"success" : False, "message" : "No file part"}
            file = request.files['file']
            if file.filename == '':
                return {"success" : False, "message" : "No selected file"}
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename))

                room.imgUrl = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                room.name = newRoomName
                room.roomType = roomType
                room.price = price
                room.capacity = capacity
                room.description = description

                booking_sql_list = Booking.query.filter_by(roomName = room.name).all()

                for booking in booking_sql_list:
                    booking.roomName = room.name
                
                db.session.commit()
            return {"success" : True, "message" : "Room successfully modified"}

@app.route("/api/delete_room", methods=['DELETE'])
@jwt_required()
@roles_required('Staff')
def delete_room():
    roomName = request.json.get('roomName').lower()
    with app.app_context():
        room = Room.query.filter(Room.name == roomName).one_or_none()

        if room == None:
            return {"success": False, "message": "Room is not found"}
    
        db.session.delete(room)
        db.session.commit()
        return {"success": True, "message": "Room successfully deleted"}


@app.route("/api/create_promo_code", methods=['POST'])
@jwt_required()
@roles_required('Staff')
def create_promo_code():
    username = get_jwt().get('sub')
    promoCode = request.json.get('promoCode').upper()
    startDate = request.json.get('startDate')
    endDate = request.json.get('endDate')
    discountPercentage = request.json.get('discountPercentage')

    startDate = datetime.strptime(startDate, "%Y-%m-%d")
    endDate = datetime.strptime(endDate, "%Y-%m-%d")
    discountPercentage = int(discountPercentage)

    # Check promocode alrd available
    if PromoCode.query.filter_by(promoCode = promoCode, startDate = startDate).one_or_none() != None:
        return {"success": False, "message": "Promocode already exist"}

    # Check constraint
    available_promo = PromoCode.query.filter_by(promoCode = promoCode).all()
    
    for promo in available_promo:
        if promo.promoCode != promoCode or promo.startDate != startDate:
            if (startDate > promo.startDate and startDate < promo.endDate) or (endDate > promo.startDate and endDate < promo.endDate):
                return {"success": False, "message": "Promocode date range invalid"}

    with app.app_context():
        new_promo_code = PromoCode(
            promoCode = promoCode,
            startDate = startDate,
            endDate = endDate,
            discountPercentage = discountPercentage,
            promoCreatedBy = username
        )
        db.session.add(new_promo_code)
        db.session.commit()
    return {"success": True, "message": "Promo code successfully created"}

@app.route("/api/modify_promo_code", methods=['PATCH'])
@jwt_required()
@roles_required('Staff')
def modify_promo_code():
    # Identifier
    promoCode = request.json.get('promoCode').upper()
    startDate = datetime.strptime(request.json.get('startDate'), "%Y-%m-%d")
    
    newStartDate = datetime.strptime(request.json.get('newstartDate'), "%Y-%m-%d")
    newendDate = datetime.strptime(request.json.get('newendDate'), "%Y-%m-%d")
    discountPercentage = int(request.json.get('discountPercentage'))
    newPromoCode = request.json.get('newPromoCode').upper()

    with app.app_context():
        promo_code_to_change = PromoCode.query.filter_by(promoCode = promoCode, startDate = startDate).one_or_none()

        if promo_code_to_change == None:
            return {"success": False, "message": "Promotional code does not exist"}

        available_promo = PromoCode.query.filter_by(promoCode = newPromoCode).all()
        for promo in available_promo:
            if promo.promoCode != promoCode or promo.startDate != startDate:
                if (startDate > promo.startDate and startDate < promo.endDate) or (newendDate > promo.startDate and newendDate < promo.endDate):
                    return {"success": False, "message": "Promocode date range invalid"}
        
        promo_code_to_change.promoCode = newPromoCode
        promo_code_to_change.startDate = newStartDate
        promo_code_to_change.endDate = newendDate
        promo_code_to_change.discountPercentage = discountPercentage
        db.session.commit()
        return {"success": True, "message": "Promo code successfully modified"}


@app.route("/api/delete_promo_code", methods=['DELETE'])
@jwt_required()
@roles_required('Staff')
def delete_promo_code():
    promoCode = request.json.get('promoCode').upper()
    startDate = datetime.strptime(request.json.get('startDate'), "%Y-%m-%d")
    
    with app.app_context():
        promo_code_to_delete = PromoCode.query.filter_by(promoCode=promoCode, startDate=startDate).one_or_none()
        if promo_code_to_delete == None:
            return {"success": False, "message": "The promotional code does not exist"}
        
        db.session.delete(promo_code_to_delete)
        db.session.commit()
        return {"success": True, "message": "Promo code successfully deleted"}

@app.route("/api/room_schedule")
@jwt_required()
@roles_required('Student')
def get_room_schedule():
    date = request.args.get('date')
    room_name = request.args.get('roomName').lower()
    user = get_jwt().get('sub')
    with app.app_context():
        room = Room.query.get(room_name)
        if room == None:
            return {"success" : False, "message" : "room is invalid"}
        slot = get_booking_slots(room_name=room_name, date=date, user=user)
        return {"success" : True, "slot" : slot}

@app.route("/api/get_room_image")
def get_room_image():
    room_name = request.args.get("roomName").lower()
    file_path = Room.query.get(room_name).imgUrl
    return send_file(file_path, mimetype='image/jpeg')

# TO BE DELETED LATER
@app.route("/api/register_staff", methods=['POST'])
def register_staff():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Check whether username or email is already in the database (must be unique)
    username_in_database = User.query.filter_by(username=username).one_or_none()
    email_in_database = User.query.filter_by(email=email).one_or_none()
    
    if username_in_database or email_in_database:
        return {'message' : 'username or email are already registered', 'success' : False}

    # If register is successful, create new user
    new_user = User(
        username=username,
        email=email,
        userType=TypeOfUser.STAFF,
        password=bcrypt.generate_password_hash(password)
    )
    with app.app_context():
        db.session.add(new_user)
        db.session.commit()
    return {'message' : 'User successfully registered', 'success' : True}

    # TO BE DELETED LATER
@app.route("/api/register_admin", methods=['POST'])
def register_admin():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Check whether username or email is already in the database (must be unique)
    username_in_database = User.query.filter_by(username=username).one_or_none()
    email_in_database = User.query.filter_by(email=email).one_or_none()
    
    if username_in_database or email_in_database:
        return {'message' : 'username or email are already registered', 'success' : False}

    # If register is successful, create new user
    new_user = User(
        username=username,
        email=email,
        userType=TypeOfUser.ADMINISTRATOR,
        password=bcrypt.generate_password_hash(password)
    )
    with app.app_context():
        db.session.add(new_user)
        db.session.commit()
    return {'message' : 'User successfully registered', 'success' : True}

# things to be check:
# modify_room
# modify_promoCode
# test create booking

# get room_schedule

@app.route("/api/view_bookings_admin", methods=['GET'])
@jwt_required()
@roles_required('Administrator')
def view_bookings_admin():
    startDateTimeString = request.args.get('startDateTime')
    endDateTimeString = request.args.get('endDateTime')
    startDateTime = datetime.strptime(f"{startDateTimeString} 09", '%Y-%m-%d %H')
    endDateTime = datetime.strptime(f"{endDateTimeString} 17", '%Y-%m-%d %H')

    booking_list = []

    booking_sql_list = Booking.query.filter(Booking.startDateTime.between(startDateTime, endDateTime)).order_by(Booking.startDateTime.desc())

    for booking in booking_sql_list:
        booking_list.append({"roomName": booking.roomName.title(), "userId": booking.userId, "startTime": str(booking.startDateTime.replace(tzinfo=None)), "endTime": str(booking.endDateTime.replace(tzinfo=None)),  "bookingPrice": booking.bookingPrice})
    
    return {"bookings": booking_list}


#return list of promos
@app.route("/api/view_all_promocodes", methods=['GET'])
@jwt_required()
@roles_required('Staff')
def view_promo_codes():
    promocode_sql_list = PromoCode.query.all()
    promocode_list = []
    for code in promocode_sql_list:
        promocode_list.append({"promoCode": code.promoCode, "startDate": str(code.startDate.replace(tzinfo=None)), "endDate": str(code.endDate.replace(tzinfo=None)), "discountPercentage": code.discountPercentage})
    
    return {"Promocodes": promocode_list}

@app.route("/api/view_promo_discount", methods=['GET'])
@jwt_required()
@roles_required('Student')
def view_promo_discount():
    promoCode = request.args.get('promoCode').upper()
    bookingStartDate = request.args.get('startDate')

    bookingStartDate = datetime.strptime(bookingStartDate, '%Y-%m-%d')

    promocode_sql_obj = PromoCode.query.filter(and_(PromoCode.promoCode == promoCode, PromoCode.startDate <= bookingStartDate, PromoCode.endDate > bookingStartDate)).one_or_none()

    if promocode_sql_obj == None:
        return {"success": False, "message": "Promo Code does not exist"}

    return {"success": True, "discount": promocode_sql_obj.discountPercentage}


@app.route('/api/view_room_details', methods=['GET'])
@jwt_required()
@roles_required('Student')
def get_room_details():
    roomName = request.args.get('roomName').lower()

    room_sql_obj = Room.query.filter(Room.name == roomName).one_or_none()

    if room_sql_obj == None:
        return {"success": False, "message": "Specified room does not exist"}
    
    return {"success": True, "room": {"name": room_sql_obj.name.title(), "url": room_sql_obj.imgUrl, "roomType": room_sql_obj.roomType.value, "price": room_sql_obj.price, "capacity": room_sql_obj.capacity, "description": room_sql_obj.description}}