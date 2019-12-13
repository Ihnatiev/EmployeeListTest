const app = require("./backend/app");
const fs = require('fs');
const https = require("https");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const port = normalizePort(process.env.PORT || "4223");
app.set("port", port);

const httpsOptions = {
  key: fs.readFileSync('./backend/config/key.pem'),
  cert: fs.readFileSync('./backend/config/cert.pem')
};

const server = https.createServer(httpsOptions, app);
server.on("error", onError);
server.listen(port, () => {
  console.log(`Server is running https://localhost:${port}...`);
});
