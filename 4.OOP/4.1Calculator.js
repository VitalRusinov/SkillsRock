class Calculator {
  constructor() {}
  
  add(a, b) {
      return a + b;
  }
  
  subtract(a, b) {
      return a - b;
  }
  
  multiply(a, b) {
      return a * b;
  }
  
  divide(a, b) {
      if (b === 0) {
          throw new Error("Деление на ноль невозможно");
      }
      
      return a / b;
  }
}

const calc = new Calculator();

console.log(calc.add(10, 20)); // 30
console.log(calc.subtract(50, 25)); // 25
console.log(calc.multiply(4, 6)); // 24

console.log(calc.divide(100, 5)); // 20

try {
    console.log('Частное:', calc.divide(42, 0)); // Ошибка
} catch (error) {
    console.error(error.message); // Вывод ошибки
}