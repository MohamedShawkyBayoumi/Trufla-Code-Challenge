import React, { useState } from 'react';
import { AppBar, Box, List, ListSubheader, makeStyles, Toolbar, Typography } from '@material-ui/core';
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
    }
}));

type ActiveInterests = {
    [key: string]: number[];
}

interface HomeTypes {
    users: Users[],
    setUsers: (users: Users[]) => void;
}

function Home({ users = [], setUsers }: HomeTypes) {
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
                <Toolbar>
                    <Typography variant="h6" >
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
                        {users.map(({ id, name, following = [], interests = [], interestsData = [] }, userIndex) => {
                            const isActive = !!activeIDs[`${id}_${userIndex}`];
                            return(
                                <Box key={id}>
                                    <UserItem
                                        key={id}
                                        deleteUser={deleteUser}
                                        following={following}
                                        handleClick={handleClick}
                                        id={id}
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
                        })}
                </List>
            </Box>
        </div>
    )
}

export default Home;