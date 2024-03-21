document.addEventListener('DOMContentLoaded', function() {
  // Function to update loan_percent_income
  function updateLoanPercentIncome() {
    var loanAmount = parseFloat(document.getElementById('loan_amnt').value);
    var income = parseFloat(document.getElementById('person_income').value);
    var loanPercentIncomeInput = document.getElementById('loan_percent_income');
    if (!isNaN(loanAmount) && !isNaN(income) && income !== 0) {
        var loanPercentIncome = loanAmount / income;
        loanPercentIncomeInput.value = loanPercentIncome.toFixed(2); // Limiting to 2 decimal places
    } else {
        loanPercentIncomeInput.value = ''; // Clear the input if values are invalid or income is 0
    }
}

   // Add event listeners for loan_amount and income inputs
   document.getElementById('loan_amnt').addEventListener('input', updateLoanPercentIncome);
   document.getElementById('person_income').addEventListener('input', updateLoanPercentIncome);

  // Get the form element
    var form = document.querySelector('form');
  
    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get all form input values
      var firstName = document.getElementById('first_name').value;
      var lastName = document.getElementById('last_name').value;
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
        person_home_ownership: homeOwnership,
        person_emp_length: parseFloat(employmentLength),
        loan_intent: loanIntent,
        loan_grade: loanGrade,
        loan_amnt: parseInt(loanAmount),
        loan_int_rate: parseFloat(loanInterestRate),
        loan_percent_income: parseFloat(loanPercentIncome),
        cb_person_default_on_file: historyOfDefault,
        cb_person_cred_hist_length: parseInt(creditHistoryLength)
      }

      
  
      // Console.log data to make sure everything is correct
      // console.log(form_data);

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
      .then(result => {
        // Ensure we are grabbing the right data
        console.log(result.Type)
        // Handle the result returned by Flask backend
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = `${firstName} ${lastName} is a ${result.Type}.`
      })
      .catch(error => {
        console.error('Error:', error);
      });  

  })
});