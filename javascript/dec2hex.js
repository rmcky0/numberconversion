  const decInp = document.getElementById("dec-inp");
  const hexInp = document.getElementById("hex-inp");
  const errorMsg = document.getElementById("error-msg");

  decInp.addEventListener("input", () => {
    const decValue = parseInt(decInp.value);
    if (!isNaN(decValue)) {
      hexInp.value = decToHex(decValue);
      errorMsg.textContent = "";
    } else {
      hexInp.value = "";
      errorMsg.textContent = "Please Enter A Valid Decimal Input";
    }
  });

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
  function decToHex(dec) {
    return dec.toString(16).toUpperCase();
  }

  function hexToDec(hex) {
    return parseInt(hex, 16);
  }

  function hexValidator(num) {
    return /^[0-9A-F]+$/i.test(num);
  }
