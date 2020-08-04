"use strict";

module.exports = {
  create: function (context) {
    const settings = context.settings || {};
    const denyWordList = settings.denyWordList || [];
    const validateNode = (node) =>
      typeof node.value === "string" && denyWordList.includes(node.value);

    return {
      Literal(node) {
        if (validateNode(node)) {
          context.report({
            node,
            message: `Word \`${node.value}\` is not allowed.`,
          });
        }
      },
    };
  },
};
