document.getElementById("toggle-btn").addEventListener("click", function() {
    const sidebar = document.getElementById("SideBarNav");
    sidebar.classList.toggle("close");
});


document.getElementById("exitbtn2").addEventListener("click", function() {
    document.getElementById("ViewApprovedReserv").style.display = "none";
});







//LOGIN AUTH CHECKER
var facultyId;
document.addEventListener('DOMContentLoaded', function() {
    facultyId = sessionStorage.getItem('facultyId'); // Check sessionStorage for facultyId

    // If facultyId is not found, redirect to the login page
    if (!facultyId) {
        window.location.href = '../../index.html'; // Redirect to the login page if not authenticated
    }

    // If facultyId is found, proceed with page initialization
    else {
        console.log('Faculty ID:', facultyId); 
    }
});

// NAVIGATION FUNCTIONS
document.getElementById('HomeBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Home.html';
});

document.getElementById('ReservationBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Reservation.html';
});

document.getElementById('ItemsBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Items.html';
});

document.getElementById('ActBtn').addEventListener('click', () => {
    window.location.href = 'Admin_ActivityLogs.html';
});

document.getElementById('ReportsBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Reports.html';
});








//NAVIGATION BAR AUTO CLOSE
var NavStatus = false;
function StatusOfNav() {
    const sidebar = document.getElementById("SideBarNav");
    if (NavStatus) {
        sidebar.classList.remove("close");
    } else {
        sidebar.classList.add("close");
    }
}
StatusOfNav();




/// CHECK IF IT HAS FACULTY ID
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const facultyId = urlParams.get('facultyId');

    if (facultyId === null) {
  //      location.href = '../../index.html';
    }
});




// LOAD APPROVED RESERVATIONS IN THE TABLE
document.addEventListener('DOMContentLoaded', function() {
    fetch('../PHP/Admin_Home_ReservationListFetch.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('ScheduledListTable');

            // Clear any existing rows except for the header
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            // Populate table with fetched data
            data.forEach(item => {
                const row = table.insertRow();
                const cellTime = row.insertCell(0);
                const cellName = row.insertCell(1);
                const cellItem = row.insertCell(2);

                cellTime.textContent = item.scheduled_time;
                cellName.textContent = item.fullname;
                cellItem.textContent = item.materials;

                // Create a hidden input for the reservation ID
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.value = item.reservation_id; // Set the value to reservation ID
                hiddenInput.name = 'reservationId[]'; // Optional: name for form submission
                row.appendChild(hiddenInput); // Append to the row
            });
        })
        .catch(error => console.error('Error fetching schedule:', error));
});



var SelectedReservationId;
document.getElementById('ScheduledListTable').addEventListener('click', function(e) {
    const SchedViewDetailsBtn = document.getElementById('SchedViewDetailsBtn');
    const targetRow = e.target.closest('tr');
    if (targetRow && targetRow.rowIndex > 0) { // Check if it's not the header row
        // Clear any inline styles from previous selections
        Array.from(this.rows).forEach(row => {
            row.style.border = "";
            row.style.backgroundColor = ""; // Reset background color
        });
        targetRow.style.backgroundColor = "#9BB9E5FF"; // Corrected syntax
        SchedViewDetailsBtn.style.opacity = 1;
        // Retrieve the hidden input value (reservation ID)
        var SelectReservationId = targetRow.querySelector('input[type="hidden"]').value;
        if(SelectReservationId != SelectedReservationId){
            SelectedReservationId = SelectReservationId;
        }else{
            targetRow.style.backgroundColor = "Transparent"; // Corrected syntax
            SchedViewDetailsBtn.style.opacity = 0.7;
            SelectedReservationId = '';
        }
    }
});






/// APPROVED VIEW DETAILS
document.getElementById('SchedViewDetailsBtn').addEventListener('click', function() {
    if (SelectedReservationId) {
        fetch(`../PHP/Admin_Home_ViewReservation.php?id=${SelectedReservationId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('viewRes_fullName2').textContent = data.fullname;
                document.getElementById('viewRes_courseYear2').textContent = data.course_year;
                document.getElementById('viewRes_subject2').textContent = data.subject;
                document.getElementById('viewRes_requestedBy2').textContent = data.requested_by;
                document.getElementById('viewRes_dateOfUse2').textContent = convertToReadableDate(data.dateofuse);
                document.getElementById('viewRes_fromtime2').textContent = convertToAMPM(data.fromtime);
                document.getElementById('viewRes_totime2').textContent = convertToAMPM(data.totime);
                document.getElementById('viewRes_message2').textContent = data.message;
                document.getElementById('viewRes_Status2').textContent = data.Transaction_status; // Use correct property name
                document.getElementById('viewRes_RetTime2').textContent = data.Transaction_ReturnedTime; // Use correct property name
                document.getElementById('viewRes_Approv2').textContent = data.approved_by_name; // Use correct property name
                

                // Clear existing rows
                const table = document.getElementById('pendingviewmaterial3');
                table.innerHTML = '<tr><th>Item</th><th>Qnty</th></tr>'; // Reset table
                // Add new rows for materials
                const materials = data.materials.split(', ');
                materials.forEach(material => {
                    const row = table.insertRow();
                    const itemCell = row.insertCell(0);
                    const quantityCell = row.insertCell(1);
                    const [quantity, ...itemNameParts] = material.split(' ');
                    const itemName = itemNameParts.join(' '); // Join remaining parts as item name
                    itemCell.textContent = itemName;
                    quantityCell.textContent = quantity;
                });

                // Show the reservation details modal
                document.getElementById('ViewApprovedReserv').style.display = 'flex';
            })
            .catch(error => console.error('Error fetching reservation details:', error));
    } else {
        console.log("No reservation selected.");
    }
});
//TIME CONVERT MILITARY TIME TO AMPM
function convertToAMPM(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 hours to 12
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}
//TIME CONVERT DATE TO READABLE
function convertToReadableDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    // Format to "Month Day, Year"
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

