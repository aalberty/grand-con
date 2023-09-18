const axios = require('axios');

const getPlayToWinEvents = () => {
    //TODO: refactor for change from HTTP to axios
    const params = {
        hostname: HOSTNAME,
        path: "/api/playtowin",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    const request = http.request(params, (response) => {
        console.log("getPlayToWin response: ", response);
    });
}

const openSession = (username, password, apiKey) => {
    let data = '';
    
    axios({
        method: "POST",
        url: "https://tabletop.events/api/session",
        data: {
            username: username,
            password: password,
            api_key_id: apiKey
        }
    })
        .then(function (response) {
            console.log("openSession response: ", response);
        });
}

const closeSession = (sessionId, creds) => {
    axios({
        method: "DELETE",
        url: "https://tabletop.events/api/session/" + sessionId,
        data: creds
    })
        .then(function (response) {
            console.log("closeSession response: ", response);
        });
}