const axios = require('axios');

const getPlayToWinEvents = async (sessionId) => {
    const response = await axios({
        method: "GET",
        url: "https://tabletop.events/api/playtowin",
        headers: {
            "session_id": sessionId
        }
    });
    return response;
}

//TODO: handling paginated responses
const getConventions = async (sessionId) => {
    const response = await axios({
        method: "GET",
        url: "https://tabletop.events/api/convention",
        headers: {
            session_id: sessionId
        }
    });
    return response;
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


var grandcon = conventions.items.filter((c)=>{
    if (c.email_address == "info@grand-con.com"){
        return c;
    }
})