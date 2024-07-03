import streamlit as st
import numpy as np
from tensorflow.keras.models import load_model
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')
# Menampilkan distribusi variabel

# Function to load the selected model
def load_model_file(model_path, weights_path):
    try:
        loaded_model = load_model(model_path)
        loaded_model.load_weights(weights_path)  # Memuat bobot dan konfigurasi optimizer
        st.success("Model berhasil dimuat.")
        return loaded_model
    except Exception as e:
        st.error(f"Error saat membaca model: {e}")
        return None

# Function to make diabetes prediction
def predict_diabetes(model, input_data):
    if model:
        prediction = model.predict(input_data)
        return prediction[0]
    return None

# Function to display the prediction result
# Fungsi untuk menampilkan hasil prediksi
def display_diagnosis(prediction):
    if prediction is not None:
        return 'Orang tersebut terkena diabetes' if prediction[0] <= 0.7 else 'Orang tersebut bebas diabetes'
    return ''


# Streamlit app
st.title('Prediksi Diabetes Menggunakan Neural Network')

# Load models
model_options = ['Model_ANN', 'Model_DNN']  # Add model names accordingly
selected_model = st.radio('Pilih Model:', model_options)

if selected_model == 'Model_ANN':
    weight_path = 'diabetes_weight_ANN.h5'
    model_path = 'diabetes_ANN.h5'
elif selected_model == 'Model_DNN':
    weight_path = 'diabetes_weight_CNN.h5'
    model_path = 'diabetes_CNN.h5'
    
diabetes_model = load_model_file(model_path,weight_path)

# Input form
input_columns = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']
input_data = [st.text_input(f'{column}:') for column in input_columns]

# Handling empty string inputs
input_data = [float(val) if val != '' else 0.0 for val in input_data]

# Convert to NumPy array
input_data = np.array(input_data).reshape(1, -1)

# Prediction and result
diagnosis = ''
if st.button('Diabetes Test Result'):
    prediction = predict_diabetes(diabetes_model, input_data)
    if prediction is not None:
        diagnosis = display_diagnosis(prediction)
        # Menampilkan diagnosis
        st.success(diagnosis)
