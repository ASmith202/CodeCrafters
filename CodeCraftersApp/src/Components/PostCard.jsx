import { Link } from "react-router-dom";

function PostCard(props) {
    console.log(props)
    const post = props.post
    
    return (
        <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content.slice(0, 100)}...</p>
                    <Link to={`/post/${post._id}`} className="btn btn-primary btn-sm mx-1">Read More</Link>
                    <Link to={`/edit/:id${post._id}`} className="btn btn-warning btn-sm mx-1">Edit</Link>
                    <Link to={`/post/${post._id}`} className="btn btn-danger btn-sm mx-1">Delete</Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard; 