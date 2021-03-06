import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import ProjectsGrid from '../components/project-grid'

function IndexPage({ data, location }) {
  const items = data.project.nodes

  return (
    <>
      <ProjectsGrid items={items} />
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
    project: allPrismicProjects {
      nodes {
        uid
        data {
          title {
            text
          }
          image {
            url
            localFile {
              childImageSharp {
                fluid(maxWidth: 240, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
