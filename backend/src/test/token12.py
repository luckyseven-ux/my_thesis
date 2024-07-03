from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/percobaan'  # Sesuaikan dengan database yang Anda gunakan
app.config['JWT_SECRET_KEY'] = '$buncit&12345'
db = SQLAlchemy(app)
jwt = JWTManager(app)

logging.basicConfig(level=logging.INFO)

# Model untuk menyimpan data record
class Record(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)

# Model untuk menyimpan data user
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

# Endpoint untuk menghasilkan token JWT
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    user = User.query.filter_by(username=username).first()

    if user:
        access_token = create_access_token(identity=user.id, additional_claims={"sub": user.id})
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'msg': 'User not found'}), 404

# Endpoint untuk mengambil data user berdasarkan user_id
@app.route('/user/data', methods=['GET'])
@jwt_required()
def get_user_data():
    try:
        user_id = get_jwt_identity()  # Mendapatkan user_id dari JWT
        if not user_id:
            return jsonify({'error': 'user_id is required'}), 400

        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        records = Record.query.filter_by(user_id=user_id).all()
        if not records:
            return jsonify({'error': 'No records found for this user_id'}), 404

        data = {
            'username': user.username,
            'email': user.email,
            'records': [{'user_id': record.user_id} for record in records]
        }

        return jsonify(data), 200

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Endpoint to receive token
@app.route('/token', methods=['POST'])
def receive_token():
    try:
        data = request.get_json()
        token = data.get('token')
        if not token:
            return jsonify({'error': 'Token is required'}), 400

        # Logic to process or store the token here
        logging.info(f"Received token: {token}")

        return jsonify({'message': 'Token received successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)  # Pastikan port tidak bentrok dengan server Flask lain yang berjalan
