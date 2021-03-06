const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const rules = require('./common-rules');

module.exports = {
    name: 'app',
    stats: {
        children: false,
        moduleTrace: false,
        modules: false
    },
    entry: {
        app: './src/app/index.tsx',
        react: ['react', 'react-dom'],
        // vendor: [],
        // polyfills: []
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'src/app')],
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            app: __dirname + '/../src/app'
        }
    },
    module: {
        rules
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            formatter: 'codeframe',
            tslint: true
        }),
        new HtmlWebpackPlugin({
            template: './src/app/index.html',
            filename: 'app.html'
        }),
        new CopyWebpackPlugin(
            [
                {from: './src/app/assets/icons', to: './assets/icons'},
                {from: './src/appConfig.json', to: '..'}
            ],
            {debug: 'warning'}
        )
    ]
};
