<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="Source/CSS/Poppins_Sheet.css" rel="stylesheet">
    <link href="Source/CSS/Homepage.css" rel="stylesheet">
    <link rel="icon" href="Assets/Images/ManageIT_Logo.png">
    <link rel="stylesheet" href="Source/CSS/SweetAlert.css">

    <title>ManageIT | AVR Inventory System</title>
</head>

<body>
    <div id="TopNavBar">
        <div id="NavBackground"></div>
        <img id="ManageIT_NavLogo" src="Assets/Images/ManageIT_Logo.png" alt="MANAGEIT LOGO">
        <img id="SRCB_BackgroundIMG" src="Assets/Images/SRCB_Logo.png" alt="SRCB LOGO">

        <div id="NavButtons">
            <button class="simpleNav_btn" onclick="location.href='#HowToUseSection';">How to Use</button>
            <button class="simpleNav_btn" onclick="location.href='#AboutUsSection';">About Us</button>
            <button class="simpleNav_btn" onclick="location.href='#ContactUsSection';">Contact Us</button>
            <button class="simpleNav_btn" id="AdvanceNav_btn" onclick="location.href='#Hero';">Login</button>
        </div>
    </div>

    <div id="Hero">
        <!--
        <div id="BlueEffectHero"></div>
        <span id="BlurEffect">GG</span> 
        -->
        <span id="HeroTag">
            <h1 id="ManageitTitle">ManageIT</h1>
            <h1 id="HeroSubtitle">AVR Inventory</h1>
            <h2 id="HeroTagline">Here We Manage</h2>
            <span>
                <br>
                <button class="KnowMoreHero_btn" onclick="location.href='#AboutUsSection';">Know More</button>
                <button class="ReserveNowHero_btn" onclick="location.href='Source/PAGES/ReservationForm.php';">Reserve Now</button>
            </span>
        </span>

        <div id="LoginForm">
            <span id="LoginTitle">
                <h1>LOGIN</h1>
                <img id="SrcbLogoLogin" src="Assets/Images/SRCB_Logo.png" alt="SRCB LOGO">
            </span>

            <form>
                <input type="text" id="Usernameinput" placeholder="Username.." required>
                <div id="passwarea">
                    <input type="password" id="Passwordinput" placeholder="Password.." required>
                    <a id="ToggleHidePassword"><img id="PasswordHideIcon" src="Assets/Images/Show_Password_Icon.png"></a>
                </div>
                <button id="loginbtnhero" type="button">Login</button>
            </form>
        </div>
    </div>



    <div id="AboutUsSection">
        <img id="CurveShape1" src="Assets/Images/CurveShapes.png">
        <span id="AboutUsTexts">
            <h1>About Us</h1>
            <p>Welcome to St. Rita’s College of Balingasag! We are dedicated to empowering students through innovative education in Information Technology. Our ManageIT project aims to revolutionize inventory management for AVR Inventory Coordinator, streamlining processes with real-time tracking and enhanced data organization. Join us on our journey to improve operational efficiency and support informed decision-making in today's fast-paced business environment.</p>
            <button class="ContactUsBtn" onclick="location.href='#ContactUsSection';">Contact Us</button>
        </span>

        <video controls>
            <source src="" type="video/mp4">
        </video>
    </div>


    <div id="HowToUseSection">
        <video controls>
            <source src="" type="video/mp4">
        </video>

        <span id="HowToUseText">
            <h1>How To Use</h1>
            <p>To use ManageIT, log in with your credentials or contact the IT department to register an account. On the dashboard, explore key metrics and alerts. Track inventory by viewing stock levels and using filters for specific items. Easily retrieve information with QR codes. To reserve an item, select it to check availability and complete the reservation. Utilize the reporting tools to analyze inventory trends. For a visual guide, check out our demonstration video!</p>
            <button class="GetstartedBtn" onclick="location.href='#Hero';">Get Started</button>
        </span>
    </div>


    <div id="ContactUsSection">
        <img id="CurveShape2" src="Assets/Images/CurveShapes.png">

        <span id="FormwithTitle">
            <h1 id="contactustitle">Contact Us</h1>
            <div id="ContactUsForm">
                <div id="ContactFillupArea">
                    <span id="AreaToFill">
                        <img id="SRCB_BackgroundIMG_Contacts" src="Assets/Images/SRCB_Logo.png" alt="SRCB LOGO">

                        <span id="FillupContactsArea">
                            <h1>Email Us</h1>
                            <form style="text-align: center;">
                                <input type="text" id="Fullnameinput" name="Fullname" placeholder="Fullname.." required>
                                <input type="email" id="EmailAddressinput" name="EmailAddress" placeholder="Email Address.." required>
                                <textarea id="Messageinput" name="Message" placeholder="Message.." required></textarea>
                                <input id="SubmitBtnContact" type="submit" value="Login">
                            </form>
                        </span>

                        <div id="ContactsArea">
                            <h2>You May Also Reach Us</h2>
                            <span>
                                <img id="contact_icons" src="Assets/Images/Location_icon.png" alt="Location icon">
                                <a target="_blank" href="https://www.google.com/maps/place/St.+Rita's+College+of+Balingasag/@8.7429039,124.7322957,13.75z/data=!4m6!3m5!1s0x32ffe1f6278f7e77:0x6048de1929e6e531!8m2!3d8.7427387!4d124.7744357!16s%2Fm%2F0h3q9zv?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D">Brgy. 3 Balingasag Mis. Or.</a>
                            </span>
                            <span>
                                <img id="contact_icons" src="Assets/Images/Phone_icon.png" alt="Location icon">
                                <a target="_blank" href="tel:+1234567890">(+63) 987 654 3210</a>
                            </span>
                            <span>
                                <img id="contact_icons" src="Assets/Images/Email_icon.png" alt="Location icon">
                                <a target="_blank" href="mailto:s.ma.ilinsalvador@srcb.edu.ph">s.ma.ilinsalvador@srcb.edu.ph</a>
                            </span>
                            <span>
                                <img id="contact_icons" src="Assets/Images/FB_icon.png" alt="Location icon">
                                <a target="_blank" href="https://www.facebook.com/srcbofficial">https://www.facebook.com/srcb</a>
                            </span>
                        </div>

                    </span>
                </div>
            </div>
        </span>
    </div>


    <div id="FooterSection">
        <table>
            <tr>
                <td>
                    <img id="FooterLogos" src="Assets/Images/ManageIT_Logo.png" alt="MANAGEIT LOGO">
                </td>
                <td>
                    <h1>Useful Links</h1>
                    <a href="#HowToUseSection">How to Use</a>
                    <br>
                    <a href="#ContactUsSection">Contact Us</a>
                    <br>
                    <a href="#AboutUsSection">About Us</a>
                    <br>
                    <a href="#Hero">Login</a>
                </td>
                <td>
                    <img id="FooterLogos" src="Assets/Images/SRCB_Logo.png" alt="SRCB LOGO">
                    <img id="FooterLogos" src="Assets/Images/BSIT_Logo.png" alt="IT LOGO">
                </td>
            </tr>
        </table>
        <h2>©  2024 - ManageIT, All Rights Reserved</h2>
    </div>

    <script src="Source/JS/SweetAlert.js"></script>
    <script src="Source/JS/Homepage.js"></script>
</body>

</html>


<!-- https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap%22%20rel=%22stylesheet -->