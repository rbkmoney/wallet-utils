const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const appConfig = require('./app-config');
const initializerConfig = require('./initializer-config');
const prepareOutputConfig = require('./prepare-output-config');

const commonProdConfig = {
    mode: 'production',
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled'
        })
    ]
};

const baseOutput = 'dist';

const prepareModule = (baseConfig, outputPath, jsPattern, cssPattern) =>
    merge(merge(baseConfig, prepareOutputConfig(outputPath, jsPattern, cssPattern)), commonProdConfig);

module.exports = [
    prepareModule(appConfig, `${baseOutput}/v1`, '[name].[hash:20]', '[hash:20]'),
    prepareModule(initializerConfig, baseOutput)
];
