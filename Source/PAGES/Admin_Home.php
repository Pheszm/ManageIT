<?php
include '../PHP/Admin_Home_FetchChart.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ManageIT | Home</title>
    <link href="../../Source/CSS/Poppins_Sheet.css" rel="stylesheet">
    <link rel="icon" href="../../Assets/Images/ManageIT_Logo.png">
    <link rel="stylesheet" href="../CSS/Admin_Home.css">
    <link rel="stylesheet" href="../CSS/SweetAlert.css">
    <script src="../JS/BarChart_API.js"></script>
</head>

<body>
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



    <div id="BodyAREA">

        <div id="ViewApprovedReserv">
            <div id="ApprovedDetailsForm">
                <div id="exitbtn2">X</div>
                <h1>Reservation Details</h1>
                <span>
                    <h2>Full Name:</h2>
                    <p id="viewRes_fullName2">Carl Wyne S. Gallardo</p>
                </span>
                <span>
                    <h2>Course&Year:</h2>
                    <p id="viewRes_courseYear2">BSIT 2</p>
                </span>
                <span>
                    <h2>Subject:</h2>
                    <p id="viewRes_subject2">ITP 302</p>
                </span>
                <span>
                    <h2>Requested By:</h2>
                    <p id="viewRes_requestedBy2">Darl Maglangit</p>
                </span>
                <span>
                    <h2>Date of Use:</h2>
                    <p id="viewRes_dateOfUse2">2024-10-31</p>
                </span>
                <span>
                    <h2>Time:</h2>
                    <p id="viewRes_fromtime2">1:00PM</p>
                    <h2>To</h2>
                    <p id="viewRes_totime2">3:00PM</p>
                </span>
                <div id="schedDetailsBox2">
                    <table id="pendingviewmaterial3">
                        <tr>
                            <th>Item</th>
                            <th>Qnty</th>
                        </tr>
                    </table>
                </div>
                <div id="ColRowsss">
                    <div id="case2">
                        <h2>Message:</h2>
                        <div id="viewmessagecontainer4">
                            <p id="viewRes_message2">GG</p>
                        </div>
                    </div>
                    <div id="case3">
                        <span>
                            <h2>Status:</h2>
                            <p id="viewRes_Status2">ONGOING</p>
                        </span>
                        <span>
                            <h2>Returned Time:</h2>
                            <p id="viewRes_RetTime2">TIME</p>
                        </span>
                        <span>
                            <h2>Approved By:</h2>
                            <p id="viewRes_Approv2">STAFF NAME</p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="DarkBackground"></div>
        </div>

        <div id="ViewIssued">
            <div id="IssuedDetailsForm">
                <div id="exitbtn3">X</div>
                <h1>Issued Details</h1>
                <span>
                    <h2>Full Name:</h2>
                    <p id="viewOnging_fullName2">Carl Wyne S. Gallardo</p>
                </span>
                <span>
                    <h2>Course&Year:</h2>
                    <p id="viewOnging_courseYear2">BSIT 2</p>
                </span>
                <span>
                    <h2>Subject:</h2>
                    <p id="viewOnging_subject2">ITP 302</p>
                </span>
                <span>
                    <h2>Requested By:</h2>
                    <p id="viewOnging_requestedBy2">Darl Maglangit</p>
                </span>
                <span>
                    <h2>Date of Use:</h2>
                    <p id="viewOnging_dateOfUse2">2024-10-31</p>
                </span>
                <span>
                    <h2>Time:</h2>
                    <p id="viewOnging_fromtime2">1:00PM</p>
                    <h2>To</h2>
                    <p id="viewOnging_totime2">3:00PM</p>
                </span>
                <div id="schedDetailsBox2">
                    <table id="pendingviewmaterial4">
                        <tr>
                            <th>Item</th>
                            <th>Qnty</th>
                        </tr>
                    </table>
                </div>
                <div id="ColRowsss">
                    <div id="case2">
                        <h2>Message:</h2>
                        <div id="viewmessagecontainer5">
                            <p id="viewOnging_message2">GG</p>
                        </div>
                    </div>
                    <div id="case3">
                        <span>
                            <h2>Status:</h2>
                            <p id="viewOnging_Status2">ONGOING</p>
                        </span>
                        <span>
                            <h2>Returned Time:</h2>
                            <p id="viewOnging_RetTime2">ONGOING</p>
                        </span>
                        <span>
                            <h2>Approved By:</h2>
                            <p id="viewOnging_Approv2">STAFF NAME</p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="DarkBackground"></div>
        </div>


        <span>
            <div id="ScheduledArea">
                <h1>Scheduled</h1>
                <div id="TableCase">
                    <table id="ScheduledListTable">
                        <tr>
                            <th>Time & Date</th>
                            <th>Name</th>
                            <th>Item</th>
                        </tr>
                        <!-- Rows will be dynamically added here -->
                    </table>
                </div>
                <span>
                    <button id="SchedViewDetailsBtn">View Details</button>
                    <!-- <button id="SchedViewMoreBtn">View More ></button> -->
                </span>
            </div>



            <div id="IssuedItemsArea">
                <h1>Issued Items</h1>
                <div id="TableCase3">
                    <table id="IssuedItemTable">
                        <tr>
                            <th>
                                Deadline
                            </th>
                            <th>
                                Borrower
                            </th>
                            <th>
                                Item
                            </th>
                        </tr>
                    </table>
                </div>
                <span>
                    <button id="IssuedViewDetailsBtn">View Details</button>
                    <button id="ReturnItemBtn">Item Returned</button>
                </span>
            </div>
        </span>

        <span id="span2">
            <div id="VolumeArea">
                <h1>Volume Today</h1>
                <table id="VolumeAreaTable">
                    <tr>
                        <th>
                            Total Items
                        </th>
                        <th>
                            Items in Use
                        </th>
                        <th>
                            Available Items
                        </th>
                        <th>
                            Pending<br>Reservations
                        </th>
                    </tr>

                </table>
            </div>

            <div id="ChartArea">
                <h2 class="ChartHeader">Top Items Used this Month</h2>
                <h2 id="ChartTime">December 2024</h2>
                <div id="chart-container">
                    <canvas id="requestChart"></canvas>
                </div>
                <script>
                    // Pass the PHP variables into JavaScript
                    const itemNames = <?php echo json_encode($itemNames); ?>;
                    const borrowedCounts = <?php echo json_encode($borrowedCounts); ?>;
                    const currentMonth = "<?php echo $currentMonth; ?>";

                    // Update the ChartTime element with the current month
                    document.getElementById('ChartTime').innerText = currentMonth;

                    // Data for the chart
                    const data = {
                        labels: itemNames,
                        datasets: [{
                            label: 'Borrowed Count',
                            data: borrowedCounts,
                            backgroundColor: 'rgba(0, 101, 203, 0.6)',
                            borderColor: 'rgba(15, 80, 154, 1)',
                            borderWidth: 1
                        }]
                    };

                    // Chart configuration
                    const config = {
                        type: 'bar',
                        data: data,
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                tooltip: {
                                    enabled: true
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    };
                    // Create the chart with the fetched data
                    const requestChart = new Chart(
                        document.getElementById('requestChart'),
                        config
                    );
                </script>
            </div>
        </span>

    </div>


    <script src="../JS/SweetAlert.js"></script>
    <script src="../JS/Admin_Home.js"></script>
</body>

</html>