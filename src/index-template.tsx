import * as ReactDOMServer from 'react-dom/server';
import { contextToHelmet, DOCUMENT } from './template-utils';

// Render for HtmlWebpackPlugin
export = (context: {
  compilation: any;
  htmlWebpackPlugin: { files: any; options: any };
}) => {
  const html = ReactDOMServer.renderToStaticMarkup(
    DOCUMENT(contextToHelmet(context.compilation)),
  );
  return `<!doctype html>${html}`;
};
