    const toggleButton = document.getElementById('ToggleHidePassword');
    const passwordInput = document.getElementById('Passwordinput');
    const passwordIcon = document.getElementById('PasswordHideIcon');
    toggleButton.addEventListener('click', () => {
        const isPasswordVisible = passwordInput.type === 'text';
        
        // Toggle the password visibility
        passwordInput.type = isPasswordVisible ? 'password' : 'text';
        
        // Update the button text accordingly
        passwordIcon.src = isPasswordVisible ? 'Assets/Images/Show_Password_Icon.png' : 'Assets/Images/Hide_Password_Icon.png';

    });







//CLEAR ACCOUNT SESSIONSTORAGE
window.onload = function() {
    sessionStorage.removeItem('facultyId');
    sessionStorage.removeItem('StudentID');
    sessionStorage.removeItem('StudentID');

};

document.getElementById("ExitLoginForm").addEventListener("click", function() {
    document.getElementById("AdminLoginAreaa").style.display = "none";
});

document.getElementById("SelectAdmin").addEventListener("click", function() {
    document.getElementById("AdminLoginAreaa").style.display = "flex";
});



// LOGIN PROCESS
document.getElementById('loginbtnhero').addEventListener('click', async (event) => {

    event.preventDefault(); // Prevent the default form submission

    const usernameInput = document.getElementById('Usernameinput');
    const passwordInput = document.getElementById('Passwordinput');

    // Clear previous custom validity messages
    usernameInput.setCustomValidity('');
    passwordInput.setCustomValidity('');

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Input validation
    if (!username || !password) {
        if (!username) {
            usernameInput.setCustomValidity("Please fill in the username.");
        }
        if (!password) {
            passwordInput.setCustomValidity("Please fill in the password.");
        }
        passwordInput.reportValidity(); // Show the message
        usernameInput.reportValidity(); // Show the message
        return;
    }

    if (username.length < 5) {
        usernameInput.setCustomValidity("Username must be at least 5 characters long.");
        usernameInput.reportValidity(); // Show the message
        return;
    }

    if (password.length < 6) {
        passwordInput.setCustomValidity("Password must be at least 6 characters long.");
        passwordInput.reportValidity(); // Show the message
        return;
    }

    // If all validations pass, proceed with the login
    try {
        const response = await fetch('Source/PHP/Homepage_LoginProcess.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (result.success) {
            // Store the facultyId in sessionStorage (or localStorage)
            sessionStorage.setItem('facultyId', result.facultyId); // Store facultyId in sessionStorage
            if(result.faculty_role !== "admin"){
                Swal.fire({
                    title: "Successfully Logged In as Faculty.",
                    text: "Press okay to continue",
                    icon: "success",
                    confirmButtonColor: '#076AD4FF'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = `Source/PAGES/Admin_Home.php`;
                    }else{
                        window.location.href = `Source/PAGES/Admin_Home.php`;
                    }
                });
            }else{
                Swal.fire({
                    title: "Successfully Logged In as ADMIN.",
                    text: "Press okay to continue",
                    icon: "success",
                    confirmButtonColor: '#076AD4FF'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = `Source/PAGES/SuperAdmin.php`;
                    }else{
                        window.location.href = `Source/PAGES/SuperAdmin.php`;
                    }
                });
            }
        } else {
            // Handle server response errors
            usernameInput.setCustomValidity(result.message);
            usernameInput.reportValidity(); // Show the message
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});





// QR FUNCTIONALITY FOR STUDENT LOGIN
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
            htmlscanner.clear(); 
            QRcodesearched = decodeText;
            StudentLoginProcess(QRcodesearched);
        }
    }

    // Start scanning when scan button is clicked
    document.getElementById("SelectStudent").addEventListener("click", function() {
        document.getElementById("StudentLoginAreaa").style.display = "flex"; // Show scanner
        lastResult = null; // Reset lastResult
        countResults = 0; // Reset count
        htmlscanner = new Html5QrcodeScanner("my-qr-reader", { fps: 10, qrbox: 250 });
        htmlscanner.render(onScanSuccess);
    });

    // Close scanner when exit button is clicked
    document.getElementById("QReeexitbtn").addEventListener("click", function() {
        document.getElementById("StudentLoginAreaa").style.display = "none"; // Hide scanner
        toReserve = false;
        if (htmlscanner) {
            htmlscanner.clear(); // Stop the scanner
        }
    });

    document.getElementById("ReserveNowHero_btn").addEventListener("click", function() {
        document.getElementById("StudentLoginAreaa").style.display = "flex"; // Show scanner
        lastResult = null; // Reset lastResult
        countResults = 0; // Reset count
        toReserve = true;
        htmlscanner = new Html5QrcodeScanner("my-qr-reader", { fps: 10, qrbox: 250 });
        htmlscanner.render(onScanSuccess);
    });
});




var toReserve = "";


// STUDENT LOGIN PROCESS
function StudentLoginProcess(ScannedStudentID) {
    // Remove the "ID-" prefix from the scanned Student ID
    const StudentID = ScannedStudentID.replace('ID-', '');  

    try {
        // Make the API call to the PHP script for authentication
        fetch('Source/PHP/Homepage_StudentLoginProcess.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ student_id: StudentID })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('StudentID', StudentID); // Store StudentID in sessionStorage
                Swal.fire({
                    title: "Successfully Logged In as Student.",
                    text: "Press okay to continue",
                    icon: "success",
                    confirmButtonColor: '#076AD4FF'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if(toReserve === true){
                            sessionStorage.setItem('ReturnToHome', 'false');
                            window.location.href = `Source/PAGES/ReservationForm.php`;
                        }else{
                            sessionStorage.setItem('ReturnToHome', 'false');
                            window.location.href = `Source/PAGES/Student_Home.php`;
                        }
                    }else{
                        if(toReserve === true){
                            sessionStorage.setItem('ReturnToHome', 'false');
                            window.location.href = `Source/PAGES/ReservationForm.php`;
                        }else{
                            sessionStorage.setItem('ReturnToHome', 'false');
                            window.location.href = `Source/PAGES/Student_Home.php`;
                        }
                    }
                });
            } else {
                Swal.fire({
                    title: "Login Failed.",
                    text: data.message,
                    icon: "error",
                    confirmButtonColor: '#076AD4FF'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload(true);
                    }else{
                        location.reload(true);
                    }
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: "Login Failed.",
                text: 'Error: '+ error,
                icon: "error",
                confirmButtonColor: '#076AD4FF'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload(true);
                }else{
                    location.reload(true);
                }
            });
        });
    } catch (error) {
        Swal.fire({
            title: "Login Failed.",
            text: 'Error in StudentLoginProcess:' + error,
            icon: "error",
            confirmButtonColor: '#076AD4FF'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload(true);
            }else{
                location.reload(true);
            }
        });
    }
}
