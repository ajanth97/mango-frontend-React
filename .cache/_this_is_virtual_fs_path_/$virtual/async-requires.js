// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./../../dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-js": () => import("./../../../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-about-js": () => import("./../../../src/pages/about.js" /* webpackChunkName: "component---src-pages-about-js" */),
  "component---src-pages-app-jsx": () => import("./../../../src/pages/app.jsx" /* webpackChunkName: "component---src-pages-app-jsx" */),
  "component---src-pages-login-jsx": () => import("./../../../src/pages/login.jsx" /* webpackChunkName: "component---src-pages-login-jsx" */),
  "component---src-pages-signup-jsx": () => import("./../../../src/pages/signup.jsx" /* webpackChunkName: "component---src-pages-signup-jsx" */)
}

