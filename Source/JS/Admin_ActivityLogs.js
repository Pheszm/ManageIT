document.getElementById("toggle-btn").addEventListener("click", function() {
    const sidebar = document.getElementById("SideBarNav");
    sidebar.classList.toggle("open");
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





// LOAD ALL ITEMS IN THE TABLE
function RefreshTable() {
    const Typeee = document.getElementById("TypeComboBox").value; // Get the value from the search bar
    const Actionnn = document.getElementById("ActionComboBox").value; // Get the selected status

    // Build the query parameters
    const params = new URLSearchParams({
        Log_type: Typeee,
        Log_action: Actionnn
    });

    // Fetch the data from the server using the built query string
    fetch(`../PHP/Admin_ActivityLogs_FetchTable.php?${params.toString()}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('Fetched data:', data); // Debugging line to see the structure of the response
            const table = document.getElementById("AllItemsTable");

            // Clear existing rows, except for the header row (index 0)
            for (let i = table.rows.length - 1; i > 0; i--) {
                table.deleteRow(i);
            }

            // Populate table with fetched data
            data.forEach((item) => {
                console.log('Item:', item); // Debugging line to check individual item fields
                const row = table.insertRow();
                row.insertCell(0).textContent = item.DateAndTime || 'N/A'; // Add default value if undefined
                row.insertCell(1).textContent = item.FacultyName || 'N/A'; // Display the faculty's full name
                row.insertCell(2).textContent = item.Log_action || 'N/A'; // Add default value if undefined
                row.insertCell(3).textContent = item.Log_type || 'N/A'; // Add default value if undefined
                
                // Determine Name based on Log_type
                if (item.Log_type === 'Item') {
                    row.insertCell(4).textContent = item.Item_Name || 'N/A'; // Item_Name
                } else if (item.Log_type === 'Reservation') {
                    row.insertCell(4).textContent = item.Reservation_FullName || 'N/A'; // Reservation fullname
                } else {
                    row.insertCell(4).textContent = 'N/A'; // Default for other cases
                }

                // Optional: Add hidden input for future use (if needed)
                const hiddenInput = document.createElement("input");
                hiddenInput.type = "hidden";
                hiddenInput.value = item.Reference_id || ''; // Add default value if undefined
                hiddenInput.name = "itemId[]";
                row.appendChild(hiddenInput);
            });
        })
        .catch((error) => console.error("Error fetching items:", error));
}

// Event listeners for filtering and search
document.addEventListener("DOMContentLoaded", function () {
    const Typeeee = document.getElementById("TypeComboBox");
    const Actionnn = document.getElementById("ActionComboBox");

    Typeeee.addEventListener("change", function () {
        RefreshTable(); // Refresh table with updated filters
    });

    Actionnn.addEventListener("change", function () {
        RefreshTable(); // Refresh table with updated filters
    });

    // Initially load the table data
    RefreshTable();
});
