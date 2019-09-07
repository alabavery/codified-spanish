const nodeExternals = require('webpack-node-externals');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: [
        // 'core-js',
        // '@babel/polyfill', // enables async-await
        './src/index.js'
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },
    // devtool: 'source-map',
    // watchOptions: {
    //     ignored: /node_modules/
    // },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // use: {
                //     loader: 'babel-loader',
                //     // options: {
                //     //     presets: ['@babel/preset-env']
                //     // }
                // }
            }
        ]
    }
};