import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import ProductValidator from 'App/Validators/ProductValidator';

export default class ProductsController {
  public async index({ }: HttpContextContract) { }

  public async create({ view, params }: HttpContextContract) {
    const storeID = params.storeID
    return view.render('addProduct', { storeID: storeID })
  }

  public async store({ params, response, request }: HttpContextContract) {
    const storeID = params.storeID

    const payload = await request.validate(ProductValidator);

    const product = new Product()

    product.productName = payload.productName
    product.quantity = payload.quantity
    product.price = payload.price
    product.storeStoreId = storeID

    product.save()
    // response.redirect().toRoute('product.add', { storeID: storeID })
    response.redirect().toRoute('store.show', { storeID: storeID })
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ params, response }: HttpContextContract) {
    const storeID = params.storeID
    const productID = params.productID

    const product = await Product.query().where('store_store_id', storeID).where('product_id', productID).firstOrFail()

    await product?.delete()
    response.redirect().toRoute('store.show', { storeID: storeID })
  }
}
