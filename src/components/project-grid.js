import React from 'react'
import uuid from 'node-uuid'
import { Link } from 'gatsby'

import Img from './img'

function ProjectGrid({ items }) {
  if (items.lenght === 0) return null

  return (
    <div
      className={`
        flex flex-row flex-wrap
        items-start justify-start
        p-8
        w-full
      `}
    >
      {items.map(item => {
        if (!item.data) return null

        return (
          <Link
            className={`
              flex
              items-center justify-center
              opacity-90 hover:opacity-100
              p-2
              transition
              w-full max-w-40
            `}
            key={uuid()}
            to={item.uid}
          >
            <Img
              alt={item.data.title.text}
              className={`w-full`}
              src={item.data.image}
            />
          </Link>
        )
      })}
    </div>
  )
}

export default React.memo(ProjectGrid)
