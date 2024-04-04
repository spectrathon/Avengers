import app from "./app.js";

import { Connection } from "./config/connection.js";
const port=3000;
app.listen(port,()=>{
    console.log("listening on port 3k");
    Connection();
});