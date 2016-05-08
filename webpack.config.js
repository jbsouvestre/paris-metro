/*jshint node: true*/
var path = require('path');

var webpack = require('webpack');
var base = __dirname;

module.exports = {
    devtool: '#inline-source-map',
    entry: path.join(base, 'js/index.js'),
    output: {
        path: path.join(base, 'dist'),
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                query: {
                    helperDirs: [
                        path.join('js/helpers')
                    ]
                }
            }
        ]
    },
    resolve: {
        root: [
            path.resolve('./js'),
            path.resolve('.')
        ],
        alias: {
            marionette: 'backbone.marionette',
            backbone: 'backbone.marionette/node_modules/backbone'
        }
    }
};