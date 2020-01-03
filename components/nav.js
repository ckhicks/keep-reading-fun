import React, { useState } from 'react'
import { auth, firebase } from '../lib'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'

const Nav = (props) => {
  const { onAuth, user } = props;
  const [dialog, setDialog] = useState(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDialogClose = () => {
    setDialog(null);
  };

  const handleLogout = () => {
    setDialog(null);
    onAuth(false);
  };

  const handleDialogAbout = () => {
    setDialog({
      title: 'About',
      text: '...',
    });
  };

  const handleDialogUser = () => {
    if (!!user) {
      console.log(user);
      setDialog({
        title: user.email,
        text: 'You have read ${} books so far this year!',
        isUser: true,
      });
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            {!!user ? (
              <Button color="secondary" size="small" variant="outlined" onClick={handleDialogUser}>Profile</Button>
            ) : (
              <Button color="secondary" size="small" variant="outlined" onClick={onAuth}>Register / Login</Button>
            )}
          </li>
          {!!user && (
            <li>
              [search] -- [x]
            </li>
          )}
          <li>
            <Button color="secondary" size="small" variant="outlined" onClick={handleDialogAbout}>About</Button>
          </li>
        </ul>

        <style jsx>{`
          ul {
            display: flex;
            justify-content: space-between;
          }
          nav > ul {
            padding: 4px 16px;
          }
          li {
            display: flex;
            padding: 6px 8px;
          }
        `}</style>
      </nav>

      {!!dialog && (
        <Dialog
          fullScreen={fullScreen}
          open={true}
          onClose={handleDialogClose}
        >
          <DialogContent>
            <Typography variant="subtitle1">{dialog.title}</Typography>
            <Typography variant="body1">{dialog.text}</Typography>
          </DialogContent>
          <DialogActions>
            {!!dialog.isUser && <Button size="small" onClick={handleLogout}>Sign Out</Button>}
            <Button onClick={handleDialogClose} color="secondary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default Nav
