const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require("connect-api-mocker");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  devServer: {
    // contentBase: path.join(__dirname, "dist"), 
    // publicPath: "/", 
    // host: "dev.domain.com",
    overlay: true, // 빌드시 에러나 경고 문구를 브라우저 화면에 표시
    port: 8080, // 개발서버 port 설정, 기본값은 8080
    stats: "errors-only",
    // historyApiFallback: true, // 히스토리 API를 사용하는 SPA 개발시 설정한다. 404가 발생하면 index.html로 리다이렉트한다.
    before: (app) => {
      // app : server 객체 (개발서버, express 객체)
      // before 함수 내에서 webpack 개발서버의 기능을 추가 할 수 있음
      // app.get('/api/users', (req, res) => {
      //   res.json([
      //     {
      //       id: 1,
      //       name: "Alice"
      //     }, {
      //       id: 2,
      //       name: "asdf"
      //     },
      //     {
      //       id: 3,
      //       name: "qwer"
      //     }
      //   ])
      // })
      app.use(apiMocker('/api', 'mocks/api'));;
    },
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          // publicPath: "./dist/",
          name: "[name].[ext]?[hash]",
          limit: 20000, //20kb url-loader 가 file 을 처리할때 2kb 미만의 파일은 data url 로 변환 그 이상은 file-loader 가 처리
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        Author: ${childProcess.execSync("git config user.name")}
      `,
    }),
    new webpack.DefinePlugin({
      TWO: JSON.stringify("1+1"),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
            collapseWhitespace: true,
            removeComments: true,
          }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : []),
  ],
};
