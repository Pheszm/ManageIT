//OPEN ADDING FORM
document.getElementById("AddbtnShow").addEventListener("click", function() {
    document.getElementById("AddingFacultyForm").style.display = "flex";
});

//CLOSE ADDING FORM
document.getElementById("extbtn").addEventListener("click", function() {
    document.getElementById("AddingFacultyForm").style.display = "none";
});




//CLOSE DATA FORM
document.getElementById("extbtn1").addEventListener("click", function() {
    document.getElementById("CheckFacultyData").style.display = "none";
});







// Fetch accounts and add event listeners to the View buttons
document.addEventListener("DOMContentLoaded", function() {
    fetch('../Source/PHP/SuperAdmin_AccountsTableFetch.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('ItemTable');

            data.forEach(faculty => {
                const row = table.insertRow();
                const nameCell = row.insertCell(0);
                const statusCell = row.insertCell(1);
                const operationCell = row.insertCell(2);

                nameCell.innerHTML = `<input hidden value="${faculty.faculty_id}">${faculty.faculty_full_name}`;
                statusCell.innerText = (faculty.faculty_status == 1) ? 'Active🟢' : 'Inactive🔴';
                operationCell.innerHTML = `<button class="view-button" data-id="${faculty.faculty_id}">View</button>`;
            });

            // Add event listeners to the View buttons
            const viewButtons = document.querySelectorAll('.view-button');
            viewButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const facultyId = this.getAttribute('data-id');
                    fetchFacultyData(facultyId);
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});


// Function to fetch specific faculty data
function fetchFacultyData(facultyId) {
    fetch(`../Source/PHP/SuperAdmin_ViewDataFetch.php?id=${facultyId}`)
        .then(response => response.json())
        .then(faculty => {
            if (faculty.error) {
                alert(faculty.error);
                return;
            }

            document.getElementById('view_fullname').innerText = faculty.faculty_full_name || 'N/A';
            document.getElementById('view_email').innerText = faculty.faculty_email_address || 'N/A';
            document.getElementById('view_phone').innerText = faculty.faculty_phone_number || 'N/A';
            document.getElementById('view_username').innerText = faculty.faculty_username || 'N/A';
            document.getElementById('view_password').innerText = faculty.faculty_password || 'N/A';

            const statusText = faculty.faculty_status == 1 ? 'Active🟢' : 'Inactive🔴';
            document.getElementById('view_status').innerText = statusText;

            document.getElementById('view_facultyIdInput').value = faculty.faculty_id;
            document.getElementById("CheckFacultyData").style.display = "flex";
        })
        .catch(error => {
            console.error('Error fetching faculty details:', error);
            alert('An error occurred while fetching faculty details.');
        });
}


///HIDE UNHIDE PASSWORD
document.getElementById("hidebtn").addEventListener("click", function() {
    const hiddenPassword = document.getElementById("hided_password");
    const viewPassword = document.getElementById("view_password");
    
    if (hiddenPassword.style.display === "none") {
        hiddenPassword.style.display = "block";
        viewPassword.style.display = "none";
        this.innerText = "Show";
    } else {
        hiddenPassword.style.display = "none";
        viewPassword.style.display = "block";
        this.innerText = "Hide";
    }
});



/// ADDING FUNCTION
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        alert('Adding was successful!');
        window.location.href = '../admin';
    } else if (urlParams.has('error')) {
        alert('Error: ' + urlParams.get('error'));
    }
};








/// DELETE FUNCTION
document.getElementById("deleteBtn").addEventListener("click", function() {
    const facultyId = document.getElementById('view_facultyIdInput').value;
    if (confirm('Are you sure you want to delete this faculty member?')) {
        deleteFaculty(facultyId);
    }
});

// Function to delete specific faculty data
function deleteFaculty(facultyId) {
    fetch(`../Source/PHP/SuperAdmin_DeletingAccount.php?id=${facultyId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Faculty member deleted successfully.');
            // Optionally, you can refresh the table or close the data form
            document.getElementById("CheckFacultyData").style.display = "none";
            // You may also want to refresh the table here
            location.reload(); // Reload the page or fetch the updated data
        } else {
            alert('Error deleting faculty member: ' + result.error);
        }
    })
    .catch(error => {
        console.error('Error deleting faculty member:', error);
        alert('An error occurred while trying to delete the faculty member.');
    });
}








// UPDATE FUNCTION
//CLOSE ADDING FORM
document.getElementById("extbtn2").addEventListener("click", function() {
    document.getElementById("UpdateFacultyData").style.display = "none";
});

// Add event listener to update button
document.getElementById("updateBtn").addEventListener("click", function() {
    const facultyId = document.getElementById('view_facultyIdInput').value;
    fetchFacultyUpdateData(facultyId); // Fetch the current faculty data
    document.getElementById("CheckFacultyData").style.display = "none";
});

function fetchFacultyUpdateData(facultyId) {
    fetch(`../Source/PHP/SuperAdmin_ViewDataFetch.php?id=${facultyId}`)
        .then(response => response.json())
        .then(faculty => {
            if (faculty.error) {
                alert(faculty.error);
                return;
            }

            // Populate the update form fields
            document.getElementById('edit_facultyIdInput').value = faculty.faculty_id;
            document.getElementById('edit_fullname').value = faculty.faculty_full_name || '';
            document.getElementById('edit_email').value = faculty.faculty_email_address || '';
            document.getElementById('edit_phone').value = faculty.faculty_phone_number || '';
            document.getElementById('edit_username').value = faculty.faculty_username || '';
            document.getElementById('edit_password').value = faculty.faculty_password || '';

            // Set the status toggle based on the faculty status
            document.getElementById('edit_toggleSwitch').checked = (faculty.faculty_status == 1);

            // Show the update form
            document.getElementById("UpdateFacultyData").style.display = "flex";
        })
        .catch(error => {
            console.error('Error fetching faculty details:', error);
            alert('An error occurred while fetching faculty details.');
        });
}

// Add event listener to the Save button
document.getElementById("Savebtn").addEventListener("click", function() {
    const fullname = document.getElementById('edit_fullname').value;
    const email = document.getElementById('edit_email').value;
    const phone = document.getElementById('edit_phone').value;
    const username = document.getElementById('edit_username').value;
    const password = document.getElementById('edit_password').value;
    const status = document.getElementById('edit_toggleSwitch').checked ? 1 : 0; // 1 for active, 0 for inactive

    // Prepare data to be sent in the request
    const updatedData = {
        faculty_id: document.getElementById('edit_facultyIdInput').value, // Include faculty_id
        fullname: fullname,
        email: email,
        phone: phone,
        username: username,
        password: password,
        status: status
    };
    

    // Confirm action
    if (confirm("Are you sure you want to save these changes?")) {
        // Send a PUT request to update faculty data
        fetch('../Source/PHP/SuperAdmin_UpdateAccount.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Faculty member updated successfully.');
                document.getElementById("UpdateFacultyData").style.display = "none";
                location.reload(); // Reload the page or refresh the data
            } else {
                alert('Error updating faculty member: ' + result.error);
            }
        })
        .catch(error => {
            console.error('Error updating faculty member:', error);
            alert('An error occurred while trying to update the faculty member.');
        });
    } else {
    }
});

