import React, { useState } from 'react';
import { AppBar, Box, Button, Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { AccountBox, Delete, DeleteForever, ExpandLess, ExpandMore, Stars } from '@material-ui/icons';
import { DataTypes, Users, Interests } from '../App';

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
        // background: "url('https://a0.muscache.com/im/pictures/80ac6baf-ea77-4d14-bbb7-c91a4230b20a.jpg?im_q=highq&im_w=720')",
        // height: '100%',
        // width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%'
    }
}));

type linkedData = {
    [key: string]: DataTypes['interests'];

}

interface HomeTypes {
    users: Users[],
    interests: Interests[],
    setUsers: (users: Users[]) => void;
}

function Home({ users = [], interests = [], setUsers }: HomeTypes) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [linkedData, setLinkedData] = useState<linkedData>({});

    const handleClick = (id: number, userIndex: number) => {
        const usersInterests = users[userIndex].interests;
        const filteredInterests = interests.filter((interest) => usersInterests?.find(item => item === interest.id));
        console.log(filteredInterests);

        if(linkedData[`${id}_${userIndex}`]){
            const filteredLinkedData = Object.assign({}, linkedData);
            delete filteredLinkedData[`${id}_${userIndex}`];
            setLinkedData(filteredLinkedData);
        } else {
            setLinkedData({ ...linkedData, [`${id}_${userIndex}`]: filteredInterests });
        }
    };

    const deleteUser = (id: number) => {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
    }

    const deleteInterest = (userId: number, userIndex: number, interestId: number) => {
        const copiedUsers = [...users];
        const copiedLinkedData = Object.assign({}, linkedData);

        const filteredInterest = copiedUsers[userIndex]?.interests?.find(interest => interest !== interestId);

        copiedLinkedData[`${userId}_${userIndex}`] = copiedLinkedData[`${userId}_${userIndex}`]?.filter(item => item.id === filteredInterest);

        setLinkedData(copiedLinkedData);
    }

    console.log('linkedData linkedData linkedData', linkedData);
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
                        {users.map(({ id, name, following, interests = [] }, userIndex) => {
                            return(
                                <Box key={id}>
                                    <ListItem button={interests.length > 0 ? true : true} onClick={() => interests.length > 0 ? handleClick(id, userIndex) : {}}>
                                        <ListItemIcon>
                                            <AccountBox />
                                        </ListItemIcon>
                                        <ListItemText primary={name} />
                                        {interests.length ? (
                                            <>
                                                {linkedData[`${id}_${userIndex}`] ? <ExpandLess /> : <ExpandMore />}
                                            </>
                                        ) : null}
                                        <Button
                                            onClick={() => deleteUser(id)}
                                        >
                                            <Delete color='error' />
                                        </Button>
                                    </ListItem>
                                    {Object.keys(linkedData).length && linkedData[`${id}_${userIndex}`] ? linkedData[`${id}_${userIndex}`].map((interest, interestIndex) => (
                                        <Collapse in={open} timeout="auto" unmountOnExit key={interest.id}>
                                            <List component="div" disablePadding>
                                                <ListItem button className={classes.nested}>
                                                    <ListItemIcon>
                                                        <Stars />
                                                    </ListItemIcon>
                                                    <ListItemText primary={interest.name} />
                                                    <Button
                                                        onClick={() => deleteInterest(id, userIndex, interest.id)}
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