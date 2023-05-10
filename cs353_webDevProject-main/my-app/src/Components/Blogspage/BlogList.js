import React from 'react'
import BlogItems from './BlogItems'

const BlogList = ({data}) => {
  return (
    <>
        <div>BlogList</div>
    <BlogItems data = {data}/>
    </>
    
  )
}

export default BlogList;