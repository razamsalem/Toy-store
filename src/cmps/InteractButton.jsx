import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function InteractButton({ interact, txt, size }) {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" size={size} color={interact}>
                {txt}
            </Button>
        </Stack>
    )
}