
document.getElementById("exitbtn2").addEventListener("click", function() {
    document.getElementById("ViewApprovedReserv").style.display = "none";
    document.getElementById("CancelMessageBox").style.display = "none";
    document.getElementById("ViewCancelation").textContent = "View Message";
});
document.getElementById("exitbtn3").addEventListener("click", function() {
    document.getElementById("ViewIssued").style.display = "none";
    document.getElementById("CancelMessageBox").style.display = "none";
    document.getElementById("ViewCancelation").textContent = "View Message";
});

document.getElementById("ReserveNowHero_btn").addEventListener("click", function() {
    sessionStorage.setItem('ReturnToHome', "true");
    window.location.href = 'ReservationForm.php';
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




//LOGIN AUTH CHECKER
var StoredStudentID;
document.addEventListener('DOMContentLoaded', function() {
    Studentid = sessionStorage.getItem('StudentID'); // Check sessionStorage

    // If facultyId is not found, redirect to the login page
    if (!Studentid) {
      window.location.href = '../../index.php'; // Redirect to the login page if not authenticated
    }
    // If facultyId is found, proceed with page initialization
    else {
        StoredStudentID = Studentid;
        console.log('Student ID:', StoredStudentID); 
        StudentNameFetch(Studentid);
    }
});

var StoredStudentNO;

function StudentNameFetch(ID) {
    const StudentID = ID;

    // Ensure StudentID is available
    if (!StudentID) {
        console.error('Student_ID is missing in the URL');
        return;
    }

    // Send the Student_ID via a POST request
    fetch('../PHP/Student_Home_GetFullName.php', {
        method: 'POST', // Use POST method
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Required for sending form data
        },
        body: `Student_ID=${encodeURIComponent(StudentID)}` // Send Student_ID in the request body
    })
    .then(response => response.json())
    .then(data => {
        StoredStudentNO = data.Student_No;  
        FetchFilteredTable();
        FetchUpcomingTable(StoredStudentNO);
        if (data.Name) {
            document.getElementById('HlloArea').innerHTML = `Hello, ${data.Name}`;
        } else if (data.error) {
            document.getElementById('HlloArea').innerHTML = `Error: ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Error fetching student data:', error);
    });
}


function FetchUpcomingTable(StoredStudentNO) {
    const Student_No = StoredStudentNO; 
    const Statuss = StatusComboBox;
    fetch(`../PHP/Student_Home_FetchUpcomingTable.php?Student_No=${Student_No}`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('UpcomingTbl');

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
                cellName.textContent = item.Transaction_status;
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
};


var SelectedReservationId;
document.getElementById('UpcomingTbl').addEventListener('click', function(e) {
    const SchedViewDetailsBtn = document.getElementById('ComingViewDetailsBtn');
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


// Event listeners for changes to filtering/select inputs
document.getElementById("StatusComboBox").addEventListener("change", function () {
    const SchedViewDetailsBtn = document.getElementById('PendingViewDetailsBtn');
    SchedViewDetailsBtn.style.opacity = 0.5;
    SelectedFilteredID = '';
    FetchFilteredTable();
});


function FetchFilteredTable() {
    var Student_No = StoredStudentNO;
    const Statuss = document.getElementById("StatusComboBox").value;
    fetch(`../PHP/Student_Home_FetchWithFilterTable.php?Student_No=${Student_No}&Statuss=${Statuss}`)
    .then(response => response.json())
        .then(data => {
            const table = document.getElementById('AllRecentTransactions');

            // Clear any existing rows except for the header
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            // Populate table with fetched data
            data.forEach(item => {
                const row = table.insertRow();
                const CellDate = row.insertCell(0);
                const CellTime = row.insertCell(1);
                const CellItem = row.insertCell(2);
                const CellStatus = row.insertCell(3);

                CellDate.textContent = item.dateofuse;
                CellTime.textContent = item.scheduled_time;
                CellItem.textContent = item.materials;
                CellStatus.textContent = item.Transaction_status;

                // Create a hidden input for the reservation ID
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.value = item.reservation_id; // Set the value to reservation ID
                hiddenInput.name = 'reservationId[]'; // Optional: name for form submission
                row.appendChild(hiddenInput); // Append to the row
            });
        })
        .catch(error => console.error('Error fetching schedule:', error));
};


var SelectedFilteredID;
document.getElementById('AllRecentTransactions').addEventListener('click', function(e) {
    const SchedViewDetailsBtn = document.getElementById('PendingViewDetailsBtn');
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
        var SelectAllRecentTransactions = targetRow.querySelector('input[type="hidden"]').value;
        if(SelectAllRecentTransactions != SelectedFilteredID){
            SelectedFilteredID = SelectAllRecentTransactions;
        }else{
            targetRow.style.backgroundColor = ""; // Corrected syntax
            SchedViewDetailsBtn.style.opacity = 0.5;
            SelectedFilteredID = '';
        }
    }
});




/// APPROVED VIEW DETAILS
document.getElementById('ComingViewDetailsBtn').addEventListener('click', function() {
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
                if(data.Transaction_Comment != null){
                    document.getElementById('Error_message').textContent = data.Transaction_Comment; 
                    document.getElementById('ViewCancelation').style.display = 'block'; 
                }else{
                    document.getElementById('ViewCancelation').style.display = 'none'; 
                }

                

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

/// FILTERED VIEW DETAILS
document.getElementById('PendingViewDetailsBtn').addEventListener('click', function() {
    if (SelectedFilteredID) {
        fetch(`../PHP/Admin_Home_ViewReservation.php?id=${SelectedFilteredID}`)
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
                if(data.Transaction_Comment != null){
                    document.getElementById('Error_message').textContent = data.Transaction_Comment; 
                    document.getElementById('ViewCancelation').style.display = 'block'; 
                }else{
                    document.getElementById('ViewCancelation').style.display = 'none'; 
                }


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








document.getElementById("ViewCancelation").addEventListener("click", function() {

    if(document.getElementById("ViewCancelation").textContent == 'View Message'){
        document.getElementById("CancelMessageBox").style.display = "block";
        document.getElementById("ViewCancelation").textContent = "Close Message";
    }else{
        document.getElementById("CancelMessageBox").style.display = "none";
        document.getElementById("ViewCancelation").textContent = "View Message";
    }

});