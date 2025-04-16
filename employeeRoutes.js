import express from "express";
const router = express.Router();
export default router;

import { getEmployees, Addemployee } from "#db/employees";

router
  .route("/")
  .get((req, res) => {
    const employees = getEmployees();
    res.send(employees);
  })
  //POST /employees adds a new employee with the provided name from the request body
  .post((req, res) => {
    //Send 400 if request body is not correctly provided
    if (!req.body)
      return res.status(400).send("body is not correctly provided");
    const { name } = req.body;
    //Send 400 if request name is not correctly provided
    if (!name) return res.status(400).send("name is not correctly provided");

    const newEmployee = Addemployee(name);
    //Send 201 with the new employee if name is correctly provided
    res.status(201).send(newEmployee);
  });

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
router.route("/random").get((req, res) => {
  const employees = getEmployees();
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.route("/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employees = getEmployees();
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});
