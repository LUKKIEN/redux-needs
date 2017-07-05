import path from 'path';

module.exports = {
    target: 'web',

    entry: [
        'babel-polyfill',
        './src/index.js',
    ],

    output: {
        path: path.resolve('dist'),
        filename: './needs.bundle.js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [/src/],
                exclude: [/node_modules/, /__tests__/],
                use: ['babel-loader'],
            },
        ],
    },
};
