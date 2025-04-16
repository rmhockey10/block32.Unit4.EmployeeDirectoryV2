import express from "express";
const app = express();
export default app;

import employeesRouter from "#employeeRoutes";

app.use(express.json());

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeesRouter);
// A catch-all error-handling middleware sends status 500 for uncaught errors.
app.use((err, req, res, next) => {
  res.status(500).send("it's not you, it's me");
});
