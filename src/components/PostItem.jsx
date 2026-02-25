import { Link } from "react-router-dom"
import { titulos, descripciones } from "../utils/demoText"

function PostItem({ post }) {

  const titulo = titulos[post.id % titulos.length]
  const descripcion = descripciones[post.id % descripciones.length]

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        background: "#ffffff"
      }}
    >
      <h3 style={{ marginBottom: 8 }}>
        {titulo}
      </h3>

      <p style={{ color: "#475569" }}>
        {descripcion}
      </p>

      <Link
        to={`/post/${post.id}`}
        style={{ color: "#4f46e5", textDecoration: "none" }}
      >
        Ver detalle
      </Link>
    </div>
  )
}

export default PostItem