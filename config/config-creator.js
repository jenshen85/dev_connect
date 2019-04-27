const rc = require('rc');

const config = rc('db_data_').db_section;

function createMongoURI() {
  const URI = `${config.uri}`
  return URI
}

module.exports = createMongoURI();