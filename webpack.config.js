const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob'); // ✅ 여러 HTML 파일을 가져오기 위해 사용

module.exports = {
    entry: {
        main: './public/js/main.js', // ✅ main.js 번들링
        game: './public/game.js', // ✅ game.js 번들링
        queue: './public/queue.js', // ✅ queue.js 번들링
        signup: './public/signup.js', // ✅ signup.js 번들링
    },
    output: {
        filename: '[name].bundle.js', // ✅ entry별로 파일 생성 (main.bundle.js, game.bundle.js 등)
        path: path.resolve(__dirname, 'dist'),
        clean: true, // ✅ 기존 빌드 삭제
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'public/js'),
                    path.resolve(__dirname, 'public'), // ✅ JS 파일 포함
                    path.resolve(__dirname, 'node_modules/@material/web') // ✅ Material Web 포함
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // ✅ CSS 번들링
            },
        ],
    },
    resolve: {
        alias: {
            '@material/web': path.resolve(__dirname, 'node_modules/@material/web'),
        },
        extensions: ['.js', '.css'],
    },
    plugins: [
        // ✅ 모든 HTML 파일을 자동으로 가져와 HtmlWebpackPlugin 적용
        ...glob.sync('./public/*.html').map(htmlFile => {
            return new HtmlWebpackPlugin({
                filename: path.basename(htmlFile), // ✅ 파일 이름 유지
                template: htmlFile, // ✅ 원본 HTML 파일 경로
                inject: 'body',
                scriptLoading: 'module', // ✅ Webpack이 자동으로 bundle.js 추가
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    removeScriptTypeAttributes: true,
                },
            });
        }),
    ],
    mode: 'production',
};