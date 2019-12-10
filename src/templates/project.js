import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Img from '../components/img'
import ProjectBody from '../components/project-body'

function ProjectPage({ data }) {
  const project = data.project.data

  return (
    <>
      <div
        className={`w-full`}
        css={css`
          height: 64vh;
        `}
      >
        <Img
          className={`h-full`}
          css={css`
            & img {
              object-fit: contain !important;
              object-position: left center !important;
            }
          `}
          src={project.image}
        />
      </div>
      <h1
        className={`
          font-semibold
          my-8
          text-2xl
        `}
      >
        {project.title.text}
      </h1>
      <ProjectBody body={project.body} />
    </>
  )
}

export default ProjectPage

export const pageQuery = graphql`
  query ProjectQuery($uid: String!) {
    project: prismicProjects(uid: { eq: $uid }) {
      data {
        title {
          text
        }
        description
        keywords
        image {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        body {
          __typename
          ... on PrismicProjectsBodyText {
            id
            primary {
              rich_text {
                html
              }
            }
          }
          ... on PrismicProjectsBodyImage {
            id
            items {
              image {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920, quality: 80) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
          ... on PrismicProjectsBodyVideo {
            id
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
`
