# Import dependencies
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
import joblib
from joblib import dump, load
import sqlite3
import pandas as pd


app = Flask(__name__)
CORS(app)

# Configure SQLAlchemy to use SQLite database 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///predictions.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking
db = SQLAlchemy(app)

# Define SQLAlchemy model class for database table
class Predictions(db.Model):
    __tablename__ = 'loanee_predictions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    inq_date = db.Column(db.String(255))
    income = db.Column(db.Float)
    requested_loan_amnt = db.Column(db.Float)
    loan_intent = db.Column(db.String(255))
    loan_grade = db.Column(db.String(10))
    status = db.Column(db.String(255))

# Create db if does not exist
with app.app_context():
    db.create_all()

# Load tensorflow model
model = tf.keras.models.load_model('Resources/tensorflowmodel.keras')

# encoder = joblib.load('Resources/encoder.joblib')
scaler = joblib.load('Resources/scaler.joblib')

# Home page
@app.route('/')
def home():
    return render_template('prediction.html')

# About page
@app.route("/about")
def about():
    return render_template('about.html')

# Use model to make prediction 
@app.route('/evaluate-risk', methods=['POST'])
def evaluate_risk():
    data = request.json
    # Preprocess data to match the model's training format
    processed_data = process_(data)

    # Predict using the TensorFlow model
    prediction = model.predict(processed_data)

    # Empty Variable to store response
    answer = ''

    # Interpret the result
    if prediction[0].tolist()[0] > 0.5:
        answer = 'HIGH CREDIT RISK'
    else:
        answer = "LOW CREDIT RISK" 

    return jsonify({'Type': answer})


def process_(data):
    enc = OneHotEncoder(sparse_output=False)
    
    # Convert our JSON Data to Pandas Dataframe
    df = pd.DataFrame([data])

    # Store our categorical values (Will use for encoder)
    df_categ = df.dtypes[df.dtypes == 'object'].index.to_list()

    # Fit and transform the OneHotEncoder using the categorical variable list
    encode_df = pd.DataFrame(enc.fit_transform(df[df_categ]))

    # Add the encoded variable names to the dataframe
    encode_df.columns = enc.get_feature_names_out(df_categ)

    # Merge the encoded categorical columns with our original colums
    df = df.merge(encode_df, left_index=True, right_index=True)

    # Drop the categorical colums that are not encoded
    df = df.drop(df_categ, axis=1)

    # Ensure all columns present in the training data are in the new data
    training_categorical_columns = ['person_home_ownership_MORTGAGE', 'person_home_ownership_OTHER', 
                                 'person_home_ownership_OWN', 'person_home_ownership_RENT', 
                                 'loan_intent_DEBTCONSOLIDATION', 'loan_intent_EDUCATION', 
                                 'loan_intent_HOMEIMPROVEMENT', 'loan_intent_MEDICAL', 
                                 'loan_intent_PERSONAL', 'loan_intent_VENTURE', 'loan_grade_A', 
                                 'loan_grade_B', 'loan_grade_C', 'loan_grade_D', 'loan_grade_E', 
                                 'loan_grade_F', 'loan_grade_G', 'cb_person_default_on_file_N', 
                                 'cb_person_default_on_file_Y']

    missing_cols = set(training_categorical_columns).difference(df.columns)
    for col in missing_cols:
        df[col] = 0.0

    # Reorder the columns to match the order in the training data
    final_df = df[['person_age', 'person_income', 'person_emp_length', 
                                                'loan_amnt', 'loan_int_rate','loan_percent_income', 'cb_person_cred_hist_length'] + training_categorical_columns  ]

    # Get our X values
    X = final_df.values

    # Transform our X values using our saved scaler from the training data
    X_scaled = scaler.transform(X)

    # Return processed data
    return X_scaled

# Save results to database
@app.route('/save_results', methods = ["POST"])
def save_results():
    # Get data
    data = request.json

    # Create variable to store applicant data
    client_data = Predictions(
                        name= data['name'], 
                        inq_date= data['date'],
                        income= data['income'],
                        requested_loan_amnt= data['requestLoanAmount'],
                        loan_intent= data['loanIntent'],
                        loan_grade= data['loanGrade'],
                        status= data['status'] 
                        )

    # Add client data to database
    db.session.add(client_data)
    db.session.commit()

    return render_template('prediction.html')

# Page to search database
@app.route('/search_db')
def search_db():
    return render_template('db.html')

# Query database
@app.route('/search_db/results', methods= ["POST"])
def search_results():
    search_term = request.form.get('search_term')
    if search_term:
        # Perform the search query
        rows = Predictions.query.filter(Predictions.name.like(f'%{search_term}%')).all()
    else:
        # If no search term is provided, return all rows
        # rows = Predictions.query.all()
        pass

    # Convert each row to a dictionary 
    rows_data = []
    for row in rows:
        row_data = {
            'id': row.id,
            'name': row.name,
            'date_inquiry': row.inq_date,
            'income': row.income,
            'requested_loan_amount': row.requested_loan_amnt,
            'loan_intent': row.loan_intent,
            'loan_grade': row.loan_grade,
            'status': row.status
        }
        rows_data.append(row_data)

    return jsonify(rows=rows_data)



if __name__ == '__main__':
    app.run(debug=True, port=5501)


