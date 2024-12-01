<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ManageIT | Manage Student</title>
    <link href="../CSS/Poppins_Sheet.css" rel="stylesheet">
    <link rel="icon" href="../../Assets/Images/ManageIT_Logo.png">
    <link rel="stylesheet" href="../CSS/SuperAdmin_student.css">
    <link rel="stylesheet" href="../CSS/SweetAlert.css">
</head>

<body>
    <div id="FullBody">
        <div id="TopNavBar">
            <img id="ManageIT_NavLogo" src="../../Assets/Images/ManageIT_Logo.png" alt="MANAGEIT LOGO">
            <img id="SRCB_BackgroundIMG" src="../../Assets/Images/SRCB_Logo.png" alt="SRCB LOGO">
            <span>
                <button id="LogoutBtn"><img src="../../Assets/Images/Logout_Icon.png">Logout</button>
            </span>
        </div>

        <div class="selectionAreaa">
            <button id="Userbtn">USER</button>
            <p>|</p>
            <button id="Studentbtn">STUDENT</button>
        </div>

        <div id="AccountsList">
            <span id="MaterialsHeader">
                <h2>User Accounts List</h2>
                <input id="searchbox" placeholder="Search Here..">
                <button id="AddbtnShow">Add +</button>
            </span>

            <div id="TableAreaContainer">
                <table id="ItemTable">
                    <tr>
                        <th>Student ID</th>
                        <th>Fullname</th>
                        <th>Level</th>
                        <th>Dept</th>
                        <th>Status</th>
                        <th>Operation</th>
                    </tr>
                </table>
            </div>
        </div>

        <div id="AddingFacultyForm">
            <div id="AddingForm">
                <button id="extbtn">X</button>
                <h1>Adding Account</h1>
                <form id="facultyForm" novalidate>
                    <input type="text" id="adding_fullname" name="fullname" placeholder="Full Name.." required>
                    <input type="email" id="adding_email" name="email" placeholder="Email Address.." required>
                    <input type="number" id="adding_phone" name="phone" placeholder="Phone Number.." required>
                    <input type="text" id="adding_username" name="username" placeholder="Username.." required>
                    <input type="text" id="adding_password" name="password" placeholder="Password.." required>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div id="DarkBlur"></div>
        </div>


        <div id="CheckFacultyData">
            <div id="DataForm">
                <button id="extbtn1">X</button>
                <input hidden value="" id="view_facultyIdInput">
                <h1>STUDENT</h1>
                
                <span id="view_fullnameSpan">
                    <h2>Student ID:</h2>
                    <p id="view_fullname"></p> <!-- This will display the Student ID -->
                </span>
                
                <span id="view_emailSpan">
                    <h2>Full Name:</h2>
                    <p id="view_email"></p> <!-- This will display the student's Full Name -->
                </span>
                
                <span id="view_phoneSpan">
                    <h2>Department:</h2>
                    <p id="view_phone"></p> <!-- This will display the Department or Year/Course -->
                </span>

                <span id="view_levelSpan">
                    <h2>Level:</h2>
                    <p id="view_level"></p> <!-- This will display the student's Level -->
                </span>

                <span id="view_statusSpan">
                    <h2>Status:</h2>
                    <p id="view_status">Active🟢</p> <!-- This will show the student's status -->
                </span>
                
                <div id="modifybtns">
                    <button id="deleteBtn"><img src="../../Assets/Images/Delete_icon.png" alt="Delete"></button>
                    <button id="updateBtn"><img src="../../Assets/Images/Edit_icon.png" alt="Edit"></button>
                </div>
            </div>
            <div id="DarkBlur"></div>
        </div>



        <div id="UpdateFacultyData">
            <div id="DataForm">
                <button id="extbtn2">X</button>
                <input type="hidden" value="" id="edit_facultyIdInput">
                <h1 id="edit_facultyHeader">UPDATING USER</h1>

                <span id="edit_fullnameSpan">
                    <h2>Fullname:</h2>
                    <input type="text" id="edit_fullname" placeholder="Enter full name" required>
                </span>

                <span id="edit_emailSpan">
                    <h2>Email Address:</h2>
                    <input type="email" id="edit_email" placeholder="Enter email address" required>
                </span>

                <span id="edit_phoneSpan">
                    <h2>Phone Number:</h2>
                    <input type="number" id="edit_phone" placeholder="Enter phone number" required>
                </span>

                <h3>LOGIN CREDENTIAL</h3>
                <span id="edit_usernameSpan">
                    <h2>Username:</h2>
                    <input type="text" id="edit_username" placeholder="Enter username" required>
                </span>

                <span id="edit_passwordSpan">
                    <h2>Password:</h2>
                    <input type="text" id="edit_password" placeholder="Enter password" required>
                </span>

                <span id="edit_statusSpan">
                    <h2>Status:</h2>
                    <label class="switch">
                        <input type="checkbox" id="edit_toggleSwitch">
                        <span class="slider"></span>
                    </label>
                </span>

                <button type="button" id="Savebtn">Save</button>
            </div>
            <div id="DarkBlur"></div>
        </div>

    </div>
    <script src="../JS/SweetAlert.js"></script>
    <script src="../JS/SuperAdmin_student.js"></script>
</body>

</html>