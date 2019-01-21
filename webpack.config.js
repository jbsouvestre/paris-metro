const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

var base = __dirname;
const DEV = true;

const MAPS_API_KEY = 'AIzaSyC6WCiO25Mti18z2OccWXEkFfmrCgB7ctI';
const GA = 'UA-52167935-1';

module.exports = function(options) {
    const DEV = options.dev == true;

    const mode = DEV ? 'development': 'production';
    const devtools = DEV ? '#inline-source-map': null;

    return {
        mode: mode,
        devtool: '#inline-source-map',
        entry: path.join(base, 'js/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
            new HtmlWebpackPlugin({
                template: 'build/index.hbs',
                API_KEY: MAPS_API_KEY,
                GA: GA,
                dev: DEV,
                inject: false,
                minify: DEV ? null: {
                        removeComments: true,
                        collapseWhitespace: true
                    }
            })
        ],
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
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
            }
        }
    };
};