import React, { useState } from 'react'
import { auth, fetchBooks, firebase, setBook }from '../lib'
import Head from 'next/head'

import { Button, CircularProgress, Typography } from '@material-ui/core'
import Dialog from '../components/dialog'
import List from '../components/list'
import Nav from '../components/nav'

import defaultList from '../list.json';

const Home = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dialogContents, setDialogContents] = useState(null);

  const updateList = async (uid = null) => {
    if (!!uid) {
      const bookRes = await fetchBooks(uid);
//       let total = count;
      const total = Object.entries(bookRes).filter(b => !!b.checked && b.title !== '');
      console.log(total);
//       console.log(bookRes);
//       for (let [key, value] of Object.entries(bookRes)) {
//         if (!!value.checked && value.title !== '') {
//           total++;
//         }
//       }
//       console.log(total);
      setCount(total.length);
      setBooks(bookRes);
    }
    return;
  }

  const handleAuth = async (login = true) => {
    setLoading(true);
    const fbUser = await auth(login);
    setUser(!!fbUser ? fbUser : null);
    await updateList(fbUser.uid);
    setLoading(false);
    return;
  };

  const handleClose = () => {
    setDialogContents(null);
  };

  const handleCheck = async book => {
    if (!!user) {
      await setBook(user.uid, {[book.id]: { title: book.title, checked: book.checked }})
      await updateList(user.uid);
    }
    return;
  };

  const handleUpdate = async title => {
    if (!!user) {
      const newBook = { [dialogContents.id]: { title, checked: title === '' ? false : dialogContents.checked } };
      await setBook(user.uid, newBook)
      await updateList(user.uid);
      handleClose();
    }
    return;
  };

  const handleEdit = (id, name, book) => {
    setDialogContents({
      checked: book.checked,
      id,
      name,
      title: book.title,
    });
  };

  return (
    <div>
      <Head>
        <title>Keep Reading Fun!</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <meta type="description" content="The (unofficial) digital tracking tool for the 2020 Christian Reading Challenge by Visual Theology." />
      </Head>

      <Nav count={count} onAuth={handleAuth} user={user} />

      {loading ? (
        <main><CircularProgress color="secondary" /></main>
      ) : !!user ? (
        <List
          defaultList={defaultList}
          onCheck={handleCheck}
          onEdit={handleEdit}
          userData={books}
        />
      ) : (
        <main>
          <Typography variant="h6">Welcome to the (unofficial) digital tracking tool for the 2020 Christian Reading Challenge</Typography>
          <Typography variant="subtitle1">Read more at <a href="https://www.challies.com/visual-theology/the-2020-christian-reading-challenge/" title="VT CRC Information" target="_blank">Visual Theology</a>.</Typography>
          <br />
          <Typography>Authenticate with your Google account to track your progress throughout the year!</Typography>
          <br />
          <Button color="secondary" size="small" variant="contained" onClick={handleAuth}>Register / Login</Button>
        </main>
      )}

      {!!dialogContents && dialogContents.book !== '' && (
        <Dialog
          name={dialogContents.name}
          input={dialogContents.title}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      )}

      <style jsx global>{`
        body {
          margin: 0 0 30px;
          padding: 0;
          background: #eee url('/bg.png');
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
