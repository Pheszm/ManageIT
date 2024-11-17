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

