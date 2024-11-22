document.getElementById("toggle-btn").addEventListener("click", function () {
	const sidebar = document.getElementById("SideBarNav");
	sidebar.classList.toggle("open");
});



//LOGIN AUTH CHECKER
var facultyId;
document.addEventListener('DOMContentLoaded', function() {
    facultyId = sessionStorage.getItem('facultyId'); // Check sessionStorage for facultyId

    // If facultyId is not found, redirect to the login page
    if (!facultyId) {
        window.location.href = '../../index.html'; // Redirect to the login page if not authenticated
    }

    // If facultyId is found, proceed with page initialization
    else {
        console.log('Faculty ID:', facultyId); 
    }
});
// NAVIGATION FUNCTIONS
document.getElementById('HomeBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Home.html';
});

document.getElementById('ReservationBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Reservation.html';
});

document.getElementById('ItemsBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Items.html';
});

document.getElementById('ActBtn').addEventListener('click', () => {
    window.location.href = 'Admin_ActivityLogs.html';
});

document.getElementById('ReportsBtn').addEventListener('click', () => {
    window.location.href = 'Admin_Reports.html';
});








//SHOW and EXIT ADD FORM
document.getElementById("AddFormExitBtn").addEventListener("click", function() {
    document.getElementById("AddItemArea").style.display = "none";
});

document.getElementById("AddItemBtn").addEventListener("click", function() {
    document.getElementById("AddItemArea").style.display = "flex";
});




// LOAD ALL ITEMS IN THE TABLE
function RefreshTable() {
	document.getElementById("View_Item").textContent = "";
	document.getElementById("View_Model").textContent = "";
	document.getElementById("View_Category").textContent = "";
	document.getElementById("View_Quantity").textContent = "";
	document.getElementById("View_Available").textContent = "";
	document.getElementById("View_Status").textContent = "";
	document.getElementById("ImageBox").style.backgroundImage = `none`;
	document.getElementById("QRImageBox").innerHTML = "";
	document.getElementById("SaveQrBtn").style.display = "none";
	document.getElementById("UpdateItemBtn").style.display = "none";
	document.getElementById("RemoveItemBtn").style.display = "none";

	ImageFullURL = null;
	ImageFileName = null;
	ImageFile = null;

	const SearchId = Id_isSearched;
	const searchTerm = searchBar.value; // Get the value from the search bar
	const StatusFilter = SelectedStatus.value; // Get the selected status
	const ModelFilter = SelectedModel.value; // Get the selected model
	const CategoryFilter = SelectedCategory.value; // Get the selected category

	// Build the query parameters
	const params = new URLSearchParams({
		search: searchTerm,
		status: StatusFilter,
		model: ModelFilter,
		category: CategoryFilter,
	});

	// Only add 'item_id' to params if it's not null or undefined
	if (SearchId) {
		params.append("item_id", SearchId);
	}

	// Fetch the data from the server using the built query string
	fetch(`../PHP/Admin_Items_FetchItemTable.php?${params.toString()}`)
		.then((response) => response.json())
		.then((data) => {
			const table = document.getElementById("AllItemsTable");

			// Clear existing rows, except for the header row (index 0)
			while (table.rows.length > 1) {
				table.deleteRow(1);
			}

			// Populate table with fetched data
			data.forEach((item) => {
				const row = table.insertRow();
				row.insertCell(0).textContent = item.Item_Name;
				row.insertCell(1).textContent = item.Item_Quantity;
				var OverallItemQnty = item.Item_Available;
				// Format CurrentDate to YYYY-MM-DD
				var CurrentDate = new Date().toISOString().split('T')[0]; // Example: "2024-11-22"
				// Format CurrentTime to HH:MM:SS (24-hour format)
				var CurrentTime = new Date().toTimeString().split(' ')[0]; // Example: "11:08:43"

				fetch(`../PHP/Admin_Items_ItemDataCheckAvailability.php?Item_Id=${item.Item_Id}&CurrentDate=${CurrentDate}&CurrentTime=${CurrentTime}`)
                .then(response => response.json())
                .then(Overall_Item_UseQuantity => {
					OverallItemQnty -= Overall_Item_UseQuantity;
					row.insertCell(2).textContent = OverallItemQnty;
                })
				.catch(error => {
					console.error('Error checking availability:', error);
					row.insertCell(2).textContent = OverallItemQnty; 
				});

				// Optional: Add hidden input for future use (if needed)
				const hiddenInput = document.createElement("input");
				hiddenInput.type = "hidden";
				hiddenInput.value = item.Item_Id;
				hiddenInput.name = "itemId[]";
				row.appendChild(hiddenInput);

				if (Id_isSearched) {
					document.getElementById("SearchBarAllApproved").value =
						item.Item_Name;
				}
			});
		})
		.catch((error) => console.error("Error fetching items:", error));
}

