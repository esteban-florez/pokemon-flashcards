const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
            '@icons': path.resolve(__dirname, 'src/assets/icons'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@helpers': path.resolve(__dirname, 'src/js/helpers'),
            '@sorting': path.resolve(__dirname, 'src/js/sorting'),
            '@galery': path.resolve(__dirname, 'src/js/galery'),
            '@dom': path.resolve(__dirname, 'src/js/dom'),
            '@errors': path.resolve(__dirname, 'src/js/errors'),
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.html$/i,
                use: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][contenthash][ext]',
                }
            },
            {
                test: /\.(jpg|png|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][contenthash][ext]',
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: './public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/types-logos',
                    to: 'assets/types-logos',
                }
            ]
        }),
    ],
    // optimization: [
    //     new CssMinimizerWebpackPlugin(),
    //     new TerserPlugin(),
    // ]
        
}