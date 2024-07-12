import React from 'react';

class ErrorPage extends React.Component {
  render(): JSX.Element {
    return (
      <div className="error-page">
        <div className="error__description">Error, please reload page</div>
        <div className="reload-button" onClick={reload}></div>
      </div>
    );
  }
}

export default ErrorPage;

function reload(): void {
  window.location.reload();
}
