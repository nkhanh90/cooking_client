import React from 'react';

interface ErrorBoundaryProps {
  loading: boolean;
  error: any;
  data: any;
  children: any;
}

const ErrorBoundary = ({ loading, error, data, children }: ErrorBoundaryProps) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data && data.length === 0) {
    return <p>Empty data</p>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
