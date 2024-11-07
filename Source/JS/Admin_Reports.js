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
