let baseName = getCookie("baseName");
let settings = {
    "url": "/api/netwatch/v1/grup/" + baseName,
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({
        "nameGrup": "Publik",
        "description": "Server Publik"
    }),
};


$.ajax(settings).done(function (response) {
    let data = response.data;
    let title = data.group.nameGrup + " - Netwatch";
    let serverLastUpdate = new Date(data.group.lastUpdate).toLocaleString('en-GB');
    let serverStatus = (data.group.status) ? "Online" : "Offline";
    let description = `${data.group.description}
    Last Update : ${serverLastUpdate}
    Server Status : ${serverStatus}`;
    $("#nameGrup").text(title);
    $("#description").text(description);
});
