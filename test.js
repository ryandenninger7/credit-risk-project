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
  
      // Here you can do whatever you want with the form data
      // For now, let's just log it to the console
      console.log("Age:", age);
      console.log("Income:", income);
      console.log("Home Ownership:", homeOwnership);
      console.log("Employment Length:", employmentLength);
      console.log("Loan Intent:", loanIntent);
      console.log("Loan Grade:", loanGrade);
      console.log("Loan Amount:", loanAmount);
      console.log("Loan Interest Rate:", loanInterestRate);
      console.log("Loan Percent Income:", loanPercentIncome);
      console.log("History of Default:", historyOfDefault);
      console.log("Credit History Length:", creditHistoryLength);
  
      // You can also update the result field in the HTML with the processed data
      var resultField = document.getElementById('result');
      resultField.value = "Form submitted successfully! Check the console for details.";
    });
  });
  