export const getChangedPixels = (newPos, oldPos) => {
  const moveDirection = newPos - oldPos;
  const changePx =
    moveDirection < 0 ? moveDirection - moveDirection * 2 : -moveDirection;

  return changePx;
};

export function getNewHeight(
  changedPixels,
  offsetHeight,
  offsetParentHeight,
  totalPaneContainers
) {
  const newHeight = offsetHeight + changedPixels;
  const divisibleHeight = offsetParentHeight / totalPaneContainers;
  const percentage = Math.round((100 * newHeight) / divisibleHeight);

  let siblingPercentage = 0;

  if (percentage > 100) {
    siblingPercentage = 100 - (percentage - 100);
  } else {
    siblingPercentage = 100 + (100 - percentage);
  }

  console.groupCollapsed("util: getNewHeight");
  console.log("changedPixels", changedPixels);
  console.log("offsetHeight", offsetHeight);
  console.log("offsetParentHeight", offsetParentHeight);
  console.log("totalPaneContainers", totalPaneContainers);
  console.log("newHeight", newHeight);
  console.log("percentage", percentage);
  console.log("siblingPercentage", siblingPercentage);
  console.groupEnd();

  return {
    percentage,
    siblingPercentage,
  };
}

export function getNewWidth(
  changedPixels,
  offsetWidth,
  offsetParentWidth,
  totalPanes
) {
  const newWidth = offsetWidth + changedPixels;
  const divisibleWidth = offsetParentWidth / totalPanes;
  const percentage = Math.round((100 * newWidth) / divisibleWidth);

  let siblingPercentage = 0;

  if (percentage > 100) {
    siblingPercentage = 100 - (percentage - 100);
  } else {
    siblingPercentage = 100 + (100 - percentage);
  }

  console.groupCollapsed("util: getNewWidth");
  console.log("changedPixels", changedPixels);
  console.log("offsetWidth", offsetWidth);
  console.log("offsetParentWidth", offsetParentWidth);
  console.log("totalPanes", totalPanes);
  console.log("newWidth", newWidth);
  console.log("percentage", percentage);
  console.log("siblingPercentage", siblingPercentage);
  console.groupEnd();

  return {
    percentage,
    siblingPercentage,
  };
}
