const path = require("path");
const express = require("express");

const PUBLIC_DIR = path.join(__dirname, "public");
const PORT = 3000;
const app = express();

//Serving the files on the dist folder
app.use(express.static(PUBLIC_DIR));

//Send index.html when the user access the web
app.get("*", (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

console.log("server started with PORT:", PORT);
app.listen(PORT);
