import { notify } from '@poluspay-frontend/ui';
import {ErrorBlock} from "../lib/Error/Error";


import React, { ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorBlock />;
    }

    return this.props.children;
  }
}

function logErrorToMyService(error: Error, errorInfo: React.ErrorInfo) {
  // Add your custom error logging implementation here
  console.error('Error occurred:', error);
  notify({
    title: 'Error',
    description: 'check console error',
    status: 'error',
  });
}


