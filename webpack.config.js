'use strict';
require('dotenv').load();

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
console.log(process.env)
module.exports = {
    mode: 'development',
    entry: {
        "main": path.join(__dirname + '/src/client/app.js')
    },
    output: {
        path: path.join(__dirname + '/dist'),
        publicPath: path.join('/'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', 'mobx'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },
            {
                test: /\.scss/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ],

    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.BACKEND_URL": JSON.stringify(process.env.BACKEND_URL),
            "process.env.BACKEND_PORT": JSON.stringify(process.env.BACKEND_PORT),
        }),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: false
            },
            hash: true,
            template: path.join(__dirname + '/src/client/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname + '/dist'),
        compress: true,
        hot: true,
        inline: true,
        open: true,
        port: process.env.FRONTEND_PORT,
        host: 'localhost',
        historyApiFallback: true
    }
};