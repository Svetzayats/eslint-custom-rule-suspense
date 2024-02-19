const {RuleTester} = require("eslint");
const suspenseRule = require("../eslint-plugin-local/rules/suspense-rule");
const fs = require('fs');
const path = require('path');

const loadTestFile = (fileName) => {
  return fs.readFileSync(path.join(__dirname, 'jsx', fileName), 'utf8');
};

const ruleTester = new RuleTester({
  parser: require.resolve('@babel/eslint-parser'), // Use the Babel parser
  parserOptions: { 
    ecmaVersion: 2020, // or a later version
    sourceType: 'module', // if you are using ES modules
    ecmaFeatures: {
      jsx: true, // if you are using JSX
    },
    requireConfigFile: false, // Bypass the requirement for a Babel config file
    babelOptions: {
      presets: ["@babel/preset-react"], // Specify Babel preset for React
    },
  }
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  "suspense-rule", 
  suspenseRule, 
  { 
    valid: [
    { code: loadTestFile('valid-component1.jsx') },
    { code: loadTestFile('valid-component2.jsx') }, 
    { code: loadTestFile('valid-component-with-condition-import.jsx') }, 
  ],
    invalid: [
      {
      code: loadTestFile('invalid-component1.jsx'),
      errors: [{ message: 'Using lazy loaded elements without <Suspense> could cause problem.' }],
    },
    {
      code: loadTestFile('invalid-component-with-condition-import.jsx'),
      errors: [{ message: 'Using lazy loaded elements without <Suspense> could cause problem.' }],
    },
  ],
  }
);

console.log("All tests passed!");