module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
              path: 'content',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
              gfm: true,
              plugins: [
                {
                  resolve: '@tkorakas/gatsby-remark-codesandbox',
                  options: {
                    directory: `./_examples/`,
                  },
                },
              ],
            },
          },
    ],
  };
  