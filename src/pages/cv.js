import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import uuid from 'node-uuid'

const H1 = styled.h1`
  color: ${({ color }) => color};
`

function IndexPage({ data }) {
  console.log(data.prismicCv.data)

  return (
    <Fragment>
      <H1>{data.prismicCv.data.title.text}</H1>
      <img
        css={css`
          width: 100%;
        `}
        src={data.prismicCv.data.image.url}
      />
      <div>
        {data.prismicCv.data.body.map(({ primary }) => (
          <div
            key={uuid()}
            dangerouslySetInnerHTML={{ __html: primary.rich_text.html }}
          />
        ))}
      </div>
    </Fragment>
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
        }
        body {
          primary {
            rich_text {
              html
            }
          }
        }
      }
    }
  }
`
