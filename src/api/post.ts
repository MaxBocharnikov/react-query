import axios from 'axios'
import { Post } from '../types/post'

export async function getPosts (): Promise<Post[]> {
  const response = await axios.get('http://localhost:3000/posts')
  return response.data
}

export async function addPost (post: Post): Promise<Post[]> {
  const response = await axios.post('http://localhost:3000/posts', post)
  return response.data
}
