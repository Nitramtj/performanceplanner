import React from 'react';

const style = {
  flex: '2.3 1 auto',
  height: (100 / .3) * .7
};

export default class RinkDisplay extends React.Component {
  render() {
    return <div id="two" style={style}></div>;
  }
}
