const axios = require('axios');
var activeSession = "";

const setSessionId = (sessionId) => {
    activeSession = sessionId;
}

const getPlayToWinEvents = async (page) => {
    const response = await axios({
        method: "GET",
        url: "https://tabletop.events/api/playtowin",
        headers: {
            "session_id": activeSession
        }
    });
    return response;
}


/** START CONVENTION BLOCK */

const getConventions = async () => {
    let conventions = [];
    let keepGoing = true;
    let currentPage = 1;

    while (keepGoing) {
        let response = await reqConventions(currentPage);
        conventions = conventions.concat.apply(conventions, response.items);

        if (response.paging && (response.paging.page_number != response.paging.total_pages)) {
            currentPage = response.paging.next_page_number;
        }

        else {
            keepGoing = false;
            return conventions;
        }
    }
    
}

const reqConventions = async (page) => {
    var formData = new FormData();
    formData.append("_page_number", page);
    formData.append("_items_per_page", 100);

    var res = [];
    try {
        res = await axios({
            method: "GET",
            url: "https://tabletop.events/api/convention",
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

/** END CONVENTION BLOCK */

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
