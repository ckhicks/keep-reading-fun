import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  Input,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {}
  }),
);

const Dialog = (props) => {
  const { title, input, onClose, onUpdate } = props;
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [text, setText] = useState(book);

  return (
    <MUIDialog
      fullScreen={fullScreen}
      open={true}
      onClose={onClose}
    >
      <DialogContent>
        <Typography variant="h6">{category}</Typography>
        <br />
        <Input fullWidth onChange={setText} value={text} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={onUpdate} color="secondary" autoFocus>
          Update
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}

export default Dialog