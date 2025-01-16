export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    ftp: '/dashboard/ftp',
    account: '/dashboard/account',
    vendors: '/dashboard/vendors',
    logout: '/dashboard/logout',
    schedule: '/dashboard/schedule',
    logs: '/dashboard/logs/getAllFileLogsin',
    automatedconvert: '/dashboard/automatedconvert',
    convert: '/dashboard/convert',
    integrations: '/ dashboard/integrations',
    settings: '/dashboard/settings',
    vendor: '/dashboard/vendor',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
