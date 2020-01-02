import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root:{ 
      padding: '1%'
    },
    lightInput: {
        background: '#fff',
        color: '#222',
        minHeight: '5vh',
        fontSize: '3vh'
    },
    darkInput: {
        background: '#4f4f4f',
        color: '#fff',
        minHeight: '5vh',
        fontSize: '3vh',
        '& label.Mui-focused': {
            color: 'pink',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'pink',
          },
    }
  }));