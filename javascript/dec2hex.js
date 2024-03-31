// Get the input elements
const decInp = document.getElementById("dec-inp");
const hexInp = document.getElementById("hex-inp");
const binInp = document.getElementById("bin-inp");
const octInp = document.getElementById("oct-inp");
const errorMsg = document.getElementById("error-msg");
const binCheckbox = document.getElementById("bin-checkbox");
const octCheckbox = document.getElementById("oct-checkbox");

// Hide binary and octal input fields initially
binInp.style.display = "none";
binInp.previousElementSibling.style.display = "none";
octInp.style.display = "none";
octInp.previousElementSibling.style.display = "none";

// Function to handle checkbox change events
function handleCheckboxChange() {
  // Show/hide binary input field based on binary checkbox state
  if (binCheckbox.checked) {
    binInp.style.display = "block";
    binInp.previousElementSibling.style.display = "block";
    // Convert decimal to binary and display
    let decValue = parseInt(decInp.value);
    binInp.value = decValue.toString(2);
  } else {
    binInp.style.display = "none";
    binInp.previousElementSibling.style.display = "none";
    binInp.value = ""; // Clear binary input field
  }

  // Show/hide octal input field based on octal checkbox state
  if (octCheckbox.checked) {
    octInp.style.display = "block";
    octInp.previousElementSibling.style.display = "block";
    // Convert decimal to octal and display
    let decValue = parseInt(decInp.value);
    octInp.value = decValue.toString(8);
  } else {
    octInp.style.display = "none";
    octInp.previousElementSibling.style.display = "none";
    octInp.value = ""; // Clear octal input field
  }
}

// Listen for changes in the binary checkbox state
binCheckbox.addEventListener("change", handleCheckboxChange);

// Listen for changes in the octal checkbox state
octCheckbox.addEventListener("change", handleCheckboxChange);

// Convert decimal to hexadecimal when user inputs in the decimal field
decInp.addEventListener("input", () => {
  let decValue = parseInt(decInp.value);
  
  // Convert to hexadecimal and display
  hexInp.value = decValue.toString(16).toUpperCase();

  // Convert to binary if binary checkbox is checked
  if (binCheckbox.checked) {
    binInp.value = decValue.toString(2);
  }
  
  // Convert to octal if octal checkbox is checked
  if (octCheckbox.checked) {
    octInp.value = decValue.toString(8);
  }
});

// Convert hexadecimal to decimal when user inputs in the hexadecimal field
hexInp.addEventListener("input", () => {
  const hexValue = hexInp.value.toUpperCase();

  if (hexValidator(hexValue)) {
    const decValue = hexToDec(hexValue);
    if (!isNaN(decValue)) {
      decInp.value = decValue;
      errorMsg.textContent = "";
    } else {
      decInp.value = "";
      errorMsg.textContent = "Invalid hexadecimal input";
    }
  } else {
    decInp.value = "";
    errorMsg.textContent = "Please Enter A Valid Hexadecimal Input";
  }
});

// Function to validate hexadecimal input
function hexValidator(num) {
  return /^[0-9A-F]+$/i.test(num);
}

// Function to convert hexadecimal to decimal
function hexToDec(hex) {
  return parseInt(hex, 16);
}

// Event listener for mouseenter event to group binary digits into sets of 4 when hovered
binInp.addEventListener("mouseenter", () => {
  formatBinaryInput(true);
});

// Event listener for mouseleave event to ungroup binary digits when not hovered
binInp.addEventListener("mouseleave", () => {
  formatBinaryInput(false);
});

// Function to format binary input based on grouping preference
function formatBinaryInput(group) {
  let binaryValue = binInp.value.replace(/\s/g, ''); // Remove existing spaces
  if (group) {
    // Group binary digits into sets of 4
    binaryValue = binaryValue.split('').reverse().join('').replace(/(\d{4})(?=\d)/g, '$1 ').split('').reverse().join('');
  } else {
    // Remove grouping of binary digits
    binaryValue = binaryValue.replace(/\s/g, '');
  }
  binInp.value = binaryValue;
}
