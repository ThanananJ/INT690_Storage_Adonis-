import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Employee from "App/Models/Employee";
import Store from "App/Models/Store";
import AddStoreValidator from "App/Validators/AddStoreValidator";

export default class StoresController {
  public async index({ auth, view }: HttpContextContract) {
    const stores = await Store.query().where(
      "employeeid",
      auth.user!.employeeId
    );
    // const store = await Store.all()
    // console.log(stores)
    return view.render("index", { stores: stores });
  }

  public async create({ view }: HttpContextContract) {


    return view.render('addStore')
  }

  public async store({ request, response, auth }: HttpContextContract) {

    const payload = await request.validate(AddStoreValidator);

    const store = new Store()

    store.storeName = payload.storeName
    store.ownerName = payload.ownerName
    store.ownerLastName = payload.ownerLastName
    store.telNo = payload.telNo
    store.productCount = payload.productCount
    store.address = payload.address
    store.employeeid = auth.user!.employeeId

    await store.save()

    response.redirect().toRoute("index")
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ auth, params, response }: HttpContextContract) {

    const storeID = params.storeID

    const store = await Store.query().where("employeeid",
      auth.user!.employeeId).where('storeId', storeID).firstOrFail()

    await store?.delete()
    response.redirect().toRoute("index")
  }
}
