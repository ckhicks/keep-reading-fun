import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

const Dialog = (props) => {
  const { input, name, onClose, onUpdate } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [text, setText] = useState(input);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <MUIDialog
      fullScreen={fullScreen}
      open={true}
      onClose={onClose}
    >
      <DialogContent>
        <Typography variant="h6">{name}</Typography>
        <br />
        <TextField fullWidth onChange={handleChange} value={text} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={() => onUpdate(text)} color="secondary" autoFocus>
          Update
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}

export default Dialog