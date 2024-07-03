from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/percobaan'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '$buncit&12345'
db = SQLAlchemy(app)
jwt = JWTManager(app)

logging.basicConfig(level=logging.INFO)

class Record(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    
@app.route('/user/data', methods=['GET'])
@jwt_required()
def get_user_data():
    try:
        user_id = get_jwt_identity()
        logging.info(f"JWT Token provides user_id: {user_id}")

        if not user_id:
            return jsonify({'error': 'user_id is required'}), 400
        
        records = Record.query.filter_by(user_id=user_id).all()
        if not records:
            return jsonify({'error': 'No records found for this user_id'}), 404
        
        data = [{'user_id': record.user_id} for record in records]
        return jsonify(data), 200

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5003)
