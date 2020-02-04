import React, { memo } from 'react'
import { Global, css } from '@emotion/core'
import tw from 'tailwind.macro'

import '../fonts/noto-sans/stylesheet.css'
import '../utils/globals.css'

import Menu from './menu'

const globalStyles = css`
  body {
    ${tw`font-body`};
    font-size: 12px;
  }
`

function Layout({ children, location }) {
  return (
    <div
      className={`
        flex flex-row flex-no-wrap
        w-full
      `}
    >
      <Global styles={globalStyles} />
      <div
        className={`
          flex-initial
          md:max-w-1/4
        `}
      >
        <Menu location={location} />
      </div>
      <div className={`flex-1 p-8`}>{children}</div>
    </div>
  )
}

export default memo(Layout)
