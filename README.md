# Custom eslint rule for lazy and Suspense in React

This ESLint rule ensures that any component imported using React.lazy is used within a <Suspense> component. 
The primary goal is to prevent the potential pitfalls of using lazy-loaded components without <Suspense> (I got such bug and it took about 2 hours to debug problem).

## Rule Details
This rule checks for two main conditions:

- **Import Detection**: It detects if the lazy function is imported from the React library.
- **Usage Verification**: It verifies that any JSX element representing a lazily loaded component is a child of a <Suspense> component. If a lazily loaded component is used outside of <Suspense>, an error is reported.

Note: rule works only in one file. So if you use lazy import in one file and pass loaded component through props and use in another file - rule will not throw error. 

## Examples

### Incorrect Usage
The rule will report an error if a lazy-loaded component is used without being wrapped in <Suspense>.

```jsx
import React, { lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function MyComponent() {
  // Incorrect: LazyComponent is not wrapped in <Suspense>
  return (
    <div>
      <LazyComponent />
    </div>
  );
}
```

### Correct Usage
To avoid errors, ensure that any lazy-loaded component is used within <Suspense>.

```jsx
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function MyComponent() {
  // Correct: LazyComponent is wrapped in <Suspense>
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

## How to use 
Now this plugin is not published, but you can run it locally. 
[Great instruction for running locally custom eslint rule](https://ronvalstar.nl/custom-local-eslint-rules )

1. Copy directory eslint-plugin local in your project.
2. Install local module via NPM or YARN
```shell
npm i -D file:[location]
or
yarn add --dev file:[location]
```

You can just click right button on the folder in your code editor and copy absolute path to it. Run command in the root directory of your project.
For example, in my case comand looked like ```npm i -D /Users/svetlanazayats/Projects/blog-tutorial/eslint-plugin-local```
3. Add configuration in .eslintrc
```json
{
"plugins": ['local'],
"rules": {
  "local/suspense-rule": "error"
}
```

In my case inside of remix indie stack project with default eslint settings it looks that way: 
<img width="776" alt="Part of my configuration for eslitrc. Importing plugin in plugins property and add rule with severity" src="https://github.com/Svetzayats/eslint-custom-rule-suspense/assets/17587625/eefc2944-f9af-4af8-ba17-acc7a957d0e3">

