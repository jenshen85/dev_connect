const rc = require('rc');

const config = rc('db_data_').db_section;

function createMongoURI() {
  const URI = `mongodb+srv://${config.user}:${config.password}@dev-connect-db-hj6ot.mongodb.net/test?retryWrites=true'`

  return URI
}

module.exports = createMongoURI;