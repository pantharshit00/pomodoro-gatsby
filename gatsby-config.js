module.exports = {
  siteMetadata: {
    title: `Pomodoro Timer`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Pomodoro Timer',
        short_name: 'pomodoro',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#C80025',
        display: 'fullscreen',
        icons: [
          {
            src: `/tomato.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `/tomato.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    },
    `gatsby-plugin-offline`
  ],
  pathPrefix: '/'
};
