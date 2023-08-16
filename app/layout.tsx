'use client'

import { UserProvider } from "@auth0/nextjs-auth0/client";
import {AppBar, Button, CssBaseline, LinearProgress, Stack, Toolbar, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useRouter} from "next/navigation";
import LoadingProvider from "../providers/LoadingProvider";
import AlertsProvider from "../providers/AlertsProvider";

export default function RootLayout({ children }) {

    const router = useRouter()

    return (
        <html lang="en">
            <head>
            </head>
            <body>
                <UserProvider>
                    <Box sx={{flexGrow: 1}}>
                        <CssBaseline/>
                        <AppBar position="static">
                            <Toolbar>
                                <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                                    <Box>
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                            Testing
                                        </Typography>
                                    </Box>
                                    <Button color="inherit" onClick={() => { router.push('/api/auth/logout') }}>Logout</Button>
                                </Stack>
                            </Toolbar>
                        </AppBar>
                        <LoadingProvider>
                            <AlertsProvider>
                                {children}
                            </AlertsProvider>
                        </LoadingProvider>
                    </Box>
                </UserProvider>
            </body>
        </html>
  );
}
