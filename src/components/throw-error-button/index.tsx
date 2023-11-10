import { useState } from 'react';

import './throw-error-button.scss';

export const ThrowErrorButton = () => {
  const [throwError, setThrowError] = useState(false);

  const handleError = (): void => {
    setThrowError(true);
  };

  if (throwError) {
    throw Error('check ErrorBoundary');
  }
  return (
    <button className="throw-error-button" onClick={handleError}>
      Throw Error
    </button>
  );
};
