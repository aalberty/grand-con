const axios = require('axios');
var activeSession = "";

const get = async (endpoint, params) => {
    if (activeSession == "") {
        console.warn("Please set an active session ID before attempting API calls.");
        return;
    }

    let data = [];
    let keepGoing = true;
    let currentPage = 1;
    let method = "GET";

    while (keepGoing) {
        let response = await _request(endpoint, method, params, currentPage);
        data = data.concat.apply(data, response.items);

        if (response.paging && (response.paging.page_number != response.paging.total_pages)) {
            currentPage = response.paging.next_page_number;
        }

        else {
            keepGoing = false;
            return data;
        }
    }
    
}

const _request = async (endpoint, method, params, page) => {
    var formData = new FormData();
    formData.append("_page_number", page);
    formData.append("_items_per_page", 100);

    if (params != undefined) {
        params.forEach((param)=>{
            formData.append(param.key, param.value);
        });
    } 

    var res = [];
    try {
        res = await axios({
            method: method,
            url: "https://tabletop.events/api" + endpoint,
            headers: {
                session_id: activeSession,
                "Content-Type": "multipart/form-data"
            },
            data: formData
        });
    } catch (e) {
        console.warn("An exception occurred with the API request: ", e);
    }

    return res.data.result;
}


const setSessionId = (sessionId) => {
    activeSession = sessionId;
}


//TODO: Refactor to set activeSession instead of logging response
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

const closeSession = (creds) => {
    axios({
        method: "DELETE",
        url: "https://tabletop.events/api/session/" + activeSession,
        data: creds
    })
        .then(function (response) {
            console.log("closeSession response: ", response);
        });
}

module.exports = { get, openSession, closeSession, setSessionId};