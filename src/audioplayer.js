import React from 'react';
import localForage from 'localforage';

let context = null;
let source = null;
let files = [];

localForage.getItem('audioFiles').then(result => {
  if (result === null) {
    localForage.setItem('audioFiles', []);
  } else {
    files = result;
  }
});

try {
  // Fix up for prefixing
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();
}
catch(e) {
  console.log('Web Audio API is not supported in this browser');
}

const playerStyle = {
  flex: '1 1 auto',
  // backgroundColor: 'grey',
  borderTop: '2px solid black',
  // boxSizing: 'border-box',

  height: 100,
  maxHeight: 200
};

function onDecodeAudio(buffer) {
  if (source != null) {
    source.disconnect(context.destination);
  }
  source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}

function loadArrayBuffer(ev) {
  ev.preventDefault();

  const file = ev.target.dataset.file;
  localForage.getItem('audioFiles/' + file).then(result => {
    loadFile(result);
  });
}

function loadFile(file) {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    context.decodeAudioData(fileReader.result, onDecodeAudio);
  };
  fileReader.readAsArrayBuffer(file);
}

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    localForage.getItem('audioFiles').then(result => {
      if (result !== null) {
        this.setState({files: result});
      }
    });
  }

  onDragOver(ev) {
    ev.preventDefault();

    ev.dataTransfer.dropEffect = 'move';
  }

  onDrop(ev) {
    ev.preventDefault();
    if (ev.dataTransfer.files.length > 0) {
      const file = ev.dataTransfer.files[0];
      if (files.indexOf(file.name) < 0) {
        files.push(file.name);
        localForage.setItem('audioFiles', files).then(() => this.setState({files: files}));
      }
      localForage.setItem('audioFiles/' + file.name, file);
      loadFile(file);
    }
  }

  render() {
    const listItems = this.state.files.map(file => <li key={file} onClick={loadArrayBuffer} data-file={file}>{file}</li>);
    return <div id="zzz" style={playerStyle} onDragOver={this.onDragOver} onDrop={this.onDrop}><ul>{listItems}</ul></div>;
  }
}
