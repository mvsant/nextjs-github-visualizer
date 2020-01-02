import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignSelf: 'flex-start',
        background: 'pink',
        color: theme.palette.secondary.dark,
        maxWidth: '100vw',
        height: '56px',
        fontSize: '36px',
    },
    dark: {
        display: 'flex',
        justifyContent: 'space-evenly',
        background: '#c51162',
        color: '#ffc0cb',
        maxWidth: '100vw',
        height: '56px',
        fontSize: '36px',
    },
}));