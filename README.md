# Credit Risk Evaluation System

## Project Overview
The Credit Risk Project is an innovative machine learning application designed to offer real-time credit risk evaluations based on user-submitted data. At its core, the application utilizes a sophisticated TensorFlow model that has been meticulously trained on a wealth of financial data to accurately predict an individual's credit risk status. By integrating Flask for seamless web interaction and SQLite for robust database management, the project provides a comprehensive and user-friendly platform. Users can easily input their personal and loan-related information through a dynamic web form, and the system processes this data using advanced data processing and machine learning techniques. The result is a rapid, insightful assessment of creditworthiness, distinguishing between high and low credit risk. This project not only serves as a valuable tool for individuals seeking to understand their financial standing but also demonstrates the practical application of machine learning algorithms in making informed, data-driven decisions in the financial sector.

## Installation Prerequisites
  - Python 3.8+
  - Pip
  - Anaconda
  
## Setup

### Clone the repository:

git clone "https://github.com/ryandenninger7/credit-risk-project.git"
cd credit-risk-project

### Create and activate a Conda environment:

```conda create --name creditrisk python=3.8```

```conda activate creditrisk```

### Install required packages:

```pip install -r requirements.txt ```

### Run the application:

```python app.py```

## Usage
Once the application is running, navigate to http://localhost:5501 in your web browser to access the Loan Application form. Fill out the form with your personal and loan-related information, then submit to receive an immediate credit risk evaluation.

## Features and Functionalities
- Dynamic Web Form: A user-friendly interface for inputting relevant financial and personal data.
- Real-Time Predictions: Immediate feedback on credit risk status upon form submission.
- Data Preprocessing: Automated data cleaning and preprocessing to ensure accuracy in model predictions.
- Model Training and Evaluation: Detailed documentation on how the TensorFlow model was trained, including data sourcing, preprocessing, model architecture, and performance metrics.
- Security Measures: Explanation of how user data is protected and the application's compliance with data protection regulations.

## Contributing Members
  - Justin Blake
  - Neil Langer
  - Ryan Denninger

## Acknowledgments
- TensorFlow and Keras for the neural network framework.
- Flask for the web server and application routing.
- Pandas and NumPy for data manipulation and preprocessing.
- Scikit-learn for additional machine learning utilities.
- SQLite for lightweight database management.
- Joblib for model serialization and deserialization.
- The open-source community for continuous support and inspiration.

## Data Source and Disclaimer

Data Source:
- Kaggle - a data science competition platform and online community of data scientists and machine learning practitioners under Google LLC
https://www.kaggle.com/datasets/laotse/credit-risk-dataset/data

Disclaimer:
Results are expected to be 92% accurate based on the current model. Further considerations should be taken when assessing the credit worthiness of a person.
