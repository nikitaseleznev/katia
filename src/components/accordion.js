import React, { useState, Fragment, useEffect, memo } from 'react'
import uuid from 'node-uuid'
import { Link } from 'gatsby'
import { get } from 'lodash'

const Accordion = ({ menu, projects, location }) => {
  const [currenTag, setCurrentTag] = useState(null)

  useEffect(() => {
    const pathname = location.pathname.replace('/', '').toLowerCase()
    const tag = menu[0].tag.toLowerCase()
    const projectTag = get(
      projects.find(({ node }) => node.uid === pathname),
      'node.tags.0'
    )

    if (
      projectTag &&
      projectTag.toLowerCase() !== currenTag &&
      currenTag !== 'projects'
    ) {
      setCurrentTag(projectTag.toLowerCase())
    } else if (location.pathname === '/' && pathname !== tag) {
      setCurrentTag(tag)
    } else if (
      menu.find(({ tag }) => tag.toLowerCase() === pathname) &&
      pathname !== currenTag
    ) {
      setCurrentTag(pathname)
    }
  }, [location.pathname, currenTag, menu, projects])

  return (
    <div
      className={`
        max-w-full
      `}
    >
      {menu.map(({ tag }) => (
        <Fragment key={uuid()}>
          <Link
            className={`
              block
              cursor-pointer
              opacity-75 hover:opacity-100
              transition
              ${tag.toLowerCase() === currenTag && `font-semibold`}
            `}
            to={`/${tag.toLowerCase()}`}
          >
            {tag}
          </Link>
          {tag.toLowerCase() === currenTag && (
            <div>
              {projects
                .filter(({ node }) => node.tags.find(x => x === tag))
                .map(({ node }) => (
                  <div key={uuid()}>
                    <Link
                      className={`
                        inline-block
                        max-w-full
                        opacity-75 hover:opacity-100
                        pl-2
                        transition
                        truncate
                      `}
                      activeStyle={{ fontWeight: 'bold' }}
                      to={node.uid}
                    >
                      {node.data.title.text}
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default memo(Accordion)
