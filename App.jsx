import React, { useState } from 'react';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', videoUrl: '', author: '' });

  const handlePost = () => {
    if (newPost.title && (newPost.content || newPost.videoUrl)) {
      setPosts([{ ...newPost, comments: [] }, ...posts]);
      setNewPost({ title: '', content: '', videoUrl: '', author: '' });
    }
  };

  const addComment = (index, comment) => {
    const updatedPosts = [...posts];
    updatedPosts[index].comments.push(comment);
    setPosts(updatedPosts);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Criticismo Radical</h1>
      <input placeholder="Autor" value={newPost.author} onChange={(e) => setNewPost({ ...newPost, author: e.target.value })} />
      <input placeholder="Título" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
      <textarea placeholder="Conteúdo" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} />
      <input placeholder="Link do vídeo" value={newPost.videoUrl} onChange={(e) => setNewPost({ ...newPost, videoUrl: e.target.value })} />
      <button onClick={handlePost}>Publicar</button>

      {posts.map((post, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: 10, marginTop: 20 }}>
          <h2>{post.title}</h2>
          <p><i>Por {post.author}</i></p>
          <p>{post.content}</p>
          {post.videoUrl && <iframe width="100%" height="315" src={post.videoUrl.replace("watch?v=", "embed/")} frameBorder="0" allowFullScreen></iframe>}
          <div>
            <h3>Comentários</h3>
            {post.comments.map((c, i) => <p key={i}>{c}</p>)}
            <textarea onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addComment(index, e.target.value);
                e.target.value = '';
              }
            }} placeholder="Comente..."/>
          </div>
        </div>
      ))}
    </div>
  );
}