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

      // Get save button to allow for new results to be saved again
      var saveResultsButton = document.getElementById('saveResultsButton');

      // Update button text to indicate success
      saveResultsButton.textContent = 'Save Results';

      // Allow hover
      saveResultsButton.classList.remove('clicked');

      // Disable the button to prevent multiple clicks
      saveResultsButton.disabled = false;


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
    // Handle the result returned by Flask backend
    const prediction = data.Type;

    // Update the result text and color based on the prediction
    var resultField = document.getElementById('result');
    resultField.value = `${firstName.toUpperCase()} ${lastName.toUpperCase()} IS A ${prediction}`;

    // Remove existing color classes
    resultField.classList.remove('low-risk', 'high-risk');

    // Dynamically add color class based on the prediction
    if (prediction === 'HIGH CREDIT RISK') {
      resultField.classList.add('high-risk');
    } else {
      resultField.classList.add('low-risk');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
  // Save Results Button Functionality
  // Get the Save Results button element
  var saveResultsButton = document.getElementById('saveResultsButton');

  // Add click event listener to the button
  saveResultsButton.addEventListener('click', function() {
    // Get the value of the required input fields
    var results = document.getElementById('result').value;
    var firstName = document.getElementById('first_name').value;
    var lastName = document.getElementById('last_name').value;
    var age = document.getElementById('person_age').value;
    var income = document.getElementById('person_income').value;
    var loanIntent = document.getElementById('loan_intent').value;
    var loanGrade = document.getElementById('loan_grade').value;
    var loanAmount = document.getElementById('loan_amnt').value;

    // Split results to array
    var words = results.split(" ");

    //Get last 3 words
    var lastWords = words.slice(-3);

    // Join words into str
    var joinedResults = lastWords.join(" ");

    // Date
    var currentDate = new Date();

    // Get the current year
    var year = currentDate.getFullYear();

    // Get the current month (0-11)
    var month = currentDate.getMonth() + 1; // Adding 1 because months are zero-indexed

    // Get the current day of the month (1-31)
    var day = currentDate.getDate();

    // Format the date as desired (e.g., DD-MM-YYYY)
    var formattedDate = (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + '-' + year;


    // Dict of items to save to db
    db_info = {
      name: firstName + " " + lastName,
      date: formattedDate,
      income: income,
      requestLoanAmount: loanAmount,
      loanIntent: loanIntent,
      loanGrade: loanGrade,
      status: joinedResults
    }

    // Update button text to indicate success
    saveResultsButton.textContent = 'Results Saved!';

    // Disable the button to prevent multiple clicks
    saveResultsButton.disabled = true;

    // Add a class to the button to indicate that it has been clicked
    saveResultsButton.classList.add('clicked');

    // Log the results to console
    console.log("Results saved: ", db_info);

    // Send the results to a server 
    fetch('/save_results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(db_info)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
});
