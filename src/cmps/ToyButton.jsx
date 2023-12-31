import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function ToyButton({ func, txt, size, marginBlock }) {

    const buttonStyle = {
        backgroundColor: '#EE9322',
        color: '#fff',
        marginBlock: marginBlock
    }
    
    return (
        // <Stack spacing={2} direction="row">
            <Button size={size} style={buttonStyle} onClick={func} variant="contained">{txt}</Button>
        // </Stack>

    )
}