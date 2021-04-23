import React from 'react';
import { Button, Collapse, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { DeleteForever, Stars } from '@material-ui/icons';
import { Interests } from '../App';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(10),
    }
}));

interface InterestsTypes {
    isOpen: boolean,
    userIndex: number,
    interest: Interests,
    deleteInterest: (userIndex: number, interestId: number) => void;
}

export function UserInterests({ isOpen, deleteInterest, userIndex, interest }: InterestsTypes) {
    const classes = useStyles();
    return (
        <Collapse in={isOpen} timeout="auto" unmountOnExit key={interest.id}>
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
    )
}