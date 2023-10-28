import { Component, ReactNode } from 'react';

import ErrorMessage from '../error-message';

class ErrorBoundary extends Component<Readonly<{ children: ReactNode }>> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.log('ErrorBoundary did catch', error.message);
    //logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
