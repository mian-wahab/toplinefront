import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const user = {
  name: 'Sofia Rivers',
  avatar: '/assets/avatar.png',
  jobTitle: 'Senior Developer',
  country: 'USA',
  city: 'Los Angeles',
  timezone: 'GTM-7',
} as const;

export function AccountInfo(): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user.city} {user.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.timezone}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}

// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Divider from '@mui/material/Divider';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { useUser } from '@/hooks/use-user';




// export function AccountInfo(): React.JSX.Element {
//   const [user, setUser] = React.useState<{
//     name: string;
//     avatar: string;
//     jobTitle: string;
//     country: string;
//     city: string;
//     timezone: string;
//   } | null>(null);

//   React.useEffect(() => {
//     const loggedInUser = {
//       name: 'Sofia Rivers',
//       avatar: '/assets/avatar.png',
//       jobTitle: 'Senior Developer',
//       country: 'USA',
//       city: 'Los Angeles',
//       timezone: 'GTM-7',
//     };
//     setUser(loggedInUser);
//   }, []);

//   if (!user) {
//     return <Typography variant="h6">Loading user info...</Typography>;
//   }

//   return (
//     <Card>
//       <CardContent>
//         <Stack spacing={2} sx={{ alignItems: 'center' }}>
//           <div>
//             <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
//           </div>
//           <Stack spacing={1} sx={{ textAlign: 'center' }}>
//             <Typography variant="h5">{user.name}</Typography>
//             <Typography color="text.secondary" variant="body2">
//               {user.city} {user.country}
//             </Typography>
//             <Typography color="text.secondary" variant="body2">
//               {user.timezone}
//             </Typography>
//           </Stack>
//         </Stack>
//       </CardContent>
//       <Divider />
//       <CardActions>
//         <Button fullWidth variant="text">
//           Upload picture
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }


// export function AccountInfo(): React.JSX.Element {
//   const { user } = useUser(); // Get the user data from the context

//   if (!user) {
//     return <Typography variant="h6">Loading user info...</Typography>;
//   }

//   return (
//     <Card>
//       <CardContent>
//         <Stack spacing={2} sx={{ alignItems: 'center' }}>
//           <div>
//             <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
//           </div>
//           <Stack spacing={1} sx={{ textAlign: 'center' }}>
//             <Typography variant="h5">{user.name}</Typography>
//             {/* <Typography color="text.secondary" variant="body2">
//               {user.city} {user.country}
//             </Typography> */}
//             <Typography color="text.secondary" variant="body2">
//               {user.email}
//             </Typography>
//           </Stack>
//         </Stack>
//       </CardContent>
//       <Divider />
//       <CardActions>
//         <Button fullWidth variant="text">
//           Upload picture
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }
// 'use client';

// import * as React from 'react';
// import { useUser } from '@/hooks/use-user';
// import { Stack, Typography, Avatar, Button } from '@mui/material';
// import { User } from '@/types/user';
// import { useRouter } from 'next/navigation';
// import RouterLink from 'next/link';
// import { paths } from '@/paths';

// export function AccountInfo(): React.JSX.Element {
//   const { user } = useUser(); // Retrieve user and logout from context
//   const router = useRouter();

//   if (!user) {
//     return (
//       <Stack spacing={2}>
//         <Typography variant="h4">No user found</Typography>
//         <Typography variant="body1">
//           Please sign in to access your account information.
//         </Typography>
//         <Button
//           variant="contained"
//           component={RouterLink}
//           href={paths.auth.signIn}
//         >
//           Go to Sign In
//         </Button>
//       </Stack>
//     );
//   }

//   return (
//     <Stack spacing={3}>
//       <Typography variant="h4">Account Information</Typography>
//       <Stack direction="row" spacing={2} alignItems="center">
//         <Avatar alt={user.name} src={user.avatar} />
//         <div>
//           <Typography variant="h6">{user.name}</Typography>
//           {/* <Typography variant="body2">{user.jobTitle}</Typography> */}
//           {/* <Typography variant="body2">{user.city}, {user.country}</Typography>
//           <Typography variant="body2">Timezone: {user.timezone}</Typography> */}
//         </div>
//       </Stack>
//     </Stack>
//   );
// }
