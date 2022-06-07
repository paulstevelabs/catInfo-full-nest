"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = require("next/head");
const store_1 = require("utils/store");
require("antd/dist/antd.css");
function RootApp({ Component, pageProps }) {
    return (<>
      <head_1.default>
        <title>sangle docs</title>
      </head_1.default>
      <store_1.AuthProvider>
        <Component {...pageProps}/>
      </store_1.AuthProvider>
    </>);
}
exports.default = RootApp;
//# sourceMappingURL=_app.js.map