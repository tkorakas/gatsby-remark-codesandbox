const path = require('path');

exports.createPages = async ({ actions, graphql, reporter }, options) => {
    const result = await graphql(`
      query ExampleMarkdownFIles {
        allMarkdownRemark {
            edges {
              node {
                id
                html
              }
            }
          }
      }
    `);
    if (result.errors) {
      reporter.panic('Error loading events', result.errors);
    }
    const pages = result.data.allMarkdownRemark.edges.map(
      (edge) => edge.node
    );
  
    pages.forEach((data, index) => {
      actions.createPage({
        path: `page-${index}`,
        component: path.resolve(__dirname, './src/templates/template.js'),
        context: {
            data,
        },
      });
    });
  };
  