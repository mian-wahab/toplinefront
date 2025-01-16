import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';
import { color } from '@mui/system';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return ( 
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr',
        // minHeight: '100%',
        minHeight: "920px",
        bgcolor:"#603e7b",
        alignItems: "center"
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        {/* <Box sx={{ p: 3 }}>
          <Box component={RouterLink} href={paths.home} sx={{ display: 'flex', width: "100%", justifyContent: "center", fontSize: 0 }}>
            <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
          </Box>
        </Box> */}
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 3 }}>
        <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
          <Box sx={{ maxWidth: '450px', width: '100%', color: "#ffffff", "::placeholdercolor":"#ffffff" }}>{children}</Box>
        </Box>
      </Box>
      {/* <Box className='custwel'
        sx={{
          alignItems: 'center',
          background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
          color: 'var(--mui-palette-common-white)',
          display: { xs: 'none', lg: 'none' },
          justifyContent: 'center',
          p: 3,
        }} 
      >
      </Box> */}
    </Box>
  );
}
