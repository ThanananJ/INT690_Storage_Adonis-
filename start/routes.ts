/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", async ({ view }) => {
    return view.render("index");
  });

  Route.get("/index", "StoresController.index").as("index");

  Route.get("/profile", "EmployeesController.show").as("profile")
  Route.post("/profile/add", "EmployeesController.edit").as("profile.edit")

  Route.get("/store/add", "StoresController.create").as("store.add")
  Route.post("/store/add", "StoresController.store").as("store.store")
  Route.get("/store/:storeID/delete", "StoresController.destroy").as("store.delete")
  Route.get("/store/:storeID", "StoresController.show").as("store.show")
  Route.post("/store/:storeID/edit", "StoresController.edit").as("store.edit")

}).middleware("auth");

Route.on("/login").render("login").as("login");
Route.on("/register").render("register").as("register");
Route.post("/users/login", "EmployeesController.login").as("employee.login");
Route.post("/users/register", "EmployeesController.register").as(
  "employee.register"
);
Route.get("/logout", "EmployeesController.logout").as("employee.logout");
