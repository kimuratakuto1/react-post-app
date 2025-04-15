import React, { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/posts/")
    .then(response => {
      console.log(response.data);
      setPosts(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the posts!", error)
    });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <p><strong>Author:</strong> {post.author}</p>
            <p><strong>Content:</strong> {post.content}</p>
            <p><strong>Created At:</strong> {post.created_at}</p>
            <p><strong>Updated At:</strong> {post.updated_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
