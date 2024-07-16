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
    dataSrc: {
        data: 'data',
    },

    // data: [

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
    ],
    createdRow: function (row, data, dataIndex) {
        console.log(row);
        if (data.status) {
            $(row).addClass('table-success');
        } else {
            $(row).addClass('table-danger');
        }
    },
});
