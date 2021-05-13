const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const port = 3000;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"), // 결과물 경로
    filename: "bundle.[fullhash].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      // 첫 번째 룰
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // 두 번째 룰
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  devServer: {
    host: "localhost",
    port: port,
    open: true,
    historyApiFallback: true,
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001/",
        changeOrigin: true,
      },
    },
  },
  devtool: "eval-cheap-source-map",
};
