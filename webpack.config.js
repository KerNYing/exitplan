const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './public/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'node_modules/@material/web') // ✅ Material Web 포함
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            '@material/web': path.resolve(__dirname, 'node_modules/@material/web'),
        },
        extensions: ['.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body',
            scriptLoading: 'module', // ✅ bundle.js를 `type="module"`로 설정
            // 기존 script 태그를 제거하는 커스텀 처리
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
                removeScriptTypeAttributes: true, // ✅ 불필요한 script 속성 제거
            },
        }),
    ],
    mode: 'production',
};