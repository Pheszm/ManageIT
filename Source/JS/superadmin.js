//OPEN ADDING FORM
document.getElementById("AddbtnShow").addEventListener("click", function() {
    document.getElementById("AddingFacultyForm").style.display = "flex";
});

//CLOSE ADDING FORM
document.getElementById("extbtn").addEventListener("click", function() {
    document.getElementById("AddingFacultyForm").style.display = "none";
});


document.getElementById("Studentbtn").addEventListener("click", function() {
    window.location.href = 'SuperAdmin_Student.php';
});


//CLOSE DATA FORM
document.getElementById("extbtn1").addEventListener("click", function() {
    document.getElementById("CheckFacultyData").style.display = "none";
});



//LOGIN AUTH CHECKER
var facultyId;
document.addEventListener('DOMContentLoaded', function() {
    facultyId = sessionStorage.getItem('facultyId'); // Check sessionStorage for facultyId

    // If facultyId is not found, redirect to the login page
    if (!facultyId) {
        window.location.href = '../../index.php'; // Redirect to the login page if not authenticated
    }

    // If facultyId is found, proceed with page initialization
    else {
        console.log('Faculty ID:', facultyId); 
    }
});






document.getElementById('LogoutBtn').addEventListener('click', () => {
    Swal.fire({
        title: "Proceed Logout?",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Successfully Logged Out.",
                text: "Press okay to continue",
                icon: "success",
                confirmButtonColor: '#076AD4FF'
                }).then((result) => {
                if (result.isConfirmed) {
                    location.href='../../index.php';
                }else{
                    location.href='../../index.php';
                }
            });
        }
    });
});





// Fetch accounts and add event listeners to the View buttons
document.addEventListener("DOMContentLoaded", function() {
    fetch('../PHP/SuperAdmin_AccountsTableFetch.php')
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
    fetch(`../PHP/SuperAdmin_ViewDataFetch.php?id=${facultyId}`)
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




// ADDING FUNCTION
window.onload = function() {
    const facultyForm = document.getElementById('facultyForm');
    const phoneInput = document.getElementById('adding_phone');

    // Limit input to 11 digits
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 11); 
    });

    facultyForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Clear previous custom validity messages
        this.fullname.setCustomValidity('');
        this.email.setCustomValidity('');
        this.phone.setCustomValidity('');
        this.username.setCustomValidity('');
        this.password.setCustomValidity('');

        // Validate Full Name
        if (this.fullname.value.trim() === '') {
            this.fullname.setCustomValidity('Full Name is required.');
            this.fullname.reportValidity(); // Show message
            return; // Stop processing if validation fails
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        if (!emailPattern.test(this.email.value)) {
            this.email.setCustomValidity('Please enter a valid email address.');
            this.email.reportValidity(); // Show message
            return; // Stop processing if validation fails
        }

        // Validate Phone Number
        const phonePattern = /^\d{11}$/; // Check if exactly 10 digits
        if (!phonePattern.test(this.phone.value)) {
            this.phone.setCustomValidity('Please enter a valid 11-digit phone number.');
            this.phone.reportValidity(); // Show message
            return; // Stop processing if validation fails
        }

        // Validate Username
        if (this.username.value.trim().length < 5) {
            this.username.setCustomValidity('Username must be at least 5 characters long.');
            this.username.reportValidity(); // Show message
            return; // Stop processing if validation fails
        }

        // Validate Password
        if (this.password.value.trim().length < 6) {
            this.password.setCustomValidity('Password must be at least 6 characters long.');
            this.password.reportValidity(); // Show message
            return; // Stop processing if validation fails
        }

        // If all validations pass, proceed with the fetch
        const formData = {
            fullname: this.fullname.value,
            email: this.email.value,
            phone: this.phone.value,
            username: this.username.value,
            password: this.password.value,
        };

        try {
            Swal.fire({
                title: "Confirmation",
                text: "Are you sure you want to add this account?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await fetch('../PHP/SuperAdmin_AddingAccount.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData),
                        });
        
                        const result = await response.json();
        
                        if (result.success) {
                            Swal.fire({
                                title: "Account added successfully!",
                                text: "Press okay to continue",
                                icon: "success",
                                confirmButtonColor: '#076AD4FF'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                } else {
                                    location.reload();
                                }
                            });
                        } else {
                            // Set custom validity based on the errors returned
                            for (const field in result.errors) {
                                if (result.errors.hasOwnProperty(field)) {
                                    const inputField = this[field]; // Get the input field by name
                                    inputField.setCustomValidity(result.errors[field]);
                                    inputField.reportValidity(); // Show message
                                }
                            }
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        Swal.fire({
                            title: "Oops..",
                            text: 'An error occurred while adding the account. Please try again.',
                            icon: "error",  // Changed to 'error' for better representation of failure
                            confirmButtonColor: '#076AD4FF'
                        });
                    }
                }
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: "Oops..",
                text: 'An error occurred during the confirmation process. Please try again.',
                icon: "error",  // Changed to 'error' for better representation of failure
                confirmButtonColor: '#076AD4FF'
            });
        }
        
    });
};


