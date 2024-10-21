function filterData() {
    event.preventDefault();
    
    var startdate = new Date(document.getElementById("startdate").value);
    var enddate = new Date(document.getElementById("enddate").value);
    
    var table = document.getElementById("pitchTable");
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) { // Start at 1 to skip the header row
        var dateCell = rows[i].getElementsByTagName("td")[1]; // Date is the second column
        var rowDate = new Date(dateCell.textContent);

        if (rowDate >= startdate && rowDate <= enddate) {
            rows[i].style.display = ""; // Show row
        } else {
            rows[i].style.display = "none"; // Hide row
        }
    }
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