module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@components": "./components",
            "@store": "./store",
            "@api": "./api",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        }
      ]
    ],
  };
};

