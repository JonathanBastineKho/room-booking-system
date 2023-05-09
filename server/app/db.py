from app import db, app
from enum import Enum

class TypeOfRoom(Enum):
    LECTURE_HALL = 'Lecture Hall'
    MEETING_ROOM = 'Meeting Room'
    PRIVATE_POD = 'Private Pod'

class TypeOfUser(Enum):
    STUDENT = 'Student'
    STAFF = 'Staff'
    ADMININSTRATOR = 'Administrator'

class User(db.Model):
    __tablename__ = "user"
    username = db.Column(db.String(250), primary_key = True)
    email = db.Column(db.String(250), nullable=False, unique=True)
    password = db.Column(db.String(250), nullable=False)
    userType = db.Column(db.Enum(TypeOfUser), nullable=False)

    roomApprovedRel = db.relationship("Room", back_populates="approvedByRel", foreign_keys="Room.approvedByUsername")
    roomLaunchedRel = db.relationship("Room", back_populates="launchedByRel", foreign_keys="Room.launchedByUsername")
    userBookingRel = db.relationship("Booking", back_populates="bookedByRel")
    promoCodeRel = db.relationship("PromoCode", back_populates='createdByRel')


    
class Room(db.Model):
    __tablename__ = 'room'
    name = db.Column(db.String(250), primary_key=True)
    imgUrl = db.Column(db.String(600), nullable=False) #Note: imgUrl is set such that the same image can be used
    roomType = db.Column(db.Enum(TypeOfRoom), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(10000), nullable=False)
    isLaunched = db.Column(db.Boolean, default=False, nullable=False)
    launchDateTime = db.Column(db.DateTime, nullable=True, default=None)
    isApproved = db.Column(db.Boolean, default=False, nullable=False)
    approvedDateTime = db.Column(db.DateTime, nullable=True, default=None)
    
    bookingRoomRel = db.relationship("Booking", back_populates='roomBookingRel')
    approvedByRel = db.relationship("User", back_populates="roomApprovedRel", foreign_keys="Room.approvedByUsername")
    launchedByRel = db.relationship("User", back_populates="roomLaunchedRel", foreign_keys="Room.launchedByUsername")

    approvedByUsername = db.Column(db.String(250), db.ForeignKey('user.username'))
    launchedByUsername = db.Column(db.String(250), db.ForeignKey('user.username'))
 
    
class Booking(db.Model):
    __tablename__ = 'booking'
    startDateTime = db.Column(db.DateTime, primary_key=True)
    roomBookingRel = db.relationship("Room", back_populates='bookingRoomRel')
    roomName = db.Column(db.String(250), db.ForeignKey('room.name'), primary_key=True)
    endDateTime = db.Column(db.DateTime, nullable=False)
    bookingPrice = db.Column(db.Float, nullable=False)
    bookedByRel = db.relationship("User", back_populates="userBookingRel")
    userId = db.Column(db.String(250), db.ForeignKey('user.username'))

    
class PromoCode(db.Model):
    __tablename__ = 'promocode'
    promoCode = db.Column(db.String(500), primary_key=True)
    startDate = db.Column(db.DateTime, primary_key=True)
    endDate = db.Column(db.DateTime, nullable=False)
    discountPercentage = db.Column(db.Integer, nullable=False)

    createdByRel = db.relationship("User", back_populates='promoCodeRel')
    promoCreatedBy = db.Column(db.String(250), db.ForeignKey('user.username'), nullable=False)
    
    
with app.app_context():
    db.create_all()