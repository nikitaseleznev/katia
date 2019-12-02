const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const pageMaker = (type, uid) => {
    createPage({
      component: path.resolve(`src/templates/${type}.js`),
      context: {
        uid,
      },
      path: uid,
    })
  }

  const pages = await graphql(`
    {
      projects: allPrismicProjects {
        edges {
          node {
            uid
          }
        }
      }
    }
  `)

  pages.data.projects.edges.forEach(({ node }) => {
    const { uid } = node
    pageMaker('project', uid)
  })
}
