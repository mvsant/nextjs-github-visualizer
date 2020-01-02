import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        background: '#4f4f4f',
        color: '#fff',
        '& label.Mui-focused': {
            color: 'pink',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'pink',
        },
    },
}));