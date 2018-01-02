const path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
            './app/base.js',
            './scss/main.scss',
           ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(['css-loader?importLoaders=1'])
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: path.resolve(__dirname, 'node_modules/plantoeat/node_modules/request'),
                use: 'null-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: '[name].bundle.css',
            allChunks: true,
        }),
    ]
};
