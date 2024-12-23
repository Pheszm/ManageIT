<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ManageIT | Activity Logs</title>
    <link href="../CSS/Poppins_Sheet.css" rel="stylesheet">
    <link rel="icon" href="../../Assets/Images/ManageIT_Logo.png">
    <link rel="stylesheet" href="../CSS/Admin_ActivityLogs.css">
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
            <span class="specialSpan">
                <h1>Activity Logs</h1>
                <select id="TypeComboBox">
                    <option value="">Type</option>
                    <option value="Item">Item</option>
                    <option value="Reservation">Reservation</option>
                    <option value="Transaction">Transaction</option>
                </select>
                <select id="ActionComboBox">
                    <option value="">Actions</option>
                    <option value="Created">Created</option>
                    <option value="Removed">Removed</option>
                    <option value="Created">Updated</option>
                    <option value="Approved">Approved</option>
                    <option value="Returned">Returned</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </span>

            <div id="TableCase6">
                <table id="AllItemsTable">
                    <tr>
                        <th>Date & Time</th>
                        <th>Faculty Name</th>
                        <th>Action</th>
                        <th>Type</th>
                        <th>Name</th>
                    </tr>
                    <!-- Rows will be dynamically added here -->
                </table>
            </div>
        </div>
    </div>


    <script src="../JS/SweetAlert.js"></script>
    <img id="SRCB_BackgroundIMG2" src="../../Assets/Images/SRCB_Logo.png">
    <script src="../JS/Admin_ActivityLogs.js"></script>
</body>

</html>