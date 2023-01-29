/* eslint-disable @typescript-eslint/no-floating-promises */

import React from 'react'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import Header from './Header'

const Posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' }
]

async function wait (duration: number) {
  return await new Promise((resolve) => setTimeout(resolve, duration))
}

const App: React.FC = () => {
  const queryClient = useQueryClient()
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await wait(1000).then(() => [...Posts])
    // queryFn: () => Promise.reject('Fuck you')
  })

  const { mutate: addPost, isLoading: addingPostLoading } = useMutation({
    mutationFn: async (title: string) =>
      await wait(1000).then(() =>
        Posts.push({
          id: new Date().getTime(),
          title
        })
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  if (isLoading || addingPostLoading) return <h1>Loading...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  return (
    <>
      <Header />
      {data.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
      <button onClick={() => { addPost('new post') }}>Add New</button>
    </>
  )
}

export default App
