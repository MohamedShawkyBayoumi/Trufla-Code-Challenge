import React from 'react';
import { Badge, Button, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { AccountBox, AccountCircle, Delete, ExpandLess, ExpandMore } from '@material-ui/icons';
import { Interests } from '../App';

const useStyles = makeStyles((theme) => ({
    badgeStyles: {
        marginRight: theme.spacing(4),
    }
}));

interface UserItemTypes {
    handleClick: (id: number, userIndex: number, interests: number[]) => void;
    deleteUser: (id: number) => void;
    isActive: boolean;
    interests: number[];
    following: number[];
    interestsData: Interests[];
    id: number;
    userIndex: number;
    name: string;
    followers: number;
}

export function UserItem({
    handleClick,
    deleteUser,
    interests,
    interestsData,
    isActive,
    id,
    userIndex,
    name,
    followers
}: UserItemTypes) {
    const classes = useStyles();
    return (
        <ListItem button onClick={() => interests.length > 0 ? handleClick(id, userIndex, interests) : {}}>
            <ListItemIcon>
                <AccountBox />
            </ListItemIcon>
            <ListItemText primary={name} />
            {interestsData.length ? (
                <>
                    {isActive ? <ExpandLess /> : <ExpandMore />}
                </>
            ) : null}
            <Button
                onClick={() => deleteUser(id)}
            >
                <Delete color='error' />
            </Button>
            <Badge badgeContent={followers} color='primary' className={classes.badgeStyles} key={followers}>
                <AccountCircle color='disabled' />
            </Badge>
        </ListItem>
    )
}