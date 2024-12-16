function debounce(func, delay) {
  // Используем замыкание для сохранения значения, которое останавливает таймер. 
  let timer;
  const debouncedFunc = (...arg) => {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => func(...arg), delay);
  }
  return debouncedFunc;
}

  const print = (arg) => {
    console.log('print:', arg);
  }

  const debouncedFunction = debounce(print, 2000);

  debouncedFunction(1); // Не вызовет функцию print
  debouncedFunction(2); // 2


  const debouncedFunction1 = debounce(print, 1000);

  debouncedFunction1(3); // Не вызовет функцию print
  debouncedFunction1(4); // 4, вызовется раньше debouncedFunction(2);