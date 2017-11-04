
const styleLoaders = (minify) => {
  return [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
        minimize: !!minify,
        localIdentName: minify ? '[hash:base64:24]' : '[path][name]-[local]',
      },
    },
    { loader: 'sass-loader' },
  ];
};

export const buildRules = (minify = false) => ([
  {
    test: /\.js$/,
    use: 'babel-loader',
  },
  {
    test: /\.scss$/,
    use: styleLoaders(minify),
  },
  {
    test: /\.(html|json|png|jpg|gif|svg|woff|woff2)$/,
    use: 'file-loader',
  },
]);
