import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'node-uuid'
import { css } from '@emotion/core'
import { graphql } from 'gatsby'
import { get } from 'lodash'

import Img from '../components/img'

function IndexPage({ data }) {
  const cv = data.prismicCv.data

  return (
    <>
      <h1
        className={`
          font-semibold
          my-8
          text-2xl
        `}
      >
        {cv.title.text}
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
          src={cv.image}
        />
      </div>
      {cv.body.map(({ __typename, primary }) => {
        if (__typename === 'PrismicCvBodyText') {
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

        return null
      })}
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    prismicCv: PropTypes.object.isRequired,
  }).isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  query CvQuery {
    prismicCv {
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
          ... on PrismicCvBodyText {
            primary {
              rich_text {
                html
              }
            }
          }
        }
      }
    }
  }
`
