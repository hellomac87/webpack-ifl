const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/, // regx, 모든 자바스크립트파일마다 처리
        use: path.resolve("./my-webpack-loader.js"),
      },
    ],
  },
};
