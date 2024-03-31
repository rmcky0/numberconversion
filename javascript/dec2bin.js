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


octalInp.style.display = "none";
octalInp.previousElementSibling.style.display = "none";
hexInp.style.display = "none";
hexInp.previousElementSibling.style.display = "none";

// Function to handle checkbox change events
function handleCheckboxChange() {
  // Show/hide octal input and label based on octal checkbox state
  if (octCheckbox.checked) {
    octalInp.style.display = "block";
    octalInp.previousElementSibling.style.display = "block";
  } else {
    octalInp.style.display = "none";
    octalInp.previousElementSibling.style.display = "none";
  }

  // Show/hide hexadecimal input and label based on hexadecimal checkbox state
  if (hexCheckbox.checked) {
    hexInp.style.display = "block";
    hexInp.previousElementSibling.style.display = "block";
  } else {
    hexInp.style.display = "none";
    hexInp.previousElementSibling.style.display = "none";
  }
}

// Listen for changes in the grouping checkbox state
groupingCheckbox.addEventListener("change", formatBinaryInput);

// Listen for changes in the octal checkbox state
octCheckbox.addEventListener("change", handleCheckboxChange);

// Listen for changes in the hexadecimal checkbox state
hexCheckbox.addEventListener("change", handleCheckboxChange);

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

// Convert decimal to binary when user inputs in the decimal field
decInp.addEventListener("input", () => {
  let decValue = parseInt(decInp.value);
  binInp.value = decValue.toString(2);
  formatBinaryInput();
  // Compute and display the 2's complement
  complementInp.value = computeTwosComplement(binInp.value);
  
  // Convert decimal to octal
  if (octCheckbox.checked) {
    octalInp.value = decValue.toString(8);
  }
});

// Convert binary to decimal when user inputs in the binary field
binInp.addEventListener("input", () => {
  let binValue = binInp.value;
  if (binValidator(binValue)) {
    decInp.value = parseInt(binValue, 2);
    errorMsg.textContent = "";
  } else {
    errorMsg.textContent = "Please Enter A Valid Binary Input";
  }
  // Compute the 2's complement
  let complementValue = computeTwosComplement(binValue);
  complementInp.value = complementValue;
  // Format both binary and 2's complement inputs
  formatBinaryInput();
  
  // Convert binary to octal
  if (octCheckbox.checked) {
    octalInp.value = parseInt(binValue, 2).toString(8);
  }
});

// Listen for changes in the grouping checkbox state
groupingCheckbox.addEventListener("change", formatBinaryInput);

// Function to check if the binary number is valid
function binValidator(num) {
  for (let i = 0; i < num.length; i++) {
    if (num[i] != "0" && num[i] != "1") {
      return false;
    }
  }
  return true;
}

// Convert decimal to hexadecimal when user inputs in the decimal field
decInp.addEventListener("input", () => {
  let decValue = parseInt(decInp.value);
  if (!isNaN(decValue)) {
    hexInp.value = decValue.toString(16).toUpperCase();
    errorMsg.textContent = "";
  } else {
    hexInp.value = "";
    errorMsg.textContent = "Please Enter A Valid Decimal Input";
  }
});

// Convert hexadecimal to decimal when user inputs in the hexadecimal field
hexInp.addEventListener("input", () => {
  let hexValue = hexInp.value.toUpperCase();

  if (hexValidator(hexValue)) {
    let decValue = parseInt(hexValue, 16);
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
