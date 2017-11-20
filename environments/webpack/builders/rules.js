
const styleLoaders = minify => ([
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1,
      minimize: minify,
      localIdentName: minify ? '[hash:base64:24]' : '[path][name]-[local]',
    },
  },
  { loader: 'sass-loader' },
]);

const buildRules = minify => ([
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

export const rules = buildRules(false);
export const rulesMinified = buildRules(true);
