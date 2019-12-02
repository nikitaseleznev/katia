require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
// const path = require('path')

module.exports = {
  siteMetadata: {
    siteTitle: 'Poop',
    siteUrl: 'http://poop.po',
  },
  plugins: [
    'gatsby-plugin-sharp',
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-emotion`,
    },
    {
      resolve: `gatsby-theme-tailwindcss`,
      options: {
        postCssPlugins: [require('autoprefixer')],
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.PRISMIC_API,
        accessToken: process.env.PRISMIC_TOKEN,
        linkResolver: () => doc => doc.slug,
        schemas: {
          contacts: require('./src/schemas/contacts.json'),
          cv: require('./src/schemas/cv.json'),
          index: require('./src/schemas/index.json'),
          news: require('./src/schemas/news.json'),
          projects: require('./src/schemas/projects.json'),
        },
      },
    },
  ],
}
