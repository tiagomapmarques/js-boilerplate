import { loader as ExtractLoader } from 'mini-css-extract-plugin';

const getRules = minify => ([
  {
    test: /\.(j|t)s$/,
    use: 'babel-loader',
  },
  {
    test: /\.scss$/,
    use: [
      ExtractLoader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: minify ? '[hash:base64:24]' : '[path][name]-[local]',
        },
      },
      'postcss-loader',
      'sass-loader',
    ],
  },
]);

export const rules = {
  pretty: getRules(false),
  minified: getRules(true),
};
