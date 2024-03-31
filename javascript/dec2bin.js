// Get the input elements
let decInp = document.getElementById("dec-inp");
let binInp = document.getElementById("bin-inp");
let complementInp = document.getElementById("complement-inp");
let errorMsg = document.getElementById("error-msg");
let groupingCheckbox = document.getElementById("grouping-checkbox");

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