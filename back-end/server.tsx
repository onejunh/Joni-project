const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const dbconfig = require('./config/config.tsx');
const conn = dbconfig.init();

const userRouter = require('./routes/user/users.tsx');
const indexRouter = require('./routes/index.tsx');
const loginRouter = require('./routes/login/login.tsx');

const app = express();
dotenv.config();

dbconfig.connect(conn);

app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        method: ["GET", "POST"],
        credentials: true
    })
);

app.use("/user", userRouter);
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/accesstoken", loginRouter);
app.use("/refreshtoken", loginRouter);
app.use("/login/success", loginRouter);
app.use("/logout", loginRouter);


app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}!`))
