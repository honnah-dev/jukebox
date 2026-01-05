import express from "express";
const app = express();
export default app;


import playlistsRouter from "#api/playlists";
import tracksRouter from "#api/tracks";


//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//loggin middleware
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

//router middleware
app.use("/playlists", playlistsRouter);
app.use("/tracks", tracksRouter);


//handles prostgresql errors
app.use((err, req, res, next) => {
  //foreign key violation
  if (err.code === "22P02") {
    return res.status(400).send(err.detail);
  }


  next(err);
});

//catchall error handeling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
