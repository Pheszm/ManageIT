document.getElementById("toggle-btn").addEventListener("click", function() {
    const sidebar = document.getElementById("SideBarNav");
    sidebar.classList.toggle("close");
});


document.getElementById("exitbtn").addEventListener("click", function() {
    document.getElementById("ViewDetailsScheduled").style.display = "none";
});



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
        SelectedReservationId = targetRow.querySelector('input[type="hidden"]').value;
    }
});


document.getElementById('SchedViewDetailsBtn').addEventListener('click', function() {
    if (SelectedReservationId) {
        fetch(`../PHP/Admin_Home_ViewReservation.php?id=${SelectedReservationId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('viewRes_fullName').textContent = data.fullname;
                document.getElementById('viewRes_courseYear').textContent = data.course_year;
                document.getElementById('viewRes_subject').textContent = data.subject;
                document.getElementById('viewRes_materials').textContent = data.materials;
                document.getElementById('viewRes_requestedBy').textContent = data.requested_by;
                document.getElementById('viewRes_dateOfUse').textContent = data.dateofuse;
                document.getElementById('viewRes_time').textContent = `${data.fromtime} To ${data.totime}`;
                document.getElementById('viewRes_approvedBy').textContent = data.approved_by_name;
                document.getElementById('viewRes_message').textContent = data.message;
                
                // Show the reservation details modal
                document.getElementById('ViewDetailsScheduled').style.display = 'flex';
            })
            .catch(error => console.error('Error fetching reservation details:', error));
    } else {
        console.log("No reservation selected.");
    }
});
