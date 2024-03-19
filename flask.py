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
model = tf.keras.models.load_model('path/to/your/model') # <----------

@app.route('/evaluate-risk', methods=['POST'])
def evaluate_risk():
    data = request.json

    # Preprocess the data to match your model's requirements
    processed_data = preprocess(data)

    # Predict using the TensorFlow model
    prediction = model.predict(processed_data)

    # Interpret the prediction result
    isCreditRisk = prediction[0] > 0.5  # Adjust based on your model's output

    return jsonify({'isCreditRisk': isCreditRisk})

def preprocess(data):
    # Convert data to the format your model expects
    # For example, you may need to normalize numerical data or encode categorical variables
    return processed_data

if __name__ == '__main__':
    app.run(debug=True)
