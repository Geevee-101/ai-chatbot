import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export function Logo() {
    return (
      <div style={{ display: 'flex', marginRight: 'auto', alignItems: 'center', gap: '8px' }}> 
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src="openai.png" 
            alt="openai" 
            width={30} 
            height={30} 
            className='image-inverted' 
          />
          <Typography sx={{ display: { md: "block", sm: "none", xs: "none"}, mr: "auto", fontWeight: "bold"}}>
            AI Chat
          </Typography>
        </Link>
      </div>
    )
}

export default Logo;