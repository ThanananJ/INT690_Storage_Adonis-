import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Store from "App/Models/Store";

export default class StoresController {
  public async index({ auth, view }: HttpContextContract) {
    const store = await Store.query().where(
      "employeeId",
      auth.user!.employeeID
    );

    return view.render("index", { store: store });
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
