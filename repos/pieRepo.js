const debug = require('debug')('app:pieRepo');
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
  },
  insert(newData, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const pies = JSON.parse(data);
        pies.push(newData);
        // eslint-disable-next-line no-shadow
        fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
  update(newData, id, resolve, reject) {
    debug(newData);
    debug(id);
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const pies = JSON.parse(data);
        const pie = pies.find((p) => p.id === parseInt(id, 10));
        if (pie) {
          Object.assign(pie, newData);
          // eslint-disable-next-line no-shadow
          fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(newData);
            }
          });
        }
      }
    });
  },
  delete(id, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const pies = JSON.parse(data);
        const index = pies.findIndex((p) => p.id === parseInt(id, 10));
        if (index !== -1) {
          pies.splice(index, 1);
          // eslint-disable-next-line no-shadow
          fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(index);
            }
          });
        }
      }
    });
  }
};

module.exports = pieRepo;
