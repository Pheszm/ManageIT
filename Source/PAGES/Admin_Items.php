<?php
include '../PHP/Admin_Items_FetchChart.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ManageIT | Item List</title>
    <link href="../CSS/Poppins_Sheet.css" rel="stylesheet">
    <link rel="icon" href="../../Assets/Images/ManageIT_Logo.png">
    <link rel="stylesheet" href="../CSS/Admin_Items.css">
    <link href="../CSS/qr_ui_config.css" rel="stylesheet">
    <script src="../JS/QR_Maker.js"></script>
    <link rel="stylesheet" href="../CSS/SweetAlert.css">
    <script src="../JS/BarChart_API.js"></script>
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
            <h1>AVR Item List</h1>
            <span>
                <select id="StatusComboBox">
                    <option value="">Status</option>
                    <option value="BORROWED">BORROWED</option>
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="UNAVAILABLE">UNAVAILABLE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="ACTIVE">ACTIVE</option>
                </select>
                <input id="SearchBarAllApproved" placeholder="Search Here..">
                <button id="scanqrbtn"><img id="qr_icon" src="../../Assets/Images/QR_Icon.png"></button>
            </span>
            <span class="specialSpan">
                <select id="ModelComboBox">
                    <option value="">Model</option>
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select id="CategoryComboBox">
                    <option value="">Category</option>
                </select>
            </span>
            <div id="TableCase6">
                <table id="AllItemsTable">
                    <tr>
                        <th>Item Name</th>
                        <th>Total Quantity</th>
                        <th>Available</th>
                    </tr>
                    <!-- Rows will be dynamically added here -->
                </table>
            </div>
            <span>

                <button id="AddItemBtn">Add Item</button>

            </span>
        </div>
        <div id="ViewItemAreaa">
            <div id="ImageBox"></div>
            <div class="DetailsArea">
                <span>
                    <h2>Item:</h2>
                    <p id="View_Item"></p>
                </span>
                <span>
                    <h2>Model:</h2>
                    <p id="View_Model"></p>
                </span>
                <span>
                    <h2>Category:</h2>
                    <p id="View_Category"></p>
                </span>
                <div class="NumberTextArea">
                    <span>
                        <h2>Total Quantity:</h2>
                        <p id="View_Quantity"></p>
                    </span>
                    <span>
                        <h2>Available:</h2>
                        <p id="View_Available"></p>
                    </span>
                    <span>
                        <h2>Status:</h2>
                        <p id="View_Status"></p>
                    </span>
                </div>
            </div>
            <button id="UpdateItemBtn">Update</button>
            <button id="RemoveItemBtn">Remove</button>
            <button id="SaveQrBtn">Print QR</button>

            <div id="QRImageBox"></div>
        </div>


        <div class="MosltyUsedAREA">
            <h1 class="HEADERR">All Time Borrowed Item</h1>
            <div id="TableCase3">
                <!-- Canvas for the chart -->
                <canvas id="myChart"></canvas>


                <script>
                    // Fetching data from PHP
                    const itemNames = <?php echo json_encode($itemNames); ?>;
                    const borrowedCounts = <?php echo json_encode($borrowedCounts); ?>;

                    // Data for the chart
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'bar', // Type of chart
                        data: {
                            labels: itemNames, // Dynamically inserted item names
                            datasets: [{
                                label: 'Most Borrowed Items', // Label for the dataset
                                data: borrowedCounts, // Dynamically inserted borrowed counts
                                backgroundColor: 'rgba(135, 206, 250, 0.7)', // Bar color
                                borderColor: 'rgba(0, 123, 255, 1)', // Border color
                                borderWidth: 1
                            }]
                        },
                        options: {
                            indexAxis: 'y', // Make the bars horizontal
                            scales: {
                                x: {
                                    beginAtZero: true, // Start the x-axis at zero
                                }
                            },
                            responsive: true, // Make the chart responsive to window size
                        }
                    });
                </script>
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

        <div id="AddItemArea">
            <div id="DarkBlur"></div>
            <div id="AddingForm">
                <button id="AddFormExitBtn">X</button>
                <h1>Adding Items Form</h1>
                <div id="AddImageArea"><button id="Add_UploadImageBtn">Upload Image</button></div>
                <span>
                    <h2>Item Name:</h2><input id="Add_Item_Name" placeholder="Name..">
                </span>
                <span>
                    <h2>Model:</h2><input id="Add_Item_Model" placeholder="Model..">
                </span>
                <span>
                    <h2>Category:</h2>
                    <input list="Categories" id="Add_Item_Category" placeholder="Category..">
                    <datalist id="Categories">
                    </datalist>
                </span>
                <span>
                    <h2>Quantity:</h2><input id="Add_Item_Quantity" type="number" placeholder="Quantity..">
                </span>
                <button id="AddBtnSave">ADD ITEM</button>
            </div>
        </div>




        <div id="UpdateItemArea">
            <div id="DarkBlur"></div>
            <div id="UpdatingForm">
                <button id="UpdateFormExitBtn">X</button>
                <h1>Updating Item</h1>
                <div id="Update_ImageArea"><button id="Update_UploadImageBtn">Upload Image</button></div>
                <span>
                    <h2>Item Name:</h2><input id="Update_Item_Name" placeholder="Name..">
                </span>
                <span>
                    <h2>Model:</h2><input id="Update_Item_Model" placeholder="Model..">
                </span>
                <span>
                    <h2>Category:</h2>
                    <input list="CategoriesUpdate" id="Update_Item_Category" placeholder="Category..">
                    <datalist id="CategoriesUpdate">
                    </datalist>
                </span>
                <span>
                    <h2>Quantity:</h2><input id="Update_Item_Quantity" type="number" placeholder="Quantity..">
                </span>
                <span>
                    <h2>Availability:</h2><input id="Update_Item_Available" type="number" placeholder="Availability..">
                </span>

                <span id="edit_statusSpan">
                    <h2>Status:</h2>
                    <div class="AligningSwitch">
                        <label class="switch">
                            <input type="checkbox" id="Update_Item_Status">
                            <span class="slider"></span>
                        </label>
                    </div>
                </span>
                <button id="UpdateBtnSave">SAVE</button>
            </div>
        </div>
    </div>

    <img id="SRCB_BackgroundIMG2" src="../../Assets/Images/SRCB_Logo.png">
    <script src="../JS/SweetAlert.js"></script>
    <script src="../JS/Admin_Items.js"></script>
    <script src="../JS/QR_Scanner.js"></script>
</body>

</html>