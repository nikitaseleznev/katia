import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import uuid from 'node-uuid'

const H1 = styled.h1`
  color: ${({ color }) => color};
`

function IndexPage({ data }) {
  console.log(data.prismicContacts.data)

  return (
    <Fragment>
      <H1>{data.prismicContacts.data.title.text}</H1>
      <img
        css={css`
          width: 100%;
        `}
        alt=""
        src={data.prismicContacts.data.image.url}
      />
      <div>
        {data.prismicContacts.data.body.map(
          ({ __typename, items, primary }) => (
            <Fragment key={uuid()}>
              {__typename === 'PrismicContactsBodyImage' &&
                items.map(item => (
                  <div key={uuid()}>
                    {item.image && <img src={item.image.url} alt="" />}
                  </div>
                ))}
              {__typename === 'PrismicContactsBodyText' && (
                <div
                  dangerouslySetInnerHTML={{ __html: primary.rich_text.html }}
                />
              )}
            </Fragment>
          )
        )}
      </div>
    </Fragment>
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
              }
            }
          }
        }
      }
    }
  }
`
