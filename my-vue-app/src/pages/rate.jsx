import React from "react";

function Rate() {

    // this is where function to make api call for list would go ?
    // then can use the list as needed below
    return(
        <main>
            <head>
                <link rel="stylesheet" href="/rate.css"/>
            </head>
            <body>
                <div id="songlist_and_rate">
                    <div id="songlist"></div>
                    <div id="rate"></div>
                </div>
            </body>
        </main>
    );
};

export default Rate;