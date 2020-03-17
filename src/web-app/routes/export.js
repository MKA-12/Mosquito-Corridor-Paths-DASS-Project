const objecttoCSV = function(data) {
    const csvrows = [];
    const headers = Object.keys(data[0]);
    csvrows.push(headers.join(','));

    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"');
            // const escaped = row[header];
            return `"${escaped}"`;
        });
        csvrows.push(values.join(','));
    }
    return csvrows.join("\n");
};
const download = function(data) {
    blob = new Blob([data], {
        type: 'text/csv'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

}
const getReport = async function() {
    const url = 'https://api.github.com/repos/hadley/ggplot2/issues'
    const res = await fetch(url);
    const got = await res.json();

    // console.log(json);
    const data = got.map(row =>
        ({
            id: row.id,
            state: row.state
        }));
    const csvdata = objecttoCSV(data);
    download(csvdata);
};