document.getElementById("toggle-btn").addEventListener("click", function() {
    const sidebar = document.getElementById("SideBarNav");
    sidebar.classList.toggle("close");
});


document.getElementById("exitbtn2").addEventListener("click", function() {
    document.getElementById("ViewApprovedReserv").style.display = "none";
});
document.getElementById("exitbtn3").addEventListener("click", function() {
    document.getElementById("ViewIssued").style.display = "none";
});


document.getElementById("PendingTodayss").addEventListener("click", function() {
    window.location.href = '../PAGES/Admin_Reservation.php'; 
});
document.getElementById("VolumeTodayss").addEventListener("click", function() {
    window.location.href = '../PAGES/Admin_Items.php'; 
});


//LOGIN AUTH CHECKER
var facultyId;
document.addEventListener('DOMContentLoaded', function() {
    facultyId = sessionStorage.getItem('facultyId'); // Check sessionStorage for facultyId

    // If facultyId is not found, redirect to the login page
    if (!facultyId) {
        window.location.href = '../../index.php'; // Redirect to the login page if not authenticated
    }

    // If facultyId is found, proceed with page initialization
    else {
        console.log('Faculty ID:', facultyId); 
    }
});

// NAVIGATION FUNCTIONS
document.getElementById('HomeBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Home.php';
});

document.getElementById('ReservationBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Reservation.php';
});

document.getElementById('ItemsBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Items.php';
});

document.getElementById('ActBtn').addEventListener('click', () => {
    window.location.href = 'Admin_ActivityLogs.php';
});

document.getElementById('ReportsBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Reports.php';
});

document.getElementById('LogoutBtn').addEventListener('click', () => {
    Swal.fire({
        title: "Proceed Logout?",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Successfully Logged Out.",
                text: "Press okay to continue",
                icon: "success",
                confirmButtonColor: '#076AD4FF'
                }).then((result) => {
                if (result.isConfirmed) {
                    location.href='../../index.php';
                }else{
                    location.href='../../index.php';
                }
            });
        }
    });
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




