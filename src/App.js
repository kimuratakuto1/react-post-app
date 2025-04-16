import React, { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  //ログイン用の状態
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //CSRFトークンを取得
    axios.get("http://127.0.0.1:8000/api/csrf", { withCredentials: true })
      .then(response => {
        setCsrfToken(response.data.csrfToken);
      })
      .catch(error => {
        console.error("CSRFトークンの取得に失敗しました", error);
      });

    // 投稿一覧取得
    axios.get("http://127.0.0.1:8000/api/posts/")
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("投稿の取得に失敗しました", error);
      });
  }, []);


  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/login/", {
      username,
      password,
    }, {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    })
    .then(response => {
      console.log("ログイン成功:", response.data);
      setIsLoggedIn(true);
    })
    .catch(error => {
      console.error("ログイン失敗:", error);
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/posts/", {
      title: newTitle,
      content: newContent,
    }, {
      headers: {
        'X-CSRFToken': csrfToken,
      },
      withCredentials: true,
    })
    .then(response => {
      setPosts([...posts, response.data]);
      setNewTitle("");
      setNewContent("");
    })
    .catch(error => {
      console.error("投稿に失敗しました", error);
    });
  };

  return (
    <div>
      <h1>投稿一覧</h1>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="タイトルを入力"
      />

        <input
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="投稿内容を入力"
        />
        <button type="submit">投稿</button>
      </form>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;