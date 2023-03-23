import { createContext ,useContext, useState, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const NotificationContext = createContext();

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={12} ref={ref} variant="filled" {...props} />;
  });

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider( {children} ) {

    const [notification, setNotification] = useState({
        message: '',
        severity: '',
        open: false
    });


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({
            message: '',
            severity: '',
            open: false
        });
    };

    return(
        <NotificationContext.Provider value={ { notification, setNotification } }> 
            {children} 
            
            <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "center"}} open={notification.open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>

        </NotificationContext.Provider>
    );
}