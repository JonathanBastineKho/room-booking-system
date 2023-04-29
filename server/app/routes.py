from app import app, db, bcrypt, jwt
from db import User, TypeOfUser
from flask import request
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_claims


def roles_required(*roles):
    '''Function wrapper for protected routes'''
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            # Verifying JWT
            verify_jwt_in_request()
            claims = get_jwt_claims()

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

@app.route('/api/register')
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
    db.session.add(new_user)
    db.session.commit()


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
            'user_type': user.userType
            }
        )
    return {'access_token' : access_token, 'success' : True}

''' PROTECTED ROUTES'''