import React, { useState } from 'react'
import { count } from '../lib'

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
  const { count, onAuth, user } = props;
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

  const handleDialogUser = () => {
    if (!!user) {
      setDialog({
        title: 'Profile',
        text: user.email,
      });
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            {!!user && (
              <Button color="secondary" size="small" variant="outlined" onClick={handleDialogUser}>Profile</Button>
            )}
          </li>
          {!!user && count > 0 && (
            <li>
              <Typography color="secondary" variant="body2">{count} Completed</Typography>
            </li>
          )}
        </ul>

        <style jsx>{`
          ul {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          nav > ul {
            padding: 4px 8px;
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
            <Typography variant="h6">{dialog.title}</Typography>
            <Typography>{dialog.text}</Typography>
          </DialogContent>
          <DialogActions>
            <Button size="small" onClick={handleLogout}>Sign Out</Button>
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
