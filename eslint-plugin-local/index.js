const suspenseRule = require("./rules/suspense-rule");
const plugin = {
  rules: { "suspense-rule": suspenseRule },
};
module.exports = plugin;
