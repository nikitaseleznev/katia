import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

import Accordion from './accordion'

function Component({ data }) {
  const index = data.index.data
  const projects = data.projects.edges

  return (
    <div
      className={`
        p-8
        tracking-wider
      `}
    >
      <h1 className={`mb-6`}>
        <Link to="/">{index.title.text}</Link>
      </h1>
      <Accordion menu={index.menu} projects={projects} />
      <div className={`mt-6`}>
        <div>
          <Link to="/cv">CV</Link>
        </div>
        <div>
          <Link to="/contacts">Contacts</Link>
        </div>
        <div>
          <Link to="/news">News</Link>
        </div>
      </div>
    </div>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        index: prismicIndex {
          data {
            title {
              text
            }
            menu {
              tag
            }
          }
        }
        projects: allPrismicProjects {
          edges {
            node {
              uid
              tags
              data {
                title {
                  text
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Component data={data} {...props} />}
  />
)
