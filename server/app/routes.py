from app import app, db, bcrypt, jwt
from app.db import User, TypeOfUser, Room, Booking, TypeOfRoom
from flask import request, jsonify
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from sqlalchemy import or_, and_
from datetime import datetime



def roles_required(*roles):
    '''Function wrapper for protected routes'''
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            # Verifying JWT
            verify_jwt_in_request()
            claims = get_jwt()

            # Check if the role sufficient enough
            if set(roles).intersection(set(claims.get('user_type', []))):
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
    return {'message' : 'User successfully registered', 'success' : True}


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
            'user_type': str(user.userType)
            }
        )
    return {'access_token' : access_token, 'success' : True}

''' PROTECTED ROUTES'''

@app.route("/api/verify_token")
@jwt_required()
def verify_token():
    verify_jwt_in_request()
    return {'success' : True}


#args = request.args
#    name = args.get('name')
#    location = args.get('location')

#dd-mm-yyyy 
@app.route("/api/search", methods=['GET'])
@jwt_required()
def search():
    args = request.args
    userRoomName = args.get('name')
    userRoomType = args.get('roomtype')
    userCapacityString = args.get('capacity')
    userDateTimeString = args.get('datetime')

    #make datetime object
    userDateTime = datetime.strptime(userDateTimeString, '%Y-%m-%d %H:%M:%S')
    userCapacity = list(userCapacityString)

    capacity_list = []
    list_of_capacity_values = [2,5,10,15,20]
    for i in range(len(userCapacity)):
        if userCapacity[i] == True:
            capacity_list.append(list_of_capacity_values[i])

    #full_room_sql_list = []
    room_list = []
    
    if not userRoomName: #if room name is not defined
        room_sql_list = Room.query.filter(and_(Room.roomType == userRoomType, Room.capacity.in_(capacity_list))).all()
        for room in room_sql_list:
            #user time > start time, then user time > end time as well
            #user time < start time, then user time < end time as well
            #if user time == start time, return false
            if room.filter(and_(Booking.startDateTime < userDateTime, Booking.endDateTime < userDateTime)) or room.filter(and_(Booking.startDateTime > userDateTime, Booking.endDateTime > userDateTime)).all():
                room_list.append(room)
    else:
        room_sql_list = Room.query.filter(and_(Room.name.like(userRoomName), Room.roomType == userRoomType, Room.capacity.in_(capacity_list))).all()
    
    for room in room_list:
        room_list.append({"name": room.name, "imgUrl": room.imgUrl, "roomType": room.roomType, "price": room.price, "capacity": room.capacity, "description": room.description})
    return {"rooms": room_list}

#user current booking
@app.route("/api/current_bookings", methods=['GET'])
@jwt_required()
def view_current_bookings():
    args = request.args 
    userId = args.get('userId')
    currentDateTime = datetime.now()

    bookings_sql_list = Booking.query.filter(and_(Booking.endDateTime > currentDateTime), Booking.userId == userId).all()
    booking_list = []
    for booking in bookings_sql_list:
        booking_list.append({"roomName": booking.roomName, "startDateTime": booking.startDateTime, "endDateTime": booking.endDateTime})
    
    return {"bookings": booking_list}


#user past booking
@app.route("/api/view_past_bookings", methods=['GET'])
@jwt_required()
def view_past_bookings():
    args = request.args 
    userId = args.get('userId')
    currentDateTime = datetime.now()

    bookings_sql_list = Booking.query.filter(and_(Booking.endDateTime < currentDateTime), Booking.userId == userId)
    booking_list = []
    for booking in bookings_sql_list:
        booking_list.append({"roomName": booking.roomName, "startDateTime": booking.startDateTime, "endDateTime": booking.endDateTime})
    
    return {"bookings": booking_list}

#cancel booking
@app.route("/api/cancel_bookings", methods=['POST'])
@jwt_required()
def cancel_booking():
    userId = request.form.get('userId')
    roomName = request.form.get('roomName')
    startDateTimeString = request.form.get('startDateTime')

    currentStartDateTime = datetime.now()

    startDateTime = datetime.strptime(startDateTimeString, '%Y-%m-%d %H:%M:%S')

    booking = Booking.query.filter(and_(Booking.userId == userId, Booking.roomName == roomName, Booking.startDateTime == startDateTime)).first()

    if currentStartDateTime > startDateTime:
        return {"success": False, "message": "You cannot cancel a booking which has already passed"}
    
    with app.app_context():
        db.session.delete(booking)
        db.session.commit()

