//OPEN ADDING FORM
document.getElementById("AddbtnShow").addEventListener("click", function() {
    document.getElementById("AddingFacultyForm").style.display = "flex";
});

//CLOSE ADDING FORM
document.getElementById("extbtn").addEventListener("click", function() {
    document.getElementById("AddingFacultyForm").style.display = "none";
});


document.getElementById("Userbtn").addEventListener("click", function() {
    window.location.href = 'SuperAdmin.php';
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



// Fetch student accounts and add event listeners to the View buttons
document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById('ItemTable');
    const searchBox = document.getElementById('searchbox');

    // Function to fetch and display students based on a search query
    function fetchStudents(searchTerm = '') {
        fetch(`../PHP/SuperAdmin_StudentsTableFetch.php?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                // Clear existing rows before populating the table
                table.innerHTML = `
                    <tr>
                        <th>Student ID</th>
                        <th>Fullname</th>
                        <th>Department</th>
                        <th>Level</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>`;
                
                // Loop through the student data and populate the table
                data.forEach(student => {
                    const row = table.insertRow();
                    const studentIdCell = row.insertCell(0);
                    const fullNameCell = row.insertCell(1);
                    const departmentCell = row.insertCell(2);
                    const levelCell = row.insertCell(3);
                    const statusCell = row.insertCell(4);
                    const operationCell = row.insertCell(5);

                    // Populate table cells with student data
                    studentIdCell.innerText = student.Student_ID;
                    fullNameCell.innerText = student.Student_FullName;
                    departmentCell.innerText = student.Student_Department;  // Display Year/Course or 'N/A' if not available
                    levelCell.innerText = student.Student_Level;
                    statusCell.innerText = (student.Student_status == 1) ? 'Active🟢' : 'Inactive🔴';
                    operationCell.innerHTML = `<button class="view-button" data-id="${student.Student_No}">View</button>`;
                });

                // Add event listeners to the View buttons
                const viewButtons = document.querySelectorAll('.view-button');
                viewButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const studentNo = this.getAttribute('data-id');
                        fetchStudentData(studentNo); // You would implement this function to show detailed student data
                    });
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Initial fetch to load all students
    fetchStudents();

    // Add event listener to the search box to filter results as the user types
    searchBox.addEventListener('input', function() {
        const searchTerm = searchBox.value.trim(); // Get the current search term
        fetchStudents(searchTerm); // Fetch students with the search term
    });
});



// Function to fetch and display student details when 'View' button is clicked
function fetchStudentData(studentNo) {
    fetch(`../PHP/SuperAdmin_FetchStudentDetails.php?studentNo=${studentNo}`)
        .then(response => response.json())
        .then(student => {
            // Populate the student data into the modal
            document.getElementById('view_facultyIdInput').value = student.Student_No; // Hidden input for student ID
            document.getElementById('view_Id').innerText = student.Student_ID; // Student ID
            document.getElementById('view_Name').innerText = student.Student_FullName; // Full Name
            document.getElementById('view_Department').innerText = student.Student_Level || 'N/A'; // Department (Year or Course)
            document.getElementById('view_level').innerText = student.Student_Department || 'N/A'; // Level
            document.getElementById('view_status').innerText = (student.Student_status === 1) ? 'Active🟢' : 'Inactive🔴'; // Status

            // Show the student view modal (Make the modal visible)
            document.getElementById('CheckFacultyData').style.display = 'flex';
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });
}





// ADDING FUNCTION
window.onload = function() {
    const facultyForm = document.getElementById('facultyForm');
    const stuID = document.getElementById('adding_stuID');
    const fullname = document.getElementById('adding_fullname');
    const dept = document.getElementById('Dept');
    const level = document.getElementById('Level');

    facultyForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Clear previous custom validity messages
        stuID.setCustomValidity('');
        fullname.setCustomValidity('');
        dept.setCustomValidity('');
        level.setCustomValidity('');

        if (stuID.value.trim() === '') {
            stuID.setCustomValidity('Student ID is required.');
            stuID.reportValidity();
            return;
        }
        if (fullname.value.trim() === '') {
            fullname.setCustomValidity('Full Name is required.');
            fullname.reportValidity();
            return;
        }
        if (dept.value.trim() === '') {
            dept.setCustomValidity('Department is required.');
            dept.reportValidity();
            return;
        }
        if (level.value.trim() === '') {
            level.setCustomValidity('Level is required.');
            level.reportValidity();
            return;
        }
        

        // If all validations pass, proceed with the fetch
        const formData = {
            StuID: stuID.value,
            fullname: fullname.value,
            dept: dept.value,
            level: level.value
        };

        try {
            Swal.fire({
                title: "Confirmation",
                text: "Are you sure you want to add this student?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await fetch('../PHP/SuperAdmin_AddingStudent.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData),
                        });
        
                        const result = await response.json();
        
                        if (result.success) {
                            Swal.fire({
                                title: "Student added successfully!",
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
['adding_stuID', 'adding_fullname', 'Dept', 'Level'].forEach(id => {
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
    console.log(facultyId);
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
            fetch(`../PHP/SuperAdmin_DeletingStudent.php?id=${facultyId}`, {
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

function fetchFacultyUpdateData(studentNo) {
    fetch(`../PHP/SuperAdmin_FetchStudentDetails.php?studentNo=${studentNo}`)
        .then(response => response.json())
        .then(student => {
            if (student.error) {
                alert(student.error);
                return;
            }




            // Populate the update form fields
            document.getElementById('edit_facultyIdInput').value = student.Student_No;
            document.getElementById('edit_StuID').value = student.Student_ID|| '';
            document.getElementById('edit_FullName').value = student.Student_FullName || '';
            document.getElementById('edit_Department').value = student.Student_Department || '';
            document.getElementById('edit_Level').value = student.Student_Level || '';

            // Set the status toggle based on the faculty status
            document.getElementById('edit_toggleSwitch').checked = (student.Student_status == 1);

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
    const StuID = document.getElementById('edit_StuID');
    const fullname = document.getElementById('edit_FullName');
    const dept = document.getElementById('edit_Department');
    const level = document.getElementById('edit_Level');
    const status = document.getElementById('edit_toggleSwitch').checked ? 1 : 0; 

    // Clear previous custom validity messages
    StuID.setCustomValidity('');
    fullname.setCustomValidity('');
    dept.setCustomValidity('');
    level.setCustomValidity('');

    
    // Validate fields
    if (StuID.value.trim() === '') {
        StuID.setCustomValidity('Student ID is required.');
        StuID.reportValidity();
        return;
    }
    
    if (fullname.value.trim() === '') {
        fullname.setCustomValidity('Full Name is required.');
        fullname.reportValidity();
        return;
    }
    
    if (dept.value.trim() === '') {
        dept.setCustomValidity('Department is required.');
        dept.reportValidity();
        return;
    }
    
    if (level.value.trim() === '') {
        level.setCustomValidity('Level is required.');
        level.reportValidity();
        return;
    }



    // Prepare data to be sent in the request
    const updatedData = {
        StudentNo: document.getElementById('edit_facultyIdInput').value,
        StuID: StuID.value,
        fullname: fullname.value,
        dept: dept.value,
        level: level.value,
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
            fetch('../PHP/SuperAdmin_UpdateStudent.php', {
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
['edit_StuID', 'edit_FullName', 'edit_Department', 'edit_Level'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        this.setCustomValidity('');
    });
});
