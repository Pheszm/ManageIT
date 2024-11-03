document.getElementById("toggle-btn").addEventListener("click", function() {
    const sidebar = document.getElementById("SideBarNav");
    sidebar.classList.toggle("open");
});







// NAVIGATION FUNCTIONS

// Get the current URL
const url = new URL(window.location.href);

// Get the facultyId from the URL
const facultyId = url.searchParams.get('facultyId');

document.getElementById('HomeBtn').addEventListener('click', () => {
    if (facultyId) {
        window.location.href = `Admin_Home.html?facultyId=${facultyId}`;
    } else {
        window.location.href = '../../index.html';
    }
});

document.getElementById('ReservationBtn').addEventListener('click', () => {
    if (facultyId) {
        window.location.href = `Admin_Reservation.html?facultyId=${facultyId}`;
    } else {
        window.location.href = '../../index.html';
    }
});

document.getElementById('ItemsBtn').addEventListener('click', () => {
    if (facultyId) {
        window.location.href = `Admin_Items.html?facultyId=${facultyId}`;
    } else {
        window.location.href = '../../index.html';
    }
});

document.getElementById('ActBtn').addEventListener('click', () => {
    if (facultyId) {
        window.location.href = `Admin_ActivityLogs.html?facultyId=${facultyId}`;
    } else {
        window.location.href = '../../index.html';
    }
});

document.getElementById('ReportsBtn').addEventListener('click', () => {
    if (facultyId) {
        window.location.href = `Admin_Reports.html?facultyId=${facultyId}`;
    } else {
        window.location.href = '../../index.html';
    }
});







// LOAD PENDING RESERVATIONS IN THE TABLE
document.addEventListener('DOMContentLoaded', function() {
    fetch('../PHP/Admin_Reservation_PendingListFetch.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('PendingListTable');

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

//CLICKABLE ROW FUNCTION PENDING RESERVATIONS
var SelectedPendingId;
document.getElementById('PendingListTable').addEventListener('click', function(e) {
    const SchedViewDetailsBtn = document.getElementById('PendingDetailsBtn');
    const ApproveBtnnnn = document.getElementById('ApproveBtn');
    const targetRow = e.target.closest('tr');
    if (targetRow && targetRow.rowIndex > 0) { // Check if it's not the header row
        // Clear any inline styles from previous selections
        Array.from(this.rows).forEach(row => {
            row.style.border = "";
            row.style.backgroundColor = ""; // Reset background color
        });
        targetRow.style.backgroundColor = "#9BB9E5FF"; // Corrected syntax
        SchedViewDetailsBtn.style.opacity = 1;
        ApproveBtnnnn.style.opacity = 1;
        // Retrieve the hidden input value (reservation ID)
        var SelectPendingId = targetRow.querySelector('input[type="hidden"]').value;
        if(SelectPendingId != SelectedPendingId){
            SelectedPendingId = SelectPendingId;
        }else{
            targetRow.style.backgroundColor = "transparent"; // Corrected syntax
            SchedViewDetailsBtn.style.opacity = 0.5;
            ApproveBtnnnn.style.opacity = 0.7;
            SelectedPendingId = '';
        }
    }
});

// APPROVE BUTTON CLICK EVENT
document.getElementById('ApproveBtn').addEventListener('click', () => {
    if (SelectedPendingId) {
        // Ask for confirmation
        const isConfirmed = confirm("Are you sure you want to approve this reservation?");
        
        if (isConfirmed) {
            // Prepare the data to send
            const data = { id: SelectedPendingId, approved_by: facultyId };

            fetch('../PHP/Admin_Reservation_ApproveReservation.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    alert("Reservation approved successfully!");
                    location.reload();
                } else {
                    throw new Error('Failed to approve reservation.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("There was an error approving the reservation.");
            });
        } else {
        }
    } else {        
        alert("Please select a pending reservation to approve.");
    }
});












// LOAD APPROVED RESERVATIONS IN THE TABLE
document.addEventListener('DOMContentLoaded', function() {
    fetch('../PHP/Admin_Reservation_ApprovedListFetch.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('ApprovedListTable');

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