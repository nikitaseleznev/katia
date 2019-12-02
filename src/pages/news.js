import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

const H1 = styled.h1`
  color: ${({ color }) => color};
`

function NewsPage({ data }) {
  console.log(data.allPrismicNews.nodes)

  return (
    <Layout>
      <H1>News</H1>
      <div>
        {data.allPrismicNews.nodes.map(({ data }) => (
          <div>{data.title.text}</div>
        ))}
      </div>
    </Layout>
  )
}

NewsPage.propTypes = {
  data: PropTypes.shape({
    allPrismicNews: PropTypes.object.isRequired,
  }).isRequired,
}

export default NewsPage

export const pageQuery = graphql`
  query NewsQuery {
    allPrismicNews {
      nodes {
        data {
          title {
            text
          }
          text {
            html
          }
          link {
            url
          }
        }
      }
    }
  }
`
