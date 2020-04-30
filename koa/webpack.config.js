const path = require('path');

module.exports = {
    resolve: {
        // alias: {
        //   '@node_modules': path.join(__dirname, '../node_modules'),
        //}
        modules: ["../node_modules"]
    },
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};