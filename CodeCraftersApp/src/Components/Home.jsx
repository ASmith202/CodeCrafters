import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // axios.get('http://localhost:5000/posts')
        axios.get('http://localhost:5000/api/posts')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Blog Posts</h1>
            <div className="row">
                {posts.map((post) => (
                 <PostCard key={post._id} post={post}/>  
                ))}
            </div>
        </div>
    );
}

export default Home;
