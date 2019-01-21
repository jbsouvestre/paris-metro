/*jshint node: true*/
var path = require('path');

var webpack = require('webpack');
var base = __dirname;

module.exports = {
    mode: 'production',
    devtool: '#inline-source-map',
    entry: path.join(base, 'js/index.js'),
    output: {
        path: path.join(base, 'dist'),
        filename: 'index.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                query: {
                    helperDirs: [
                        path.resolve(__dirname, 'js/helpers')
                    ]
                }
            }
        ]
    },
    resolve: {
        alias: {
            marionette: 'backbone.marionette',
            // backbone: path.resolve(__dirname, 'node_modules/backbone.marionette/node_modules/backbone')
        }
    }
};