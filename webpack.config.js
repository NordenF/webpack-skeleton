const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const webpack = require("webpack");
const path = require("path");

module.exports = (env, argv) => {
    let mode = argv.mode
    if (!mode)
        mode = "development";

    const isDev = mode === "development";

    const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

    return {
        context: path.resolve(__dirname, "src"),
        devServer: {
            hot: isDev,
            port: 8080
        },
        devtool: isDev ? "source-map" : undefined,
        entry: {
            analytics: "./analytics.js",
            main: "./index.js"
        },
        mode: mode,
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ],
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                }
            ]
        },
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin()
            ],
            splitChunks: {
                chunks: "all"
            }
        },
        output: {
            filename: filename("js"),
            path: path.resolve(__dirname, "dist")
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: path.resolve(__dirname, "src/favicon.ico"),
                            to: path.resolve(__dirname, "dist")
                        },
                    ]
                },
            ),
            new ESLintPlugin(),
            new HTMLWebpackPlugin({
                template: "./index.html"
            }),
            new MiniCssExtractPlugin({
                filename: filename("css"),
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    };
};