import { loader } from 'mini-css-extract-plugin';

const getRules = minify => ([
  {
    test: /\.js$/,
    use: 'babel-loader',
  },
  {
    test: /\.scss$/,
    use: [
      loader,
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
