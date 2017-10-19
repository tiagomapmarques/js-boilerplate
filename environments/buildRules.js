
const buildStyleLoaders = (maskAndMinimize) => {
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

const buildRules = (includePath, maskAndMinimize = false) => ([
  {
    enforce: 'pre',
    test: /\.js$/,
    include: includePath,
    loader: 'babel-loader',
    query: { presets: [ 'es2015', 'stage-2' ] },
  },
  {
    test: /\.js$/,
    loaders: [{ loader: 'babel-loader' }],
  },
  {
    test: /\.scss$/,
    loaders: buildStyleLoaders(maskAndMinimize),
  },
  {
    test: /\.(html|json|png|jpg|gif|svg|woff|woff2)$/,
    loader: 'file-loader',
  },
]);

export default buildRules;
