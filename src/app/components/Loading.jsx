import logoloader from "app/assets/images/vnptlogo-nottext.png";
import { Box, CircularProgress } from '@mui/material';
const Loading = () => {
    return (
        <div className='dsaidopa'>
            <div className='pos-relative'>
                <CircularProgress />
                <img src={logoloader} className='img-logo-load' />
            </div>
        </div>
    )
};

export default Loading;