<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ManageIT | Reports</title>
    <link href="../CSS/Poppins_Sheet.css" rel="stylesheet">
    <link rel="icon" href="../../Assets/Images/ManageIT_Logo.png">
    <link rel="stylesheet" href="../CSS/Admin_Reports.css">
    <link rel="stylesheet" href="../CSS/SweetAlert.css">
</head>

<body>
    <div id="FullBody">
        <div id="TopNavBar">
            <button id="toggle-btn">☰</button>
            <img id="ManageIT_NavLogo" src="../../Assets/Images/ManageIT_Logo.png" alt="MANAGEIT LOGO">
            <img id="SRCB_BackgroundIMG" src="../../Assets/Images/SRCB_Logo.png" alt="SRCB LOGO">
            <span>
                <button id="LogoutBtn"><img src="../../Assets/Images/Logout_Icon.png">Logout</button>
            </span>

        </div>

        <div id="SideBarNav">
            <button id="HomeBtn"><img src="../../Assets/Images/Home_Icon.png">Home</button>
            <button id="ReservationBtn"><img src="../../Assets/Images/Reservations_Icon.png">Reservation</button>
            <button id="ItemsBtn"><img src="../../Assets/Images/Items_Icon.png">Items</button>
            <button id="ActBtn"><img src="../../Assets/Images/ActivityLog_Icon.png">Activity Logs</button>
            <button id="ReportsBtn"><img src="../../Assets/Images/Reports_Icon.png">Reports</button>
        </div>




        <div id="ItemListArea">
            <div class="specialSpan">
                <h1>Transaction Reports</h1>
                <div class="TimeAreaa">
                    <h3>From:</h3>
                    <input type="date" id="FromDate">
                    <h3>To:</h3>
                    <input type="date" id="ToDate">
                </div>
                <button id="ExportButton">Export</button>
            </div>

            <div id="TableCase6">
                <table id="AllItemsTable">
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Full Name</th>
                        <th>Item</th>
                        <th>Status</th>
                        <th>Approved By</th>
                    </tr>
                    <!-- Rows will be dynamically added here -->
                </table>
            </div>
        </div>
    </div>



    </div>

    <script src="../JS/SweetAlert.js"></script>
    <img id="SRCB_BackgroundIMG2" src="../../Assets/Images/SRCB_Logo.png">
    <script src="../JS/Admin_Reports.js"></script>
</body>

</html>