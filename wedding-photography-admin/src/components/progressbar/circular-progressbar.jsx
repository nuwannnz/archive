import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularProgressVariants() {
    return (
      <Box sx={{ display: 'flex',alignItems: 'center', justifyContent: 'center' , width: '80vw' , height: '20vh'}}>
        <CircularProgress variant="indeterminate" value={50} />
      </Box>
    );
  }