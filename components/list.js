import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Checkbox,
  List as MUIList,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
  useTheme,
} from '@material-ui/core';

import bookLists from './list-src.json';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'relative',
      // top: '5vh',
      width: '100%',
      maxWidth: '500px',
      // height: '85vh',
      margin: '0 auto',
      padding: 0,
      overflow: 'auto',
      '& ul': {
        padding: 0,
        listStyleType: 'none',
      },
    },
    subList: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    subheader: {
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.background.paper,
      fontSize: 14,
      lineHeight: 1.5,
      '& div': {
        fontSize: 12,
      },
    },
  })
);

const List = props => {
  const { onEdit, userData } = props;
  const theme = useTheme();
  const classes = useStyles();

  let bookNum = 0;

  // const [userBooks, setUserBooks] = useState(userData);

  const findBook = (list, item) => {
  //   const book = userBooks[list][item];
  //   return (!!book && !!book.title) ? book.title : '';
  }

  const findChecked = (list, item) => {
  //   const book = userBooks[list][item];
  //   return !!book && !!book.complete;
  }

  const handleToggle = (list, item) => () => {
  //   const isChecked = findChecked(list, item);
  //   const val = item.toString();
  //   const newChecked = [...checked];
  //   if (isChecked) {
  //     newChecked[list] = newChecked[list].filter(e => e !== val);
  //   } else {
  //     newChecked[list].push(val);
  //   }
  //   setUserBooks(newChecked);
  };

  const handleText = (listNum, itemNum) => {
    // setDialogContents([listNum, itemNum]);
  }

  const handleClose = () => {
    // setDialogContents([]);
  }

  return (
    <Paper elevation={5} className={classes.root}>
      <MUIList dense>
        {bookLists.map((list, listNum) => {
          return (
            <li key={`${list.title}-${listNum}`}>
              <ul>
                <ListSubheader className={classes.subheader}>
                  {list.title}
                  <div>{list.desc}</div>
                </ListSubheader>
                <div className={classes.subList}>
                  {list.items.map(item => {
                    const bookNumThis = bookNum;
                    const userHasBook = !!userData[bookNumThis];
                    bookNum++;
                    return (
                      <ListItem key={`book-${bookNumThis}`} button onClick={() => onEdit(bookNumThis, item)}>
                        <ListItemText
                          primary={!!userHasBook && userData[bookNumThis].title}
                          primaryTypographyProps={{
                            variant: 'subtitle2'
                          }}
                          secondary={item}
                          secondaryTypographyProps={{
                            display: 'block',
                            variant: 'caption',
                          }}
                        />
                        <ListItemSecondaryAction className={classes.ul}>
                          <Checkbox
                            disabled={!userHasBook || !!userHasBook && !userData[bookNumThis].title}
                            edge="end"
                          // onChange={handleToggle(listNum, itemNum)}
                          // checked={findChecked(listNum, itemNum)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })}
                </div>
              </ul>
            </li>
          )
        })}
      </MUIList>
    </Paper>
  );
}

export default List