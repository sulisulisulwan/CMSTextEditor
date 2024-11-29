import path from 'path'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const testAppConfig = {
  mode: 'development',
  entry: __dirname + '/src/testApp.tsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: path.resolve(__dirname, "./dist/"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"]
  },
}


export default (env) => {


  return testAppConfig
}