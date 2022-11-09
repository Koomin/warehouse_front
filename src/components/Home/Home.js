import React, {useState} from "react";
import {Divider} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {theme} from "../../theme";
import {HomeButtons} from "./HomeButtons";

function Home() {
    const [selectedType, setSelectedType] = useState();

    const handleButtonClick = async (data) => {
        setSelectedType(data.type);
    }
    return (
        <ThemeProvider theme={theme}>
            <HomeButtons handleButtonClick={handleButtonClick}
                         selectedType={selectedType}
            />
            <Divider style={{backgroundColor: 'rgba(255,102,0,0.86)'}}/>
        </ThemeProvider>
    );
}

export default Home;

