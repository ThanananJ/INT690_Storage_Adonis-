import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Store from 'App/Models/Store'

export default class StoreSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Store.createMany([{
      storeName: "ไก่ย่างเจ้าเก่า",
      ownerName:"เซ้ง",
      ownerLastName: "ร้านแล้ว",
      telNo: "0995547777",
      address: "หน้า Central World",
      employeeEmployeeId: 1 
    },{
      storeName: "ไก่ทอดเจ้าใหม่",
      ownerName:"ขาย",
      ownerLastName: "ดีมาก",
      telNo: "0985763330",
      address: "ตรงข้าม Central World",
      employeeEmployeeId: 1
    },{
      storeName: "MIB",
      ownerName:"สิงโต",
      ownerLastName: "โชคไม่ดี",
      telNo: "0993547770",
      address: "Central พระราม2",
      employeeEmployeeId: 2
    }])
  }
}
