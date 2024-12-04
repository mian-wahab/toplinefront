import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', position:'absolute', justifyContent:'center', alignContent:'center', right:'0', left:'0'}}>
      <CircularProgress size={'7rem'}  />
    </Box>
  );
}
