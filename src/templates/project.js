import React from 'react'
import { graphql } from 'gatsby'

function ProjectPage({ data, location }) {
  const project = data.project.data
  return (
    <>
      <h1>{project.title.text}</h1>
      <div>
        {project.body.map(block => (
          <div key={block.id}>
            {block.__typename === 'PrismicProjectsBodyText' && (
              <div
                dangerouslySetInnerHTML={{
                  __html: block.primary.rich_text.html,
                }}
              />
            )}
          </div>
        ))}
      </div>
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
