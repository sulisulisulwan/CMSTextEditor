import path from 'path'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const testAppConfig = {
  mode: 'development',
  entry: path.resolve(__dirname , './testApp/src/testApp.tsx'),
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
    path: path.resolve(__dirname, "./testApp/dist"),
    publicPath: path.resolve(__dirname, "./testApp/dist"),
  },
  externals: {
    "react": {
      "commonjs": "react",
      "commonjs2": "react",
      "amd": "react",
      "root": "React"
    },
    "react-dom": {
        "commonjs": "react-dom",
        "commonjs2": "react-dom",
        "amd": "react-dom",
        "root": "ReactDOM"
    }
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"]
  },
}


export default (env) => {


  return testAppConfig
}