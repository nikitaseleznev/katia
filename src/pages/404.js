import React from 'react'
import { Link } from 'gatsby'

const NotFoundPage = ({ location }) => (
  <>
    <h1>404 Page Not Found</h1>
    <div>
      <Link to="/">Back</Link>
    </div>
  </>
)

export default NotFoundPage
