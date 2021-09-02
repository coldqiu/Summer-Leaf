function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 打乱列表顺序，生成随机列表
export function shuffle(arr) {
  // 操作arr的副本， 不修改原参数 arr
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}
