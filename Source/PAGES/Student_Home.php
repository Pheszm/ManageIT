<?php
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ManageIT | Student Home</title>
    <link href="../../Source/CSS/Poppins_Sheet.css" rel="stylesheet">
    <link rel="icon" href="../../Assets/Images/ManageIT_Logo.png">
    <link rel="stylesheet" href="../CSS/Student_Home.css">
    <link rel="stylesheet" href="../CSS/SweetAlert.css">
    <script src="../JS/BarChart_API.js"></script>
    <link rel="stylesheet" href="../CSS/all.min.css">
    <link rel="stylesheet" href="../CSS/fontawesome.min.css">
</head>

<body>
    <div id="TopNavBar">
        <img id="ManageIT_NavLogo" src="../../Assets/Images/ManageIT_Logo.png" alt="MANAGEIT LOGO">
        <img id="SRCB_BackgroundIMG" src="../../Assets/Images/SRCB_Logo.png" alt="SRCB LOGO">
        <h1 id="HlloArea">HELLO,</h1>
        <span>
            <button id="NotificationBell"><i class="fa-solid fa-bell"></i></button>
            <button id="LogoutBtn"><img src="../../Assets/Images/Logout_Icon.png">Logout</button>
        </span>
    </div>
    <div id="Notifsss">
        <h2>Notifications</h2>
        <button id="notifExitbtn">X</button>
        <div id="NotifBar">
asdasd
        </div>
    </div>



    <div id="BodyAREA">
        <button id="ReserveNowHero_btn">Reserve Now</button>

        <div id="ViewApprovedReserv">
            <div id="ApprovedDetailsForm">
                <div id="exitbtn2">X</div>
                <h1>Reservation Details</h1>
                <span>
                    <h2>Full Name:</h2>
                    <p id="viewRes_fullName2">Carl Wyne S. Gallardo</p>
                </span>
                <span>
                    <h2>Dept:</h2>
                    <p id="viewRes_courseYear2">BSIT 2</p>
                </span>
                <span>
                    <h2>Level:</h2>
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
                            <p id="viewRes_Status2">CANCELED</p>
                            <button id="ViewCancelation">View Message</button>
                        </span>
                        <div id="CancelMessageBox">
                            <h3>Cancelation Message:</h3>
                            <div id="viewmessagecontainer5">
                                <p id="Error_message">Test for this Test for this Test Test for this Test for this Test Test for this Test for this Test Test for this Test for this Test Test for this Test for this Test Test for this Test for this Test for this Test for this Test for this Test for this Test for this Test for this Test for this Test for this</p>
                            </div>
                        </div>
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
                    <h2>Dept:</h2>
                    <p id="viewOnging_courseYear2">BSIT 2</p>
                </span>
                <span>
                    <h2>Year:</h2>
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


            <div id="AllFilteredTable">
                <span>
                    <h1>My Transactions</h1>
                    <select id="StatusComboBox">
                        <option value="">Status</option>
                        <option value="UPCOMING">UPCOMING</option>
                        <option value="ONGOING">ONGOING</option>
                        <option value="CANCELED">CANCELED</option>
                        <option value="RETURNED ONTIME">RETURNED ONTIME</option>
                        <option value="RETURNED LATE">RETURNED LATE</option>
                        <option value="MISSING">MISSING</option>
                        <option value="DECLINED">DECLINED</option>

                    </select>

                </span>

                <div id="TableCase">
                    <table id="AllRecentTransactions">
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Item</th>
                            <th>Status</th>
                        </tr>
                        <!-- Rows will be dynamically added here -->
                    </table>
                </div>
                <span>
                    <button id="PendingViewDetailsBtn">View Details</button>
                    <!-- <button id="SchedViewMoreBtn">View More ></button> -->
                </span>
            </div>



            <div id="UpcomingAreaaa">
                <h1>Upcoming Reservation</h1>
                <div id="TableCase">
                    <table id="UpcomingTbl">
                        <tr>
                            <th>Time & Date</th>
                            <th>Status</th>
                            <th>Item</th>
                        </tr>
                        <!-- Rows will be dynamically added here -->
                    </table>
                </div>
                <span>
                    <button id="ComingViewDetailsBtn">View Details</button>
                    <!-- <button id="SchedViewMoreBtn">View More ></button> -->
                </span>
            </div>



    </div>


    <script src="../JS/SweetAlert.js"></script>
    <script src="../JS/Student_Home.js"></script>
</body>

</html>