//LOGIN AUTH CHECKER
var facultyId;
document.addEventListener('DOMContentLoaded', function() {
    facultyId = sessionStorage.getItem('facultyId'); // Check sessionStorage for facultyId

    // If facultyId is not found, redirect to the login page
    if (!facultyId) {
        window.location.href = '../../index.php'; // Redirect to the login page if not authenticated
    }
    // If facultyId is found, proceed with page initialization
    else {
        console.log('Faculty ID:', facultyId); 
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
            targetRow.style.backgroundColor = ""; // Corrected syntax
            SchedViewDetailsBtn.style.opacity = 0.5;
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









// LOAD Issued Items Table
document.addEventListener('DOMContentLoaded', function() {
    fetch('../PHP/Admin_Home_IssuedItemsListFetch.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('IssuedItemTable');

            //Clear any existing rows except for the header
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            // Populate table with fetched data
            data.forEach(item => {
                const row = table.insertRow();
                const cellTime = row.insertCell(0);
                const cellName = row.insertCell(1);
                const cellItem = row.insertCell(2);

                const CurrentDate =  new Date().toISOString().split('T')[0];
                const CurrentTime = new Date().toTimeString().split(' ')[0];
                cellTime.textContent = item.scheduled_time;
                if(item.dateofuse < CurrentDate){
                    cellTime.textContent = "⚠️" + item.scheduled_time;
                }
                else if(item.totime < CurrentTime){
                    cellTime.textContent = "⚠️" +item.scheduled_time;
                }
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



var SelectedIssuedId;
document.getElementById('IssuedItemTable').addEventListener('click', function(e) {
    const SchedViewDetailsBtn = document.getElementById('IssuedViewDetailsBtn');
    const ReturnBtn = document.getElementById('ReturnItemBtn'); 
    const targetRow = e.target.closest('tr');
    if (targetRow && targetRow.rowIndex > 0) { // Check if it's not the header row
        // Clear any inline styles from previous selections
        Array.from(this.rows).forEach(row => {
            row.style.border = "";
            row.style.backgroundColor = ""; // Reset background color
        });
        targetRow.style.backgroundColor = "#9BB9E5FF"; // Corrected syntax
        SchedViewDetailsBtn.style.opacity = 1;
        ReturnBtn.style.opacity = 1;
        // Retrieve the hidden input value (reservation ID)
        var SelectIssuedId = targetRow.querySelector('input[type="hidden"]').value;
        if(SelectIssuedId != SelectedIssuedId){
            SelectedIssuedId = SelectIssuedId;
        }else{
            targetRow.style.backgroundColor = ""; // Corrected syntax
            SchedViewDetailsBtn.style.opacity = 0.5;
            ReturnBtn.style.opacity = 0.5;
            SelectedIssuedId = '';
        }
    }
});


/// APPROVED VIEW DETAILS
document.getElementById('IssuedViewDetailsBtn').addEventListener('click', function() {
    if (SelectedIssuedId) {
        fetch(`../PHP/Admin_Home_ViewReservation.php?id=${SelectedIssuedId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('viewOnging_fullName2').textContent = data.fullname;
                document.getElementById('viewOnging_courseYear2').textContent = data.course_year;
                document.getElementById('viewOnging_subject2').textContent = data.subject;
                document.getElementById('viewOnging_requestedBy2').textContent = data.requested_by;
                document.getElementById('viewOnging_dateOfUse2').textContent = convertToReadableDate(data.dateofuse);
                document.getElementById('viewOnging_fromtime2').textContent = convertToAMPM(data.fromtime);
                document.getElementById('viewOnging_totime2').textContent = convertToAMPM(data.totime);
                document.getElementById('viewOnging_message2').textContent = data.message;
                document.getElementById('viewOnging_Status2').textContent = data.Transaction_status; // Use correct property name
                document.getElementById('viewOnging_RetTime2').textContent = data.Transaction_ReturnedTime; // Use correct property name
                document.getElementById('viewOnging_Approv2').textContent = data.approved_by_name; // Use correct property name
                

                // Clear existing rows
                const table = document.getElementById('pendingviewmaterial4');
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
                document.getElementById('ViewIssued').style.display = 'flex';
            })
            .catch(error => console.error('Error fetching reservation details:', error));
    } else {
        console.log("No reservation selected.");
    }
});



function OngoingReservationChecker() {
    fetch('../PHP/Admin_Home_OngoingReservationChecker.php', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Send an empty body if no data is needed, or you can pass data here
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
OngoingReservationChecker();


function PendingOvertimeChecker() {
    fetch('../PHP/Admin_Home_CheckPendingReservationsLeft.php', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Send an empty body if no data is needed, or you can pass data here
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
PendingOvertimeChecker();

// RETURN ITEM BUTTON FUNCTION
document.getElementById('ReturnItemBtn').addEventListener('click', () => {
    if (SelectedIssuedId) {
        console.log(SelectedIssuedId);
        // Ask for confirmation

        Swal.fire({
            title: "Confirmation",
            text: "Are the Items already returned?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                const CurrentTime = new Date().toTimeString().split(' ')[0];
                const data = { 
                    reservation_id: SelectedIssuedId,
                    Current_time: CurrentTime
                };
    
                fetch('../PHP/Admin_Home_ReturnProcess.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        AcitivityLogInsertion("Transaction", "Returned", SelectedIssuedId);
                        Swal.fire({
                            title: "Return successful!",
                            text: "Press okay to continue",
                            icon: "success",
                            confirmButtonColor: '#076AD4FF'
                            }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload(true);
                            }else{
                                location.reload(true);
                            }
                        });
                    } else {
                        throw new Error(result.message);
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: "Oops...",
                        text: 'Error:' + error,
                        icon: "warning",
                        confirmButtonColor: '#076AD4FF'
                    });
                });
            }
        });
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







// LOAD VOLUME DATAS
function LoadVolumeTable() {
    fetch('../PHP/Admin_Home_FetchVolumeTable.php')
        .then(response => response.json())
        .then(data => {
            const TotalItems = document.getElementById('VolumeTodayss');
            const PendingTodayy = document.getElementById('PendingTodayss');


            TotalItems.textContent = data.TotalItemCount || 0;
            PendingTodayy.textContent = data.TotalPendingReservation || 0;
        })
        .catch(error => console.error('Error fetching volume data:', error));
};

LoadVolumeTable();

