import React from 'react';

let context = null;
let source = null;
try {
  // Fix up for prefixing
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();
  source = context.createBufferSource();
}
catch(e) {
  console.log('Web Audio API is not supported in this browser');
}

const playerStyle = {
  width: '500px',
  backgroundColor: 'red'
};

function onDragOver(ev) {
  ev.preventDefault();

  ev.dataTransfer.dropEffect = 'move';
}

function onDrop(ev) {
  ev.preventDefault();
  if (ev.dataTransfer.files.length > 0) {
    const file = ev.dataTransfer.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function() {
      context.decodeAudioData(this.result, buffer => {
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
      });
    };
    fileReader.readAsArrayBuffer(file);
  }
}

export default class AudioPlayer extends React.Component {
  render() {
    return <div style={playerStyle} onDragOver={onDragOver} onDrop={onDrop}>Audio Player</div>;
  }
}
