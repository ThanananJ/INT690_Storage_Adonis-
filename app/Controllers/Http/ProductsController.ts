import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import ProductValidator from 'App/Validators/ProductValidator';

export default class ProductsController {
  public async index({ }: HttpContextContract) { }

  public async create({ view, params }: HttpContextContract) {
    const storeID = params.storeID
    return view.render('addProduct', { storeID: storeID })
  }

  public async store({ params, response, request, session }: HttpContextContract) {
    const storeID = params.storeID

    const payload = await request.validate(ProductValidator);

    const product = new Product()

    product.productName = payload.productName
    product.quantity = payload.quantity
    product.price = payload.price
    product.storeStoreId = storeID

    product.save()

    session.flash(
      "messageAddProduct",
      "Create Product Success."
    );

    response.redirect().toRoute('store.show', { storeID: storeID })
  }

  public async show({ params, view }: HttpContextContract) {
    const storeID = params.storeID
    const productID = params.productID

    const product = await Product.query().where('store_store_id', storeID).where('product_id', productID).firstOrFail()

    return view.render('editProduct', { storeID: storeID, product: product })
  }

  public async edit({ params, request, response, session }: HttpContextContract) {
    const storeID = params.storeID
    const productID = params.productID

    const product = await Product.query().where('store_store_id', storeID).where('product_id', productID).firstOrFail()

    const payload = await request.validate(ProductValidator);

    product!.productName = payload.productName
    product!.quantity = payload.quantity
    product!.price = payload.price

    await product?.save()

    session.flash(
      "messageEditProduct",
      "Edit Product Success."
    );

    response.redirect().toRoute('store.show', { storeID: storeID })
  }


  public async destroy({ params, response, session }: HttpContextContract) {
    const storeID = params.storeID
    const productID = params.productID

    const product = await Product.query().where('store_store_id', storeID).where('product_id', productID).firstOrFail()

    await product?.delete()

    session.flash(
      "messageDeleteProduct",
      "Already Delete Product."
    );

    response.redirect().toRoute('store.show', { storeID: storeID })
  }
}
