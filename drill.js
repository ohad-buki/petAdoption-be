function canSum(arr, array, num) {
  const arrObj = {};
  for (let i = 0; i < arr.length; i++) {
    arrObj[`${num - arr[i]}`] = arr[i];
  }
  for (let i = 0; i < array.length; i++) {
    if (arrObj[`${array[i]}`]) {
      return true;
    }
  }
  return false;
}

arrayStr = ["1", "2", "3"];

const mon = 15;
const y = 3;
const z = 2;
const zToMon = y / z;
let total = 0;
while (mon >= z) {
  let res;
  res = mon / y;
  mon = mon % res;
  mon = mon + res * zToMon;
  if (res > 1) {
    total = total + res;
  }
}
