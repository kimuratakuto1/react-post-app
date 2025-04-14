import React, { useState } from 'react';

function App() {
  //仮データ
  const [posts, setPosts] = useState([
    { id: 1, content: '今日はちょっと疲れたけど頑張った！'},
    { id: 2, content: '最近、集中力が続かなくなって困ってる...'},
  ]);

  const [inputText, setInputText] = useState('');
  const [editingPost, setEditingPost] = useState(null); //編集している投稿

  //投稿を追加する関数
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    //投稿の編集
    if (editingPost) {
      const updatedPosts = posts.map((post) =>
        post.id === editingPost.id ? { ...post,content: inputText } : post
    );
    setPosts(updatedPosts);
    setEditingPost(null);
    } else {
    const newPost = {
      id: posts.length + 1,
      content: inputText,
      timestamp: new Date().toLocaleString(),
    };
    setPosts([newPost, ...posts]);
  }
    setInputText('');
  };

  //投稿を削除する関数
  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  ///編集ボタンがクリックされたとき
  const handleEdit = (post) => {
    setEditingPost(post);
    setInputText(post.content);
  };

  return (
    <div style={{ padding: '20px'}}>
      <h1>みんなのつぶやき</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="今日の気持ちを書いてみよう"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit">{editingPost ? '更新' : '投稿' }</button>
      </form>
      <h2>投稿一覧</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.content}</p>
            <small>{post.timestamp}</small>
            <button onClick={() => handleDelete(post.id)}>削除</button>
            <button onClick={() => handleEdit(post)}>編集</button>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
