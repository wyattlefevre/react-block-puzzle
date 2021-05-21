import React from 'react';
import Box from './Box';
import Room from './Room';

import Level from '../levels/one';
import { useState } from 'react';

const Game = () => {
  const scale = 20;
  const roomHeight = Level.roomHeight;
  const roomWidth = Level.roomWidth;
  const [boxes, setBoxes] = useState(Level.boxes);
  const [currentStartPos, setCurrentStartPos] = useState({ x: null, y: null });
  const [collidingBoxID, setCollidingBoxID] = useState(null);
  const [controlPos, setControlPos] = useState(null);

  const isCollision = (selectedBox, boxes) => {
    let collision = false;
    boxes.forEach(b => {
      if (selectedBox.id != b.id) {
        if (
          selectedBox.x < b.x + b.width &&
          selectedBox.x + selectedBox.width > b.x &&
          selectedBox.y < b.y + b.height &&
          selectedBox.y + selectedBox.height > b.y
        ) {
          collision = true;
        }
      }
    });
    return collision;
  };

  const updateBoxPosition = (selectedBox) => {
    setBoxes(prevBoxes => {
      return prevBoxes.map(prevBox => {
        if (selectedBox.id === prevBox.id) {
          prevBox.x = selectedBox.x;
          prevBox.y = selectedBox.y;
          if (isCollision(prevBox, prevBoxes)) {
            prevBox.collision = true;
          } else {
            prevBox.collision = false;
          }
        }
        return prevBox;
      });
    });
  };

  const startDrag = (selectedBox) => {
    console.log('setting', selectedBox);
    setCurrentStartPos({ x: selectedBox.x, y: selectedBox.y });
  };

  const stopDrag = (selectedBox) => {
    console.log('stop drag!', selectedBox);
    let box = boxes.find(b => selectedBox.id === b.id);
    if (box.collision) {
      setCollidingBoxID(box.id);
      console.log('setting position', currentStartPos);
      setControlPos(currentStartPos);

      setBoxes(prevBoxes => {
        return prevBoxes.map(prevBox => {
          if (selectedBox.id === prevBox.id) {
            prevBox.collision = false;
            prevBox.x = currentStartPos.x;
            prevBox.y = currentStartPos.y;
          }
          return prevBox;
        });
      });

    } else {
      setControlPos(null);
    }
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: roomHeight * scale, left: roomWidth * scale }}>
        <Room height={roomHeight} width={roomWidth} color='grey' scale={scale} />
      </div>
      {boxes.map((box) =>
        <div key={box.id} style={{ position: 'absolute' }}>
          <Box
            id={box.id}
            x={box.x}
            y={box.y}
            height={box.height}
            width={box.width}
            color={box.collision ? 'red' : box.color}
            scale={scale}
            updatePosition={updateBoxPosition}
            startDrag={startDrag}
            stopDrag={stopDrag}
            collision={box.collision}
            setPosition={collidingBoxID === box.id ? controlPos : null} />
        </div>
      )}
      {/* <p>{currentStartPos.x}, {currentStartPos.y}</p> */}
    </div >
  );
};

export default Game;
