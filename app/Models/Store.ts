import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  public storeId: number

  @column()
  public storeName: string

  @column()
  public ownerName: string

  @column()
  public ownerLastName: string

  @column()
  public telNo: string

  @column()
  public address: string

  @column()
  public employeeEmployeeId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product)
  public products: HasMany<typeof Product>
}
