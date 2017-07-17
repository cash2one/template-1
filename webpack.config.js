var path=require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin=require('html-webpack-plugin');
var SOURCE_MAP = false;
function generateExtractLoaders (loaders) {
    return loaders.map(function (loader) {
        return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '')
    }).join('!')
}
module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                loader:
                    ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                     })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            {
                test: /\.(png|jpg|gif|svg|eot|woff2|ttf|woff)$/,
                loader: 'file-loader',
                options: {
                    name: '../../img/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('index.css'),
        new HtmlWebpackPlugin({
            title: 'Index',
            filename: '../test.html',
            version:'1.0.3',
            template: './index.html',
            inject:false,
            hash:true
        })
    ],
    resolve: {
        alias:{
            'bootstrap':  path.resolve(__dirname, './node_modules/vue2-strap/dist'),
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
  /*  devtool: '#eval-source-map'*/
};
console.log(module.exports.resolve.alias['bootstrap']);
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.output.publicPath='';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })/* ,
       new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings:true
            }
        }),
         new webpack.LoaderOptionsPlugin({
             minimize: true
         })*/
    ])
}