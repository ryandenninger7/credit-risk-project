document.getElementById('searchButton').addEventListener('click', function() {
    var searchInput = document.getElementById('searchInput').value;
    
    fetch('/search_db/results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'search_term=' + encodeURIComponent(searchInput)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var rows = data.rows;
        // Update the table with search results
        var tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = '';
        rows.forEach(function(row) {
            var newRow = '<tr><td>' + row.id + '</td><td>' + row.name + '</td><td>' + row.date_inquiry + '</td><td>' + row.income + '</td><td>' + row.requested_loan_amount + '</td><td>' + row.loan_intent + '</td><td>' + row.loan_grade + '</td><td>' + row.status + '</td></tr>';
            tableBody.insertAdjacentHTML('beforeend', newRow);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
