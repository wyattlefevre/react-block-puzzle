import React from 'react';
import Draggable from 'react-draggable';
import { useState } from 'react';

const Box = (props) => {
  const scale = props.scale;

  const boxStyle = {
    height: props.height * scale,
    width: props.width * scale,
    backgroundColor: props.color,
    borderRadius: scale / 4
  };
  const startPosition = {
    x: props.x * scale,
    y: props.y * scale
  };

  const handleStart = (e, data) => {
    props.startDrag({
      id: props.id,
      x: data.x / scale,
      y: data.y / scale,
    });
  };

  const handleDrag = (e, data) => {
    props.updatePosition({
      id: props.id,
      x: data.x / scale,
      y: data.y / scale,
    });
  };


  const handleStop = (e, data) => {
    props.stopDrag({
      id: props.id,
      x: Math.round(data.x / scale),
      y: Math.round(data.y / scale),
    });
  };

  let position;
  if (props.setPosition) {
    position = {
      x: props.setPosition.x * scale,
      y: props.setPosition.y * scale
    };
  } else {
    position = null;
  }

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={startPosition}
      position={position}
      grid={[scale, scale]}
      scale={1}
      onDrag={handleDrag}
      onStart={handleStart}
      onStop={handleStop}>
      <div>
        <div className='handle' style={boxStyle}>
        </div>
      </div>
    </Draggable>

  );
};

export default Box;
