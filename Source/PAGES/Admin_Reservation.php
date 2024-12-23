<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ManageIT | Reservation List</title>
    <link href="../CSS/Poppins_Sheet.css" rel="stylesheet">
    <link rel="icon" href="../../Assets/Images/ManageIT_Logo.png">
    <link rel="stylesheet" href="../CSS/Admin_Reservation.css">
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

        <h1 class="ReservationHeader">Reservations</h1>

        <div id="PendingArea">
            <h1>Pending</h1>
            <div id="TableCase">
                <table id="PendingListTable">
                    <tr>
                        <th>Time & Date</th>
                        <th>Name</th>
                        <th>Item</th>
                    </tr>
                    <!-- Rows will be dynamically added here -->
                </table>
            </div>
            <span>
                <button id="PendingDetailsBtn">View Details</button>
                <button id="DeclineBtnn">Decline</button>
            </span>
        </div>


        <div id="ApprovedArea">
            <h1>Approved and Upcoming</h1>
            <div id="TableCase2">
                <table id="ApprovedListTable">
                    <tr>
                        <th>Time & Date</th>
                        <th>Name</th>
                        <th>Item</th>
                    </tr>
                    <!-- Rows will be dynamically added here -->
                </table>
            </div>
            <span>
                <button id="ApprovedDetailsBtn">View Details</button>
                <button id="ApprovedViewMoreBtn">View More ></button>
            </span>
        </div>
        <button id="ApproveBtn"><img src="../../Assets/Images/Approve_btn.png" alt="ApproveBtn"></button>


        <div id="ViewPendingReserv">
            <div id="PendingDetailsForm">
                <div id="exitbtn1">X</div>
                <h1>Pending Reservation Details</h1>
                <span>
                    <h2>Full Name:</h2>
                    <p id="viewRes_fullName">Carl Wyne Gallardo</p>
                </span>
                <span>
                    <h2>Dept:</h2>
                    <p id="viewRes_courseYear">BSIT 2</p>
                </span>
                <span>
                    <h2>Level:</h2>
                    <p id="viewRes_subject">ITP 302</p>
                </span>
                <span>
                    <h2>Requested By:</h2>
                    <p id="viewRes_requestedBy">Darl Maglangit</p>
                </span>
                <span>
                    <h2>Date of Use:</h2>
                    <p id="viewRes_dateOfUse">2024-10-31</p>
                </span>
                <span>
                    <h2>Time:</h2>
                    <p id="viewRes_fromtime">1:00PM</p>
                    <h2>To</h2>
                    <p id="viewRes_totime">3:00PM</p>
                </span>
                <div id="viewmessagecontainer">
                    <h2>Message:</h2>
                    <div id="viewmessagecontainer2">
                        <p id="viewRes_message">GG</p>
                    </div>
                </div>


                <div id="schedDetailsBox1">
                    <table id="pendingviewmaterial">
                        <tr>
                            <th>Item</th>
                            <th>Qnty</th>
                        </tr>
                    </table>
                </div>
                <div class="GotoRightbtnss">
                    <div>
                        <button id="DeclineeBtn2">Decline</button>
                        <button id="ApproveBtn2">Approve</button>
                    </div>
                </div>

            </div>
            <div class="DarkBackground"></div>
        </div>



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
                <button id="cancelreservbtn">Cancel</button>
            </div>
            <div class="DarkBackground"></div>
        </div>


        <div id="CancelingAreaaa">
            <div class="DarkBackground"></div>
            <div id="CancelMessageForm">
                <h3>Message for the Cancelation</h3>
                <textarea id="CancelMessageInput" placeholder="Type your message here..."></textarea>
                <span id="Buttonsss">
                    <button id="CancelMessageSubmit">Submit</button>
                    <button id="CancelMessage">Cancel</button>
                </span>
            </div>
        </div>
        <div id="DeclineAreaaa">
            <div class="DarkBackground"></div>
            <div id="DeclineMessageForm">
                <h3>Message for Declining</h3>
                <textarea id="DeclineMessageInput" placeholder="Type your message here..."></textarea>
                <span id="Buttonss">
                    <button id="DeclineMessageSubmit">Submit</button>
                    <button id="DeclineMessage">Cancel</button>
                </span>
            </div>
        </div>



        <div id="AllApprovedReservationList">
            <div id="AllApprovedArea">
                <div id="exitbtn6">X</div>
                <h1>All Reservation List</h1>
                <span>
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
                    <input id="SearchBarAllApproved" placeholder="Search Here..">
                </span>

                <div id="TableCase6">
                    <table id="AllApproveReservation">
                        <tr>
                            <th>Time & Date</th>
                            <th>Name</th>
                            <th>Item</th>
                        </tr>
                        <!-- Rows will be dynamically added here -->
                    </table>
                </div>
                <button id="ViewDetailsBtn">View Details</button>
            </div>
            <div class="DarkBackground"></div>
        </div>
        <img id="SRCB_BackgroundIMG2" src="../../Assets/Images/SRCB_Logo.png">
    </div>


    <script src="../JS/SweetAlert.js"></script>
    <script src="../JS/Admin_Reservation.js"></script>
</body>

</html>