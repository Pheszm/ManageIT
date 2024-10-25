document.getElementById("toggle-btn").addEventListener("click", function() {
    const sidebar = document.getElementById("SideBarNav");
    sidebar.classList.toggle("close");
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
