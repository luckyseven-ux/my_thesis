import streamlit as st
import numpy as np
from tensorflow.keras.models import load_model
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')
# Menampilkan distribusi variabel

# Function to load the selected model
def load_model_file(model_path):
    try:
        loaded_model = load_model(model_path)
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
def display_diagnosis(prediction):
    if prediction is not None:
        return 'Orang tersebut terkena diabetes' if np.any(prediction == 1) else 'Orang tersebut tidak terkena diabetes'
    return ''

# Streamlit app
st.title('Prediksi Diabetes Menggunakan Neural Network')

# Load models
model_options = ['Model_ANN', 'Model_DNN']  # Add model names accordingly
selected_model = st.radio('Pilih Model:', model_options)

if selected_model == 'Model_ANN':
    model_path = 'diabetes_ANN.h5'
# Update with the correct file path
elif selected_model == 'Model_DNN':
    model_path = 'diabetes_CNN.h5'

diabetes_model = load_model_file(model_path)

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
    diagnosis = display_diagnosis(prediction)

    # Visualisasi
    st.subheader('Visualisasi Input')
    fig, ax = plt.subplots()
    values = [float(val) for val in input_data[0]]
    ax.bar(input_columns, values, color=sns.color_palette('viridis'))
    ax.set_ylabel('Nilai Input')
    ax.set_title('Input Data untuk Prediksi Diabetes')
    st.pyplot(fig)
    st.set_option('deprecation.showPyplotGlobalUse', False)


    # Menampilkan diagnosis
    st.success(diagnosis)

    # Menampilkan ringkasan statistik
    st.subheader('Ringkasan Statistik')
    st.write(f"**Rata-rata Glukosa:** {np.mean(input_data[0, 1]):.2f}")
    st.write(f"**Rata-rata Tekanan Darah:** {np.mean(input_data[0, 2]):.2f}")
    # Tambahkan statistik lainnya sesuai kebutuhan
    
    # Menampilkan distribusi variabel
    st.subheader('Distribusi Variabel')
    for i, column in enumerate(input_columns):
        st.write(f"**{column}:**")
        sns.histplot(input_data[:, i], kde=True)

        st.pyplot()

    # Menampilkan korelasi antar variabel
    input_data_2d = input_data.reshape(-1, 1)  # Reshape to a column vector
    st.subheader('Korelasi Antar Variabel')
    correlation_matrix = np.corrcoef(input_data_2d, rowvar=False)
    print(correlation_matrix.shape)
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', square=True)
    st.pyplot()

    st.subheader('Distribusi Variabel')
    for i, column in enumerate(input_columns):
        st.write(f"**{column}:**")
        sns.histplot(input_data[:, i], kde=True)
        st.pyplot()
