import React, { useState } from 'react'
import { css } from '@emotion/core'

import Img from './img'

function Slider({ items }) {
  const [current, set] = useState(0)

  if (items.length === 0) return null

  const handleClick = () => {
    if (items.length > 1) {
      set(cur => (cur + 1) % items.length)
    }
  }

  return (
    <div className={`my-8`}>
      <div
        className={`
          relative
          w-full
          ${items.length > 1 ? `cursor-pointer` : ''}
        `}
        css={css`
          height: 64vh;
        `}
        onClick={handleClick}
      >
        <Img
          className={`h-full`}
          css={css`
            & img {
              object-fit: contain !important;
              object-position: left center !important;
            }
          `}
          src={items[current].image}
        />
      </div>
      {items.length > 1 && (
        <div className={`mt-2`}>
          <span>{current + 1}</span>
          <span>{` / `}</span>
          <span>{items.length}</span>
        </div>
      )}
    </div>
  )
}

export default Slider
