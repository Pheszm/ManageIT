<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../CSS/Poppins_Sheet.css" rel="stylesheet">
    <link href="../CSS/ReservationForm.css" rel="stylesheet">
    <link href="../CSS/qr_ui_config.css" rel="stylesheet">
    <link rel="icon" href="../../Assets/Images/ManageIT_Logo.png">
    <link rel="stylesheet" href="../CSS/SweetAlert.css">

    <title>ManageIT | Reservation Form</title>
</head>

<body>
    <div id="background">
        <img id="backgroundImg" src="../../Assets/Images/SRCB_Logo.png">
        <div id="FormBox">
            <button id="ReturnBtn"><img id="arrowimg" src="../../Assets/Images/Arrow_Left_Icon.png"> Return</button>
            <h1>Reservations</h1>
            <table id="OuterTable">
                <tr>
                    <td id="outercol">
                        <input type="hidden" id="Student_No" value="">
                        <form id="reservationForm" method="POST">
                            <br>
                            <input type="text" id="fullname" name="fullname" placeholder="Full Name.." required>
                            <br>
                            <span>
                                <label for="dateofuse">DateofUse:&nbsp;&nbsp;</label>
                                <input type="date" id="dateofuse" name="dateofuse" required>
                            </span>
                            <span>
                                <label for="fromtime">From:&nbsp;&nbsp;</label>
                                <input type="time" id="fromtime" name="fromtime" min="07:00" max="17:00" required>
                                <label for="totime">&nbsp;&nbsp;&nbsp;&nbsp;To:&nbsp;&nbsp;</label>
                                <input type="time" id="totime" name="totime" min="07:00" max="17:00" required>
                            </span>
                            <input type="text" id="course_year" name="course_year" placeholder="Department.." required>
                            <br>
                            <input type="text" id="subject" name="subject" placeholder="Level.." required>
                            <br>
                            <input type="text" name="requested_by" placeholder="Requested By.." required>
                            <br>
                            <textarea id="Messageinput" name="Message" placeholder="Message.." required></textarea>
                            <br>
                            <input type="hidden" name="materialz" value="">
                            <input id="submitbtn" type="submit" value="Submit">
                        </form>
                    </td>

                    <td id="outercol">
                        <span id="MaterialsHeader">
                            <h2>Materials Needed</h2>
                            <button id="AddbtnShow">Add +</button>
                        </span>

                        <table id="ItemTable">
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Operation</th>
                            </tr>
                            <tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>

        <div id="WarningSign">
            <div id="ColoredAreaaa"></div>
            <img src="../../Assets/Images/WarningSign.png">
            <p id="WarningText">HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD</p>
            <button id="WarningResponseBtn">Okay</button>
        </div>

        <div id="AddingMaterialsForm">
            <div id="DarkBlur"></div>
            <div id="MaterialsForm">
                <button id="exitbtn">X</button>
                <h1>Choose an Item</h1>
                <span>
                    <span id="SearchbarAndQR">
                        <input type="text" id="SearchBoxForItem" placeholder="Search..">
                        <button id="scanqrbtn"><img id="qr_icon" src="../../Assets/Images/QR_Icon.png"></button>
                    </span>
                    <br>
                    <select id="ModelComboBox">
                        <option value="">Model</option>
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <select id="CategoryComboBox">
                        <option value="">Category</option>
                    </select>
                </span>
                <div id="DisplayItemsHere">

                </div>
            </div>
        </div>

        <div id="QRFormScanner">
            <div id="DarkBlur"></div>
            <div id="you-qr-result"></div>

            <div>
                <button id="QReeexitbtn">X</button>
                <div id="my-qr-reader" style="width:350px;"></div>
            </div>

        </div>
    </div>

    </div>
    <script src="../JS/SweetAlert.js"></script>
    <script src="../JS/ReservationForm.js"></script>
    <script src="../JS/QR_Scanner.js"></script>
</body>

</html>