module.exports = {
  "globals": {
      "expect": true,
      "beforeAll": true,
      "afterAll": true
  },
  "env": {
      "browser": true,
      "es6": true,
      "node": true,
      "mocha": true,
      "jest": true
  },
  "extends": "airbnb-base",
  "rules": {
      // indentation
      "indent": [ 2, 4 ],

      // spacing
      "space-in-parens": [ 2, "always" ],
      "template-curly-spacing": [ 2, "always" ],
      "array-bracket-spacing": [ 2, "always" ],
      "object-curly-spacing": [ 2, "always" ],
      "computed-property-spacing": [ 2, "always" ],
      "no-multiple-empty-lines": [ 2, { "max": 1, "maxEOF": 0, "maxBOF": 0 } ],
      
      // strings
      "quotes": [ 2, "double", "avoid-escape" ],

      // code arrangement matter
      "no-use-before-define": [ 2, { "functions": false } ],
      
      // make it meaningful
      "prefer-const": 1,
      
      // keep it simple
      "complexity": [ 1, 5 ],
      
      "no-unused-expressions": [
          "error", 
          {
              "allowTaggedTemplates": true,
              "allowShortCircuit": true,
          }
      ],
  },
  "settings": {
      "import/resolver": {
          "node": {
              "paths": ["src"]
          }   
      },
  }
}