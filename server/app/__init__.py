from flask import Flask
from config import Config
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
import os

app = Flask(__name__)
app.config.from_object(Config)
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'room_image')

db = SQLAlchemy(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

from app import routes