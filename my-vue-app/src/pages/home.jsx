import React from "react";
import {getUserInfo} from "/src/script.jsx"

function Home() {
    getUserInfo()
    return(
    <main>
        <div>
            <p>test :)</p>
        </div>
    </main>
    );
};

export default Home;