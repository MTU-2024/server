if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
// const ngrok = require("ngrok")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   ngrok.connect(port).then(ngrokUrl => {
//     console.log(`ngrok tunnel in: ${ngrokUrl}`)
//   }).catch(error => {
//     console.log(`Couldn't tunnel ngrok: ${error}`)
//   })
// });

// const startServer = async () => {
//   try {
//     app.listen(port, async () => {
//       console.log(`Server is running on port ${port}`);
//       if (process.env.NODE_ENV !== "production") {
//         const ngrokUrl = await ngrok.connect(port);
//         console.log(`ngrok tunnel in: ${ngrokUrl}`);
//       }
//     });
//   } catch (error) {
//     console.error(`Error starting server: ${error}`);
//   }
// };

// startServer();
