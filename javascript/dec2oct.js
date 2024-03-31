// Get the input elements
const decInp = document.getElementById("dec-inp");
const octInp = document.getElementById("oct-inp");
const binInp = document.getElementById("bin-inp");
const hexInp = document.getElementById("hex-inp");
const errorMsg = document.getElementById("error-msg");
const binCheckbox = document.getElementById("bin-checkbox");
const hexCheckbox = document.getElementById("hex-checkbox");

// Hide binary and hexadecimal input fields initially
binInp.style.display = "none";
binInp.previousElementSibling.style.display = "none";
hexInp.style.display = "none";
hexInp.previousElementSibling.style.display = "none";

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

  // Show/hide hexadecimal input field based on hexadecimal checkbox state
  if (hexCheckbox.checked) {
    hexInp.style.display = "block";
    hexInp.previousElementSibling.style.display = "block";
    // Convert decimal to hexadecimal and display
    let decValue = parseInt(decInp.value);
    hexInp.value = decValue.toString(16).toUpperCase();
  } else {
    hexInp.style.display = "none";
    hexInp.previousElementSibling.style.display = "none";
    hexInp.value = ""; // Clear hexadecimal input field
  }
}

// Listen for changes in the binary checkbox state
binCheckbox.addEventListener("change", handleCheckboxChange);

// Listen for changes in the hexadecimal checkbox state
hexCheckbox.addEventListener("change", handleCheckboxChange);

// Convert decimal to octal when user inputs in the decimal field
decInp.addEventListener("input", () => {
  let decValue = parseInt(decInp.value);
  
  // Convert to octal and display
  octInp.value = decValue.toString(8);

  // Convert to binary if binary checkbox is checked
  if (binCheckbox.checked) {
    binInp.value = decValue.toString(2);
  }
  
  // Convert to hexadecimal if hexadecimal checkbox is checked
  if (hexCheckbox.checked) {
    hexInp.value = decValue.toString(16).toUpperCase();
  }
});

// Convert octal to decimal when user inputs in the octal field
octInp.addEventListener("input", () => {
  let octValue = octInp.value;
  
  if (octValidator(octValue)) {
    let decValue = parseInt(octValue, 8);
    decInp.value = decValue;
    errorMsg.textContent = "";
  } else {
    decInp.value = "";
    errorMsg.textContent = "Please Enter A Valid Octal Input";
  }

  // Convert to binary if binary checkbox is checked
  if (binCheckbox.checked) {
    let decValue = parseInt(octValue, 8);
    binInp.value = decValue.toString(2);
  }
  
  // Convert to hexadecimal if hexadecimal checkbox is checked
  if (hexCheckbox.checked) {
    let decValue = parseInt(octValue, 8);
    hexInp.value = decValue.toString(16).toUpperCase();
  }
});

// Function to validate octal input
function octValidator(num) {
  for (let i = 0; i < num.length; i++) {
    if (num[i] < "0" || num[i] > "7") {
      return false;
    }
  }
  return true;
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
