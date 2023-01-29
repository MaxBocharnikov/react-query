import React from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { addPost, getPosts } from '../api/post'
import { Post } from '../types/post'

const Post1: React.FC = () => {
  const queryClient = useQueryClient()
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await getPosts()
  })

  const addPostMutation = useMutation({
    mutationFn: async (post: Post) => await addPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  const onAddPostHandle = () => {
    const newPost = {
      id: new Date().getTime(),
      title: 'some',
      author: 'Max'
    }
    addPostMutation.mutate(newPost)
  }

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  return (
    <>
      <h1>Post 1</h1>
      {data.map((p: Post) => (
        <div key={p.id}>{p.title}</div>
      ))}
      <button onClick={onAddPostHandle}>Add Post</button>
    </>
  )
}

export default Post1
