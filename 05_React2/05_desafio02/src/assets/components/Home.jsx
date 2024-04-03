import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";

const Home = () => {
    const config = {
        method: 'get',
        url: 'https://api.pexels.com/v1/curated/',
        headers: {'Authorization': import.meta.env.VITE_PEXELS_KEY}
    };

    React.useEffect(() => {
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const [responseData, setResponseData] = React.useState(null);

    return (
        <>
            <p>{responseData}</p>
        </>
    );
};

export default Home;