import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Employee from 'App/Models/Employee'

export default class EmployeeSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Employee.createMany([{
      username: "Mark",
      password: "136590",
      firstName: "Tha",
      lastName: "jom",
      email: "Mark@gmail.com ",
      telNo: "0824995988",
    }, {
      username: "Poi2220",
      password: "61130500022",
      firstName: "Poi",
      lastName: "Eiei",
      email: "Poi@gmail.com ",
      telNo: "0813307871",
    },])
  }
}
