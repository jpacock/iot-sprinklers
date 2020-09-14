const sort = (head, req) => {
  let row;
  const rows = [];
  while (row = getRow()) {
    rows.push(row);
  }
  rows.sort((a, b) => { return b.value - a.value });
  send(JSON.stringify({ rows: rows.splice(0, Math.min(rows.length - 1, 9)) }));
}

module.exports = {
  sort,
}