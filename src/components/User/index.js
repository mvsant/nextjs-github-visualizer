import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardActions, Avatar, Typography, Box } from '@material-ui/core'
import moment from 'moment';
import { useStyles } from './style'




const User = () => {
    const classes = useStyles();

    const userData = useSelector(state => state.userData.userCredentials)

    if (userData.length === 0) {
        return null
    }
    else {
        return (
            <>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar alt={userData.name} src={userData.avatar_url} />
                        }
                        title={userData.name}
                        subheader={moment(userData.created_at).format('DD/MM/YYYY[ ás ]HH:mm:ss')}
                    />
                    <Box component="div" className={classes.box}>
                        <Typography color="textSecondary" gutterBottom>
                            Username: {userData.login}
                        </Typography >
                        <Typography gutterBottom>
                            Bio: {userData.bio}
                        </Typography>
                        <br />
                        <Typography color="textSecondary">
                            blog: <a href={userData.blog}> {userData.blog}</a>
                        </Typography>
                        <br />
                        <Typography color="textSecondary">
                            Última atualização: {moment(userData.updated_at).format('DD/MM/YYYY[ ás ]HH:mm:ss')}
                        </Typography>
                    </Box>
                </Card>
            </>
        )
    }
}
export default User;