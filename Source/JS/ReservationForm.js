//OPEN ADD_MATERIALS FORM
document.getElementById("AddbtnShow").addEventListener("click", function() {
    if(
        document.getElementById("fromtime").value != "" &&
        document.getElementById("totime").value != "" &&
        document.getElementById("dateofuse").value != "" 
    ){
        document.getElementById("AddingMaterialsForm").style.display = "flex";
    }else{
        document.getElementById("WarningText").textContent = "You need to choose the Date and Time first in order to check if the item is available.";
        
        document.getElementById("WarningSign").style.display = "flex";
    }
});
//CLOSE WARNING SIGN
document.getElementById("WarningResponseBtn").addEventListener("click", function() {
    document.getElementById("WarningSign").style.display = "none";
});




//CLOSE ADD_MATERIALS FORM
document.getElementById("exitbtn").addEventListener("click", function() {
    document.getElementById("AddingMaterialsForm").style.display = "none";
});







// QR FUNCTIONALITY
var QRcodesearched = null;
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

            document.getElementById("QRFormScanner").style.display = "none"; // Hide scanner
            htmlscanner.clear(); // Stop scanning when a QR code is detected
            QRcodesearched = decodeText;
            document.getElementById('SearchBoxForItem').value = '';
            document.getElementById('ModelComboBox').value = '';
            document.getElementById('CategoryComboBox').value = '';
            
            fetchItems(searchBox.value, ModelComboBox.value, CategoryComboBox.value);
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