// Event listeners for filtering and search
document.addEventListener("DOMContentLoaded", RefreshTable);
const SelectedStatus = document.getElementById("StatusComboBox");
const searchBar = document.getElementById("SearchBarAllApproved");
const SelectedModel = document.getElementById("ModelComboBox");
const SelectedCategory = document.getElementById("CategoryComboBox");

// Event listeners for changes to filtering/select inputs
SelectedStatus.addEventListener("change", function () {
	Id_isSearched = null; // Reset Item ID search when status changes
	RefreshTable(); // Refresh table with updated filters
});

SelectedModel.addEventListener("change", function () {
	Id_isSearched = null; // Reset Item ID search when model changes
	RefreshTable(); // Refresh table with updated filters
});

SelectedCategory.addEventListener("change", function () {
	Id_isSearched = null; // Reset Item ID search when category changes
	RefreshTable(); // Refresh table with updated filters
});

searchBar.addEventListener("input", function () {
	Id_isSearched = null; // Reset Item ID search when search term changes
	RefreshTable(); // Refresh table with updated filters
});
//CLICKABLE ROW FUNCTION IN ALL LIST OF ITEM
var SelectedAllItemsRow;
document
	.getElementById("AllItemsTable")
	.addEventListener("click", function (e) {
		const targetRow = e.target.closest("tr");
		if (targetRow && targetRow.rowIndex > 0) {
			// Check if it's not the header row
			// Clear any inline styles from previous selections
			Array.from(this.rows).forEach((row) => {
				row.style.border = "";
				row.style.backgroundColor = ""; // Reset background color
			});
			targetRow.style.backgroundColor = "#9BB9E5FF"; // Corrected syntax

			// Retrieve the hidden input value (reservation ID)
			var SelectRow = targetRow.querySelector('input[type="hidden"]').value;
			if (SelectRow != SelectedAllItemsRow) {
				document.getElementById("SaveQrBtn").style.display = "block";
				document.getElementById("UpdateItemBtn").style.display = "block";
				document.getElementById("RemoveItemBtn").style.display = "block";
				SelectedAllItemsRow = SelectRow;
				DisplayItemDestails();
			} else {
				targetRow.style.backgroundColor = ""; // Corrected syntax
				document.getElementById("SaveQrBtn").style.display = "none";
				document.getElementById("UpdateItemBtn").style.display = "none";
				document.getElementById("RemoveItemBtn").style.display = "none";
				SelectedAllItemsRow = "";
				document.getElementById("View_Item").textContent = "";
				document.getElementById("View_Model").textContent = "";
				document.getElementById("View_Category").textContent = "";
				document.getElementById("View_Quantity").textContent = "";
				document.getElementById("View_Available").textContent = "";
				document.getElementById("View_Status").textContent = "";
				document.getElementById("ImageBox").style.backgroundImage = `none`;
				document.getElementById("QRImageBox").innerHTML = "";
				DisplayItemDestails();
			}
		}
	});

function DisplayItemDestails() {
	if (SelectedAllItemsRow) {
		// Assuming `SelectedAllItemsRow` holds the ID of the selected item
		fetch(`../PHP/Admin_Items_ViewItemDetails.php?id=${SelectedAllItemsRow}`)
			.then((response) => response.json())
			.then((data) => {
				// Populate the <p> elements with the fetched data

				// Set Item Name
				document.getElementById("View_Item").textContent = data.Item_Name;

				// Set Model
				document.getElementById("View_Model").textContent = data.Item_Model;

				// Set Category
				document.getElementById("View_Category").textContent =
					data.Item_Category;

				// Set Total Quantity
				document.getElementById("View_Quantity").textContent =
					data.Item_Quantity;

				// Set Available
				document.getElementById("View_Available").textContent =
					data.Item_Available;

				// Set Status 
				document.getElementById("View_Status").textContent = (data.Item_Status == 1) ? 'Active🟢' : 'Inactive🔴';

				generateQRCode();
				// Optionally, handle Image (if image URL is provided)
				if (data.Item_ImageLocation) {
					document.getElementById(
						"ImageBox"
					).style.backgroundImage = `url(../../Images_Stored/${data.Item_ImageLocation})`;
				}

				document.getElementById("SaveQrBtn").style.display = "block";
				document.getElementById("UpdateItemBtn").style.display = "block";
				document.getElementById("RemoveItemBtn").style.display = "block";
			})
			.catch((error) => {
				console.error("Error fetching item details:", error);
			});
	} else {
		console.log("No item selected.");
	}
}

