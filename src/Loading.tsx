import React from 'react';

class Loading extends React.Component {
  render(): JSX.Element {
    return (
      <div className="loading">
        <div className="loader"></div>
      </div>
    );
  }
}

export default Loading;
