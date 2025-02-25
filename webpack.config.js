const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/pages/index.js",
  },
  
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    assetModuleFilename: "assets/[hash][ext][query]", 
    publicPath: "",
  },

  mode: process.env.NODE_ENV || "development",
  devtool: process.env.NODE_ENV === "production" ? "source-map" : "inline-source-map",
  stats: "errors-only",

  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 3000, 
    open: true,
    liveReload: true,
    hot: true, 
    historyApiFallback: true, 
  },

  target: "web",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif|ico|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },

  optimization: {
    minimize: process.env.NODE_ENV === "production", // ✅ Minificación solo en producción
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
};
