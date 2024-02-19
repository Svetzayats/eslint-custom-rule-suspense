import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./component.js'));

export default function MyComponent() {
  return (
    <div>
      <Suspense fallback={ () => null }>
        <LazyComponent />
      </Suspense>
    </div>
  );
}