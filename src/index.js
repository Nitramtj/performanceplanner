import RinkDisplay from './rinkdisplay';
import React from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from './audioplayer';
import 'style-loader!css-loader!./css/main.css';

const style = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
};

ReactDOM.render(
  <div style={style}><RinkDisplay /><AudioPlayer /></div>,
  document.body
);
