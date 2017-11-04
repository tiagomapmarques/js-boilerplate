import * as webpack from 'webpack';

const styleLoaders = (minify: boolean): webpack.Loader[] => {
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

export const buildRules = (minify: boolean = false): webpack.Rule[] => ([
  {
    test: /\.ts$/,
    use: [{
      loader: 'ts-loader',
      options: {
        configFile: `../../tsconfig${!minify ? '.dev' : ''}.json`,
      },
    }],
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
