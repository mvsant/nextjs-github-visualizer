import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { reposRequestSent, requestParameters, fetchRepos } from '../../redux/userDux';
import { Paper, CardActionArea, Grid, Typography } from '@material-ui/core';
import { default as Loading } from '../Loading';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useStyles } from './style';

import { } from '../../redux/userDux'
import { commitsRequestSent } from '../../redux/commitsDux'

const PostLink = props => (
    <Link href="/commits/[id]" as={`/commits/${props.id}`}>
        <a >{props.id}</a>
    </Link>
);


const ReposList = () => {
    const classes = useStyles();
    const isLoading = useSelector(state => state.userData.loading);
    const repoData = useSelector(state => state.userData.repos);
    const repoError = useSelector(state => state.userData.reposError);
    const currentUser = useSelector(state => state.userData.name);
    const currentSize = useSelector(state => state.userData.userCredentials);
    const searchParameters = useSelector(state => state.userData.reqParams);
    const dispatch = useDispatch()

    const [items, setItems] = React.useState(Array.from({ length: 0 }));
    const [more, setMore] = React.useState(true);
    const isInitialMount = React.useRef(true); // Prevent ComponentDidMount request behaviour



    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (items.length <= currentSize.public_repos) {
                setMore(true)
                dispatch(reposRequestSent({
                    userName: currentUser,
                    currentPage: searchParameters.page,
                    currentOrder: searchParameters.order
                }))
                setItems(
                    items.concat(Array.from({ length: 20 }))
                )
            }
            else {
                setItems(Array.from({ length: 0 }));
                setMore(false);
            }
        }
    }, [searchParameters.page]);

    if (repoData.length === 0/* reposError.length>0 */) {
        return (
            <>
                <br />
                <CardActionArea>
                    <Paper className={classes.root}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Typography variant="h5">
                                    Repositories not found
                        </Typography>
                                <Typography variant="h6">
                                    {repoError}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </CardActionArea>
            </>
        )
    }
    else {
        return (
            <>
                <br />
                <InfiniteScroll
                    dataLength={items.length}
                    next={() => {
                        dispatch(requestParameters({
                            page: searchParameters.page + 1,
                            order: searchParameters.order,
                            itensPerLoad: '20',
                        }
                        ))
                    }
                    }
                    hasMore={more}
                    loader={<Loading />}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {repoData.map(repoItem =>
                        <React.Fragment key={repoItem.id}>
                            <CardActionArea>
                                <Paper className={classes.root}>
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item>
                                            <Typography variant="h5" onClick={() => dispatch(commitsRequestSent(repoItem.commits_url))}>
                                                <PostLink id={repoItem.name}>
                                                    {repoItem.name}
                                                </PostLink>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container wrap="nowrap" spacing={2} color="textSecondary" alignItems="stretch">
                                        <Grid item>
                                            <Typography variant="h6" color="textSecondary">
                                                {repoItem.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container wrap="nowrap" spacing={2} color="textSecondary" alignItems="stretch">
                                        <Grid item>
                                            Criado em: {moment(repoItem.created_at).format('DD/MM/YYYY[ ás ]HH:mm:ss')}
                                        </Grid>
                                    </Grid>
                                    <Grid container wrap="nowrap" spacing={2} color="textSecondary">
                                        <Grid item>
                                            Issues: {repoItem.open_issues}
                                        </Grid>
                                        <Grid item>
                                            Forks: {repoItem.forks}
                                        </Grid>
                                        <Grid item>
                                            Stars: {repoItem.stargazers_count}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </CardActionArea>
                            <br />
                        </React.Fragment>
                    )}
                </InfiniteScroll>
            </>
        )
    }
}
export default ReposList;