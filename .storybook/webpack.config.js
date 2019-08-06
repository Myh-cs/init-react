module.exports = function ({ config }) {
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });
  config.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
  });
  config.module.rules.push({
    test: /\.less$/,
    loaders: ["style-loader", "css-loader", "less-loader"],
  });

  return config;
};