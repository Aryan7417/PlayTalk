import dotenv from "dotenv";
import app from "./App";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 PlayTalk server runniunfg on port ${PORT}`);
  console.log("connectes")
});