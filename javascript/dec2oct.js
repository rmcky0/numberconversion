
let decInp = document.getElementById("dec-inp");
let octInp = document.getElementById("oct-inp");
let errorMsg = document.getElementById("error-msg");

decInp.addEventListener("input", () => {
  let decValue = parseInt(decInp.value);
  octInp.value = decValue.toString(8);
});

octInp.addEventListener("input", () => {
  let octValue = octInp.value;
  
  if (octValidator(octValue)) {
    decInp.value = parseInt(octValue, 8);
    errorMsg.textContent = "";
  }
  else {
    errorMsg.textContent = "Please Enter An Valid Octal Input";
  }

  function octValidator(num) {
    for (let i = 0; i < num.length; i++) {
      if (num[i] < "0" || num[i] > "7") {
        return false;
      }
    }
    return true;
  }
});