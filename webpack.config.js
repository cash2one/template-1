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
    entry: './assets/main.js',
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
                test: /\.(png|jpg|gif|svg|eot|woff2|ttf|woff)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
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
            js:path.join(__dirname,'./assets/js')
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
  /*  devtool: '#eval-source-map'*/
};
if (process.env.NODE_ENV === 'production') {
   /* module.exports.devtool = '#source-map';*/
    module.exports.output.publicPath='';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            //sourceMap: true,
            compress: {
                warnings:true
            }
        }),
         new webpack.LoaderOptionsPlugin({
             minimize: true
         })
    ])
}