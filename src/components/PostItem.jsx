import { Link } from "react-router-dom"

function PostItem({ post }) {

  const imageUrl = `https://picsum.photos/seed/${post.id}/400/250`

const titles = [
  "Y si nos perdemos sin mirar atrás",
  "Bailar bajo la misma luna",
  "Lo nuestro no fue casualidad",
  "Prometimos no rendirnos nunca",
  "Te encontré cuando no te buscaba",
  "Lo simple también es bonito",
  "Quédate cuando todo tiemble",
  "A veces también se gana perdiendo"
]

const bodies = [
  "Hay historias que no se explican, solo se sienten cuando la música empieza a sonar.",
  "No fue el lugar, fue el momento… y fue contigo.",
  "Al final, todo lo que queríamos era quedarnos un poco más.",
  "Entre risas, errores y canciones viejas, se nos fue haciendo tarde.",
  "No era perfecto, pero era real. Y eso bastaba.",
  "Algunas personas llegan para cambiarte la playlist de la vida.",
  "No prometo siempre, pero sí mientras dure de verdad.",
  "Hay recuerdos que suenan mejor cuando cierras los ojos."
]

const title = titles[post.id % titles.length]
const body = bodies[post.id % bodies.length]

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        marginBottom: 24,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <img
        src={imageUrl}
        alt="post"
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover"
        }}
      />

      <div style={{ padding: 16 }}>
        <h3 style={{ marginBottom: 8 }}>
  {title}
</h3>

<p style={{ color: "#555", marginBottom: 12 }}>
  {body}
</p>
        <Link
          to={`/post/${post.id}`}
          style={{
            color: "#2563eb",
            fontWeight: 600,
            textDecoration: "none"
          }}
        >
          Ver detalle →
        </Link>
      </div>
    </div>
  )
}

export default PostItem