//GENERATE QR FUNCTIONALITIESS
let qrCodeInstance;

function generateQRCode() {
	const text = SelectedAllItemsRow;
	const qrCodeContainer = document.getElementById("QRImageBox");

	// Clear previous QR code
	qrCodeContainer.innerHTML = "";

	if (text) {
		// Get container dimensions in pixels
		const containerWidth = qrCodeContainer.clientWidth;
		const containerHeight = qrCodeContainer.clientHeight;

		// Create the QR code with calculated width and height
		qrCodeInstance = new QRCode(qrCodeContainer, {
			text: text,
			width: containerWidth, // Using container width (in px)
			height: containerHeight, // Using container height (in px)
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.H,
		});
	} else {
		alert("Please enter some text.");
	}
}

document.getElementById("SaveQrBtn").addEventListener("click", () => {
	const qrCodeContainer = document.getElementById("QRImageBox");
	const printWindow = window.open("", "", "height=900,width=800");
	printWindow.document.write("<html><head><title>Print QR Code</title>");
	printWindow.document.write("</head><body>");
	printWindow.document.write(qrCodeContainer.innerHTML);
	printWindow.document.write(
		"<br>" + document.getElementById("View_Item").textContent
	);
	printWindow.document.write("</body></html>");
	printWindow.document.close();
	printWindow.focus();
	printWindow.print();
});

function downloadQRCode() {
	const qrCodeCanvas = document.querySelector("#qrcode canvas");
	if (qrCodeCanvas) {
		const link = document.createElement("a");
		link.href = qrCodeCanvas.toDataURL("image/png");
		link.download = "qrcode.png";
		link.click();
	} else {
		alert("Generate a QR code first.");
	}
}

// QR SCAN FUNCTIONALITY
var Id_isSearched;
function domReady(fn) {
	if (
		document.readyState === "complete" ||
		document.readyState === "interactive"
	) {
		setTimeout(fn, 1);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}
domReady(function () {
	var myqr = document.getElementById("you-qr-result");
	var lastResult,
		countResults = 0;
	var htmlscanner; // Declare scanner variable

	// IF FOUND YOU QR CODE
	function onScanSuccess(decodeText, decodeResult) {
		if (decodeText !== lastResult) {
			++countResults;
			lastResult = decodeText;
			Id_isSearched = decodeText; // Set the input value
			document.getElementById("QRFormScanner").style.display = "none"; // Hide scanner
			htmlscanner.clear(); // Stop scanning when a QR code is detected
			document.getElementById("StatusComboBox").value = "";
			document.getElementById("SearchBarAllApproved").value = "";
			document.getElementById("ModelComboBox").value = "";
			document.getElementById("CategoryComboBox").value = "";
			RefreshTable();
			SelectedAllItemsRow = Id_isSearched;
			DisplayItemDestails();
		}
	}

	// Start scanning when scan button is clicked
	document.getElementById("scanqrbtn").addEventListener("click", function () {
		document.getElementById("QRFormScanner").style.display = "flex"; // Show scanner
		lastResult = null; // Reset lastResult
		countResults = 0; // Reset count
		htmlscanner = new Html5QrcodeScanner("my-qr-reader", {
			fps: 10,
			qrbox: 250,
		});
		htmlscanner.render(onScanSuccess);
	});

	// Close scanner when exit button is clicked
	document.getElementById("QReeexitbtn").addEventListener("click", function () {
		document.getElementById("QRFormScanner").style.display = "none"; // Hide scanner
		if (htmlscanner) {
			htmlscanner.clear(); // Stop the scanner
		}
	});
});

// Populate ModelComboBox & CategoryComboBox
window.onload = function () {
	fetch("../PHP/ReservationForm_FetchComboBox.php")
		.then((response) => response.json())
		.then((data) => {
			const modelComboBox = document.getElementById("ModelComboBox");
			const categoryComboBox = document.getElementById("CategoryComboBox");

			// Populate ModelComboBox
			data.models.forEach((model) => {
				const option = document.createElement("option");
				option.value = model;
				option.textContent = model;
				modelComboBox.appendChild(option);
			});

			// Populate CategoryComboBox
			data.categories.forEach((category) => {
				const option = document.createElement("option");
				option.value = category;
				option.textContent = category;
				categoryComboBox.appendChild(option);
			});
		})
		.catch((error) => console.error("Error fetching data:", error));
};








// Global variables to store the selected image URL and file name
let Update_ImageFullURL = null;
let Update_ImageFileName = null;
let Update_ImageFile = null; // Store the image file itself for upload
//UPDATE AREAA
// Event listener for the button click to trigger file selection
document.getElementById('Update_UploadImageBtn').addEventListener('click', function() {
    // Create a temporary file input element to trigger file selection
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Restrict to image files

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0]; // Get the selected file
        if (file && file.type.startsWith('image/')) {
            // Create a URL for the selected image file
            ImageFullURL = URL.createObjectURL(file); // Use the correct variable name
            
            // Store the image file and file name for later use
            Update_ImageFile = file;
            Update_ImageFileName = file.name;

            // Apply the image URL as the background image of the parent div
            document.getElementById('Update_ImageArea').style.backgroundImage = `url(${ImageFullURL})`;
            document.getElementById('Update_ImageArea').style.backgroundSize = 'cover'; // Optional: Make the image cover the div
            document.getElementById('Update_ImageArea').style.backgroundPosition = 'center'; // Optional: Center the image
        } else {
            alert('Please select a valid image file.');
        }
    });

    // Trigger the file input dialog
    fileInput.click();
});



