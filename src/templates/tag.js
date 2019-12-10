import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import ProjectsGrid from '../components/project-grid'

function TagPage({ data, location }) {
  const items = data.project.nodes

  return (
    <>
      <ProjectsGrid items={items} />
    </>
  )
}

TagPage.propTypes = {
  data: PropTypes.shape({
    project: PropTypes.object.isRequired,
  }).isRequired,
}

export default TagPage

export const pageQuery = graphql`
  query TagQuery($uid: [String]) {
    project: allPrismicProjects(filter: {tags: {in: $uid}}) {
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
