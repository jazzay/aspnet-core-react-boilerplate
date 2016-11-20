var path = require('path');
var webpack = require('webpack');
var merge = require('extendify')({ isDeep: true, arrays: 'concat' });
var devConfig = require('./webpack.config.dev');
var prodConfig = require('./webpack.config.prod');

// must fix this
var isDevelopment = true;// process.env.ASPNETCORE_ENVIRONMENT === 'Development';

module.exports = merge({
    resolve: {
        extensions: [ '', '.js', '.jsx', '.ts', '.tsx' ]
    },
    module: {
        loaders: [
            { test: /\.ts(x?)$/, include: /app/, loader: 'babel-loader' },
            { test: /\.ts(x?)$/, include: /app/, loader: 'ts-loader' }
        ]
    },
    entry: {
        main: ['./app/boot.tsx'],
    },
    output: {
        path: path.join(__dirname, 'wwwroot', 'dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        })
    ]
}, isDevelopment ? devConfig : prodConfig);
