import { useEffect, useMemo, useState } from "react"
import { getPosts, getUsers } from "../services/api"
import PostList from "../components/PostList"

function Home() {

  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [userFilter, setUserFilter] = useState("")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const postsPerPage = 10

  // ---------- Carga inicial ----------
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const [p, u] = await Promise.all([
        getPosts(),
        getUsers()
      ])
      setPosts(p)
      setUsers(u)
      setLoading(false)
    }

    loadData()
  }, [])

  // ---------- Debounce del buscador ----------
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search)
    }, 400)

    return () => clearTimeout(t)
  }, [search])

  // ---------- Reset página ----------
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, userFilter])

  // ---------- Filtro optimizado ----------
  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.body.toLowerCase().includes(debouncedSearch.toLowerCase())

      const matchesUser =
        userFilter ? p.userId === Number(userFilter) : true

      return matchesSearch && matchesUser
    })
  }, [posts, debouncedSearch, userFilter])

  const start = (page - 1) * postsPerPage
  const paginated = filtered.slice(start, start + postsPerPage)

  const clearFilters = () => {
    setSearch("")
    setUserFilter("")
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f4f6",
      padding: "30px"
    }}>

      <div style={{
        maxWidth: "1100px",
        margin: "0 auto 24px auto"
      }}>
        <h1 style={{
          margin: 0,
          fontSize: "28px",
          fontWeight: 700,
          color: "#111827"
        }}>
          Publicaciones Prueba
        </h1>

        <p style={{
          marginTop: 4,
          color: "#6b7280"
        }}>
          Listado de publicaciones disponibles
        </p>
      </div>

      {/* Filtros */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto 16px auto",
        background: "white",
        padding: "16px",
        borderRadius: "12px",
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
      }}>

        <input
          placeholder="Buscar publicaciones..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "220px",
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            outline: "none"
          }}
        />

        <select
          value={userFilter}
          onChange={e => setUserFilter(e.target.value)}
          style={{
            minWidth: "220px",
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            background: "white"
          }}
        >
          <option value="">Todos los usuarios</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        {(search || userFilter) && (
          <button
            onClick={clearFilters}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              background: "white",
              cursor: "pointer"
            }}
          >
            Limpiar
          </button>
        )}

      </div>

      {/* Contador */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto 14px auto",
        color: "#4b5563",
        fontSize: "14px"
      }}>
        {filtered.length} resultados encontrados
      </div>

      {/* Contenido */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto"
      }}>

        {loading && (
          <p style={{ color: "#6b7280" }}>
            Cargando publicaciones…
          </p>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#6b7280"
          }}>
            No hay publicaciones para mostrar.
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <PostList posts={paginated} />
        )}

        {/* Paginación */}
        {!loading && filtered.length > 0 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            marginTop: "24px"
          }}>

            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                background: page === 1 ? "#e5e7eb" : "#2563eb",
                color: page === 1 ? "#6b7280" : "white",
                cursor: page === 1 ? "not-allowed" : "pointer"
              }}
            >
              Anterior
            </button>

            <span style={{ color: "#374151" }}>
              Página {page}
            </span>

            <button
              disabled={start + postsPerPage >= filtered.length}
              onClick={() => setPage(p => p + 1)}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                background:
                  start + postsPerPage >= filtered.length
                    ? "#e5e7eb"
                    : "#2563eb",
                color:
                  start + postsPerPage >= filtered.length
                    ? "#6b7280"
                    : "white",
                cursor:
                  start + postsPerPage >= filtered.length
                    ? "not-allowed"
                    : "pointer"
              }}
            >
              Siguiente
            </button>

          </div>
        )}

      </div>

    </div>
  )
}

export default Home