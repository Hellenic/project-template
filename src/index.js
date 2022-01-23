import http from "http";
import https from "https";
import fs from "fs";

let app = require("./server").default;

const useHttps =
  fs.existsSync("tmp/server.key") && fs.existsSync("tmp/server.cert");
let certConfig = null;
if (useHttps) {
  certConfig = {
    key: fs.readFileSync("tmp/server.key"),
    cert: fs.readFileSync("tmp/server.cert"),
  };
}
// Create server wrapper for our server
const server = useHttps
  ? https.createServer(certConfig, app)
  : http.createServer(app);
const port = process.env.PORT || 3000;

// Reload the server when it changes
if (module.hot) {
  console.log("✅  Server-side HMR Enabled!");

  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...");
    server.removeListener("request", app);
    const newApp = require("./server").default;
    server.on("request", newApp);
    app = newApp;
  });
}

// Start the development server
server.listen(port, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`🚀 Server started on port ${port} ➡️  http://localhost:${port}`);
});
