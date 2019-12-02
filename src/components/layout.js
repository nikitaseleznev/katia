import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import { css } from '@emotion/core'
import uuid from 'node-uuid'

import Accordion from './accordion'

function Layout({ data, children }) {
  const index = data.index.data
  const projects = data.projects.edges
  return (
    <div
      css={css`
        ${tw(['flex', 'flex-row', 'flex-no-wrap', 'w-full'])};
      `}
    >
      <div
        css={css`
          ${tw(['w-1/4'])}
        `}
      >
        <h1>
          <Link to="/">{index.title.text}</Link>
        </h1>
        <Accordion menu={index.menu} projects={projects} />
        <div>
          <Link to="/cv">CV</Link>
        </div>
        <div>
          <Link to="/contacts">Contacts</Link>
        </div>
      </div>
      <div
        css={css`
          ${tw(['w-3/4'])}
        `}
      >
        {children}
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
    render={data => <Layout data={data} {...props} />}
  />
)
