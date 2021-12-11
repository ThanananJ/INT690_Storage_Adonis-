import Route from "@ioc:Adonis/Core/Route";

Route.on("/login").render("login").as("login");
Route.on("/register").render("register").as("register");
Route.post("/users/login", "EmployeesController.login").as("employee.login");
Route.post("/users/register", "EmployeesController.register").as(
    "employee.register"
);
Route.get("/logout", "EmployeesController.logout").as("employee.logout");

Route.group(() => {

    Route.get("/profile", "EmployeesController.show").as("profile")
    Route.post("/profile/edit", "EmployeesController.edit").as("profile.edit")

}).middleware("auth");  