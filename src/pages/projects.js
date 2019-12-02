import React from 'react'
import { graphql, Link } from 'gatsby'
import uuid from 'node-uuid'

import Layout from '../components/layout'

function ProjectsPage({ data }) {
  const { edges } = data.projects
  return (
    <Layout>
      <h1>Projects</h1>
      <div>
        {edges.map(({ node }) => (
          <Link to={node.uid} key={uuid()}>
            <h2>{node.data.title.text}</h2>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default ProjectsPage

export const pageQuery = graphql`
  query ProjectsQuery {
    projects: allPrismicProjects {
      edges {
        node {
          uid
          data {
            title {
              text
            }
            description
            keywords
            image {
              url
            }
            body {
              __typename
              ... on PrismicProjectsBodyText {
                primary {
                  rich_text {
                    html
                  }
                }
              }
              ... on PrismicProjectsBodyImage {
                items {
                  image {
                    url
                  }
                }
              }
              ... on PrismicProjectsBodyVideo {
                primary {
                  src {
                    html
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
