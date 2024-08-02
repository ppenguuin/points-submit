async function checkPoints() {
    const email = document.getElementById('userEmail').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    if (!email) {
        resultDiv.innerHTML = 'Please enter an email address.';
        return;
    }

    const sheetUrl = 'https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbxdHxYmWuHM6-3NTLWQQbnJwbfMS2JZIVx7dTdtzcjWdu2rbv88XlpJr0w3C5M0nUGRZg/exec';

    try {
        const response = await fetch(sheetUrl);
        const data = await response.json();

        if (data && data.feed && data.feed.entry) {
            const entries = data.feed.entry;
            let cumulativePoints = 0;
            let userFound = false;

            entries.forEach((entry) => {
                const entryEmail = entry['gsx$email']['$t'].toLowerCase();
                const entryPoints = parseInt(entry['gsx$points']['$t'], 10);

                if (entryEmail === email) {
                    cumulativePoints += entryPoints;
                    userFound = true;
                }
            });

            if (userFound) {
                resultDiv.innerHTML = `Your cumulative points: ${cumulativePoints}`;
            } else {
                resultDiv.innerHTML = 'Email not found.';
            }
        } else {
            resultDiv.innerHTML = 'No data available.';
        }
    } catch (error) {
        resultDiv.innerHTML = 'Error fetching data. Please try again later.';
        console.error('Error:', error);
    }
}
