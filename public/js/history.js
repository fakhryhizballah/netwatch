let getHistory = localStorage.getItem("history");
getHistory = JSON.parse(getHistory);
let serverLastUpdate = new Date(getHistory.lastUpdate).toLocaleString('en-GB');
let description = `
Last Update : ${serverLastUpdate}
IP Status : ${getHistory.ip} ${getHistory.status ? "(Online)" : "(Offline)"}`;
$("#nameGrup").text(getHistory.name);
$("#description").text(description);

let dataTable = $('#tabelClient').DataTable({
    ajax: "/api/netwatch/v1/member/" + getHistory.id,
    // "dataSrc": function (json) {
    //     console.log('Received data:', json);
    //     // Periksa struktur data yang diterima dan ekstrak 'history'
    //     if (json.message === "success" && json.data && Array.isArray(json.data.history)) {
    //         return json.data.history;
    //     } else {
    //         console.error('Unexpected data format:', json);
    //         throw new Error('Unexpected data format');
    //     }
    // },
    dataSrc: {
        data: 'data',
    },

    // data: [
    // {
    //     "id": 4092,
    //     "idMembers": 5,
    //     "lastUpdate": "2024-07-15T23:01:25.000Z",
    //     "status": true,
    //     "duration": "a few seconds (Offline Time)",
    //     "uptime": 3269,
    //     "createdAt": "2024-07-15T23:01:25.000Z",
    //     "updatedAt": "2024-07-15T23:01:25.000Z"
    // },
    // {
    //     "id": 4091,
    //     "idMembers": 5,
    //     "lastUpdate": "2024-07-15T23:01:22.000Z",
    //     "status": false,
    //     "duration": "2 days (Online Time)",
    //     "uptime": 165206680,
    //     "createdAt": "2024-07-15T23:01:22.000Z",
    //     "updatedAt": "2024-07-15T23:01:22.000Z"
    // }
    // ],
    columns: [
        { data: function (data, type, row, meta) { return meta.row + 1 } },
        {
            data: function (data) {
                return new Date(data.lastUpdate).toLocaleString('en-GB', {
                    timeZone: 'Asia/Jakarta',
                })
            }
        },
        { data: function (data) { return (data.status) ? "Online" : "Offline" } },
        { data: 'duration' },
    ]
});
