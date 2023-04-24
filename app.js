const express = require("express");
const path = require("path");
const http = require("http");
const { routesInit } = require("./routes/config_routes");

require("./db/mongoConnect");

// מייצר משתנה שמקבל את היכולות של אקספרס ויוכל להשתמש בפקודות
// של הספריה
const app = express();

app.use(express.json())
// שכל הקבצים בתקיית פאבליק יהיו חשופים לצד לקוח
app.use(express.static(path.join(__dirname,"public")));

routesInit(app)

// מפעיל את השרת עם יכולות מיוחדות שנגדיר לאקספרס
const server = http.createServer(app);
const port = process.env.PORT || 3003
server.listen(port);