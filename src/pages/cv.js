import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'

const H1 = styled.h1`
  color: ${({ color }) => color};
`

function IndexPage({ data, location }) {
  console.log(data.prismicCv.data)

  return (
    <>
      <H1>{data.prismicCv.data.title.text}</H1>
      <img
        css={css`
          width: 100%;
        `}
        alt=""
        src={data.prismicCv.data.image.url}
      />
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
        }
      }
    }
  }
`
