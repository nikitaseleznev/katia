import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { graphql } from 'gatsby'
import uuid from 'node-uuid'
import { get } from 'lodash'

import Img from '../components/img'
import Slider from '../components/slider'

function IndexPage({ data }) {
  const contact = data.prismicContacts.data

  return (
    <>
      <h1
        className={`
          font-semibold
          my-8
          text-2xl
        `}
      >
        {contact.title.text}
      </h1>
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
          src={contact.image}
        />
      </div>
      <div>
      {contact.body.map(({ __typename, primary, items }) => {
        if (__typename === 'PrismicContactsBodyText') {
          const html = get(primary, 'rich_text.html')
          if (!html) return null

          return (
            <div
              className={`
                leading-relaxed
                max-w-xl
                my-8
              `}
              key={uuid()}
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          )
        }
        if (__typename === 'PrismicContactsBodyImage') {
          return <Slider key={uuid()} items={items} />
        }

        return null
      })}
      </div>
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    prismicContacts: PropTypes.object.isRequired,
  }).isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  query ContactsQuery {
    prismicContacts {
      data {
        title {
          text
        }
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
          ... on PrismicContactsBodyText {
            primary {
              rich_text {
                html
              }
            }
          }
          ... on PrismicContactsBodyImage {
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
        }
      }
    }
  }
`
