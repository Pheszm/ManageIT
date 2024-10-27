//OPEN ADD_MATERIALS FORM
document.getElementById("AddbtnShow").addEventListener("click", function() {
    document.getElementById("AddingMaterialsForm").style.display = "flex";
});

//CLOSE ADD_MATERIALS FORM
document.getElementById("exitbtn").addEventListener("click", function() {
    document.getElementById("AddingMaterialsForm").style.display = "none";
});







// CHECK IF DOM IS READY
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

            const searchBox = document.getElementById("SearchBoxForItem");
            if (searchBox) {
                searchBox.value = decodeText; // Set the input value
                document.getElementById("QRFormScanner").style.display = "none"; // Hide scanner
                htmlscanner.clear(); // Stop scanning when a QR code is detected
            }
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













// Collect materials before submitting the form
document.querySelector("form").onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission

    const materialz = [];
    const rows = document.querySelectorAll("#ItemTable tr");

    rows.forEach(row => {
        const name = row.cells[0] ? row.cells[0].textContent.trim() : ''; // Get the material name safely
        const qtyElement = row.querySelector("span p"); // Select the <p> inside <span>
        const qty = qtyElement ? qtyElement.textContent.trim() : "0"; // Get quantity safely
        const itemIdElement = row.querySelector("input.Stored_itemId"); // Select the hidden input for itemId
        const itemId = itemIdElement ? itemIdElement.value : ''; // Get the itemId safely

        // Only push valid entries (skip if name is empty or if it's the default placeholder)
        if (name && name !== "Name" && itemId) { // Check if name and itemId are not empty
            materialz.push(`{"${itemId}","${name}","${qty}"}`); // Format as requested
        }
    });

    // Create the final string without extra escaping
    const formattedMaterials = materialz.join(','); // Join with comma
    document.querySelector("input[name='materialz']").value = formattedMaterials; // Set the input value

    // Debugging: Check the value before submission
    console.log(formattedMaterials);

    // Now submit the form programmatically
    this.submit(); // This will submit the form after collecting the data
};






    // Check URL for success parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        alert("Submit successful!"); // Show alert
        window.location.href = '../../index.html'; // Redirect to HOME.html
    }
    


    
    const searchBox = document.getElementById('SearchBoxForItem');
    const ModelComboBox = document.getElementById('ModelComboBox');
    const CategoryComboBox = document.getElementById('CategoryComboBox');
    
    ModelComboBox.addEventListener('input', function() {
        fetchItems(searchBox.value, ModelComboBox.value, CategoryComboBox.value); 
    });
    CategoryComboBox.addEventListener('input', function() {
        fetchItems(searchBox.value, ModelComboBox.value, CategoryComboBox.value);
    });
    searchBox.addEventListener('input', function() {
        fetchItems(searchBox.value, ModelComboBox.value, CategoryComboBox.value);
    });
    
    function fetchItems(searchTerm = '', model = '', category = '') {
        const query = new URLSearchParams({ search: searchTerm, model: model, category: category }).toString();
    
        fetch(`../PHP/Reservation_Item_list.php?${query}`)
            .then(response => response.json())
            .then(data => {
                const displayArea = document.getElementById('DisplayItemsHere');
                displayArea.innerHTML = ''; // Clear existing items
                if (data.length > 0) {
                    data.forEach(item => {
                        const button = document.createElement('button');
                        button.value = item.Item_Id;
                        button.onclick = () => handleButtonClick(item.Item_Id);
                        button.innerHTML = `<h2>${item.Item_Name}</h2>`;
                        button.style.backgroundImage = `url('${item.Item_ImageLocation}')`;
                        button.style.backgroundSize = 'cover';
                        button.style.border = 'none'; 
                        button.style.height = '100px';
                        button.style.margin = '10px';
                        button.style.padding = '20px';
    
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
            fetch('../PHP/Fetch_Category_Reservation.php')
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
        










        function handleButtonClick(itemId) {
            console.log("Button clicked for item ID: " + itemId);
            document.getElementById("AddingMaterialsForm").style.display = "none";
        
            // Fetch item data from the server
            fetch(`../PHP/ItemData_Retrieval.php?id=${itemId}`)
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
        
                        // Use a unique ID for the quantity container
                        const qtyId = `itemQty-${itemId}`; 
                        cellQuantity.innerHTML = `
                            <span id="${qtyId}" style="height: 10px; display: flex;align-items: center; justify-content: center;">
                                <button onclick="updateQuantity('${itemId}', -1, ${itemData.Item_Available})">−</button>
                                <p>1</p>
                                <button onclick="updateQuantity('${itemId}', 1, ${itemData.Item_Available})">+</button>
                                <input type="hidden" class="Stored_itemId" value="${itemId}" />
                            </span>
                        `;
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
            const newQty = Math.max(1, Math.min(maxAvailable, currentQty + change)); // Limit between 1 and maxAvailable
            qtyElement.textContent = newQty;
        }
        
        function removeItem(button) {
            const row = button.closest('tr');
            row.parentNode.removeChild(row);
        }
        