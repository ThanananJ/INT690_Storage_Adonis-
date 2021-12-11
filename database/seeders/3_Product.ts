import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Product.createMany([{
      productName: "ไก่หมักสำหรับย่าง",
      quantity: 20,
      price: 250,
      storeStoreId: 1
    }, {
      productName: "น้ำจิ้มแจ๋ว",
      quantity: 100,
      price: 5,
      storeStoreId: 1
    }, {
      productName: "ไก่หมักสำหรับทอด",
      quantity: 20,
      price: 260,
      storeStoreId: 2
    }, {
      productName: "น้ำจิ้มไก่",
      quantity: 100,
      price: 5,
      storeStoreId: 2
    }, {
      productName: "ข้าวเหนียว",
      quantity: 50,
      price: 10,
      storeStoreId: 1
    }, {
      productName: "ข้าวเหนียว",
      quantity: 50,
      price: 10,
      storeStoreId: 2
    }, {
      productName: "เมาส์ Gaming",
      quantity: 20,
      price: 599,
      storeStoreId: 3
    }, {
      productName: "หูฟัง Gaming",
      quantity: 25,
      price: 799,
      storeStoreId: 3
    }, {
      productName: "PC Gaming",
      quantity: 5,
      price: 39990,
      storeStoreId: 3
    }, {
      productName: "Hard disk Drive",
      quantity: 15,
      price: 1099,
      storeStoreId: 3
    }])
  }
}
