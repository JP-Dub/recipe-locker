const merge = require('webpack-merge'),
      common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {    
    stats: 'errors-only',    
    historyApiFallback: true,
    inline: true,
    port: 3000,
    public: 'recipe-locker.glitch.me',
    allowedHosts: ['*.recipe-locker.glitch.me',
                   '*.api.glitch.com',
                   '*.glitch.com'
                  ],
    proxy: {
      '/api' : {
        target: 'http://localhost:8080',
        pathRewrite : {'^/api' : ''},
        secure: true
      }
    }     
  }    
});