document.getElementById('risk-form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
  
    // Send data to the backend for processing
    const response = await fetch('/evaluate-risk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    const result = await response.json();
    document.getElementById('result').textContent = result.isCreditRisk ? 'Credit Risk' : 'Not a Credit Risk';
  });
  