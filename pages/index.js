import React, { useState } from 'react'
import { auth, firebase }from '../lib'
import Head from 'next/head'

import { Button, Typography, CircularProgress } from '@material-ui/core'
import Dialog from '../components/dialog'
import List from '../components/list'
import Nav from '../components/nav'

const defaultState = {
  "0": {
    "title": "12345",
    "complete": true,
  },
  "2": {
    "title": "asdf",
    "complete": true,
  },
  "5": {
    "title": "qwerty",
    "complete": false,
  },
};

const Home = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogContents, setDialogContents] = useState(null);

  const handleAuth = async (login = true) => {
    setLoading(true);
    if (!login) {
      return await auth(false);
    }
    await auth();
    return;
  };

  const handleClose = () => {
    setDialogContents(null);
  };

  const handleUpdate = () => {
    console.log('updating books...?');
  };

  const handleEdit = (id, title) => {
    setDialogContents({
      book: '',
      title,
    })
  }

  firebase.auth().onAuthStateChanged(fbUser => {
    if (fbUser) {
      setUser(fbUser);
      handleUpdate();
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  });

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>

      <Nav onAuth={handleAuth} user={user} />

      {loading ? (
        <CircularProgress color="secondary" />
      ) : !!user ? (
        <List onEdit={handleEdit} userData={defaultState} />
      ) : (
        <main>
          <p>Welcome to the (unofficial) digital tracking tool for the 2020 Christian Reading Challenge published by <a href="https://www.challies.com/visual-theology/the-2020-christian-reading-challenge/" title="VT CRC Information" target="_blank">Visual Theology</a>.</p>
          <p>Authenticate with your Google account to track your progress throughout the year!</p>
        </main>
      )}

      {!!dialogContents && dialogContents.book !== '' && (
        <Dialog
          title={dialogContents.title}
          input={dialogContents.book}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      )}

      <style jsx global>{`
        body {
          margin: 0 0 30px;
          padding: 0;
          background: #eee url('https://www.toptal.com/designers/subtlepatterns/patterns/white_wall_hash.png');
        }
        main {
          width: 90%;
          max-width: 500px;
          margin: 0 auto;
          color: #333;
          font-size: 1.4em;
          font-weight: 300;
          line-height: 1.5;
          text-align: center;
        }
        a {
          color:
        }
      `}</style>
    </div>
  )
}

export default Home
