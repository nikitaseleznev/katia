const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const pageMaker = (type, uid) => {
    createPage({
      component: path.resolve(`src/templates/${type}.js`),
      context: {
        uid,
      },
      path: uid.toLowerCase(),
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
      index: prismicIndex {
        data {
          menu {
            tag
          }
        }
      }
    }
  `)

  pages.data.projects.edges.forEach(({ node }) => {
    const { uid } = node
    pageMaker('project', uid)
  })
  pages.data.index.data.menu
    .filter(({ tag }) => tag !== 'Projects')
    .forEach(({ tag }) => {
      pageMaker('tag', tag)
    })
}
