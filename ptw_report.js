const api = require("./tte_api.js");

//TODO: remove static session id after testing
api.setSessionId("AEDFF13A-6225-11EE-968B-B85416776BA3");


const getGCPtwData = () => {
    var params = [
        { key: '_include_related_objects', value: 'librarygame' },
        { key: '_include_related_objects', value: 'user' },
        { key: '_include_related_objects', value: 'badge' },
        { key: '_include_related_objects', value: 'convention' }
    ];

    var endpoint = "/library/6CF7A168-92DD-11E8-A295-3F59BA594530/playtowins";
    
    var response = api.get(endpoint, params);
    var data = [];
    response.then((res)=>{
        res.forEach(element => {
            data.push(element);
        });

        //TODO: filter to pertinent PTW results (specific year? all? etc)
        //TODO: for each pertinent PTW entry, go find out checkout events from this year 30min or greater.
        // if no checkouts 30 min or greater are found, this winner is inelligable. (For Brian - how do we determine)
        // the new winner in this case? Select new random winner?

        console.log(data[0]);

    });

}