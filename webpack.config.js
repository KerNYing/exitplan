const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

module.exports = {
    entry: {
        main: './public/js/main.js',
        game: './public/game.js',
        queue: './public/queue.js',
        signup: './public/signup.js',
    },
    output: {
        filename: '[name].bundle.js', // ✅ 각 entry에 맞는 bundle.js 생성 (main.bundle.js, game.bundle.js 등)
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'public/js'),
                    path.resolve(__dirname, 'public'),
                    path.resolve(__dirname, 'node_modules/@material/web'),
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
                use: ['style-loader', 'css-loader'],
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
        ...glob.sync('./public/*.html').map(htmlFile => {
            const name = path.basename(htmlFile, '.html'); // ✅ 파일 이름 추출 (예: index, game, queue)
            return new HtmlWebpackPlugin({
                filename: `${name}.html`,
                template: htmlFile,
                inject: true,
                scriptLoading: 'module',
                chunks: ['main', name], // ✅ 각 HTML 파일에 해당하는 JS 파일만 포함
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