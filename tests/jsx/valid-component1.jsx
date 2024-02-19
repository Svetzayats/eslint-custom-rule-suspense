import React, { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./component.js'));

export default function MyComponent() {
  return (
    <div>
      <Suspense fallback={ () => null }>
        <LazyComponent />
      </Suspense>
    </div>
  );
}