let Add_ImageFullURL = null;
let Add_ImageFileName = null;
let Add_ImageFile = null; 
//ADD PART
// Event listener for the button click to trigger file selection
document.getElementById('Add_UploadImageBtn').addEventListener('click', function() {
    // Create a temporary file input element to trigger file selection
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Restrict to image files

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0]; // Get the selected file
        if (file && file.type.startsWith('image/')) {
            // Create a URL for the selected image file
            ImageFullURL = URL.createObjectURL(file); // Use the correct variable name
            
            // Store the image file and file name for later use
            Add_ImageFile = file;
            Add_ImageFileName = file.name;

            // Apply the image URL as the background image of the parent div
            document.getElementById('AddImageArea').style.backgroundImage = `url(${ImageFullURL})`;
            document.getElementById('AddImageArea').style.backgroundSize = 'cover'; // Optional: Make the image cover the div
            document.getElementById('AddImageArea').style.backgroundPosition = 'center'; // Optional: Center the image
        } else {
            alert('Please select a valid image file.');
        }
    });

    // Trigger the file input dialog
    fileInput.click();
});

// Function to upload the image to the server
function StoringImageFunc() {
    if (Update_ImageFile || Add_ImageFile) {
    }else{
		console.error('No image file selected.');
        return;
	}

    var formData = new FormData();
	if(Update_ImageFile){
		formData.append('image', Update_ImageFile); // Append the selected image file
		console.log(Update_ImageFile);
	}
	if(Add_ImageFile){
		formData.append('image', Add_ImageFile); // Append the selected image file
		console.log(Add_ImageFile);
	}

    // Send the image file to the server using Fetch API
    fetch('../PHP/Admin_Items_CopyImage.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log('Image uploaded successfully.');
        } else {
            console.error('Error uploading image:', result.error);
        }
    })
    .catch(error => {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image.');
    });
}

