import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function SimplePaper({children}: {children: React.ReactNode}) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        flexWrap: 'wrap',
        width: "100%",
        maxWidth: 'sm'
      }}
    >
      <Paper
      sx={{
        p: 3,
      }}
      elevation={3}>
        {children}
      </Paper>
    </Box>
  );
}
