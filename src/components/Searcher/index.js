import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userTyped, userRequestSent, reposRequestSent, requestParameters } from '../../redux/userDux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import {useStyles} from './style'


const Searcher = () => {
    const classes = useStyles();
    const themeType = useSelector(state => state.themeMode.theme)
    const typedChar = useSelector(state => state.userData.name)
    const searchParameters = useSelector(state => state.userData.reqParams)
    const dispatch = useDispatch();
    const [previousSearch, setPreviousSearch] = React.useState(typedChar); //Prevent sequential repetition
    const isInitialMount = React.useRef(true); // Prevent ComponentDidMount request behaviour

    function handleKeyPress(target) {
        if(target.charCode==13){
            sendButtonHandler(typedChar)
        } 
      }


    function nameHandler(event) {
        let evt = event.target.value;
        dispatch(userTyped(evt.trim()))
    }

    function sendButtonHandler(fieldContent) {
        if (previousSearch !== fieldContent) {
            dispatch(userRequestSent(fieldContent)
            )
            dispatch(requestParameters({
                page: 1,
                order: searchParameters.order,
                itensPerLoad: '20',
            }
            ))
            dispatch(reposRequestSent({
                userName: typedChar,
                currentPage: 1,
                currentOrder: searchParameters.order
            })
            )
            setPreviousSearch(fieldContent)
        }
    }

    function orderButtonHandler() {
        dispatch(requestParameters({
            page: 1,
            order: searchParameters.order === 'asc' ? 'desc' : 'asc',
            itensPerLoad: '20',
        }
        ))
    }

    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            dispatch(reposRequestSent({
                userName: typedChar,
                currentPage: searchParameters.page,
                currentOrder: searchParameters.order
            }))
        }
    }, [searchParameters.order]);


    return (
        <>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <TextField
                        label="Username" autoFocus
                        className={themeType === 'light' ? classes.lightInput : classes.darkInput}
                        onChange={event => nameHandler(event)}
                        onKeyPress={handleKeyPress}
                        color='secondary'
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                          }}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        className={themeType === 'light' ? classes.lightInput : classes.darkButton}
                        onClick={() => {
                            sendButtonHandler(typedChar)
                        }}>
                        Enviar
            </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        color="default"
                        onClick={() => {
                            orderButtonHandler()
                        }}>
                        ordem
            </Button>
                </Grid>
            </Grid>
        </>
    )
}
export default Searcher;