document.getElementById("toggle-btn").addEventListener("click", function() {
    const sidebar = document.getElementById("SideBarNav");
    sidebar.classList.toggle("open");
});



document.getElementById("exitbtn1").addEventListener("click", function() {
    document.getElementById("ViewPendingReserv").style.display = "none";
});

document.getElementById("exitbtn2").addEventListener("click", function() {
    document.getElementById("ViewApprovedReserv").style.display = "none";
});

document.getElementById("exitbtn6").addEventListener("click", function() {
    document.getElementById("AllApprovedReservationList").style.display = "none";
});

document.getElementById("ApprovedViewMoreBtn").addEventListener("click", function() {
    document.getElementById("AllApprovedReservationList").style.display = "flex";
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

                // Format the scheduled time
                cellTime.textContent = item.scheduled_time;
                // Set the full name for the reservation
                cellName.textContent = item.fullname;

                // Format the materials in the desired format "1 Wood Design, 1 Mouse"
                const materials = item.materials.split(', ').map(material => {
                    const [quantity, ...itemNameParts] = material.split(' ');
                    const itemName = itemNameParts.join(' '); // Join item name parts
                    return `${quantity} ${itemName}`;
                }).join(', '); // Join all materials with commas

                // Display formatted materials in the table
                cellItem.textContent = materials;

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
            targetRow.style.backgroundColor = ""; // Corrected syntax
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
                    AcitivityLogInsertion("Reservation", "Approved", SelectedPendingId);
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
// APPROVE BUTTON CLICK EVENT
document.getElementById('ApproveBtn2').addEventListener('click', () => {
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
                    AcitivityLogInsertion("Reservation", "Approved", SelectedPendingId);
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

                // Format the scheduled time
                cellTime.textContent = item.scheduled_time;
                // Set the full name for the reservation
                cellName.textContent = item.fullname;

                // Format the materials in the desired format "1 Wood Design, 1 Mouse"
                const materials = item.materials.split(', ').map(material => {
                    const [quantity, ...itemNameParts] = material.split(' ');
                    const itemName = itemNameParts.join(' '); // Join item name parts
                    return `${quantity} ${itemName}`;
                }).join(', '); // Join all materials with commas

                // Display formatted materials in the table
                cellItem.textContent = materials;

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









//CLICKABLE ROW FUNCTION APPROVED RESERVATIONS
var SelectedApprovedId;
document.getElementById('ApprovedListTable').addEventListener('click', function(e) {
    const SchedViewDetailsBtn = document.getElementById('ApprovedDetailsBtn');
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
        var SelectApprovedId = targetRow.querySelector('input[type="hidden"]').value;
        if(SelectApprovedId != SelectedApprovedId){
            SelectedApprovedId = SelectApprovedId;
        }else{
            targetRow.style.backgroundColor = ""; // Corrected syntax
            SchedViewDetailsBtn.style.opacity = 0.5;
            SelectedApprovedId = '';
        }
    }
});







/// PENDING VIEW DETAILS
document.getElementById('PendingDetailsBtn').addEventListener('click', function() {
    if (SelectedPendingId) {
        fetch(`../PHP/Admin_Reservation_ViewPending.php?id=${SelectedPendingId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('viewRes_fullName').textContent = data.fullname;
            document.getElementById('viewRes_courseYear').textContent = data.course_year;
            document.getElementById('viewRes_subject').textContent = data.subject;
            document.getElementById('viewRes_requestedBy').textContent = data.requested_by;
            document.getElementById('viewRes_dateOfUse').textContent = convertToReadableDate(data.dateofuse);
            document.getElementById('viewRes_fromtime').textContent = convertToAMPM(data.fromtime);
            document.getElementById('viewRes_totime').textContent = convertToAMPM(data.totime);
            document.getElementById('viewRes_message').textContent = data.message;
    
            // Clear existing rows
            const table = document.getElementById('pendingviewmaterial');
            table.innerHTML = '<tr><th>Item</th><th>Qnty</th></tr>'; // Reset table
    
            // Add new rows for materials
            const materials = data.materials.split(', ');
    
            materials.forEach(material => {
                const row = table.insertRow();
                const itemCell = row.insertCell(0);
                const quantityCell = row.insertCell(1);

                // For each material string like "1 Wood Design"
                const matches = material.match(/(\d+) (.+)/);
                if (matches) {
                    const quantity = matches[1];  // Quantity
                    const itemName = matches[2];  // Item Name
                    
                    itemCell.textContent = itemName;  // Display the item name
                    quantityCell.textContent = quantity;  // Display the quantity
                }
            });
    
            // Show the reservation details modal
            document.getElementById('ViewPendingReserv').style.display = 'flex';
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











/// APPROVED VIEW DETAILS
document.getElementById('ApprovedDetailsBtn').addEventListener('click', function() {
    if (SelectedApprovedId) {
        fetch(`../PHP/Admin_Reservation_ViewApproved.php?id=${SelectedApprovedId}`)
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
                const cancelbtn = document.getElementById('cancelreservbtn');
                cancelbtn.style.display = 'block';
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





// CANCEL RESERVATION BUTTON FUNCTION
document.getElementById('cancelreservbtn').addEventListener('click', () => {
    if (SelectedApprovedId) {
        console.log(SelectedApprovedId);
        // Ask for confirmation
        const isConfirmed = confirm("Are you sure you want to cancel this reservation?");
        
        if (isConfirmed) {
            // Prepare the data to send
            const data = { reservation_id: SelectedApprovedId };

            fetch('../PHP/Admin_Reservation_CancelApprovedReservation.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert("Reservation canceled successfully!");
                    AcitivityLogInsertion("Reservation", "Canceled", SelectedApprovedId);
                    location.reload(); // Reload the page or update the UI accordingly
                } else {
                    throw new Error(result.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("There was an error canceling the reservation.");
            });
        }
    } else {        
        alert("Please select a reservation to cancel.");
    }
});





// LOAD ALL APPROVED RESERVATIONS IN THE TABLE
function RefreshTable() {
    const searchTerm = searchBar.value; // Get the value from the search bar
    const statusFilter = statusComboBox.value; // Get the selected status
    
    // Build the query parameters
    const params = new URLSearchParams({
        search: searchTerm,
        status: statusFilter
    });

    fetch(`../PHP/Admin_Reservation_ListOfApproved.php?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('AllApproveReservation');

            // Clear existing rows
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            // Populate table with fetched data
            data.forEach(item => {
                const row = table.insertRow();
                row.insertCell(0).textContent = item.scheduled_time;
                row.insertCell(1).textContent = item.fullname;
                row.insertCell(2).textContent = item.materials;

                // Hidden input for reservation ID
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.value = item.reservation_id;
                hiddenInput.name = 'reservationId[]';
                row.appendChild(hiddenInput);
            });
        })
        .catch(error => console.error('Error fetching schedule:', error));
}

document.addEventListener('DOMContentLoaded', RefreshTable);
const statusComboBox = document.getElementById('StatusComboBox');
const searchBar = document.getElementById('SearchBarAllApproved');

// Log the selected status when the dropdown value changes
statusComboBox.addEventListener('change', function() {
    RefreshTable();
    SelectedApprovedId2 = '';
    const SchedViewDetailsBtn = document.getElementById('ViewDetailsBtn');
    SchedViewDetailsBtn.style.opacity = 0.5;
});

// Log the search input value when it changes
searchBar.addEventListener('input', function() {
    RefreshTable();
    SelectedApprovedId2 = '';
    const SchedViewDetailsBtn = document.getElementById('ViewDetailsBtn');
    SchedViewDetailsBtn.style.opacity = 0.5;
});








//CLICKABLE ROW FUNCTION APPROVED RESERVATIONS
var SelectedApprovedId2;
document.getElementById('AllApproveReservation').addEventListener('click', function(e) {
    const SchedViewDetailsBtn = document.getElementById('ViewDetailsBtn');
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
        var SelectApprovedId = targetRow.querySelector('input[type="hidden"]').value;
        if(SelectApprovedId != SelectedApprovedId2){
            SelectedApprovedId2 = SelectApprovedId;
        }else{
            targetRow.style.backgroundColor = "transparent"; // Corrected syntax
            SchedViewDetailsBtn.style.opacity = 0.5;
            SelectedApprovedId2 = '';
        }
    }
});


// ALL LIST APPROVED VIEW DETAILS
document.getElementById('ViewDetailsBtn').addEventListener('click', function() {
    if (SelectedApprovedId2) {
        fetch(`../PHP/Admin_Reservation_ViewApproved.php?id=${SelectedApprovedId2}`)
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
                document.getElementById('viewRes_Status2').textContent = data.Transaction_status;
                document.getElementById('viewRes_RetTime2').textContent = data.Transaction_ReturnedTime;
                document.getElementById('viewRes_Approv2').textContent = data.approved_by_name;

                // Clear existing rows
                const table = document.getElementById('pendingviewmaterial3');
                const cancelbtn = document.getElementById('cancelreservbtn');
                cancelbtn.style.display = 'none';
                table.innerHTML = '<tr><th>Item</th><th>Qnty</th></tr>'; // Reset table

                // Add new rows for materials
                const materials = data.materials.split(', ');
                materials.forEach(material => {
                    const row = table.insertRow();
                    const itemCell = row.insertCell(0);
                    const quantityCell = row.insertCell(1);
                    
                    // Split material into quantity and item name
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








//ACTIVITY LOG INSERT FUNCTIONS
function AcitivityLogInsertion(Type, Action, ReferenceId) {
    // Prepare data to send
    const logData = {
        faculty_id: facultyId,  // Faculty ID
        log_type: Type,         // Log type (e.g., "Item")
        log_action: Action,     // Action (e.g., "Create")
        reference_id: ReferenceId, // Reference ID (e.g., Item ID)
        timestamp: new Date().toISOString()  // Add a timestamp for the activity
    };
    // Send data to the PHP script
    fetch('../PHP/ActivityLogInsertion.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData)  // Send the log data as JSON
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log('Activity log saved successfully.');
        } else {
            console.error('Failed to save activity log:', result.error);
        }
    })
    .catch(error => {
        console.error('Error logging activity:', error);
    });
}




