const validateButton = document.querySelector('#submitform');

validateButton.addEventListener('click', () => {
  const cardNumber = document.querySelector('#card_number').value;
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(cardNumber)) {
    alert('Номер карты должен состоять из цифр');
    return false;
  }
  if (cardNumber.length !== 16) {
    alert('Номер карты должен состоять из 16 цифр');
    return false;
  }
  // eslint-disable-next-line no-use-before-define
  if (!luhnAlgorithm(cardNumber)) {
    alert('Номер карты введен неверно');
    return false;
  }
  alert('Все верно');
});

function luhnAlgorithm(value) {
  // eslint-disable-next-line no-param-reassign
  value = value.replace(/\D/g, '');

  let nCheck = 0;
  let bEven = false;
  // eslint-disable-next-line no-plusplus
  for (let n = value.length - 1; n >= 0; n--) {
    let nDigit = parseInt(value.charAt(n), 10);

    // eslint-disable-next-line no-cond-assign
    if (bEven && (nDigit *= 2) > 9) {
      nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
}
