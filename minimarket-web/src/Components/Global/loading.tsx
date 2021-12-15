import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading(props:any) {

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                open={props.open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}