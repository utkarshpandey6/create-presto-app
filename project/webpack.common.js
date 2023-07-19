const path = require("path");
const webpack = require("webpack");
const packageJSON = require("./package.json");
const CopyPlugin = require('copy-webpack-plugin');



var plugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(packageJSON.version)
  }),
  new CopyPlugin({
    patterns: [
      {from: 'public'}
    ]
  })
];


module.exports = {
  entry : "./index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: false,
    sourceMapFilename: "index.js.map",
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false
    },
  },
  devServer: {
    port: 3000,
    static: path.resolve(__dirname, "dist"),
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "X-Content-Type-Options": "Disabled"
    }
  },
  plugins: plugins,
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!presto-ui)/,
          use: {
            loader: "babel-loader",
            options: {
              "sourceType": "unambiguous",
              presets: [
                [
                  '@babel/preset-env',
                  {
                    "targets": {
                      "chrome": "54",
                      "safari": "11"
                    },
                    "useBuiltIns": "usage",
                    "corejs": {
                      version: "3",
                      proposals: true
                    }
                  }
                ]
              ]
            }
          }
        }
      ]
    },
  };

