const validateButton = document.querySelector("#submitform");

validateButton.addEventListener("click", function () {
  const cardNumber = document.querySelector("#card_number").value;
  //проверка на валидность номера карты
  if (cardNumber.length !== 16) {
    alert("Номер карты должен состоять из 16 цифр");
    return false;
  } else if (isNaN(cardNumber)) {
    alert("Номер карты должен состоять из цифр");
    return false;
  } else if (!luhnAlgorithm(cardNumber)) {
    alert("Номер карты введен неверно");
    return false;
  }
});

function luhnAlgorithm(value) {
  value = value.replace(/\D/g, "");

  var nCheck = 0;
  var bEven = false;

  for (var n = value.length - 1; n >= 0; n--) {
    var nDigit = parseInt(value.charAt(n), 10);

    if (bEven && (nDigit *= 2) > 9) {
      nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 == 0;
}
