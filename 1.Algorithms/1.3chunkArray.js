function chunkArray(array, size) {
  const result = [];
  let i = 0;
  while(i < array.length) {
    // Извлекаем части от исходного массива и добавляем их в результат
    const subArr = array.slice(i, (i + size));
    result.push(subArr);
    i += size;
  }
  return result;
}


  console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 2)); // [[1, 2], [3, 4], [5, 6], [7, 8]]
  console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3)); // [[1, 2, 3], [4, 5, 6], [7, 8]]
  console.log(chunkArray([], 3)); // []