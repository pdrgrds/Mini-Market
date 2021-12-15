import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { item01 } from '../../Interface/dashboard';

export const Template01 = (item:item01) => {

    return(
        <div key={item.id}>
            {item.nombre}
            <hr/>
            {item.descripcion}
        </div>
    )
}

export const ActionAreaCard = (item:item01) => {
  return (
    <Card sx={{ maxWidth: 345 }} key={item.id} onClick={() => window.location.href = item.href}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={item.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}