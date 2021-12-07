import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Employee from "App/Models/Employee";
import RegisterValidator from "App/Validators/RegisterValidator";

export default class EmployeesController {
  public async login({
    auth,
    request,
    session,
    response,
  }: HttpContextContract) {
    const username = request.input("username");
    const password = request.input("password");

    try {
      await auth.attempt(username, password);
      response.redirect().toRoute("index");
    } catch (error) {
      session.flash("error", "The user is not authorized!");
      response.redirect().toRoute("login");
    }
  }

  public async register({ request, response, session }: HttpContextContract) {
    console.log("start");

    const payload = await request.validate(RegisterValidator);

    console.log(payload);

    const employee = await Employee.create({
      username: payload.username,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      telNo: payload.telNo,
    });


    session.flash(
      "message",
      "The user is registerd successfuly. Please use username and password to login!"
    );

    response.redirect().toRoute("login");
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("web").logout();
    response.redirect().toRoute("login");
  }
}
