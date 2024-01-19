const axios = require('axios');
var activeSession = "";
const GRANDCON_LIB_ID = "6CF7A168-92DD-11E8-A295-3F59BA594530";


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


/** START PLAYTOWIN BLOCK */
const getPtw = async () => {
    let ptw = [];
    let keepGoing = true;
    let currentPage = 1;

    while (keepGoing) {
        let response = await reqPtw(currentPage);
        ptw = ptw.concat.apply(ptw, response.items);

        if (response.paging && (response.paging.page_number != response.paging.total_pages)) {
            currentPage = response.paging.next_page_number;
        }

        else {
            keepGoing = false;
            return ptw;
        }
    }
    
}

const reqPtw = async (page) => {
    var formData = new FormData();
    formData.append("_page_number", page);
    formData.append("_items_per_page", 100);

    var res = [];
    try {
        res = await axios({
            method: "GET",
            url: "https://tabletop.events/api/playtowin",
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


/** END PLAYTOWIN BLOCK */


/** START LIBRARY BLOCK */
const getLibraries = async (includeRelationships) => {
    let libs = [];
    let keepGoing = true;
    let currentPage = 1;

    while (keepGoing) {
        let response = await reqLibraries(currentPage, includeRelationships);
        libs = libs.concat.apply(libs, response.items);

        if (response.paging && (response.paging.page_number != response.paging.total_pages)) {
            currentPage = response.paging.next_page_number;
        }

        else {
            keepGoing = false;
            return libs;
        }
    }
    
}

const reqLibraries = async (page, includeRelationships) => {
    var formData = new FormData();
    formData.append("_page_number", page);
    formData.append("_items_per_page", 100);

    if (includeRelationships === true) {
        formData.append("_include_relationships", 1);
    }

    var res = [];
    try {
        res = await axios({
            method: "GET",
            url: "https://tabletop.events/api/library",
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

/** END LIBRARY BLOCK */


/** START LIBRARYGAME BLOCK */

const searchLibGame = async (gameId) => {

}

const reqLibGameById = async (gameId) => {

}



/** END LIBRARYGAME BLOCK */

/*
To get related information, include the following params: 

[
    { key: '_include_related_objects', value: 'librarygame' },
    { key: '_include_related_objects', value: 'user' },
    { key: '_include_related_objects', value: 'badge' },
    { key: '_include_related_objects', value: 'convention' }
  ]
*/


const getRelatedRecords = async (url, params) => {
    let recs = [];
    let keepGoing = true;
    let currentPage = 1;

    while (keepGoing) {
        let response = await reqRelatedRecords(url, params, currentPage);
        recs = recs.concat.apply(recs, response.items);

        if (response.paging && (response.paging.page_number != response.paging.total_pages)) {
            currentPage = response.paging.next_page_number;
        }

        else {
            keepGoing = false;
            return recs;
        }
    }
}

const reqRelatedRecords = async (url, params, page) => {
    var formData = new FormData();
    formData.append("_page_number", page);
    formData.append("_items_per_page", 100);

    if (params) {
        params.forEach((param) => {
            formData.append(param.key, param.value);
        });
    }

    var res = [];
    try {
        res = await axios({
            method: "GET",
            url: "https://tabletop.events" + url,
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


//openSession(process.env.TTE_USERNAME, process.env.TTE_PWD, process.env.TTE_API_KEY)
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


//setSessionId("<active_session_id>");
