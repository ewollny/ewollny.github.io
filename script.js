function fliterData() { 
 event.preventDefault();
 var startdate = document.getElementById("startdate").value; 
 var enddate = document.getElementById("enddate").value; 
 console.log(startdate);
 console.log(enddate);
}

async function fetchPitchData() {
    try {
        const response = await fetch('https://compute.samford.edu/zohauth/clients/datajson/1');
        const data = await response.json();

        const table = document.getElementById('pitchTable');

        data.forEach(pitch => {
            const row = table.insertRow();
            const pitchNoLink = `<a href="details.html?id=${pitch.PitchNo}">Pitch ${pitch.PitchNo}</a>`;

            row.innerHTML = `
                <td>${pitchNoLink}</td>
                <td>${pitch.Date}</td>
                <td>${pitch.Time}</td>
                <td>${pitch.Batter}</td>
                <td>${pitch.Balls}</td>
                <td>${pitch.Strikes}</td>
                <td>${pitch.Outs}</td>
                <td>${pitch.PitchCall}</td>
                <td>${pitch.KordBB}</td>
                <td>${pitch.RelSpeed}</td>
                <td>${pitch.SpinRate}</td>
                <td>${pitch.SpinAxis}</td>
            `;
        });
    } catch (error) {
        console.error('Error fetching pitch data:', error);
    }
}

// Fetch the pitch data when the page loads
window.onload = fetchPitchData;