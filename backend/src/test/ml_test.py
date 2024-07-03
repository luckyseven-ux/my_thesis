from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from tensorflow.keras.models import load_model
import numpy as np
import logging
import datetime

app = Flask(__name__)
CORS(app ,supports_credentials=True)  # Enable CORS for all routes

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/percobaan'  # Sesuaikan dengan pengaturan MySQL Anda
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
logging.basicConfig(level=logging.INFO)

# Define the Record model
class Record(db.Model):
    id_record = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    record_time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    pregnancies = db.Column(db.Integer, nullable=False)
    glucose = db.Column(db.Integer, nullable=False)
    blood_preasure = db.Column(db.Integer, nullable=False)
    skin_thickness = db.Column(db.Integer, nullable=False)
    insulin = db.Column(db.Integer, nullable=False)
    bmi = db.Column(db.Float, nullable=False)
    diabetes_pedigree_function = db.Column(db.Float, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    outcome = db.Column(db.Float, nullable=False)

# Load the model
model = load_model('E:\\syntax code\\python\\jupytr\\website html\\latihan fullstack\\react js\\skripsi\\backend\\model\\diabetes-main\\diabetes_ANN.h5')
@app.route('/predict/record', methods=['POST'])
def predict_record():
    try:
        data = request.get_json(force=True)
        logging.info(f"Received data: {data}")

        required_fields = ['name', 'pregnancies', 'glucose', 'blood_pressure', 'skin_thickness', 'insulin', 'bmi', 'diabetes_pedigree_function', 'age']
        for field in required_fields:
            if field not in data:
                logging.error(f"Missing field: {field}")
                return jsonify({'error': f'{field} is required'}), 422

        input_data = np.array([[
            float(data['pregnancies']), float(data['glucose']), float(data['blood_pressure']),
            float(data['skin_thickness']), float(data['insulin']), float(data['bmi']),
            float(data['diabetes_pedigree_function']), float(data['age'])
        ]])

        logging.info(f"Input data for prediction: {input_data}")

        prediction = model.predict(input_data)
        logging.info(f"Model prediction raw output: {prediction}")

        probability = prediction[0][0] * 100  # Convert to percentage

        # Prepare the response
        response_data = {
            'name': data['name'],
            'pregnancies': data['pregnancies'],
            'glucose': data['glucose'],
            'blood_pressure': data['blood_pressure'],
            'skin_thickness': data['skin_thickness'],
            'insulin': data['insulin'],
            'bmi': data['bmi'],
            'diabetes_pedigree_function': data['diabetes_pedigree_function'],
            'age': data['age'],
            'probability': probability
        }

        # Save the prediction to the database
        new_record = Record(#ini nama tablenya huruf kecil besar tidak berpengaruh namanya :record
            user_id='4b0a3',  # Ganti dengan ID user yang sebenarnya
            name=data['name'],
            pregnancies=data['pregnancies'],
            glucose=data['glucose'],
            blood_preasure=data['blood_pressure'],
            skin_thickness=data['skin_thickness'],
            insulin=data['insulin'],
            bmi=data['bmi'],
            diabetes_pedigree_function=data['diabetes_pedigree_function'],
            age=data['age'],
            outcome=probability
        )
        
        db.session.add(new_record)
        db.session.commit()

        return jsonify(response_data), 201

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5001)
