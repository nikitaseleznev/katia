import React, { useState } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import uuid from 'node-uuid'

const Accordion = ({ menu, projects }) => {
  const [currenTag, setCurrentTag] = useState(menu[0].tag)

  return (
    <div>
      {menu.map(({ tag }) => (
        <div
          css={css`
            ${tw('cursor-pointer')}
            ${tag === currenTag && tw(['font-bold', 'cursor-default'])}
          `}
          key={uuid()}
          onClick={() => setCurrentTag(tag)}
        >
          {tag}
          {tag === currenTag && (
            <div>
              {projects
                .filter(({ node }) => node.tags.find(x => x === tag))
                .map(({ node }) => (
                  <div key={uuid()}>
                    <Link activeStyle={{ fontWeight: 'bold' }} to={node.uid}>
                      {node.data.title.text}
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Accordion
