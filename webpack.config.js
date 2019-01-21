const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConf = require('./config/config.dev.json');
const prodConf = require('./config/config.prod.json');

var base = __dirname;

module.exports = function(options) {
    const DEV = options.dev == true;

    const mode = DEV ? 'development': 'production';
    const devtools = DEV ? '#inline-source-map': null;

    const configFile = DEV ? devConf : prodConf;
    return {
        mode: mode,
        devtool: devtools,
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
            new webpack.DefinePlugin({
                SENTRY: configFile.SENTRY,
                DEBUG: DEV
            }),
            new HtmlWebpackPlugin({
                template: 'build/index.hbs',
                API_KEY: configFile.MAPS_API_KEY,
                GA: configFile.GA,
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