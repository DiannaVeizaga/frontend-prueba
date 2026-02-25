import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getPost, getComments } from "../services/api"
import { titulos, descripciones } from "../utils/demoText"

function PostDetail() {

  const { id } = useParams()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    getPost(id).then(setPost)
    getComments(id).then(setComments)
  }, [id])

  if (!post) {
    return (
      <div style={{ padding: 40 }}>
        Cargando publicación...
      </div>
    )
  }

  const titulo = titulos[post.id % titulos.length]
  const descripcion = descripciones[post.id % descripciones.length]

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "32px 16px"
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto"
        }}
      >

        {/* volver */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#4f46e5",
            fontWeight: 500
          }}
        >
          ← Volver
        </Link>

        {/* tarjeta del post */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 18,
            padding: "32px 32px 28px 32px",
            marginTop: 18,
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
          }}
        >
          <h1
            style={{
              fontSize: 38,
              lineHeight: 1.2,
              marginBottom: 16,
              color: "#1f2933"
            }}
          >
            {titulo}
          </h1>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#475569",
              maxWidth: 720
            }}
          >
            {descripcion}
          </p>
        </div>

        {/* comentarios */}
        <div style={{ marginTop: 48 }}>
          <h3
            style={{
              fontSize: 22,
              marginBottom: 20,
              color: "#0f172a"
            }}
          >
            Comentarios
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 16
            }}
          >
            {comments.map(c => (
              <div
                key={c.id}
                style={{
                  background: "#ffffff",
                  padding: 18,
                  borderRadius: 14,
                  border: "1px solid #e5e7eb"
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: 6,
                    color: "#1f2937"
                  }}
                >
                  {c.email}
                </div>

                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.6,
                    color: "#475569",
                    fontSize: 15
                  }}
                >
                  {c.body}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default PostDetail