document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');
    const dateofuse = document.getElementById('dateofuse');
    const fromtime = document.getElementById('fromtime');
    const totime = document.getElementById('totime');
    const addbtnnn = document.getElementById('AddbtnShow');

    // Clear custom validity on date input change
    dateofuse.addEventListener('input', function() {
        dateofuse.setCustomValidity(''); // Clear the custom validity message
    });

    // Clear custom validity on 'To' time input change
    totime.addEventListener('input', function() {
        totime.setCustomValidity(''); // Clear the custom validity message
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Input fields
        const fullname = document.getElementById('fullname');
        const course_year = document.getElementsByName('course_year')[0];
        const subject = document.getElementsByName('subject')[0];
        const requested_by = document.getElementsByName('requested_by')[0];
        const message = document.getElementById('Messageinput');

        // Reset custom validity for all fields
        fullname.setCustomValidity('');
        dateofuse.setCustomValidity('');
        fromtime.setCustomValidity('');
        totime.setCustomValidity('');
        course_year.setCustomValidity('');
        subject.setCustomValidity('');
        requested_by.setCustomValidity('');
        message.setCustomValidity('');

        // Validate that the date of use is at least one day in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight for today
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1); // Move to the next day

        // Get the selected date from the date picker
        const selectedDate = new Date(dateofuse.value);

        // Log the dates for debugging
        console.log("Today: ", today);
        console.log("Next Day: ", nextDay);
        console.log("Selected Date: ", selectedDate);

        // Check if the selected date is at least one day in the future
        if (selectedDate < nextDay) {
            dateofuse.setCustomValidity("The reservation date must be at least one day from today.");
            dateofuse.reportValidity(); // Show the validation message

            return; // Stop submission if the date is not valid
        }

        // Log time values for debugging
        const fromTimeValue = fromtime.value;
        const toTimeValue = totime.value;

        console.log("From Time: ", fromTimeValue);
        console.log("To Time: ", toTimeValue);

        // Convert to Date objects for comparison
        const fromTime = new Date(`1970-01-01T${fromTimeValue}:00`);
        const toTime = new Date(`1970-01-01T${toTimeValue}:00`);

        // Check time validity: from time must be before to time
        if (fromTime >= toTime) {
            totime.setCustomValidity("The 'To' time must be later than the 'From' time.");
            totime.reportValidity(); // Show the validation message
            return; // Stop submission if the time is not valid
        }

        // Check validity of each input field
        const isFormValid = fullname.reportValidity() && dateofuse.reportValidity() &&
            fromtime.reportValidity() && totime.reportValidity() &&
            course_year.reportValidity() && subject.reportValidity() &&
            requested_by.reportValidity() && message.reportValidity();

        if (!isFormValid) {
            return; // Stop submission if any field is invalid
        }

        // Collect items in the table
        const materialz = [];
        const rows = document.querySelectorAll("#ItemTable tr");

        rows.forEach(row => {
            const name = row.cells[0] ? row.cells[0].textContent.trim() : '';
            const qtyElement = row.querySelector("span p");
            const qty = qtyElement ? qtyElement.textContent.trim() : "0";
            const itemIdElement = row.querySelector("input.Stored_itemId");
            const itemId = itemIdElement ? itemIdElement.value : '';

            if (name && name !== "Name" && itemId) {
                materialz.push(`{"ItemID: ${itemId}","Qnty: ${qty}"}`);
            }
        });

        if (materialz.length === 0) {
            addbtnnn.setCustomValidity("You must add at least one material.");
            addbtnnn.reportValidity();
            return; // Stop submission if no materials are added
        }
        

        // Format materials for submission
        const formattedMaterials = materialz.join(',');
        document.querySelector("input[name='materialz']").value = formattedMaterials;

        // Prepare the data to be sent
        const formData = new FormData();
        formData.append('fullname', fullname.value.trim());
        formData.append('dateofuse', dateofuse.value);
        formData.append('fromtime', fromtime.value);
        formData.append('totime', totime.value);
        formData.append('course_year', course_year.value.trim());
        formData.append('subject', subject.value.trim());
        formData.append('requested_by', requested_by.value.trim());
        formData.append('Message', message.value.trim());
        formData.append('materialz', formattedMaterials);

        // Send data to the PHP script
        fetch('../PHP/ReservationForm_SubmitForm.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert("Submit successful!"); // Show alert
                window.location.href = '../../index.html'; // Redirect to HOME.html
            } else {
                throw new Error('Submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("There was an error with your submission.");
        });
    });
});







    




    //ITEM TABLE FETCHING
    const searchBox = document.getElementById('SearchBoxForItem');
    const ModelComboBox = document.getElementById('ModelComboBox');
    const CategoryComboBox = document.getElementById('CategoryComboBox');
    
    ModelComboBox.addEventListener('input', function() {        
        QRcodesearched = null;
        fetchItems(searchBox.value, ModelComboBox.value, CategoryComboBox.value); 
    });
    CategoryComboBox.addEventListener('input', function() {
        QRcodesearched = null;
        fetchItems(searchBox.value, ModelComboBox.value, CategoryComboBox.value);
    });
    searchBox.addEventListener('input', function() {
        QRcodesearched = null;
        fetchItems(searchBox.value, ModelComboBox.value, CategoryComboBox.value);
    });
    
    // ITEMS LISTS
    function fetchItems(searchTerm = '', model = '', category = '') {
        const params = {
            search: searchTerm,
            model: model,
            category: category
        };
        
        if (QRcodesearched) {
            params.Item_Id = QRcodesearched;
        }
        
        const query = new URLSearchParams(params).toString();
    
        fetch(`../PHP/ReservationForm_ListTheItems.php?${query}`)
            .then(response => response.json())
            .then(data => {
                const displayArea = document.getElementById('DisplayItemsHere');
                displayArea.innerHTML = ''; // Clear existing items
                if (data.length > 0) {
                    data.forEach(item => {
                        const button = document.createElement('button');
                        button.value = item.Item_Id;
                        if (QRcodesearched) {
                            document.getElementById('SearchBoxForItem').value = item.Item_Name;
                        }
                        button.onclick = () => handleButtonClick(item.Item_Id);
                        button.innerHTML = `<div class="button-content">
                                              <img src="../../Images_Stored/${item.Item_ImageLocation}" alt="${item.Item_Name}" class="button-image" />
                                              <h2 class="button-text">${item.Item_Name}</h2>
                                            </div>`;
                        
                        button.style.backgroundColor = '##ACACACFF'; // Remove default background color
                        button.style.border = 'none'; 
                        button.style.height = '150px'; // Adjust as needed
                        button.style.margin = '10px';
                        button.style.padding = '0'; // Remove padding (we'll handle it in the inner elements)
                        button.style.display = 'flex';
                        button.style.flexDirection = 'column'; // Stack image and text vertically
                        button.style.alignItems = 'center'; // Center-align text and image
                        button.style.justifyContent = 'flex-end'; // Ensure text stays at the bottom
                        button.style.borderRadius = '15px'; // Round the corners
                        button.style.overflow = 'hidden'; // Round the corners
                        // Add shadow effect
                        button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)'; // Simple shadow
                        button.style.transition = 'box-shadow 0.3s ease'; // Smooth transition on hover
                        
                        // Optional: Style the content within the button
                        const buttonContent = button.querySelector('.button-content');
                        buttonContent.style.display = 'flex';
                        buttonContent.style.flexDirection = 'column';
                        buttonContent.style.justifyContent = 'flex-end';
                        buttonContent.style.height = '100%';
                        buttonContent.style.width = '100%';

                        
                        // Optional: Style the image
                        const buttonImage = button.querySelector('.button-image');
                        buttonImage.style.height = '80%'; // Adjust to take most of the space
                        buttonImage.style.objectFit = 'cover'; // Ensure the image covers the area without distortion
                        
                        // Optional: Style the text
                        const buttonText = button.querySelector('.button-text');
                        buttonText.style.marginTop = 'auto'; // Push the text to the bottom
                        buttonText.style.textAlign = 'center'; // Center-align the text
                        buttonContent.style.fontSize = '10px';  // Set the font size to 10px
                        buttonText.style.marginBottom = '5px'; // Adjust the margin below the text as needed
                        buttonText.style.marginTop = '5px'; // Adjust the margin below the text as needed
                        buttonText.style.paddingLeft = '20px'; // Adds 5px of padding to the left of the text
                        buttonText.style.paddingRight = '20px'; // Adds 5px of padding to the right of the text

                        displayArea.appendChild(button);
                    });
                } else {
                    displayArea.innerHTML = '<p>No items found.</p>';
                }
            })
            .catch(error => console.error('Error fetching items:', error));
    }
    
    // Initial fetch
    fetchItems();
    





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
        






