module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that a component imported with React.lazy can only be used with Suspense.",
    },
    schema: [],
  },

  create(context) {
    let importLazyFromReact = false;
    const lazyImportedComponents = [];

    function handleJSX(node) {
      const name = node.openingElement?.name?.name;
      if (lazyImportedComponents.includes(name)) {
        // we need to check that there is parent with Suspension
        let parentSuspense = node.parent;
        while (
          parentSuspense &&
          parentSuspense.openingElement?.name?.name !== "Suspense"
        ) {
          parentSuspense = parentSuspense.parent;
        }

        if (!parentSuspense) {
          context.report({
            node,
            message:
              "Using lazy loaded elements without <Suspense> could cause problem.",
          });
        }
      }
    }

    function handleImportDeclaration(node) {
      if (
        node.source?.value === "react" &&
        node.specifiers?.some(
          (specifier) => specifier?.imported?.name === "lazy",
        )
      ) {
        importLazyFromReact = true;
      }
    }

    function handleVariableDeclaration(node) {
      function isLazyImport(node) {
        if (node.init && node.init.type === "CallExpression") {
          const callee = node.init.callee;

          // we check only that there is lazy import and it is from React
          const isLazy =
            (callee.type === "Identifier" &&
              callee.name === "lazy" &&
              importLazyFromReact) ||
            (callee.type === "MemberExpression" &&
              callee.object.name === "React" &&
              callee.property.name === "lazy");

          return isLazy;
        }

        return false;
      }

      if (isLazyImport(node)) {
        lazyImportedComponents.push(node.id.name);
      }
    }
    return {
      // Performs action in the function on every variable declarator
      ImportDeclaration: handleImportDeclaration,
      VariableDeclarator: handleVariableDeclaration,
      JSXElement: handleJSX,
    };
  },
};
