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






// LOAD ALL ITEMS IN THE TABLE
function RefreshTable() {
    document.getElementById('View_Item').textContent = '';
    document.getElementById('View_Model').textContent = '';
    document.getElementById('View_Category').textContent = '';
    document.getElementById('View_Quantity').textContent = '';
    document.getElementById('View_Available').textContent = '';
    document.getElementById('View_Status').textContent = '';
    document.getElementById('ImageBox').style.backgroundImage = `none`;
    document.getElementById('QRImageBox').innerHTML = '';

    const SearchId = Id_isSearched;
    const searchTerm = searchBar.value;  // Get the value from the search bar
    const StatusFilter = SelectedStatus.value;  // Get the selected status
    const ModelFilter = SelectedModel.value;  // Get the selected model
    const CategoryFilter = SelectedCategory.value;  // Get the selected category

    // Build the query parameters
    const params = new URLSearchParams({
        search: searchTerm,
        status: StatusFilter,
        model: ModelFilter,
        category: CategoryFilter
    });

    // Only add 'item_id' to params if it's not null or undefined
    if (SearchId) {
        params.append('item_id', SearchId);
    }

    // Fetch the data from the server using the built query string
    fetch(`../PHP/Admin_Items_FetchItemTable.php?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('AllItemsTable');

            // Clear existing rows, except for the header row (index 0)
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            // Populate table with fetched data
            data.forEach(item => {
                const row = table.insertRow();
                row.insertCell(0).textContent = item.Item_Name;
                row.insertCell(1).textContent = item.Item_Quantity;
                row.insertCell(2).textContent = item.Item_Available;

                // Optional: Add hidden input for future use (if needed)
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.value = item.Item_Id; 
                hiddenInput.name = 'itemId[]';
                row.appendChild(hiddenInput);

                if(Id_isSearched){
                    document.getElementById('SearchBarAllApproved').value = item.Item_Name;
                }
            });
        })
        .catch(error => console.error('Error fetching items:', error));
}


// Event listeners for filtering and search
document.addEventListener('DOMContentLoaded', RefreshTable);
const SelectedStatus = document.getElementById('StatusComboBox');
const searchBar = document.getElementById('SearchBarAllApproved');
const SelectedModel = document.getElementById('ModelComboBox');
const SelectedCategory = document.getElementById('CategoryComboBox');

// Event listeners for changes to filtering/select inputs
SelectedStatus.addEventListener('change', function() {
    Id_isSearched = null;  // Reset Item ID search when status changes
    RefreshTable();  // Refresh table with updated filters
});

SelectedModel.addEventListener('change', function() {
    Id_isSearched = null;  // Reset Item ID search when model changes
    RefreshTable();  // Refresh table with updated filters
});

SelectedCategory.addEventListener('change', function() {
    Id_isSearched = null;  // Reset Item ID search when category changes
    RefreshTable();  // Refresh table with updated filters
});

searchBar.addEventListener('input', function() {
    Id_isSearched = null;  // Reset Item ID search when search term changes
    RefreshTable();  // Refresh table with updated filters
});
//CLICKABLE ROW FUNCTION IN ALL LIST OF ITEM
var SelectedAllItemsRow;
document.getElementById('AllItemsTable').addEventListener('click', function(e) {
    const targetRow = e.target.closest('tr');
    if (targetRow && targetRow.rowIndex > 0) { // Check if it's not the header row
        // Clear any inline styles from previous selections
        Array.from(this.rows).forEach(row => {
            row.style.border = "";
            row.style.backgroundColor = ""; // Reset background color
        });
        targetRow.style.backgroundColor = "#9BB9E5FF"; // Corrected syntax

        // Retrieve the hidden input value (reservation ID)
        var SelectRow = targetRow.querySelector('input[type="hidden"]').value;
        if(SelectRow != SelectedAllItemsRow){
            document.getElementById('SaveQrBtn').style.display = "block";
            document.getElementById('UpdateItemBtn').style.display = "block";
            document.getElementById('RemoveItemBtn').style.display = "block";
            SelectedAllItemsRow = SelectRow;
            DisplayItemDestails();
        }else{
            targetRow.style.backgroundColor = "transparent"; // Corrected syntax
            document.getElementById('SaveQrBtn').style.display = "none";
            document.getElementById('UpdateItemBtn').style.display = "none";
            document.getElementById('RemoveItemBtn').style.display = "none";
            SelectedAllItemsRow = '';
            document.getElementById('View_Item').textContent = '';
            document.getElementById('View_Model').textContent = '';
            document.getElementById('View_Category').textContent = '';
            document.getElementById('View_Quantity').textContent = '';
            document.getElementById('View_Available').textContent = '';
            document.getElementById('View_Status').textContent = '';
            document.getElementById('ImageBox').style.backgroundImage = `none`;
            document.getElementById('QRImageBox').innerHTML = '';
            DisplayItemDestails();
        }
    }
});

function DisplayItemDestails() {
    if (SelectedAllItemsRow) {
        // Assuming `SelectedAllItemsRow` holds the ID of the selected item
        fetch(`../PHP/Admin_Items_ViewItemDetails.php?id=${SelectedAllItemsRow}`)
            .then(response => response.json())
            .then(data => {
                // Populate the <p> elements with the fetched data

                // Set Item Name
                document.getElementById('View_Item').textContent = data.Item_Name;
                
                // Set Model
                document.getElementById('View_Model').textContent = data.Item_Model;
                
                // Set Category
                document.getElementById('View_Category').textContent = data.Item_Category;
                
                // Set Total Quantity
                document.getElementById('View_Quantity').textContent = data.Item_Quantity;
                
                // Set Available
                document.getElementById('View_Available').textContent = data.Item_Available;
                
                // Set Status (Assuming Item_Status is a number or status code)
                document.getElementById('View_Status').textContent = data.Item_Status;

                generateQRCode();
                // Optionally, handle Image (if image URL is provided)
                if (data.Item_ImageLocation) {
                    document.getElementById('ImageBox').style.backgroundImage = `url(../../Images_Stored/${data.Item_ImageLocation})`;
                }

                document.getElementById('SaveQrBtn').style.display = "block";
                document.getElementById('UpdateItemBtn').style.display = "block";
                document.getElementById('RemoveItemBtn').style.display = "block";
            })
            .catch(error => {
                console.error('Error fetching item details:', error);
            });
    } else {
        console.log("No item selected.");
    }
};

//GENERATE QR FUNCTIONALITIESS
let qrCodeInstance;

function generateQRCode() {
    const text = SelectedAllItemsRow;
    const qrCodeContainer = document.getElementById('QRImageBox');
    
    // Clear previous QR code
    qrCodeContainer.innerHTML = '';

    if (text) {
        // Get container dimensions in pixels
        const containerWidth = qrCodeContainer.clientWidth;
        const containerHeight = qrCodeContainer.clientHeight;

        // Create the QR code with calculated width and height
        qrCodeInstance = new QRCode(qrCodeContainer, {
            text: text,
            width: containerWidth,  // Using container width (in px)
            height: containerHeight,  // Using container height (in px)
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        alert('Please enter some text.');
    }
}   



document.getElementById('SaveQrBtn').addEventListener('click', () => {
    const qrCodeContainer = document.getElementById('QRImageBox');
    const printWindow = window.open('', '', 'height=900,width=800');
    printWindow.document.write('<html><head><title>Print QR Code</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(qrCodeContainer.innerHTML);
    printWindow.document.write('<br>' + document.getElementById('View_Item').textContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
});

function downloadQRCode() {
    const qrCodeCanvas = document.querySelector('#qrcode canvas');
    if (qrCodeCanvas) {
        const link = document.createElement('a');
        link.href = qrCodeCanvas.toDataURL('image/png');
        link.download = 'qrcode.png';
        link.click();
    } else {
        alert('Generate a QR code first.');
    }
}










// QR SCAN FUNCTIONALITY
var Id_isSearched;
function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
domReady(function() {
    var myqr = document.getElementById('you-qr-result');
    var lastResult, countResults = 0;
    var htmlscanner; // Declare scanner variable

    // IF FOUND YOU QR CODE
    function onScanSuccess(decodeText, decodeResult) {
        if (decodeText !== lastResult) {
            ++countResults;
            lastResult = decodeText;
            Id_isSearched = decodeText; // Set the input value
            document.getElementById("QRFormScanner").style.display = "none"; // Hide scanner
            htmlscanner.clear(); // Stop scanning when a QR code is detected
            document.getElementById("StatusComboBox").value = ''; 
            document.getElementById("SearchBarAllApproved").value = ''; 
            document.getElementById("ModelComboBox").value = ''; 
            document.getElementById("CategoryComboBox").value = ''; 
            RefreshTable();
            SelectedAllItemsRow = Id_isSearched;
            DisplayItemDestails();
        }
    }

    // Start scanning when scan button is clicked
    document.getElementById("scanqrbtn").addEventListener("click", function() {
        document.getElementById("QRFormScanner").style.display = "flex"; // Show scanner
        lastResult = null; // Reset lastResult
        countResults = 0; // Reset count
        htmlscanner = new Html5QrcodeScanner("my-qr-reader", { fps: 10, qrbox: 250 });
        htmlscanner.render(onScanSuccess);
    });

    // Close scanner when exit button is clicked
    document.getElementById("QReeexitbtn").addEventListener("click", function() {
        document.getElementById("QRFormScanner").style.display = "none"; // Hide scanner
        if (htmlscanner) {
            htmlscanner.clear(); // Stop the scanner
        }
    });
});













    // Populate ModelComboBox & CategoryComboBox
    window.onload = function() {
        fetch('../PHP/ReservationForm_FetchComboBox.php')
            .then(response => response.json())
            .then(data => {
                const modelComboBox = document.getElementById('ModelComboBox');
                const categoryComboBox = document.getElementById('CategoryComboBox');
    
                // Populate ModelComboBox
                data.models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model;
                    option.textContent = model;
                    modelComboBox.appendChild(option);
                });
    
                // Populate CategoryComboBox
                data.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    categoryComboBox.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    };
    


