const express = require('express');
const dotenv = require('dotenv');
const dbConnection = require("./config/dbConnection.js");
const authRoutes = require("./routes/auth.routes.js");
const notesRoutes = require("./routes/notes.routes.js");
const cookieParser = require('cookie-parser');
const cors = require('cors');


dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
      })
);
app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({extended:true}))



app.use( "/auth",authRoutes);
app.use( "/note",notesRoutes);

dbConnection();

app.get('/', (req,res)=>{
    return res.send("server is running");
});

app.listen(port, () => {
    console.log(`app is running on port: ${port}`);
})



module.exports = app;