export const routes = {
    auth: {
        signIn: '/auth/login',
        signUp: '/auth/sign-up',
    },
    dashboard: {
        vendor: {
            getAllVendor: '/vendor/getAll',
            createVendor: '/vendor/create',
            updateVendor: '/vendor/update',
            deleteVendor: '/vendor/delete',
            disableVendor: '/vendor/disable',
            activateVendor: '/vendor/active',
        },
        ftp: {
            getAllFtp: '/ftp/getAll',
            createFtp:'/ftp/create',
            updateFtp:'/ftp/update',
            deleteFtp:'/ftp/delete',
        },
        convert: {
            uploadAndConvertFile: '/convert/uploadAndConvertFile',
            getAllConvertedFiles: '/convert/getAll',

        },
        schedule:{
            createCronJob:'/cron/create',
            statusText: 'status',
        }

    },
}