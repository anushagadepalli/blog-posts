import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '16px',
  },
  show: {
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  header: {
    padding: '0px 8px',
    cursor: 'pointer',
    background: '#e4eaed'
  },
  content: {
    padding: '8px 16px 24px 16px'
  },
  userDetail: {
    margin: '8px',
    padding: '8px',
    maxWidth: '256px',
    background: '#e4eaed'
  },
  comment: {
    margin: '8px',
    borderRadius: '25px',
    background: '#e4eaed'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function Post(props) {
  const data = props.data;
  const user = props.data.user;
  const classes = useStyles();

  const [expandUser, setExpandUser] = useState(false);
  const [expandComments, setExpandComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}/comments`)
        if(response.ok) {
          let comments = await response.json();
          setComments(comments);
        }
      } catch {

      }
    }
    fetchComments();
  }, [data.id])

  const handleExpandUser = () => {
    setExpandUser(!expandUser);
  };

  const handleExpandComments = () => {
    setExpandComments(!expandComments);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        title={data.title}
        onClick={handleExpandUser}
      />
      <Collapse in={expandUser} timeout="auto" unmountOnExit>
        <Card className={classes.userDetail}>
          <Typography variant="subtitle2" >
            Username: {user.username}
          </Typography>
          <Typography variant="subtitle2" >
            Email ID: {user.email}
          </Typography>
          <Typography variant="subtitle2" >
            Website: {user.website}
          </Typography>
          <Typography variant="subtitle2" >
            Phone: {user.phone}
          </Typography>
        </Card>
      </Collapse>
      <CardContent className={classes.content}>
        <Typography variant="subtitle1">
          {data.body}
        </Typography>
        <Typography variant="h6">
          <span>~ </span>
          {data.author}
        </Typography>
        <Typography 
          className={classes.show} 
          variant="subtitle2" 
          color="textSecondary" 
          component="p"
          onClick={handleExpandComments}>
          Comments({comments.length})
        </Typography>
        <Collapse in={expandComments} timeout="auto" unmountOnExit>
          {comments.map(x => 
            <Card key={x.id} className={classes.comment}>
              <CardContent>
                <Typography variant="h6">
                  {x.email}
                </Typography>
                <Typography variant="subtitle2">
                  {x.body}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Collapse>
      </CardContent>
    </Card>
  );
}
