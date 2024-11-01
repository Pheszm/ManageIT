    const toggleButton = document.getElementById('ToggleHidePassword');
    const passwordInput = document.getElementById('Passwordinput');

    toggleButton.addEventListener('click', () => {
        const isPasswordVisible = passwordInput.type === 'text';
        
        // Toggle the password visibility
        passwordInput.type = isPasswordVisible ? 'password' : 'text';
        
        // Update the button text accordingly
        toggleButton.textContent = isPasswordVisible ? 'Show' : 'Hide';
    });







// LOGIN PROCESS
document.getElementById('loginbtnhero').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('Usernameinput').value;
    const password = document.getElementById('Passwordinput').value;

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
            // Redirect to Admin_Home.html with FacultyId as a query parameter
            alert("Successfully Login.");
            window.location.href = `Source/HTML/Admin_Home.html?facultyId=${result.facultyId}`;
        } else {
            // Display error message
            alert(result.message);
        }
    } catch (error) {
            console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});