//
function preventDefault(e) {
  console.log("preventDefault ee", e);
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
}

// function on(element, eventType, handler, options) {
//   element.addEventListener(eventType, handler, options);
// }
// function off(element, eventType, handler, options) {
//   element.removeEventListener(eventType, handler, options);
// }
// bodies Map 对象
export default function useLockElement(bool, element) {
  const lock = (element) => {
    element.addEventListener(eventType, preventDefault, options);
  };
}
