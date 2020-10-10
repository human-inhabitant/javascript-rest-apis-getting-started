const fs = require('fs');

const FILE_NAME = './assets/pies.json';
const pieRepo = {
  get(resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById(id, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const pie = JSON.parse(data).find((d) => d.id === parseInt(id, 10));
        resolve(pie);
      }
    });
  },
  search(searchObject, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        if (searchObject) {
          pies = pies.filter(
            (p) => (searchObject.id ? p.id === searchObject.id : true)
              && (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name) >= 0 : true)
          );
        }
        resolve(pies);
      }
    });
  }
};

module.exports = pieRepo;
