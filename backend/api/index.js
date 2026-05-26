const app = require('../src/app');
const connectDB = require('../src/db/db');

let connectPromise;
async function ensureDBConnected() {
  if (!connectPromise) {
    connectPromise = connectDB();
  }
  return connectPromise;
}

app.use(async (req, res, next) => {
  try {
    await ensureDBConnected();
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = app;
