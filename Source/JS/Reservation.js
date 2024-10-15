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
