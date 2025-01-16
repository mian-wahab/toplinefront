'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import { User } from '@/types/user';
import { fontSize } from '@mui/system';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: 'sofia@devias.io', password: 'Secret1' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession, setUser } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      // setIsPending(true);

      const { error, user } = await authClient.signInWithPassword(values);
      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }
      setUser?.(user as User);

      // router.refresh();
    },
    [setUser, router, setError]
  );

  return (
    <Stack className='customsign' spacing={4} style={{ margin: "10px 0px"}}>
      <Stack spacing={1}>
        <Typography variant="h4" style={{fontSize: "40px", textAlign: "center", lineHeight: "10px", fontWeight: "400", margin:"30px 0px 0px 0px"}}>Sign in</Typography>
        {/* <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            Sign up
          </Link>
        </Typography> */}
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack style={{borderColor: "#ffffff", outlineColor: "#ffffff"}} spacing={2}>
          <Controller
            control={control} 
            name="email"
            render={({ field }) => (
              <FormControl style={{borderColor: "#ffffff", border:"0px", outlineColor: "#ffffff"}} error={Boolean(errors.email)}>
                <InputLabel style={{color: "#ffffff"}}>Email address</InputLabel>
                <OutlinedInput style={{borderColor: "#ffffff",color: "#ffffff", outlineColor: "#ffffff" }} {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText style={{borderColor: "#ffffff"}}>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel style={{color: "#ffffff"}}>Password</InputLabel>
                <OutlinedInput style={{borderColor: "#ffffff",color: "#ffffff", outlineColor: "#ffffff"}}
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div>
            <Link style={{color: "#ffffff"}} component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button style={{background: "white",
    color: "#603e7a",
    fontSize: "20px",
    fontWeight: 600,
    paddingTop: "5px",
    paddingBottom: "5px"}} className='customsingin' disabled={isPending} type="submit" variant="contained">
            Sign in
          </Button>
        </Stack> 
      </form>
      {/* <Alert color="warning">
        Use{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          sofia@devias.io
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Secret1
        </Typography>
      </Alert> */}
    </Stack>
  );
}
