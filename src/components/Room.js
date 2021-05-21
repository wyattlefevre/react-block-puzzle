import React from 'react';

const Room = (props) => {
  const scale = props.scale;
  const roomStyle = {
    height: props.height * scale,
    width: props.width * scale,
    backgroundColor: props.color,
    borderRadius: scale / 4
  };

  return (
    <div style={roomStyle} />
  );
};

export default Room;
