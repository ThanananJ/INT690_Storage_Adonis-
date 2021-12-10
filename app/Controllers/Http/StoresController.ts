import Product from 'App/Models/Product';
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Employee from "App/Models/Employee";
import Store from "App/Models/Store";
import AddStoreValidator from "App/Validators/AddStoreValidator";

export default class StoresController {
  public async index({ auth, view }: HttpContextContract) {

    const stores = await Store.query().where(
      "employeeEmployeeId",
      auth.user!.employeeId
    ).withCount('products', (query) => {
      query.as('productsCount')
    });

    const employee = await Employee.query().where("employee_id",
      auth.user!.employeeId
    ).withCount('stores', (query) => {
      query.as('storesCount')
    }).firstOrFail();

    console.log(employee)
    return view.render("index", { stores: stores, employee: employee });
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
    store.address = payload.address
    store.employeeEmployeeId = auth.user!.employeeId

    await store.save()

    response.redirect().toRoute("index")
  }

  public async show({ auth, params, view }: HttpContextContract) {
    const storeID = params.storeID

    const store = await Store.query().where("employeeEmployeeId",
      auth.user!.employeeId).where('storeId', storeID).withCount('products', (query) => {
        query.as('productsCount')
      }).firstOrFail()

    const products = await Product.query().where('store_store_id', storeID)
    console.log("start")
    console.log(products)
    console.log("end")

    return view.render("storeDetail", { store: store,products:products });
  }

  public async edit({ response, auth, request, session, params }: HttpContextContract) {

    const payload = await request.validate(AddStoreValidator);

    const storeID = params.storeID

    const store = await Store.query().where("employeeEmployeeId",
      auth.user!.employeeId).where('storeId', storeID).firstOrFail()

    store!.storeName = payload.storeName
    store!.ownerName = payload.ownerName
    store!.ownerLastName = payload.ownerLastName
    store!.telNo = payload.telNo
    store!.address = payload.address

    await store?.save()

    session.flash(
      "messageStore",
      "Update Store successfuly."
    );
    response.redirect().toRoute('store.show', { storeID: storeID })
  }

  public async update({ }: HttpContextContract) { }

  public async destroy({ auth, params, response }: HttpContextContract) {

    const storeID = params.storeID

    const store = await Store.query().where("employeeEmployeeId",
      auth.user!.employeeId).where('storeId', storeID).firstOrFail()

    await store?.delete()
    response.redirect().toRoute("index")
  }
}
