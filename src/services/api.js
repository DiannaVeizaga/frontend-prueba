const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`)
  return res.json()
}

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`)
  return res.json()
}

export async function getPost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`)
  return res.json()
}

export async function getComments(postId) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`)
  return res.json()
}