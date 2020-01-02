import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    lightInput: {
        background: '#fff',
        color: '#222',
    },
    darkInput: {
        background: '#4f4f4f',
        color: '#fff',
        '& label.Mui-focused': {
            color: 'pink',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'pink',
        },
        lightButton: {},
        darkButton: {
            background: '#c51162',
            color: 'pink',
        }
    }
}));