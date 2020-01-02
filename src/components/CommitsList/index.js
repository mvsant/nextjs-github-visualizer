import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Paper, TextField, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';
import { useStyles } from './style';

const Post = () => {
  const [input, setInput] = React.useState('');
  const commitsData = useSelector(state => state.commitsData.commits)
  const themeType = useSelector(state => state.themeMode.theme)
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <h1>{router.query.id}</h1>
      <TextField label="buscar Mensagem" type="text"
        onChange={e => setInput(e.target.value)} color='secondary'
        className={themeType === 'light' ? classes.lightInput : classes.darkInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
         />
      <h4>
        <br />
        Commits Messages:
        <br />
        <br />
        {commitsData.filter((commitItem) => {
          let f = commitItem.commit.message.toLowerCase()
          return f.indexOf(
            input.toLowerCase()) !== -1
        })
          .map(details =>
            <div key={details.sha}>
              <Paper className={classes.root}>
                <Typography variant="h6" >
                  {details.commit.message}
                </Typography>
                <Typography color="textSecondary">
                  Autor: {details.commit.author.name}
                </Typography>
                <Typography color="textSecondary">
                  Criado em: {moment(details.commit.author.date).format('DD/MM/YYYY[ ás ]HH:mm:ss')}
                </Typography>
              </Paper>
              <br />
            </div>
          )}
      </h4>
    </>
  );
}
export default Post;