import * as React from 'react'
import { get } from 'lodash'
import GatsbyImage from 'gatsby-image'

function Img({ src, ...props }) {
  const imageSharp = get(src, 'localFile.childImageSharp')
  const fluid = get(imageSharp, 'fluid')
  const fixed = get(imageSharp, 'fixed')
  const url = get(src, 'url')

  if (fluid) {
    return <GatsbyImage fluid={fluid} {...props} />
  }

  if (fixed) {
    return <GatsbyImage fixed={fixed} {...props} />
  }

  if (url) {
    const { className, ...rest } = props
    return (
      <div
        className={`
          ${className}
          overflow-hidden 
          relative 
          w-full
        `}
        {...rest}
      >
        <img
          className={`absolute inset-0 h-full w-full`}
          src={url}
          alt={get(props, 'alt', get(src, 'alt', ''))}
          loading="lazy"
        />
      </div>
    )
  }

  return null
}

export default Img
