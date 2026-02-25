function CommentItem({ comment }) {

  return (
    <div style={{ borderBottom: "1px solid #ddd", padding: 5 }}>
      <strong>{comment.email}</strong>
      <p>{comment.body}</p>
    </div>
  )
}

export default CommentItem