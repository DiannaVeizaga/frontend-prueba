import PostItem from "./PostItem"

function PostList({ posts }) {

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px"
      }}
    >
      {posts.map(p => (
        <PostItem key={p.id} post={p} />
      ))}
    </div>
  )
}

export default PostList