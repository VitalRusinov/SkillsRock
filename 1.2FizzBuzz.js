function fizzBuzz() {
  // Создаем массив для результата
  const result = [];
  // Перебираем числа от 1 до 100
  for(let i = 1; i <= 100; i += 1) {
    let char = '';
    // Проверка на кратность 3 и 5
    if(i % 3 === 0) {
      char += "Fizz";
    }
    if(i % 5 === 0) {
      char += "Buzz";
    }
    // Если char остался неизменным, значит число не кратно 3 и 5
    if(char === '') {
      result.push(i);
    } else {
      result.push(char);
    }
  }
  console.log('result:', result);
  return result;
}

// Запускаем
fizzBuzz();