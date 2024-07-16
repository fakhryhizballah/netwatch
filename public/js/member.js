// let baseName = getCookie("baseName");
let dataTable = $('#tabelClient').DataTable({
    ajax: "/api/netwatch/v1/mgrup/" + baseName,
    // dataSrc: 'data.group',
    dataSrc: 'data',
    columns: [
        // columns counter
        { data: function (data, type, row, meta) { return meta.row + 1 } },
        { data: 'name' },
        { data: 'ip' },
        { data: function (data) { return (data.status) ? "Online" : "Offline" } },
        { data: 'since' },
        {
            data: function (data) {
                return new Date(data.lastHistory.lastUpdate).toLocaleString('en-GB', {
                    timeZone: 'Asia/Jakarta',
                })
            }
        },
    ],
    scrollY: "600px",
    // paging: false,
    lengthMenu: [10, 20, 30, 40, 50],
    pageLength: 20,
    scrollX: false,
    processing: true
});
setInterval(function () {
    dataTable.ajax.reload();
}, 25000);
$('#tabelClient tbody').on('click', 'tr', function () {
    var data = dataTable.row(this).data();
    console.log(data.ip);

    const d = new Date();
    d.setTime(d.getTime() + (60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "id=" + data.id + ";" + expires + "; path=/";
    localStorage.setItem("history", JSON.stringify(data));

    window.location.href = "/api/netwatch/v1/history";
});