module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 0,
    'prettier/prettier': 0,
  },
    "no-shadow": ["error", { "builtinGlobals": false, "hoist": "never", "allow": [], "ignoreOnInitialization": false }]
};
