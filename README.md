# Empty template project with React, Redux, TypeScript and Webpack

This has been influenced by [create-react-app](https://github.com/facebookincubator/create-react-app)
and Lucify's own visualisation projects.

## Development

Requires Node 6 or greater and `yarn`.

Set up the development environment with:
```shell
yarn
```

Start a local development server with mock data:
```shell
yarn start
```

Then open http://localhost:3000 in your web browser.


## Building deployment distributions

All the following build commands should be executed in the project root folder.

Build a *production* distribution into `dist` with:
```shell
NODE_ENV=production yarn run build
```

Build a *staging* distribution into `dist` with:
```shell
NODE_ENV=staging yarn run build
```

You can test a distribution by:
```shell
cd dist
ws
```

This will start a light-weight local server at [http://localhost:8000](http://localhost:8000).
To use the `ws` command, you need to install `local-web-server`
```shell
yarn add global local-web-server
```
