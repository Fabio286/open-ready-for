// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'src/views/index.html')
      })

      // Add your plugins here
      // Learn more about plugins from https://webpack.js.org/configuration/plugins/
   ],
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/i,
            loader: 'babel-loader'
         },
         {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            type: 'asset'
         }

         // Add your rules for custom modules here
         // Learn more about loaders from https://webpack.js.org/loaders/
      ]
   }
};

module.exports = () => {
   if (isProduction)
      config.mode = 'production';

   else
      config.mode = 'development';

   return config;
};
