import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

function IndexPage({ data }) {
  const project = data.project.edges[0].node
  return (
    <>
      <Layout>
        <h1>{project.data.title.text}</h1>
      </Layout>
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    project: PropTypes.object.isRequired,
  }).isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    project: allPrismicProjects(limit: 1) {
      edges {
        node {
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
