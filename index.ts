import app from "./app";

const PORT = process.env.PORT || 5000;

const startApplication = async () => {
  app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
};

startApplication();
