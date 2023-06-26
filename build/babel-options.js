module.exports = {
    filename: '',
    filenameRelative: '',
    sourceMap: true,
    sourceRoot: '',
    moduleRoot: '',
    moduleIds: false,
    comments: false,
    compact: false,
    code: true,
    presets: ["@babel/preset-env"],
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-throw-expressions",
    ]
};
