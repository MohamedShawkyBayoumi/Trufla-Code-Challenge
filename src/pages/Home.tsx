import React, { useState } from 'react';
import { AppBar, Box, List, ListSubheader, makeStyles, Toolbar, Typography, CircularProgress } from '@material-ui/core';
import { Users } from '../App';
import { UserInterests } from '../components/UserInterests';
import { UserItem } from '../components/UserItem';

const useStyles = makeStyles((theme) => ({
    listStyles: {
        marginTop: 100,
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%',
        maxWidth: 800,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 20
    },
    nested: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(10),
    },
    badgeStyles: {
        marginRight: theme.spacing(4),
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%'
    },
    centerStyle: {
        textAlign: 'center'
    },
    toolbar: {
        justifyContent: 'center'
    },
    title: {
        textTransform: 'uppercase',
        letterSpacing: 5
    }
}));

type ActiveInterests = {
    [key: string]: number[];
}

interface HomeTypes {
    users: Users[],
    setUsers: (users: Users[]) => void;
    isLoading: boolean;
    isError: boolean;
}

function Home({ users = [], setUsers, isLoading, isError }: HomeTypes) {
    const classes = useStyles();
    const [activeIDs, setActiveIDs] = useState<ActiveInterests>({});

    const handleClick = (id: number, userIndex: number, interests: number[]) => {
        const IDs = Object.assign({}, activeIDs);
        
        if(IDs[`${id}_${userIndex}`]){
            delete IDs[`${id}_${userIndex}`]
            setActiveIDs(IDs);
        } else {
            setActiveIDs({
                ...activeIDs,
                [`${id}_${userIndex}`]: interests
            });
        }
    };

    const deleteUser = (id: number) => {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
    }

    const deleteInterest = (userIndex: number, interestId: number) => {

        const copiedUsers = [...users];

        const filteredInterests = copiedUsers[userIndex].interests?.filter(i => i !== interestId);
        const filteredInterestsData = copiedUsers[userIndex].interestsData?.filter(i => i.id !== interestId);

        copiedUsers[userIndex].interests = filteredInterests;
        copiedUsers[userIndex].interestsData = filteredInterestsData;

        setUsers(copiedUsers);
    }
    return (
        <div style={{ minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        Users List
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                className={classes.boxContainer}
            >
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Users with their interests
                        </ListSubheader>
                    }
                    className={classes.listStyles}
                    >
                        {isLoading ? (
                            <Box className={classes.centerStyle}>
                                {/* show loader while fetching data */}
                                <CircularProgress />
                            </Box>
                        ) : 
                            users.length ? users.map(({ id, name, following = [], interests = [], interestsData = [], followers }, userIndex) => {
                                const isActive = !!activeIDs[`${id}_${userIndex}`];
                                return(
                                    <Box key={id}>
                                        <UserItem
                                            key={id}
                                            deleteUser={deleteUser}
                                            following={following}
                                            handleClick={handleClick}
                                            id={id}
                                            followers={followers}
                                            interests={interests}
                                            interestsData={interestsData}
                                            name={name}
                                            userIndex={userIndex}
                                            isActive={isActive}
                                        />
                                        {Object.keys(interestsData).length ? interestsData.map((interest) => (
                                            <UserInterests
                                                key={interest.id}
                                                isOpen={!!isActive}
                                                deleteInterest={deleteInterest}
                                                userIndex={userIndex}
                                                interest={interest}
                                            />
                                        )): null}
                                    </Box>
                                )
                            }): (
                                <Typography className={classes.centerStyle} color={isError ? 'error' : 'textPrimary'}>
                                    {/* show error msg if the network has issue, or showing no users if there is no any user */}
                                    {isError ? 'Something went wrong when fetching data.' : 'There is no users.'}
                                </Typography>
                            )
                        }
                </List>
            </Box>
        </div>
    )
}

export default Home;