// ADD ITEM FUNCTION
document.getElementById("AddBtnSave").addEventListener("click", function() {
    const itemName = document.getElementById('Add_Item_Name');
    const itemModel = document.getElementById('Add_Item_Model');
    const itemCategory = document.getElementById('Add_Item_Category');
    const itemQuantity = document.getElementById('Add_Item_Quantity');

    // Clear previous custom validity messages
    itemName.setCustomValidity('');
    itemModel.setCustomValidity('');
    itemCategory.setCustomValidity('');
    itemQuantity.setCustomValidity('');

    // Validate fields
    if (itemName.value.trim() === '') {
        itemName.setCustomValidity('Item Name is required.');
        itemName.reportValidity();
        return;
    }

    if (itemModel.value.trim() === '') {
        itemModel.setCustomValidity('Item Model is required.');
        itemModel.reportValidity();
        return;
    }

    if (itemCategory.value.trim() === '') {
        itemCategory.setCustomValidity('Item Category is required.');
        itemCategory.reportValidity();
        return;
    }

    if (itemQuantity.value.trim() === '' || isNaN(itemQuantity.value) || itemQuantity.value <= 0) {
        itemQuantity.setCustomValidity('Please enter a valid quantity greater than 0.');
        itemQuantity.reportValidity();
        return;
    }

    // Prepare data to be sent in the request
    const updatedData = {
        item_name: itemName.value,
        item_model: itemModel.value,
        item_category: itemCategory.value,
        item_quantity: itemQuantity.value,
        item_imageName: Add_ImageFileName, // ImageName
    };

    // Confirm action after validation
    const confirmAddItem = confirm("Are you sure you want to add this item?");
    if (confirmAddItem) {
        // Call the function to store the image before sending item data
        StoringImageFunc();

        // Send the item data along with the image file name
        fetch('../PHP/Admin_Items_AddItem.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Send as JSON
            },
            body: JSON.stringify(updatedData)  // Convert the object to JSON
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Item added successfully.');
				var ItemIDCreate = result.item_id; // STORE IT HERE
				AcitivityLogInsertion("Item", "Created", ItemIDCreate);
                location.reload(); // Optionally reload the page or refresh the data
            } else {
                // Handle specific errors (if any)
                alert('Error: ' + (result.error || JSON.stringify(result.errors)));
            }
        })
        .catch(error => {
            console.error('Error adding item:', error);
            alert('An error occurred while trying to add the item.');
        });
    }
});








//ACTIVITY LOG INSERT FUNCTIONS
function AcitivityLogInsertion(Type, Action, ReferenceId) {
    // Prepare data to send
    const logData = {
        faculty_id: facultyId,  // Faculty ID
        log_type: Type,         // Log type (e.g., "Item")
        log_action: Action,     // Action (e.g., "Create")
        reference_id: ReferenceId, // Reference ID (e.g., Item ID)
        timestamp: new Date().toISOString()  // Add a timestamp for the activity
    };

    // Send data to the PHP script
    fetch('../PHP/ActivityLogInsertion.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData)  // Send the log data as JSON
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log('Activity log saved successfully.');
        } else {
            console.error('Failed to save activity log:', result.error);
        }
    })
    .catch(error => {
        console.error('Error logging activity:', error);
    });
}








//EXIT UPDATE FORM
document.getElementById("UpdateFormExitBtn").addEventListener("click", function() {
    document.getElementById("UpdateItemArea").style.display = "none";
});


document.getElementById("UpdateItemBtn").addEventListener("click", function() {
    document.getElementById("UpdateItemArea").style.display = "flex";
	DisplayToUpdateItemDestails();
});


// DISPLAY THE SELECTED TO UPDATE
var ImagetoUpdate = null;
function DisplayToUpdateItemDestails() {
	if (SelectedAllItemsRow) {
		// Assuming `SelectedAllItemsRow` holds the ID of the selected item
		fetch(`../PHP/Admin_Items_ViewItemDetails.php?id=${SelectedAllItemsRow}`)
			.then((response) => response.json())
			.then((data) => {
				// Populate the <p> elements with the fetched data

				// Set Item Name
				document.getElementById("Update_Item_Name").value = data.Item_Name;

				// Set Model
				document.getElementById("Update_Item_Model").value = data.Item_Model;

				// Set Category
				document.getElementById("Update_Item_Category").value =
					data.Item_Category;

				// Set Total Quantity
				document.getElementById("Update_Item_Quantity").value =
					data.Item_Quantity;

					document.getElementById("Update_Item_Available").value =
					data.Item_Available;
				// Set Status
				const statusSwitch = document.getElementById("Update_Item_Status");
				if (data.Item_Status == 1) {
					statusSwitch.checked = true;
				} else {
					statusSwitch.checked = false;
				}


				if (data.Item_ImageLocation) {
					document.getElementById(
						"Update_ImageArea"
					).style.backgroundImage = `url(../../Images_Stored/${data.Item_ImageLocation})`;
					ImagetoUpdate = data.Item_ImageLocation;
				}
			})
			.catch((error) => {
				console.error("Error fetching item details:", error);
			});
	} else {
		console.log("No item selected.");
	}
}

