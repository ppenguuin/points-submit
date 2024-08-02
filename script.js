async function checkPoints() {
    const email = document.getElementById('userEmail').value.toLowerCase().trim();
    const resultDiv = document.getElementById('result');

    if (!email) {
        resultDiv.innerHTML = 'Please Enter Your ID.';
        return;
    }

    // URL to the published CSV data
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4XoFVTNdzL9eZmwwPL9oqMQu3EhdxhXBc-SpN09IrDbcatxTrzbZ4P7VWIsuDt-FfDfhob7iOZoeI/pub?output=csv';

    try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        // Parse CSV text
        const rows = csvText.split('\n');
        const data = rows.map(row => row.split(','));

        let cumulativePoints = 0;
        let userFound = false;

        // Skip header row
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            const emailFromSheet = row[1].toLowerCase().trim(); // Assuming email is in the second column
            const points = parseInt(row[2], 10); // Assuming points are in the 6th column

            if (emailFromSheet === email) {
                cumulativePoints += points;
                userFound = true;
            }
        }

        if (userFound) {
            resultDiv.innerHTML = `Your Total Hours: ${cumulativePoints}`;
        } else {
            resultDiv.innerHTML = 'ID not found.';
        }
    } catch (error) {
        resultDiv.innerHTML = 'Error fetching data. Go yell at Kenny he probably did something wrong.';
        console.error('Error:', error);
    }
}
