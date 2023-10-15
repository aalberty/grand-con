const axios = require('axios');
var activeSession = "";


//TODO: test this module

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