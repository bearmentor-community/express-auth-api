const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

// User schema
const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      min: [2, 'Name is too short'],
      max: [100, 'Name is too long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      min: [2, 'Email is too short'],
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    timestamps: true,
  }
)

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
UserSchema.plugin(AutoIncrement, {
  id: 'users_counter',
  inc_field: 'id',
})

// User model => users collection
const User = mongoose.model('User', UserSchema)

module.exports = User

/**
 * @swagger
 *  components:
 *    schemas:
 *      NewUser:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *            description: Full name of the user, just alphabets
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique
 *          password:
 *            type: string
 *            description: Password, will be encrypted
 *        example:
 *           name: John Doe
 *           email: john@doe.com
 *           password: johndoe0
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          _id:
 *            type: string
 *          id:
 *            type: integer
 *          __v:
 *            type: integer
 *          name:
 *            type: string
 *            description: Full name of the user, just alphabets
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique
 *          salt:
 *            type: string
 *            description: Salt of the password
 *          password:
 *            type: string
 *            description: Password, will be encrypted
 *          createdAt:
 *            type: date
 *          updatedAt:
 *            type: date
 *        example:
 *           name: John Doe
 *           email: john@doe.com
 *           password: johndoe0
 */
