import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Checkbox,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxHeight: 300,
      padding: 0,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      '& ul': {
        padding: 0,
        listStyleType: 'none',
      },
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const ListBooks = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleText = (value) => {
    console.log(value);
  }

  return (
    <List dense className={classes.root}>
      {[0, 1, 2, 3].map(section => {
        const items = [0, 1, 2, 3].map(value => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} button onClick={handleText}>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction className={classes.ul}>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
        return (
          <li key={section}>
            <ul>
              <ListSubheader className={classes.subheader}>{`I'm sticky ${section}`}</ListSubheader>
              { items }
            </ul>
          </li>
        )
      })}
    </List>
  );
}

export default ListBooks