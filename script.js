let fileData = {};
let generatedCode = '';

document.getElementById('uploadBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');
    const qrCodeDiv = document.getElementById('qrCode');
    const codeDiv = document.getElementById('code');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result;
            const fileName = file.name;
            fileData = {
                name: fileName,
                content: fileContent
            };

            // Generate a 6-digit code
            generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
            codeDiv.textContent = `6-digit code: ${generatedCode}`;

            // Generate QR code
            qrCodeDiv.innerHTML = '';
            new QRCode(qrCodeDiv, {
                text: JSON.stringify(fileData),
                width: 180,
                height: 180,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            // Display file info
            fileInfo.textContent = `File: ${fileName}`;
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select a file to upload.');
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const codeInput = document.getElementById('codeInput').value;

    if (codeInput === generatedCode) {
        const link = document.createElement('a');
        link.href = fileData.content;
        link.download = fileData.name;
        link.click();
    } else {
        alert('Invalid 6-digit code.');
    }
});

const contactForm = document.getElementById('contactForm');
const messageAlert = document.getElementById('messageAlert');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Add your form submission logic here, e.g., sending data to a server using AJAX
    // For this example, we'll simply display a success message:

    messageAlert.classList.remove('d-none');
    contactForm.reset();
});

function generateQRCode(data) {
    const qrcode = new QRCode(document.getElementById("qrcode"), {
      text: data,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }
  
  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const fileData = event.target.result;
      const dataURI = `data:application/octet-stream;base64,${btoa(fileData)}`;
      generateQRCode(dataURI);
    };
  
    reader.readAsBinaryString(file);
  }
  
  document.getElementById('fileInput').addEventListener('change', handleFileUpload);
  