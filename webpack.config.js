const path = require('path');

module.exports = {
    entry: {
        main: './src/js/main.js',
        archive: './src/js/archive.js',
        loop: './src/js/loop.js',
        loopItemProduct: './src/js/loopItemProduct.js',
        filters: './src/js/filters.js',
        sortOptions: './src/js/sortOptions.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/assets/js'),
        filename: '[name].js'  // Esto generará main.js, archive.js, y another.js
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    mode: 'development'  // Cambia a 'production' para producción
};
