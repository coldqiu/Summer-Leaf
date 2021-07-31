// const plactmentType =

const TOP = "TOP";
const RIGHT = "RIGHT";
const BOTTOM = "BOTTOM";
const LEFT = "LEFT";
/**
 *
 * @param {*} triggerDom  触发事件元素的dom
 * @param {*} align       偏移配置
 * @param {*} overlay     组件Tooltip overlay的dom
 *
 */

export default function useCollisionDetction(triggerDom, align, overlay) {
  // 根据以下三个dom和一个偏移信息确定绝对定位的 top left
  // overlay.offsetParent triggerDom.getBoundingClientRect() overlay align

  // console.log("triggerDom, align, overlay", triggerDom, align, overlay);
  const offsetParent = overlay.offsetParent;
  const triggerDomRect = triggerDom.getBoundingClientRect();
  // tiggerDomy 右下角坐标
  const basePoint = {
    x: triggerDomRect.x + triggerDomRect.width,
    y: triggerDomRect.y + triggerDomRect.height,
  };

  const clientWidth = overlay.clientWidth;
  const clientHeight = overlay.clientHeight;

  const offsetBottom = offsetParent.clientHeight - basePoint.y;
  const offsetRight = offsetParent.clientWidth - basePoint.x;
  // 默认 BOTTOM_RIGHT
  let placementY = BOTTOM;
  let placementX = RIGHT;

  if (offsetBottom < clientHeight) placementY = TOP;
  if (offsetRight < clientWidth) placementX = LEFT;

  let top =
    placementY === BOTTOM
      ? basePoint.y
      : basePoint.y - triggerDomRect.height - clientHeight;

  let left =
    placementX === RIGHT ? basePoint.x - triggerDomRect.width : basePoint.x - clientWidth;

  if (align) {
    top = align.top ? top + align.top : top;
    left = align.left ? left + align.left : left;
  }

  return { top, left, width: triggerDomRect.width, height: triggerDomRect.height };
}
