import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../redux/themeDux';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { FormControlLabel } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {useStyles} from './style';
import { useRouter } from 'next/router';
import {default as BackButton} from '../BackButton'

/* 

export default () => {
  const router = useRouter()
  console.log(router.query);

  ...
} */
function Header(props) {

    const Router = useRouter();

function handleBack(router){
    if(router.query.id!==undefined){
        return <BackButton/>
    }
}


    const classes = useStyles();
    const dispatch = useDispatch();

    const themeType = useSelector(state => state.themeMode.theme)

    function handleTheme() {
        if (themeType === 'light') {
            dispatch(changeTheme('dark'))
        }
        else {
            dispatch(changeTheme('light'))
        }
    }


    return (
        <Typography className={themeType === 'light' ? classes.root : classes.dark} >
            {props.title}
            <FormControlLabel
                control={<>
                <Fab disableRipple={true}
                    size='small'
                    onClick={() => handleTheme()}
                >
                    <Brightness4Icon/>
                </Fab></>} />
            {handleBack(Router)}
        </Typography>
    )
}
export default Header;