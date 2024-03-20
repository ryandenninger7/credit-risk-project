from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
import joblib
from joblib import dump, load
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

encoder = joblib.load('encoder.joblib')
scaler = joblib.load('scaler.joblib')

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
    # Placeholder for feature names, replace with actual feature names used in your model
    numerical_feature_names = ['num_feature1', 'num_feature2']
    categorical_feature_names = ['cat_feature1', 'cat_feature2']
    
    # Extract numerical and categorical features
    numerical_features = np.array([data[feature] for feature in numerical_feature_names]).reshape(1, -1)
    categorical_features = np.array([data[feature] for feature in categorical_feature_names]).reshape(1, -1)
    
    # Apply one-hot encoding to categorical features
    encoded_features = encoder.transform(categorical_features).toarray()
    
    # Scale numerical features
    scaled_numerical_features = scaler.transform(numerical_features)
    
    # Concatenate scaled numerical features and encoded categorical features
    processed_data = np.concatenate([scaled_numerical_features, encoded_features], axis=1)
    
    return processed_data



if __name__ == '__main__':
    app.run(debug=True)


