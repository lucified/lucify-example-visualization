import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

export function DOCUMENT(
  helmetComponent: React.ReactElement<any>,
  app?: JSX.Element,
) {
  ReactDOMServer.renderToString(helmetComponent);

  const renderedApp = {
    __html: app ? ReactDOMServer.renderToString(app) : '',
  };
  const helmet = Helmet.renderStatic();

  const htmlAttributes = helmet.htmlAttributes.toComponent();
  const bodyAttributes = helmet.bodyAttributes.toComponent();

  return (
    <html {...htmlAttributes}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
      </head>
      <body {...bodyAttributes}>
        <div id="content" dangerouslySetInnerHTML={renderedApp} />
        {helmet.script.toComponent()}
      </body>
    </html>
  );
}

export function getAssets(compilation: any, chunks: any) {
  // Use the configured public path or build a relative path
  let publicPath = compilation.options.output.publicPath;

  if (publicPath.length && publicPath.substr(-1, 1) !== '/') {
    publicPath += '/';
  }
  const assets = {
    // Will contain all js & css files by chunk
    chunks: {},
    // Will contain all js files
    js: [],
    // Will contain all css files
    css: [],
    // Will contain the html5 appcache manifest files if it exists
    manifest: Object.keys(compilation.assets).filter(f =>
      f.match(/\.appcache$/),
    )[0],
  } as any; // tslint:disable-line

  for (const chunk of chunks) {
    const chunkName = chunk.names ? chunk.names[0] : chunk.name;

    assets.chunks[chunkName] = {};

    // Prepend the public path to all chunk files
    const chunkFiles = []
      .concat(chunk.files)
      .map(chunkFile => publicPath + chunkFile);

    // Webpack outputs an array for each chunk when using sourcemaps
    // But we need only the entry file
    const entry = chunkFiles[0];
    assets.chunks[chunkName].size = chunk.size;
    assets.chunks[chunkName].entry = entry;
    assets.chunks[chunkName].hash = chunk.hash;
    assets.js.push(entry);

    // Gather all css files
    const css = chunkFiles.filter(chunkFile => /.css($|\?)/.test(chunkFile));
    assets.chunks[chunkName].css = css;
    assets.css = assets.css.concat(css);
  }

  // Duplicate css assets can occur on occasion if more than one chunk
  // requires the same css.
  // assets.css = _.uniq(assets.css);

  return assets;
}

export function contextToHelmet(webpackCompilation: any) {
  const assets = getAssets(webpackCompilation, webpackCompilation.chunks);

  return (
    <Helmet defaultTitle="Visualisation">
      <html lang="en" />
      {assets.css.map((href: string) =>
        <link key={href} rel="stylesheet" href={href} />,
      )}
      {/*<link rel="canonical" href="https://www.lucify.com/something" />*/}
      {assets.js.map((src: string) =>
        <script key={src} type="text/javascript" src={src} />,
      )}
      <meta {...{ charset: 'utf-8' } as any} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </Helmet>
  );
}
