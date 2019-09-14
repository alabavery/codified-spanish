const nodeExternals = require('webpack-node-externals');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'eval', // was 'source-map'... changed to try to make heroku build faster
    watchOptions: {
        ignored: /node_modules/
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', //
            }
        ]
    }
};