import CommentItem from "./CommentItem"

function CommentList({ comments }) {

  return (
    <div>
      {comments.map(c => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </div>
  )
}

export default CommentList