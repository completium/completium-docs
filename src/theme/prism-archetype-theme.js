'use strict';

// Original: https://github.com/dracula/visual-studio-code
// Converted automatically using ./tools/themeFromVsCode
var theme = {
  plain: {
    color: "#F8F8F2",
    backgroundColor: "#282A36"
  },
  styles: [{
    types: ["prolog", "constant", "builtin"],
    style: {
      color: "rgb(189, 147, 249)"
    }
  }, {
    types: ["inserted", "function"],
    style: {
      color: "rgb(80, 200, 123)"
    }
  }, {
    types: ["deleted"],
    style: {
      color: "rgb(255, 85, 85)"
    }
  }, {
    types: ["changed"],
    style: {
      color: "rgb(255, 184, 108)"
    }
  }, {
    types: ["punctuation", "symbol"],
    style: {
      color: "rgb(248, 248, 242)"
    }
  }, {
    types: ["string", "char", "tag", "selector"],
    style: {
      color: "rgb(255, 121, 198)"
    }
  }, {
    types: ["keyword"],
    style: {
      color: "rgb(189, 147, 249)",
      fontStyle: "italic"
    }
  }, {
    types: ["declaration"],
    style: {
      color: "rgb(249, 162, 2)",
      fontStyle: "italic"
    }
  }, {
    types: ["operator"],
    style: {
      color: "rgb(137, 221, 255)"
    }
  }, {
    types: ["comment"],
    style: {
      color: "rgb(98, 114, 164)"
    }
  }, {
    types: ["boolean"],
    style: {
      color: "rgb(210,50,50)",
      fontStyle: "italic"
    }
  }, {
    types: ["attr-name"],
    style: {
      color: "rgb(241, 250, 140)"
    }
  }]
};

module.exports = theme;
