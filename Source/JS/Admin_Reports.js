document.getElementById("toggle-btn").addEventListener("click", function() {
    const sidebar = document.getElementById("SideBarNav");
    sidebar.classList.toggle("open");
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





// LOAD ALL ITEMS IN THE TABLE
function RefreshTable() {
    const FromTimePicked = document.getElementById("FromDate");
    const ToTimePicked = document.getElementById("ToDate");
    const FromTime = FromTimePicked.value || '';  // Empty string if no date selected
    const ToTime = ToTimePicked.value || '';  // Empty string if no date selected

    // Build the query parameters for the date filter
    const params = new URLSearchParams({
        FromTime: FromTime,
        ToTime: ToTime,
    });

    // Fetch the data from the server using the query string
    fetch(`../PHP/Admin_Reports_FetchTable.php?${params.toString()}`)
        .then((response) => response.json())
        .then((data) => {
            const table = document.getElementById("AllItemsTable");

            // Clear existing rows, except for the header row (index 0)
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            // Populate the table with fetched data
            data.forEach((item) => {
                const row = table.insertRow();

                // Insert data into the table cells
                row.insertCell(0).textContent = item.dateofuse; // Date
                row.insertCell(1).textContent = `${item.fromTime12hr} - ${item.toTime12hr}`; // Time
                row.insertCell(2).textContent = item.fullname; // Full Name
                row.insertCell(3).textContent = item.materials; // Items (materials formatted)
                row.insertCell(4).textContent = item.Transaction_status || "Pending"; // Status
                row.insertCell(5).textContent = item.approved_by || "Not Approved"; // Approved By (Faculty Name)
            });
        })
        .catch((error) => console.error("Error fetching items:", error));
}

// Event listeners for filtering by date range
document.addEventListener("DOMContentLoaded", RefreshTable);

const FromTimePicked = document.getElementById("FromDate");
const ToTimePicked = document.getElementById("ToDate");

FromTimePicked.addEventListener("change", function () {
    RefreshTable(); 
});

ToTimePicked.addEventListener("change", function () {
    RefreshTable(); 
});
RefreshTable(); 








// EXPORT FUNCTION
// Function to export the table data to CSV
document.getElementById('ExportButton').addEventListener('click', () => {
    const table = document.getElementById("AllItemsTable");
    let csvContent = "Date,Time,Full Name,Item,Status,Approved By\n"; // CSV header

    // Loop through each row in the table (excluding the header)
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        let rowData = [];
        
        // Loop through each cell in the row and push the cell data into the rowData array
        for (let j = 0; j < row.cells.length; j++) {
            let cellData = row.cells[j].textContent;
            
            // Escape double quotes in the cell data by doubling them, as per CSV format rules
            cellData = cellData.replace(/"/g, '""');

            // If there are commas in the cell data, wrap it in double quotes to prevent column split
            if (cellData.indexOf(',') > -1 || cellData.indexOf('"') > -1) {
                cellData = `"${cellData}"`;
            }

            rowData.push(cellData);
        }

        // Join the row data into a CSV-compatible format and add it to the CSV content
        csvContent += rowData.join(",") + "\n";
    }

    // Create a temporary link to trigger the download
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    link.target = "_blank";
    link.download = "Transaction_Reports.csv";  // Name of the CSV file

    // Trigger the link click to start the download
    link.click();
});



