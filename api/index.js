const app = require('../server');
const { initDatabase } = require('../database/db');

let initPromise = null;

module.exports = async (req, res) => {
  if (!initPromise) {
    initPromise = initDatabase().catch(() => {});
  }
  await initPromise;
  return app(req, res);
};
