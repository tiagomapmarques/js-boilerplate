import { loader as ExtractLoader } from 'mini-css-extract-plugin';

const getRules = minify => ([
  {
    test: /\.js$/,
    use: 'babel-loader',
  },
  {
    test: /\.vue$/,
    use: 'vue-loader',
  },
  {
    test: /\.scss$/,
    use: [
      ExtractLoader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          minimize: minify,
          localIdentName: minify ? '[hash:base64:24]' : '[path][name]-[local]',
        },
      },
      'postcss-loader',
      'sass-loader',
    ],
  },
  {
    test: /\.(json|png|jpg|gif|svg|woff|woff2)$/,
    use: 'file-loader',
  },
]);

export const rules = {
  pretty: getRules(false),
  minified: getRules(true),
};
