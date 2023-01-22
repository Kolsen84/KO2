module.exports = {
  siteMetadata: {
    title: `Saratoga Springs Doodles`,
    description: `Utah's premier breeder of genetic health tested bernedoodle and goldendoodle puppies.`,
    author: `Andrea Saunders`,
    company: `Saratoga Springs Doodles`,
    siteUrl: `https://www.saratogaspringsdoodles.com/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Saratoga Springs Doodles`,
        short_name: `SSD`,
        start_url: `/`,
        background_color: `#008080`,
        theme_color: `#008080`,
        display: `minimal-ui`,
        icon: `src/images/saratogaspringsdoodles.webp`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-remark`,
    // Netlify CMS to manage content
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        htmlTitle: `Admin: Saratoga Springs Doodles`,
        htmlFavicon: `${__dirname}/src/images/saratogaspringsdoodles.webp`,
      },
    },
    // Make gatsby aware of CMS content
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `dogs`,
        path: `${__dirname}/src/cms/dogs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `litters`,
        path: `${__dirname}/src/cms/litters`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `general`,
        path: `${__dirname}/src/cms/general`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/static/img`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `gallery`,
        path: `${__dirname}/src/cms/gallery`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/src/cms/products`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `srcImages`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sitemap`,
    // Keep netlify plugin last
    `gatsby-plugin-netlify`,
  ],
};
