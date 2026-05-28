const path = require('path');

// The site is plain static HTML/CSS, but its JS is a real bundle:
//   - app.js          → vanilla site interactions (self-running IIFE)
//   - tweaks-app.jsx  → React "Tweaks" panel (imports tweaks-panel.jsx + React)
// Both entries are bundled, with React/ReactDOM compiled in, so the page no
// longer needs the unpkg React/ReactDOM/Babel-standalone runtime.
module.exports = {
  mode: 'production',
  entry: ['./app.js', './tweaks-app.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: '> 0.5%, last 2 versions, not dead' }],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
    ],
  },
  performance: { hints: false },
};
