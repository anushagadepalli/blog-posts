import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Post from './Post.js';

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchList() {
      const users = await fetchUsers();
      const posts = await fetchPosts();
      renderList(users, posts);
    }
    fetchList();
  }, [])

  async function fetchUsers() {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
      if(response.ok) {
        const users = await response.json();
        return users;
      }
    } catch {

    }
  }

  async function fetchPosts() {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      if(response.ok) {
        const posts = await response.json();
        return posts;
      }
    } catch {

    }
  }

  function renderList(users, posts) {
    const usersObj = {};
    for(let user of users) {
      usersObj[user.id] = user;
    }
    const list = posts.map(item => {
      return {
        id: item.id,
        title: item.title,
        body: item.body,
        author: usersObj[item.userId].name,
        user: usersObj[item.userId]
      }
    })
    setList(list);
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            The Posts
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        {list.map(x => 
          <Post key={x.id} data={x} /> 
        )}
      </div>
    </div>
  );
}

export default App;
