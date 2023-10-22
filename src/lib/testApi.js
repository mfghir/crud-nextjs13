import axios from "axios"

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
})

const getAllUsers = async () => {
  const { data } = await client.get(`/users`)
  return data
}

const getUser = async (_, id) => {
  const { data } = await client.get(`/users/${id}`)
  return data
}

const createUser = async ({ id, name, email }) => {
  const user = { id, name, email }
  const { data } = await client.post(`/users`, user)
  return data
}

const updateUser = async ({ id, ...user }) => {
  const { data } = await client.put(`/users/${id}`, user)
  return data
}

const deleteUser = async (id) => {
  const { data } = await client.delete(`/users/${id}`)
  return data
}

export {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}