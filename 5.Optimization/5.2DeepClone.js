// 1. Самый простой способ
const obj = {
  string: "string",
  number: 1,
  object: {key: 'value'},
  array: [1, 2, 3],
}

const copyObj = structuredClone(obj);

console.log('structuredClone:')
console.log(copyObj);
console.log(copyObj.string === obj.string); // true
console.log(copyObj.number === obj.number); // true
console.log(copyObj.object === obj.object); // false
console.log(copyObj.array === obj.array); // false
obj.object.key = 'otherValue';
console.log('obj.object.key:', obj.object.key); // 'otherValue'
console.log('copyObj.object.key:', copyObj.object.key); // 'value'


// 2. JSON.stringify
const newObj = JSON.parse(JSON.stringify(obj));

console.log('JSON.stringify:')
console.log(newObj);
console.log(newObj.string === obj.string); // true
console.log(newObj.number === obj.number); // true
console.log(newObj.object === obj.object); // false
console.log(newObj.array === obj.array); // false
obj.object.key = 'value';
console.log('obj.object.key:', obj.object.key); // 'value'
console.log('newObj.object.key:', newObj.object.key); // 'otherValue'

// 3. Ну либо рекурсивный обход...
function deepClone(obj) {
  if (typeof obj === 'object' && obj != null && !Array.isArray(obj)) {
    const result = {};
    for (let key in obj) {
      result[key] = deepClone(obj[key]);
    }
    return result;
  }
  if (Array.isArray(obj)) {
    return obj.map((el) => {
      return deepClone(el);
    });
  }
  return obj;
}

  const original = {
    name: 'John',
    address: {
      city: 'New York',
      country: 'USA'
    }
  };

  const copy = deepClone(original);
  console.log('deepCopy:', copy)
  copy.address.city = 'Los Angeles';
  console.log(original.address.city); // New York (оригинальный объект не должен измениться)
  console.log(copy.address.city); // Los Angeles
  