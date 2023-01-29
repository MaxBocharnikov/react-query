import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { getPosts } from '../api/post'
import { Post } from '../types/post'

const Post2: React.FC = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await getPosts(),
    staleTime: 5000
  })

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  return (
    <>
      <h1>Post 2</h1>
      {data.map((p: Post) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </>
  )
}

export default Post2
