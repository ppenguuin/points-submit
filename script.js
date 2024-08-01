async function checkPoints() {
    const email = document.getElementById('userEmail').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    if (!email) {
        resultDiv.innerHTML = 'Please enter an email address.';
        return;
    }

    const sheetUrl = 'https://spreadsheets.google.com/feeds/list/2PACX-1vS4XoFVTNdzL9eZmwwPL9oqMQu3EhdxhXBc-SpN09IrDbcatxTrzbZ4P7VWIsuDt-FfDfhob7iOZoeI/od6/public/values?alt=json';

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
