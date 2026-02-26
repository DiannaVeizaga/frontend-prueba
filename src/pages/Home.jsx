import { useEffect, useState } from "react"
import { getPosts, getUsers } from "../services/api"
import PostList from "../components/PostList"

function Home() {

  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [userFilter, setUserFilter] = useState("")
  const [page, setPage] = useState(1)

  const postsPerPage = 8

  useEffect(() => {
    getPosts().then(setPosts)
    getUsers().then(setUsers)
  }, [])

  const filtered = posts.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase())

    const matchesUser =
      userFilter ? p.userId === Number(userFilter) : true

    return matchesSearch && matchesUser
  })

  const start = (page - 1) * postsPerPage
  const paginated = filtered.slice(start, start + postsPerPage)

  useEffect(() => {
    setPage(1)
  }, [search, userFilter])

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#f5f7fb,#eef2f7)",
        padding: "40px 20px"
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 6,
            fontSize: 32
          }}
        >
          Explorar publicaciones
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: 32
          }}
        >
          Descubre contenido y filtra por usuario o palabras clave
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 32
          }}
        >
          <input
            placeholder="Buscar por texto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #ccc",
              minWidth: 220
            }}
          />

          <select
            value={userFilter}
            onChange={e => setUserFilter(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #ccc",
              minWidth: 220
            }}
          >
            <option value="">Todos los usuarios</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <PostList posts={paginated} />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 30
          }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            style={buttonStyle}
          >
            Anterior
          </button>

          <span
            style={{
              alignSelf: "center",
              color: "#555",
              fontWeight: 500
            }}
          >
            Página {page}
          </span>

          <button
            disabled={start + postsPerPage >= filtered.length}
            onClick={() => setPage(page + 1)}
            style={buttonStyle}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}

const buttonStyle = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: 600
}

export default Home