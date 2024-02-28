import React from 'react';
import {AppBar, Button, IconButton, Stack, Toolbar, Typography} from "@mui/material"
import { Link } from 'react-router-dom';
import AppsIcon from "@mui/icons-material/Apps";


function Header() {
    

  return (
    <>
        <AppBar position='static' style={{backgroundColor:"white"}}>
            <Toolbar>
                <Link to="/home">
                    <IconButton sx={{color:"#7a7a7a"}}>
                        <AppsIcon />
                        <Typography marginLeft={1}>
                        ETE TECHNOLOGY
                        </Typography>
                    </IconButton>
                </Link>
               <Stack direction="row" marginLeft={120}>
                <Link to="/home">
                    <Button sx={{color:"#7a7a7a"}}>
                    <Typography>
                        Home
                    </Typography>
                    </Button>
                </Link>

                <Link to="/company">
                    <Button sx={{color:"#7a7a7a"}}>
                    <Typography>
                        Company
                    </Typography>
                    </Button>
                </Link>

                <Link to="/products">
                    <Button sx={{color:"#7a7a7a"}}>
                    <Typography>
                        Product
                    </Typography>
                    </Button>
                </Link>
                </Stack>
            </Toolbar>
        </AppBar>
    </>
  );
}

export default Header;
