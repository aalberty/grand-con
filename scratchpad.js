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

const getConventions = async (sessionId, page) => {
    page = page || false;
    //TODO: add page param to call
    const response = await axios({
        method: "GET",
        url: "https://tabletop.events/api/convention",
        headers: {
            session_id: sessionId
        }
    });
    return response;
}

const conventionCallback = (response, data) => {
    if (response.data.result.paging) {
        var pagination = response.data.result.paging;
        if (pagination.page_number == pagination.total_pages) {
            return data.append(response.data.result.items);
        }
        
        return conventionCallback();//TODO: next page call
    }
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
