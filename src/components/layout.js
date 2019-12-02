import React from 'react'
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

function Layout({ children }) {
  return (
    <div
      className={`
        flex flex-row flex-no-wrap
        w-full
      `}
    >
      <Global styles={globalStyles} />
      <div className="w-1/4">
        <Menu />
      </div>
      <div className="p-8 w-3/4">
        {children}
      </div>
    </div>
  )
}

export default Layout
