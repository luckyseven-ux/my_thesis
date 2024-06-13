import * as tf from '@tensorflow/tfjs';
import fs from 'fs';
import path from 'path';

let model;

const loadLocalModel = async (modelPath) => {
  // Baca file model JSON
  const modelJson = JSON.parse(fs.readFileSync(modelPath, 'utf8'));

  // Buat handler kustom untuk memuat model tanpa bobot
  const handler = {
    load: async () => {
      return {
        modelTopology: modelJson,
        weightSpecs: [], // Kosongkan weightSpecs jika tidak menggunakan bobot
        weightData: new ArrayBuffer(0) // Kosongkan weightData jika tidak menggunakan bobot
      };
    }
  };

  return tf.loadLayersModel(handler);
};

export const loadModel = async () => {
  try {
    const modelPath = path.resolve('./json_model/model_ANN.json');
    console.log(`Loading model from: ${modelPath}`);

    model = await loadLocalModel(modelPath);
    console.log('Model loaded');
  } catch (err) {
    console.error('Error loading the model:', err);
  }
};

export const getPrediction = async (inputData) => {
  try {
    if (!model) {
      throw new Error('Model is not loaded');
    }
    const inputTensor = tf.tensor2d(inputData, [1, inputData.length]);
    const prediction = model.predict(inputTensor);
    return prediction.arraySync();
  } catch (err) {
    console.error('Error making prediction:', err);
    throw err;
  }
};

// Memuat model saat aplikasi dimulai
loadModel().catch(err => {
  console.error('Error loading ML model:', err);
});
