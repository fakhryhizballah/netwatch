console.log('script.js loaded');

console.log(baseURL);
console.log(baseName);

var settings = {
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
    // console.log(data);
    let title = data.group.nameGrup + " - Netwatch";
    let serverLastUpdate = new Date(data.group.lastUpdate).toLocaleString();
    let serverStatus = (data.group.status) ? "Online" : "Offline";
    let description = `${data.group.description}
    Last Update : ${serverLastUpdate}
    Server Status : ${serverStatus}`;
    $("#nameGrup").text(title);
    $("#description").text(description);
    let table = $("#tabelClient");
    let rows = $("tbody > tr");
    rows.remove();

    let dataMembers = data.group.members;
    let x = 0;
    let lastUpdate = new Date(data.group.lastUpdate).toLocaleString();
    for (let e of dataMembers) {
        console.log(e.status);
        let status = (e.status) ? "Online" : "Offline";
        x++;
        let row = $("<tr class='table-danger'>");
        if (e.status) {
            row = $("<tr class='table-success'>");
        }
        // console.log(e);
        row.append($("<td>" + x + "</td>"));
        row.append($("<td>" + e.name + "</td>"));
        row.append($("<td>" + e.ip + "</td>"));
        row.append($("<td>" + status + "</td>"));
        row.append($("<td>" + e.since + "</td>"));
        row.append($("<td>" + lastUpdate + "</td>"));
        $("tbody").append(row);
    }



});