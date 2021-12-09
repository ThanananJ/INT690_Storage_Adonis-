import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Employee from "App/Models/Employee";
import ProfileValidator from "App/Validators/ProfileValidator";
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

    console.log(username);
    console.log(password);

    try {
      console.log("---");
      await auth.attempt(username, password);
      console.log("login");
      response.redirect().toRoute("index");
    } catch (error) {
      console.log(error);
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

  public async show({ view, auth }: HttpContextContract) {

    const employee = await Employee.query().where('employee_id', auth.user!.employeeId).firstOrFail()

    console.log(employee)

    return view.render('editProfile', { employee: employee })
  }

  public async edit({ response, auth, request }: HttpContextContract) {

    const payload = await request.validate(ProfileValidator);

    const employee = await Employee.query().where('employee_id', auth.user!.employeeId).firstOrFail()


    employee!.password = payload.password
    employee!.email = payload.email
    employee!.firstName = payload.firstName
    employee!.lastName = payload.lastName
    employee!.telNo = payload.telNo

    await employee?.save()

    response.redirect().toRoute('profile')

  }
}
