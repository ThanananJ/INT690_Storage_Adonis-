import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) { }

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    username: schema.string({}, [
      rules.minLength(4),
      rules.unique({ table: "employees", column: "username" }),
    ]),
    password: schema.string({}, [rules.minLength(6)]),
    firstName: schema.string(),
    lastName: schema.string(),
    email: schema.string({}, [rules.email()]),
    telNo: schema.string({}, [rules.mobile({ locales: ["th-TH"] }), rules.minLength(9), rules.maxLength(10)]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    required: "The {{ field }} is required!",
    minLength:
      "The {{ field }} must have at least {{ options.minLength }} length!",
    maxLength:
      "The {{ field }} must have {{ options.maxLength }} length!",
    "username.unique": "The username is already used!",
    "email.email": "Email is invalid!",
    "telNo.mobile": "Telephone Number is invalid!"
  };
}