// SELECTED ITEMS GOES TO THE TABLE
function handleButtonClick(itemId) {
    document.getElementById("AddingMaterialsForm").style.display = "none";

    // Fetch item data from the server
    fetch(`../PHP/ReservationForm_ItemDataRetrieval.php?id=${itemId}`)
        .then(response => response.json())
        .then(itemData => {
            if (itemData && itemData.Item_Name) {
                // Create a new row
                const table = document.getElementById("ItemTable");
                const newRow = table.insertRow(-1); // Insert at the end of the table

                // Insert cells
                const cellName = newRow.insertCell(0);
                const cellQuantity = newRow.insertCell(1);
                const cellOperation = newRow.insertCell(2);

                // Fill cells with data
                cellName.textContent = itemData.Item_Name;

                // Prepare reservation data for potential conflict checking


                // Fetch availability data to check the item quantity

            const dateofuse = document.getElementById("dateofuse").value;
            const fromtime = document.getElementById("fromtime").value;
            const totime = document.getElementById("totime").value;

            // Example: Use these values in your fetch request
            fetch(`../PHP/ReservationForm_ItemDataCheckAvailability.php?Item_Id=${itemId}&dateofuse=${dateofuse}&fromtime=${fromtime}&totime=${totime}`)
                .then(response => response.json())
                .then(qntyFound => {
                    if (qntyFound !== null && qntyFound >= 0) {
                        const conflictedItemUsed = qntyFound;
                        const Available = itemData.Item_Available - conflictedItemUsed;
                        console.log(conflictedItemUsed+" - "+ itemData.Item_Available + " = " + Available);
                        cellQuantity.innerHTML = `
                            <span id="itemQty-${itemId}" style="height: 10px; display: flex; align-items: center; justify-content: center;">
                                <button onclick="updateQuantity('${itemId}', -1, ${Available})">−</button>
                                <p>0</p>
                                <button onclick="updateQuantity('${itemId}', 1, ${Available})">+</button>
                                <input type="hidden" class="Stored_itemId" value="${itemId}" />
                            </span>
                        `;
                    } else {
                        alert('Item not found or no availability data');
                    }
                })
                .catch(error => console.error('Error checking availability:', error));


                cellOperation.innerHTML = `
                    <button onclick="removeItem(this)">Remove −</button>
                `;
            } else {
                console.error('Item not found');
            }
        })
        .catch(error => console.error('Error fetching item data:', error));
}

function updateQuantity(itemId, change, maxAvailable) {
    const qtyElement = document.querySelector(`#itemQty-${itemId} p`); // Select the specific item's quantity
    let currentQty = parseInt(qtyElement.textContent);
    const newQty = Math.max(0, Math.min(maxAvailable, currentQty + change)); // Limit between 1 and maxAvailable
    qtyElement.textContent = newQty;
}

function removeItem(button) {
    const row = button.closest('tr');
    row.parentNode.removeChild(row);
}



        

document.getElementById('dateofuse').addEventListener('change', function() {
    const table = document.getElementById('ItemTable');
    // Clear any existing rows except for the header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
});
document.getElementById('fromtime').addEventListener('change', function() {
    const table = document.getElementById('ItemTable');
    // Clear any existing rows except for the header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
});
document.getElementById('totime').addEventListener('change', function() {
    const table = document.getElementById('ItemTable');
    // Clear any existing rows except for the header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
});
