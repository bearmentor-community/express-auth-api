const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

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

UserSchema.plugin(AutoIncrement, {
  id: 'users_counter',
  inc_field: 'id',
})

const User = mongoose.model('User', UserSchema)

module.exports = User
