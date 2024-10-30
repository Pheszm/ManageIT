//OPEN ADDING FORM
document.getElementById("AddbtnShow").addEventListener("click", function() {
    document.getElementById("AddingFacultyForm").style.display = "flex";
});

//CLOSE ADDING FORM
document.getElementById("extbtn").addEventListener("click", function() {
    document.getElementById("AddingFacultyForm").style.display = "none";
});










//FETCH ACCOUNTS TO THE TABLE
document.addEventListener("DOMContentLoaded", function() {
    fetch('../Source/PHP/Faculty_accounts_table_fetch.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('ItemTable');

            data.forEach(faculty => {
                const row = table.insertRow();
                const nameCell = row.insertCell(0);
                const statusCell = row.insertCell(1);
                const operationCell = row.insertCell(2);

                nameCell.innerHTML = `<input hidden value="${faculty.faculty_id}">${faculty.faculty_full_name}`;
                
                // Adjusted status based on faculty_status
                statusCell.innerText = (faculty.faculty_status == 1) ? 'Active🟢' : 'Inactive🔴';
                
                // Keep the View button
                operationCell.innerHTML = `<button>View</button>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});



/// ADDING FUNCTION
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        alert('Adding was successful!');
    } else if (urlParams.has('error')) {
        alert('Error: ' + urlParams.get('error'));
    }
};