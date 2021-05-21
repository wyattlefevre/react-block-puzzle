function cutBox(planeX, index, boxList, minWidth) {
  let split = 0;
  let newBox = { id: boxList.length, width: 0, height: 0 };
  let boxToCut = boxList[index];
  if (planeX) {
    if (boxToCut.width < minWidth * 2) {
      console.log('insufficient width');
      return false;
    }
    split = Math.floor(Math.random() * (boxToCut.width - minWidth)) + 1;
    if (split === 0 || boxToCut.width - split === 0) {
      console.log("BAD ZERO");
      console.log('split', split);
      console.log('width - split', boxToCut.width - split);
    }
    boxToCut.width = boxToCut.width - split;
    newBox.width = split;
    newBox.height = boxToCut.height;
  } else {
    if (boxToCut.height < minWidth * 2) {
      console.log('insufficient height');
      return false;
    }
    split = Math.floor(Math.random() * (boxToCut.height - minWidth)) + 1;
    if (split === 0 || boxToCut.height - split === 0) {
      console.log("BAD ZERO");
      console.log('split', split);
      console.log('height - split', boxToCut.height - split);
    }
    boxToCut.height = boxToCut.height - split;
    newBox.height = split;
    newBox.width = boxToCut.width;
  }
  boxList.push(newBox);
  return true;
}

export function generateBoxes(n, x, y, minWidth) {
  let boxes = [{ id: 0, width: x, height: y }];
  for (let i = 0; i < n - 1; i++) {
    let planeX = Math.floor(Math.random() * 2) === 1;
    let selectedIndex = Math.floor(Math.random() * boxes.length);
    let success = cutBox(planeX, selectedIndex, boxes, minWidth);
    while (!success) {
      let planeX = Math.floor(Math.random() * 2) === 1;
      let selectedIndex = Math.floor(Math.random() * boxes.length);
      success = cutBox(planeX, selectedIndex, boxes, minWidth);
    }
  }
  return boxes;
};