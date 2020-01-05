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
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      maxWidth: '500px',
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
  const { defaultList, onCheck, onEdit, userData } = props;
  const classes = useStyles();

  let bookNum = 0;

  return (
    <Paper elevation={5} className={classes.root}>
      <MUIList dense>
        {!!defaultList && defaultList.map((list, listNum) => {
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
                    const userHasBook = !!userData && !!userData[bookNumThis];
                    const userBookTitle = !!userHasBook ? userData[bookNumThis].title : '';
                    const isChecked = !!userHasBook && !!userData[bookNumThis].checked;
                    bookNum++;
                    return (
                      <ListItem key={`book-${bookNumThis}`} button onClick={() => onEdit(bookNumThis, item, { title: userBookTitle, checked: userBookTitle === '' ? false : isChecked })}>
                        <ListItemText
                          primary={userBookTitle}
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
                            onChange={() => onCheck({ id: bookNumThis, title: userBookTitle, checked: !isChecked })}
                            checked={isChecked}
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