// Get the input elements
const decInp = document.getElementById("dec-inp");
const binInp = document.getElementById("bin-inp");
const complementInp = document.getElementById("complement-inp");
const errorMsg = document.getElementById("error-msg");
const groupingCheckbox = document.getElementById("grouping-checkbox");
const octCheckbox = document.getElementById("oct-checkbox");
const hexCheckbox = document.getElementById("hex-checkbox");
const octalInp = document.getElementById("oct-inp");
const hexInp = document.getElementById("hex-inp");

// Hide octal and hexadecimal inputs initially
octalInp.style.display = "none";
octalInp.previousElementSibling.style.display = "none";
hexInp.style.display = "none";
hexInp.previousElementSibling.style.display = "none";

// Function to handle checkbox change events
function handleCheckboxChange() {
  // Show/hide octal input based on octal checkbox state
  if (octCheckbox.checked) {
    octalInp.style.display = "block";
    octalInp.previousElementSibling.style.display = "block";
  } else {
    octalInp.style.display = "none";
    octalInp.previousElementSibling.style.display = "none";
  }

  // Show/hide hexadecimal input based on hexadecimal checkbox state
  if (hexCheckbox.checked) {
    hexInp.style.display = "block";
    hexInp.previousElementSibling.style.display = "block";
  } else {
    hexInp.style.display = "none";
    hexInp.previousElementSibling.style.display = "none";
  }
}

// Listen for changes in the octal checkbox state
octCheckbox.addEventListener("change", handleCheckboxChange);

// Listen for changes in the hexadecimal checkbox state
hexCheckbox.addEventListener("change", handleCheckboxChange);

// Convert decimal to binary when user inputs in the decimal field
decInp.addEventListener("input", () => {
  let decValue = parseInt(decInp.value);
  if (!isNaN(decValue)) {
    binInp.value = decValue.toString(2);
    complementInp.value = computeTwosComplement(binInp.value);
    octalInp.value = decValue.toString(8);
    hexInp.value = decValue.toString(16).toUpperCase();
    errorMsg.textContent = "";
  } else {
    binInp.value = "";
    complementInp.value = "";
    octalInp.value = "";
    hexInp.value = "";
    errorMsg.textContent = "Please Enter A Valid Decimal Input";
  }
});

// Function to compute the 2's complement
function computeTwosComplement(binary) {
  let complement = "";
  // If the binary number is negative, compute its 2's complement
  if (binary.charAt(0) === "1") {
    // Invert the bits
    for (let i = 0; i < binary.length; i++) {
      complement += binary.charAt(i) === "0" ? "1" : "0";
    }
    // Add 1 to the inverted bits
    let carry = 1;
    for (let i = binary.length - 1; i >= 0; i--) {
      let sum = parseInt(complement.charAt(i)) + carry;
      complement = complement.substring(0, i) + (sum % 2) + complement.substring(i + 1);
      carry = Math.floor(sum / 2);
    }
  } else {
    // If the binary number is positive, the 2's complement is the binary number itself
    complement = binary;
  }
  return complement;
}

// Function to format binary input
function formatBinaryInput() {
  let binaryValue = binInp.value.replace(/\s/g, ''); // Remove existing spaces
  let complementValue = complementInp.value.replace(/\s/g, ''); // Remove existing spaces
  if (groupingCheckbox.checked) {
    // Reverse the binary string and insert space every four digits
    binaryValue = binaryValue.split('').reverse().join('').replace(/(\d{4})(?=\d)/g, '$1 ').split('').reverse().join('');
    complementValue = complementValue.split('').reverse().join('').replace(/(\d{4})(?=\d)/g, '$1 ').split('').reverse().join('');
  }
  binInp.value = binaryValue;
  complementInp.value = complementValue;
}

// Listen for changes in the grouping checkbox state
groupingCheckbox.addEventListener("change", formatBinaryInput);
