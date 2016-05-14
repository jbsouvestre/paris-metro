import path from 'path';
import _ from 'underscore';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import MapConfig from './config/maps.json';
import { GA } from './config/analytics.json';

var base = __dirname;

// DEV
// ----
var devConfig = {
    devtool: '#inline-source-map',
};

var devPlugins = [
    
];

// PROD
// ----

var prodConfig = {};

var prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap: false
    }),
];

module.exports = function(options) {

    var dev = options.dev;

    const MAPS_API_KEY = dev ? MapConfig.DEV_API_KEY : MapConfig.PROD_API_KEY;
    const filename = dev ? '[name].js' : '[name].[hash].min.js';

    return _.extend({
        entry: path.join(base, 'js/index.js'),
        output: {
            path: path.join(base, 'dist'),
            filename: filename
        },
        plugins: [

            new webpack.DefinePlugin({
                DEBUG: dev
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
            new HtmlWebpackPlugin({
                template: 'build/index.hbs',
                title: 'It works',
                API_KEY: MAPS_API_KEY,
                GA: GA,
                dev: dev,
                inject: false,
                minify: dev ? null: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            })
        ].concat(dev ? devPlugins : prodPlugins),
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
    }, dev ? devConfig : prodConfig);
};