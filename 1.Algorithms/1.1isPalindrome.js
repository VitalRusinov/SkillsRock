function isPalindrome(str) {
  // Получаем строку без знаков препинания и пробелов
  const formattedStr = str.replace(/[\s!.?,;:'"-()]/g, '').toLowerCase();
  // Получаем перевернутую строку
  const invertedStr = formattedStr.split('').reverse().join('');
  // Сравниваем
  return formattedStr === invertedStr;

}

// Примеры
console.log(isPalindrome("Привет, __мир! Как дела34546?"));
console.log(isPalindrome("А роза упала на лапу Азора"));