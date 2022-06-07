"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("next/document");
const styled_components_1 = require("styled-components");
class MyDocument extends document_1.default {
    static async getInitialProps(ctx) {
        const sheet = new styled_components_1.ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props}/>),
            });
            const initialProps = await document_1.default.getInitialProps(ctx);
            return Object.assign(Object.assign({}, initialProps), { styles: (<>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>) });
        }
        finally {
            sheet.seal();
        }
    }
    render() {
        return (<document_1.Html>
        <document_1.Head>
          <meta charSet="utf-8"/>
        </document_1.Head>
        <body>
          <document_1.Main />
          <document_1.NextScript />
        </body>
      </document_1.Html>);
    }
}
exports.default = MyDocument;
//# sourceMappingURL=_document.js.map