import config from "./config/config";
import app from "./express";

app.listen(config.port, () => {
  console.info(`Server started on port ${config.port}`);
});
