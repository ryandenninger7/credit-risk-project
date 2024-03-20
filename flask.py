from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from pathlib import Path
import sqlite3


# Database setup

db = Path("Resources/credit_risk.sqlite")
def get_db_connection(path):
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    return conn



app = Flask(__name__)
CORS(app)

# Load tensorflow model
model = tf.keras.models.load_model('Resources/tensorflowmodel.h5') # <----------


@app.route('/evaluate-risk', methods=['POST'])
def evaluate_risk():
    data = request.json
    # Preprocess data to match the model's training format
    processed_data = preprocess(data)

    # Predict using the TensorFlow model
    prediction = model.predict(processed_data)

    # Interpret the result
    isCreditRisk = prediction[0] > 0.5 

    return jsonify({'isCreditRisk': isCreditRisk})

def preprocess(data):
    numerical_features = np.array([])  
    categorical_features = np.array([])  
    # Encode
    encoded_features = encoder.transform(categorical_features.reshape(1, -1))
    # Scale
    scaled_numerical_features = scaler.transform(numerical_features)

    processed_data = np.concatenate([scaled_numerical_features, encoded_features], axis=1)
 
    return processed_data


if __name__ == '__main__':
    app.run(debug=True)


