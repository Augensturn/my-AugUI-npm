module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('postcss-for'),         // 替代 postcss-each
    require('postcss-simple-vars'),
    require('postcss-nested'),
  ]
}

