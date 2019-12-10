import * as React from 'react'
import { get } from 'lodash'
import GatsbyImage from 'gatsby-image'
import tw from 'tailwind.macro'

const Image = tw('img')`w-full`

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
    return (
      <Image src={url} {...props} alt={get(props, 'alt', get(src, 'alt', ''))} loading="lazy" />
    )
  }

  return null
}

export default Img
