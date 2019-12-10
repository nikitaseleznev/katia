import React from 'react'
import uuid from 'node-uuid'
import { get } from 'lodash'
import { css } from '@emotion/core'

import Slider from './slider'

function ProjectBody({ body }) {
  if (body.length === 0) return null

  return (
    <>
      {body.map(({ __typename, primary, items }) => {
        if (__typename === 'PrismicProjectsBodyText') {
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
        if (__typename === 'PrismicProjectsBodyImage') {
          return <Slider key={uuid()} items={items} />
        }
        if (__typename === 'PrismicProjectsBodyVideo') {
          const html = get(primary, 'src.html')
          if (!html) return null

          return (
            <div
              className={`
              max-w-2xl
              my-8
              w-full
            `}
              css={css`
                & > iframe {
                  width: 100%;
                }
              `}
              key={uuid()}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        }

        return null
      })}
    </>
  )
}

export default ProjectBody
