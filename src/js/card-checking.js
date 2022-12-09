//повестить событие на измнение поля ввода

var cardInput = document.getElementById("card_number");

cardInput.addEventListener("input", function () {
  var cardNumber = document.getElementById("card_number").value;
  console.log(cardNumber);

  //проверить первую цыфру номера карты и добавить остальным картам класс disabled
  document.querySelectorAll(".card").forEach(function (card) {
    card.classList.add("disabled");
  });

  if (cardNumber[0] === "4") {
    document.querySelector(".visa").classList.remove("disabled");
  } else if (cardNumber[0] === "5") {
    document.querySelector(".mastercard").classList.remove("disabled");
  } else if (cardNumber[0] === "3") {
    document.querySelector(".amex").classList.remove("disabled");
  } else if (cardNumber[0] === "6") {
    document.querySelector(".discover").classList.remove("disabled");
  } else if (cardNumber[0] === "2") {
    document.querySelector(".mir").classList.remove("disabled");
  } else if(cardNumber[0] === "1") {
    document.querySelector(".jcb").classList.remove("disabled");
  }
});
