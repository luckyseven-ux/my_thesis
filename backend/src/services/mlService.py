from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np


app = Flask(__name__)

# Load the model
model = load_model('E:\\syntax code\\python\\jupytr\\website html\\latihan fullstack\\react js\\skripsi\\backend\\model\\model_ANN.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        input_data = np.array(data['input'])
        prediction = model.predict(input_data)
        # Convert probabilities to 0 or 1
        prediction = (prediction > 0.5).astype(int)
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
