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
    const searchTerm = searchBar.value; // Get the value from the search bar
    const StatusFilter = SelectedStatus.value; // Get the selected status
    const ModelFilter = SelectedModel.value; // Get the selected model
    const CategoryFilter = SelectedCategory.value; // Get the selected category

    // Build the query parameters
    const params = new URLSearchParams({
        search: searchTerm,
        status: StatusFilter,
        model: ModelFilter,
        category: CategoryFilter
    });

    fetch(`../PHP/Admin_Items_FetchItemTable.php?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('AllItemsTable');

            // Clear existing rows
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

SelectedStatus.addEventListener('change', RefreshTable);
SelectedModel.addEventListener('change', RefreshTable);
SelectedCategory.addEventListener('change', RefreshTable);
searchBar.addEventListener('input', RefreshTable);

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
            SelectedAllItemsRow = SelectRow;
            console.log("GARR",SelectedAllItemsRow);
            DisplayItemDestails();
        }else{
            targetRow.style.backgroundColor = "transparent"; // Corrected syntax
            SelectedAllItemsRow = '';
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

                // Optionally, handle Image (if image URL is provided)
                if (data.Item_ImageLocation) {
                    document.getElementById('ImageBox').style.backgroundImage = `url(../../Images_Stored/${data.Item_ImageLocation})`;
                }

            })
            .catch(error => {
                console.error('Error fetching item details:', error);
            });
    } else {
        console.log("No item selected.");
    }
};








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
    


