module.exports = {
  siteMetadata: {
    title: 'Pomodoro Timer'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Pomodoro Timer',
        short_name: 'pomodoro',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#C80025',
        display: 'fullscreen',
        icons: [
          {
            src: '/tomato-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/tomato-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-96482828-2',
        // Setting this parameter is optional
        anonymize: true
      }
    }
  ],
  pathPrefix: '/'
};
