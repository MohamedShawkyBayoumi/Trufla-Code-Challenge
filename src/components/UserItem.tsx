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
}

export function UserItem({
    handleClick,
    deleteUser,
    interests,
    following,
    interestsData,
    isActive,
    id,
    userIndex,
    name
}: UserItemTypes) {
    const classes = useStyles();
    return (
        <ListItem button onClick={() => interests.length > 0 ? handleClick(id, userIndex, interests) : {}}>
            <ListItemIcon>
                <AccountBox />
            </ListItemIcon>
            <ListItemText primary={name} />
            {following.map((count) => (
                <Badge badgeContent={count} color='primary' className={classes.badgeStyles} key={count}>
                    <AccountCircle color='disabled' />
                </Badge>
            ))}
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
        </ListItem>
    )
}