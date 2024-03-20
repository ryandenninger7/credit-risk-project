document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    var form = document.querySelector('form');
  
    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get all form input values
      var age = document.getElementById('person_age').value;
      var income = document.getElementById('person_income').value;
      var homeOwnership = document.getElementById('person_home_ownership').value;
      var employmentLength = document.getElementById('person_emp_length').value;
      var loanIntent = document.getElementById('loan_intent').value;
      var loanGrade = document.getElementById('loan_grade').value;
      var loanAmount = document.getElementById('loan_amnt').value;
      var loanInterestRate = document.getElementById('loan_int_rate').value;
      var loanPercentIncome = document.getElementById('loan_percent_income').value;
      var historyOfDefault = document.querySelector('input[name="history_of_default"]:checked').value;
      var creditHistoryLength = document.getElementById('cb_person_cred_hist_length').value;

      //Prepare the data object to send to the Flask backend
      const form_data = {
        person_age: parseInt(age),
        person_income: parseInt(income),
        person_home_ownershop: homeOwnership,
        person_emp_length: parseInt(employmentLength),
        loan_intent: loanIntent,
        loan_grade: loanGrade,
        loan_amnt: parseInt(loanAmount),
        loan_int_rate: parseFloat(loanInterestRate),
        loan_percent_income: parseFloat(loanPercentIncome),
        cb_person_default_on_file: historyOfDefault,
        cb_person_cred_hist_length: parseInt(creditHistoryLength)
      }

      
  
      // Console.log data to make sure everything is correct
      console.log(form_data);

      // Send the form data to the Flask backend using AJAX
      fetch('/evaluate-risk', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
      // You can also update the result field in the HTML with the processed data
      var resultField = document.getElementById('result');
      resultField.value = "Will return results when connected to Flask!";
    });
  });
  