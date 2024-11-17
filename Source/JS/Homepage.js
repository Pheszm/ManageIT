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
    const facultyId = sessionStorage.getItem('facultyId');
    console.log('Faculty ID:', facultyId); // Example: just logging the facultyId

};





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

            alert("Successfully Logged In.");
            // Redirect to Admin_Home.html with facultyId (as part of URL, or we can just rely on sessionStorage)
            window.location.href = `Source/HTML/Admin_Home.html`;
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
