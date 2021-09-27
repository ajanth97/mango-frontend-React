module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "secnds-frontend",
  },
  plugins: [{
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/components/Layout.jsx`),
    },
     },
    ],
};