#modify booking
@app.route("/api/modify_bookings", methods=['POST'])
@jwt_required()
def modify_booking():
    userId = request.form.get('userId')
    roomName = request.form.get('roomName')
    currStartDateTime = request.form.get('startDateTime')
    currEndDateTime = request.form.get('endDateTime')
    newStartDateTime = request.form.get('newStartDateTime')
    newEndDateTime = request.form.get('newEndDateTime')

    currStartDateTime = datetime.strptime(currStartDateTime, '%Y-%m-%d %H:%M:%S')
    currEndDateTime = datetime.strptime(currEndDateTime, '%Y-%m-%d %H:%M:%S')
    newStartDateTime = datetime.strptime(newStartDateTime, '%Y-%m-%d %H:%M:%S')
    newEndDateTime = datetime.strptime(newEndDateTime, '%Y-%m-%d %H:%M:%S')

    #Conditions
    # new start date cannot be interfere in a previously booked room
        # query Booking table and check newStartDateTime and newEndDateTime

    # duration cannot be longer than previous duration

    currDifference = currEndDateTime - currStartDateTime

    if (newEndDateTime - newStartDateTime) > currDifference:
        return jsonify({"status": False, "message": f"The duration chosen is too long. Try again"})
    else:
        #affected_bookings = Booking.query.filter(and_(Booking.roomName == roomName, Booking.startDateTime >= newStartDateTime))
        affected_bookings = Booking.query.filter(and_(Booking.roomName == roomName, Booking.startDateTime.between(newStartDateTime, newEndDateTime), Booking.endDateTime.between(newStartDateTime, newEndDateTime))).all()
        
        if len(affected_bookings) > 1:
            return {"success": False, "message": "The inputted time clashes with another booking time"}
        
        #if program ends up here, no interfering bookings
        #query booking
        booking_to_change = Booking.query.filter(and_(Booking.userId == userId, Booking.roomName == roomName, Booking.startDateTime == currStartDateTime))

        with app.app_context():
            booking_to_change.startDateTime = newStartDateTime
            booking_to_change.endDateTime = newEndDateTime

#get schedule(date) 
# - get list of rooms 
# - and list of slots status (vacant, taken, users)

#Room union Booking 
# any records from booking will have a status of booked
# any records from Room not in booking will have a status of vacant
@app.route("/api/schedule", methods=['GET'])
@jwt_required()
def get_scheduled_bookings():
    dateString = request.args.get('date')
    user = get_jwt().get('sub')

    dateRequestedLowerBound = datetime.strptime(f"{dateString} 09:00:00", '%Y-%m-%d %H:%M:%S')
    dateRequestedUpperBound = datetime.strptime(f"{dateString} 17:00:00", '%Y-%m-%d %H:%M:%S')
    list_of_schedules = {}

    list_of_rooms = Room.query.all()
    for room in list_of_rooms:
        bookings = Booking.query.filter(and_(Booking.roomName == room.name, Booking.startDateTime.between(dateRequestedLowerBound, dateRequestedUpperBound))).order_by(Booking.startDateTime.asc()).all()

        booking_slots = [0,0,0,0,0,0,0,0,0]

        for booking in bookings:
            if booking.userId == user:
                booking_slots[booking.startDateTime.hour-9] = 2
            else:
                booking_slots[booking.startDateTime.hour-9] = 1

        list_of_schedules[room.roomName] = booking_slots
    return list_of_schedules

#get distinct type of rooms
#get rooms not booked (rooms not in the Booking table), get their distinct roomType
#meeting room
#meeting pod
# type 3
@app.route("/api/types_of_rooms", methods=['GET'])
@jwt_required()
@roles_required('') #Administrator, Staff, Student
def get_type_of_rooms():
    return {"typesOfRooms": [[room.value for room in TypeOfRoom]]}


@app.route("/api/create_booking", methods=['POST'])
@jwt_required()
@roles_required('Student')
def create_booking():
    roomName = request.json.get('roomName')
    startDateTimeString = request.json.get('startDateTime')
    endDateTimeString = request.json.get('endDateTimeString')
    user = get_jwt().get('sub')

    #convert the datetimes into object
    startDateTime = datetime(startDateTimeString, '%Y-%m-%d %H:%M:%S')
    endDateTime = datetime(endDateTimeString, '%Y-%m-%d %H:%M:%S')

    clashed_bookings = Booking.query.filter(Booking.roomName == roomName).filter(or_(Booking.startDateTime.between(startDateTime, endDateTime), Booking.endDateTime.between(startDateTime, endDateTime))).first()

    if len(clashed_bookings) > 0:
        {"success": False, "message": "Failed because of clashed bookings"}
    else:
        with app.app_context():
            new_booking = Booking(userId = user, roomName = roomName, startDateTime = startDateTime, endDateTime = endDateTime)
            db.session.add(new_booking)
            db.session.commit()

        return {"success": True, "message": "Sucessful"}