 // Get the form element by its ID
const form = document.getElementById('evaluate');

// Add an event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the input values from the form
    const age = parseFloat(document.getElementById('person_age').value);
    const income = parseFloat(document.getElementById('person_income').value);
    const homeOwnership = parse(document.getElementById('person_home_ownership').value);
    const employmentLength = parseFloat(document.getElementById('person_emp_length').value);
    const loanIntent = parse(document.getElementById('loan_intent').value);
    const loanGrade = parse(document.getElementById('loan_grade').value);
    const loanAmount = parseFloat(document.getElementById('loan_amnt').value);
    const interestRate = parseFloat(document.getElementById('loan_int_rate').value);
    // const loanStatus = parseFloat(document.getElementById('loan_status').value);
    const percentIncome = parseFloat(document.getElementById('loan_percent_income').value);
    const historyOfDefault = document.querySelector('input[name="history_of_default"]:checked').value;;
    const creditHistoryLength = parseFloat(document.getElementById('cb_person_cred_hist_length').value);

    // Prepare the data object to send to the Flask backend
    const data = {
        person_age: age,
        person_income: income,
        person_home_ownership: homeOwnership.toUpperCase(),
        person_emp_length: employmentLength,
        loan_intent: loanIntent.toUpperCase(),
        loan_grade: loanGrade,
        loan_amnt: loanAmount,
        loan_int_rate: interestRate,
        // loan_status: loanStatus,
        loan_percent_income: percentIncome,
        cb_person_default_on_file: historyOfDefault,
        cb_person_cred_hist_length: creditHistoryLength
    };

    // Check that all data is correct
    console.log(data)

//     // Send the data to the Flask backend for evaluation
//     fetch('/evaluate-risk', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//         // Handle the result returned by the Flask backend
//         const resultDiv = document.getElementById('result');
//         if (result.isCreditRisk) {
//             resultDiv.textContent = 'You are a credit risk.';
//         } else {
//             resultDiv.textContent = 'You are not a credit risk.';
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });