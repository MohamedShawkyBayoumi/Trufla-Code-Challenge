import React, { useState } from 'react';
import { AppBar, Box, Button, Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { AccountBox, Delete, DeleteForever, ExpandLess, ExpandMore, Stars } from '@material-ui/icons';
import { Users } from '../App';

const useStyles = makeStyles((theme) => ({
    listStyles: {
        marginTop: 100,
        paddingTop: 20,
        paddingBottom: 20,
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 20
    },
    nested: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(10),
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
        let IDs = Object.assign({}, activeIDs);
        
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

        let filteredInterests = copiedUsers[userIndex].interests?.filter(i => i !== interestId);
        let filteredInterestsData = copiedUsers[userIndex].interestsData?.filter(i => i.id !== interestId);

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
                        {users.map(({ id, name, following, interests = [], interestsData = [] }, userIndex) => {
                            return(
                                <Box key={id}>
                                    <ListItem button={interests.length > 0 ? true : true} onClick={() => interests.length > 0 ? handleClick(id, userIndex, interests) : {}}>
                                        <ListItemIcon>
                                            <AccountBox />
                                        </ListItemIcon>
                                        <ListItemText primary={name} />
                                        {interestsData.length ? (
                                            <>
                                                {activeIDs[`${id}_${userIndex}`] ? <ExpandLess /> : <ExpandMore />}
                                            </>
                                        ) : null}
                                        <Button
                                            onClick={() => deleteUser(id)}
                                        >
                                            <Delete color='error' />
                                        </Button>
                                    </ListItem>
                                    {Object.keys(interestsData).length ? interestsData.map((interest, interestIndex) => (
                                        <Collapse in={!!activeIDs[`${id}_${userIndex}`]} timeout="auto" unmountOnExit key={interest.id}>
                                            <List component="div" disablePadding>
                                                <ListItem button className={classes.nested}>
                                                    <ListItemIcon>
                                                        <Stars />
                                                    </ListItemIcon>
                                                    <ListItemText primary={interest.name} />
                                                    <Button
                                                        onClick={() => deleteInterest(userIndex, interest.id)}
                                                    >
                                                        <DeleteForever color='error' />
                                                    </Button>
                                                </ListItem>
                                            </List>
                                        </Collapse>
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