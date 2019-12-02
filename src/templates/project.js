import React from 'react'
import { graphql } from 'gatsby'
import uuid from 'node-uuid'

import Layout from '../components/layout'

function ProjectPage({ data }) {
  const project = data.project.data
  return (
    <Layout>
      <h1>{project.title.text}</h1>
      <div>
        {project.body.map(block => (
          <div key={uuid()}>
            {block.__typename === 'PrismicProjectsBodyText' && (
              <div
                key={uuid()}
                dangerouslySetInnerHTML={{
                  __html: block.primary.rich_text.html,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </Layout>
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
`
