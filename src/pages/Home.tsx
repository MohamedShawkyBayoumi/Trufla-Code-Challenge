import React, { useState } from 'react';
import { AppBar, Box, Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { AccountBox, ExpandLess, ExpandMore, Stars } from '@material-ui/icons';
import { DataTypes } from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
}));

type linkedData = {
    [key: string]: DataTypes['interests'];

}

function Home({ users = [], interests = [] }: DataTypes) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [activeID, setActiveID] = useState<null | number>(null);
    const [linkedData, setLinkedData] = useState<linkedData>({});

    const handleClick = (id: number, userIndex: number) => {
        const usersInterests = users[userIndex].interests;
        const filteredInterests = interests.filter((interest) => usersInterests?.find(item => item == interest.id));
        console.log(filteredInterests);

        if(linkedData[`${id}_${userIndex}`]){
            const filteredLinkedData = Object.assign({}, linkedData);
            delete filteredLinkedData[`${id}_${userIndex}`];
            setLinkedData(filteredLinkedData);
        } else {
            setLinkedData({ ...linkedData, [`${id}_${userIndex}`]: filteredInterests });
        }
        setActiveID(id);
    };

    console.log('linkedData linkedData linkedData', linkedData);
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" >
                        Users List
                    </Typography>
                </Toolbar>
            </AppBar>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Users with their interests
                    </ListSubheader>
                }
                className={classes.root}
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
                                </ListItem>
                                {Object.keys(linkedData).length && linkedData[`${id}_${userIndex}`] ? linkedData[`${id}_${userIndex}`].map((interest, index) => (
                                    <Collapse in={open} timeout="auto" unmountOnExit key={interest.id}>
                                        <List component="div" disablePadding>
                                            <ListItem button className={classes.nested}>
                                                <ListItemIcon>
                                                    <Stars />
                                                </ListItemIcon>
                                                <ListItemText primary={interest.name} />
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                )): null}
                            </Box>
                        )
                    })}
            </List>
        </div>
    )
}

export default Home;