// Clear previous custom validity messages
['adding_fullname', 'adding_email', 'adding_phone', 'adding_username', 'adding_password'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        this.setCustomValidity('');
    });
});










/// DELETE FUNCTION
document.getElementById("deleteBtn").addEventListener("click", function() {
    const facultyId = document.getElementById('view_facultyIdInput').value;
    deleteFaculty(facultyId);
});

// Function to delete specific faculty data
function deleteFaculty(facultyId) {
    Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to delete this data?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`../PHP/SuperAdmin_DeletingAccount.php?id=${facultyId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    Swal.fire({
                        title: "Faculty member deleted successfully.",
                        text: "Press okay to continue",
                        icon: "success",
                        confirmButtonColor: '#076AD4FF'
                        }).then((result) => {
                        if (result.isConfirmed) {
                            document.getElementById("CheckFacultyData").style.display = "none";
                            location.reload();
                        }else{
                            document.getElementById("CheckFacultyData").style.display = "none";
                            location.reload();
                        }
                    });
                } else {
                    Swal.fire({
                        title: "Oops..",
                        text: 'Error in deleting: ' + result.error,
                        icon: "success",
                        confirmButtonColor: '#076AD4FF'
                    })
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: "Oops..",
                    text: 'An error occurred while trying to delete the faculty member.',
                    icon: "success",
                    confirmButtonColor: '#076AD4FF'
                })
            });
        }
    });
}



//CLOSE ADDING FORM
document.getElementById("extbtn2").addEventListener("click", function() {
    document.getElementById("UpdateFacultyData").style.display = "none";
});









// UPDATE FUNCTION  
// Add event listener to the update button
document.getElementById("updateBtn").addEventListener("click", function() {
    const facultyId = document.getElementById('view_facultyIdInput').value;
    fetchFacultyUpdateData(facultyId); // Fetch the current faculty data
    document.getElementById("CheckFacultyData").style.display = "none";
});

function fetchFacultyUpdateData(facultyId) {
    fetch(`../PHP/SuperAdmin_ViewDataFetch.php?id=${facultyId}`)
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
    const fullname = document.getElementById('edit_fullname');
    const email = document.getElementById('edit_email');
    const phone = document.getElementById('edit_phone');
    const username = document.getElementById('edit_username');
    const password = document.getElementById('edit_password');
    const status = document.getElementById('edit_toggleSwitch').checked ? 1 : 0; // 1 for active, 0 for inactive

    // Clear previous custom validity messages
    fullname.setCustomValidity('');
    email.setCustomValidity('');
    phone.setCustomValidity('');
    username.setCustomValidity('');
    password.setCustomValidity('');

    // Validate fields
    if (fullname.value.trim() === '') {
        fullname.setCustomValidity('Full Name is required.');
        fullname.reportValidity();
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    if (!emailPattern.test(email.value)) {
        email.setCustomValidity('Please enter a valid email address.');
        email.reportValidity();
        return;
    }

    const phonePattern = /^\d{11}$/; // Check if exactly 11 digits
    if (!phonePattern.test(phone.value)) {
        phone.setCustomValidity('Please enter a valid 11-digit phone number.');
        phone.reportValidity();
        return;
    }

    if (username.value.trim().length < 5) {
        username.setCustomValidity('Username must be at least 5 characters long.');
        username.reportValidity();
        return;
    }

    if (password.value.trim().length < 6) {
        password.setCustomValidity('Password must be at least 6 characters long.');
        password.reportValidity();
        return;
    }

    // Prepare data to be sent in the request
    const updatedData = {
        faculty_id: document.getElementById('edit_facultyIdInput').value,
        fullname: fullname.value,
        email: email.value,
        phone: phone.value,
        username: username.value,
        password: password.value,
        status: status
    };


    
    Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to save these changes?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('../PHP/SuperAdmin_UpdateAccount.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) { 
                    Swal.fire({
                        title: "Faculty member updated successfully.",
                        text: "Press okay to continue",
                        icon: "success",
                        confirmButtonColor: '#076AD4FF'
                        }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload(); 
                        }else{
                            location.reload(); 
                        }
                    });
                } else {
                    result.errors.forEach(error => {
                        if (error.includes('Email')) {
                            email.setCustomValidity(error);
                            email.reportValidity();
                        }
                        if (error.includes('Phone number')) {
                            phone.setCustomValidity(error);
                            phone.reportValidity();
                        }
                        if (error.includes('Username')) {
                            username.setCustomValidity(error);
                            username.reportValidity();
                        }
                        if (error.includes('Full Name')) {
                            fullname.setCustomValidity(error);
                            fullname.reportValidity();
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error updating faculty member:', error);
                Swal.fire({
                    title: "Oops..",
                    text: "An error occurred while trying to update the faculty member.",
                    icon: "error",
                    confirmButtonColor: '#076AD4FF'
                    })
            });
        }
    });

});

// Clear custom validity messages on input change
['edit_fullname', 'edit_email', 'edit_phone', 'edit_username', 'edit_password'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        this.setCustomValidity('');
    });
});

// Limit input to 11 digits for phone
document.getElementById('edit_phone').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 11); 
});
