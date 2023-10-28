import { Component } from 'react';

class ThrowErrorButton extends Component {
  state = {
    throwError: false,
  };

  private handleError = (): void => {
    this.setState({
      throwError: true,
    });
  };

  render() {
    const { throwError } = this.state;
    if (throwError) {
      throw Error('check ErrorBoundary');
    }
    return <button onClick={this.handleError}>Throw Error</button>;
  }
}

export default ThrowErrorButton;
