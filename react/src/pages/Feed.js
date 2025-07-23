import React, { useState, useEffect } from 'react';
import { getFeed, createPost } from '../api/posts';
import '../styles/Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchFeed = async () => {
      try {
        const data = await getFeed();
        setPosts(data.posts || []);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить ленту');
      }
    };

    fetchFeed();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      const newPost = await createPost({ content: newPostContent, images: [] });
      setPosts([newPost.post, ...posts]);
      setNewPostContent('');
    } catch (err) {
      console.error(err);
      setError('Не удалось создать пост');
    }
  };

  return (
    <div className="feed-container">
      <div className="feed-sidebar-left">
        <div className="feed-sidebar-block">
          <h3>Меню</h3>
          <ul>
            <li><a href="/feed">Моя страница</a></li>
            <li><a href="/feed">Новости</a></li>
            <li><a href="/profile">Профиль</a></li>
          </ul>
        </div>
      </div>
      <div className="feed-main">
        {error && <div className="feed-error">{error}</div>}
        <div className="feed-post-form-container">
          <h3>Что у вас нового?</h3>
          <form onSubmit={handlePostSubmit} className="feed-post-form">
            <textarea
              placeholder="Напишите что-нибудь..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <button type="submit" className="feed-post-submit">Опубликовать</button>
          </form>
        </div>
        <div className="feed-posts">
          {posts.length === 0 ? (
            <div className="feed-no-posts">В ленте пока нет записей</div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="feed-post">
                <div className="feed-post-header">
                  <div className="feed-post-avatar">
                    {post.author.avatar ? (
                      <img src={post.author.avatar} alt="Avatar" />
                    ) : (
                      <div className="feed-post-avatar-placeholder">
                        {post.author.firstName.charAt(0)}{post.author.lastName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="feed-post-info">
                    <h4>{post.author.firstName} {post.author.lastName}</h4>
                    <span>{new Date(post.createdAt).toLocaleString('ru-RU')}</span>
                  </div>
                </div>
                <div className="feed-post-content">
                  <p>{post.content}</p>
                  {post.images && post.images.length > 0 && (
                    <div className="feed-post-images">
                      {post.images.map((img, index) => (
                        <img key={index} src={img} alt={`Post image ${index}`} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="feed-post-actions">
                  <button className="feed-post-action-button">Нравится</button>
                  <button className="feed-post-action-button">Комментировать</button>
                  <button className="feed-post-action-button">Поделиться</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="feed-sidebar-right">
        <div className="feed-sidebar-block">
          <h3>Друзья онлайн</h3>
          <p>У вас пока нет друзей онлайн</p>
        </div>
      </div>
    </div>
  );
};

export default Feed;
