import HtmlWebPackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
export const context = __dirname;
export const entry = './src/index.js';
export const output = {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
};
export const devServer = {
    port: 3000,
    historyApiFallback: true
};
export const module = {
    rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|j?g|svg|gif)?$/,
            use: 'file-loader'
        },

    ]
};
export const plugins = [
    new HtmlWebPackPlugin({
        title: "webpack.config.js",
        template: resolve(__dirname, 'public/index.html'),
        filename: 'index.html'
    })
];