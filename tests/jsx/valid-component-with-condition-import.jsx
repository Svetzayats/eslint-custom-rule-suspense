import React, { Suspense } from 'react';

const ConditionalComponent = React.lazy(() =>
  condition
    ? import('./ComponentA')
    : import('./ComponentB').then(({ SpecificComponent }) => ({ default: SpecificComponent }))
);

export default function MyComponent() {
  return (
    <div>
      <Suspense fallback={ () => null }>
        <ConditionalComponent />
      </Suspense>
    </div>
  );
}