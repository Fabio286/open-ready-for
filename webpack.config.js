const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
   entry: './src/views/index.js',
   output: {
      path: path.resolve(__dirname, 'public')
   },
   resolve: {
      fallback: {
         crypto: require.resolve('crypto-browserify'),
         stream: require.resolve('stream-browserify')
      }
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'css/main.css'
      }),
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'src/views/index.html'),
         inject: true
      })
   ],
   module: {
      rules: [{
         test: /\.scss$/,
         use: [
            MiniCssExtractPlugin.loader,
            {
               loader: 'css-loader'
            },
            {
               loader: 'sass-loader',
               options: {
                  sourceMap: true
               }
            }
         ]
      },
      {
         test: /\.(js|jsx)$/i,
         loader: 'babel-loader'
      },
      {
         test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
         type: 'asset'
      }]
   }
};

module.exports = () => {
   if (isProduction)
      config.mode = 'production';

   else
      config.mode = 'development';

   return config;
};