// UPDATE ITEM ARE
// Event listener for the "Save" button in the Update Form
document.getElementById("UpdateBtnSave").addEventListener("click", function() {
    // Get values from the form
    const itemName = document.getElementById("Update_Item_Name").value;
    const itemModel = document.getElementById("Update_Item_Model").value;
    const itemCategory = document.getElementById("Update_Item_Category").value;
    const itemQuantity = document.getElementById("Update_Item_Quantity").value;
	const itemAvailable = document.getElementById("Update_Item_Available").value;
    const itemStatus = document.getElementById("Update_Item_Status").checked ? 1 : 0; // Convert checkbox status to 1 or 0
	var OlditemImageName = ImagetoUpdate;

	// Clear previous validity messages
    document.getElementById("Update_Item_Name").setCustomValidity('');
    document.getElementById("Update_Item_Model").setCustomValidity('');
    document.getElementById("Update_Item_Category").setCustomValidity('');
    document.getElementById("Update_Item_Quantity").setCustomValidity('');

    // Validate fields
    if (itemName.trim() === '') {
        document.getElementById("Update_Item_Name").setCustomValidity('Item Name is required.');
        document.getElementById("Update_Item_Name").reportValidity();
        return;
    }

    if (itemModel.trim() === '') {
        document.getElementById("Update_Item_Model").setCustomValidity('Item Model is required.');
        document.getElementById("Update_Item_Model").reportValidity();
        return;
    }

    if (itemCategory.trim() === '') {
        document.getElementById("Update_Item_Category").setCustomValidity('Item Category is required.');
        document.getElementById("Update_Item_Category").reportValidity();
        return;
    }

    if (itemQuantity.trim() === '' || isNaN(itemQuantity) || itemQuantity <= 0) {
        document.getElementById("Update_Item_Quantity").setCustomValidity('Please enter a valid quantity greater than 0.');
        document.getElementById("Update_Item_Quantity").reportValidity();
        return;
    }

	if (itemAvailable.trim() === '' || isNaN(itemAvailable) || itemAvailable <= 0 || parseInt(itemAvailable) > parseInt(itemQuantity)) {
		document.getElementById("Update_Item_Available").setCustomValidity('Please enter a valid quantity greater than 0 and less than Item Quantity.');
		document.getElementById("Update_Item_Available").reportValidity();
		return;
    }




    // Confirm before submitting the update
    const confirmUpdate = confirm("Are you sure you want to update this item?");
    if (confirmUpdate) {
		if(OlditemImageName != Update_ImageFileName && Update_ImageFileName != null){
			OlditemImageName = Update_ImageFileName;
			console.log(OlditemImageName);
			StoringImageFunc();
		}

		    // Prepare the updated data to be sent
			const updatedData = {
				item_id: SelectedAllItemsRow,  // The ID of the item being updated (assuming it's available)
				item_name: itemName,
				item_model: itemModel,
				item_category: itemCategory,
				item_quantity: itemQuantity,
				item_status: itemStatus,
				item_available: itemAvailable,
				item_imageName: OlditemImageName,  // Image name or URL from the selected image
			};
			
        // Send the updated data to the server
        fetch('../PHP/Admin_Items_UpdateItem.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Send updated data as JSON
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                alert('Item updated successfully.');
				AcitivityLogInsertion("Item", "Updated", SelectedAllItemsRow);
                location.reload();  // Optionally reload the page or refresh the data
            } else {
                alert('Error updating item: ' + (result.error || 'Unknown error'));
            }
        })
        .catch((error) => {
            console.error("Error updating item:", error);
            alert("An error occurred while updating the item.");
        });
    }
});




//REMOVE FUNCTION
// Event listener for the "Remove" button
document.getElementById("RemoveItemBtn").addEventListener("click", function() {
    // Check if an item is selected (you should have a global variable to track the selected item, e.g., SelectedAllItemsRow)
    if (!SelectedAllItemsRow) {
        alert('Please select an item to remove.');
        return;
    }

    // Confirm before deleting the item
    const confirmRemove = confirm("Are you sure you want to remove this item?");
    if (confirmRemove) {
        // Send a request to remove the item
        const removeData = {
            item_id: SelectedAllItemsRow,  // The ID of the item to be removed (must be set before calling this function)
        };

        fetch('../PHP/Admin_Items_RemoveItem.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(removeData), // Send the item ID as JSON
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                alert('Item removed successfully.');
				AcitivityLogInsertion("Item", "Removed", SelectedAllItemsRow);
                location.reload();  // Optionally reload the page or refresh the data
            } else {
                alert('Error removing item: ' + (result.error || 'Unknown error'));
            }
        })
        .catch((error) => {
            console.error("Error removing item:", error);
            alert("An error occurred while removing the item.");
        });
    }
});
