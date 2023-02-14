function cors(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  response.header('Access-Control-Allow-HEADERS', 'Content-Type');
  next();
}

module.exports = cors;