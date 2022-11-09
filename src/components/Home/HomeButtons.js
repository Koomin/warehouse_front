import './Home.css';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import React from "react";

export function HomeButtons({handleButtonClick, selectedType}){
    return (
        <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
            >
                <Grid item xs={4}
                      height={"12vh"}
                      textAlign={"center"}
                >
                    <Button style={{height: '10vh'}}
                            fullWidth
                            size='large'
                            variant="outlined"
                            className={selectedType === 'order' ? 'button-active' : ''}
                            onClick={() => handleButtonClick({
                                type: 'order'
                            })}
                    >
                        <h3>Zamowienia</h3>
                    </Button>
                </Grid>
                <Grid item xs={4}
                      height={"12vh"}
                      textAlign={"center"}
                >
                    <Button style={{height: '10vh'}}
                            fullWidth
                            size='large'
                            variant="outlined"
                            className={selectedType === 'issue' ? 'button-active' : ''}
                            onClick={() => handleButtonClick({
                                type: 'issue'
                            })}
                    >
                        <h3>Wydania</h3></Button>
                </Grid>
                <Grid item xs={4}
                      height={"12vh"}
                      textAlign={"center"}
                >
                    <Button style={{height: '10vh'}}
                            fullWidth
                            size='large'
                            variant="outlined"
                            className={selectedType === 'realize' ? 'button-active' : ''}
                            onClick={() => handleButtonClick({
                                type: 'realize'
                            })}
                    >
                        <h3>Produkcja</h3>
                    </Button>
                </Grid>
            </Grid>
    )
}