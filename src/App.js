import React, { useState } from 'react';

function App() {
  //仮データ
  const [posts, setPosts] = useState([
    { id: 1, content: '今日はちょっと疲れたけど頑張った！'},
    { id: 2, content: '最近、集中力が続かなくなって困ってる...'},
  ]);

  return (
    <div>
      <h1>投稿一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
