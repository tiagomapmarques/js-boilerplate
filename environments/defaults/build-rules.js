
const styleLoaders = (maskAndMinimize) => {
  return [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
        minimize: !!maskAndMinimize,
        localIdentName: maskAndMinimize ? '[hash:base64:24]' : '[path][name]-[local]',
      },
    },
    { loader: 'sass-loader' },
  ];
};

export default (includePath, maskAndMinimize = false) => ([
  {
    enforce: 'pre',
    test: /\.js$/,
    include: includePath,
    loader: 'babel-loader',
    query: { presets: [ 'stage-2', 'env' ] },
  },
  {
    test: /\.js$/,
    loaders: [{ loader: 'babel-loader' }],
  },
  {
    test: /\.vue$/,
    loaders: [{ loader: 'vue-loader' }],
  },
  {
    test: /\.scss$/,
    loaders: styleLoaders(maskAndMinimize),
  },
  {
    test: /\.(html|json|png|jpg|gif|svg|woff|woff2)$/,
    loader: 'file-loader',
  },
]);
