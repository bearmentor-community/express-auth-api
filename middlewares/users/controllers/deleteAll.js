const User = require('../model')

/**
 * Delete all users
 */
const deleteAll = async (req, res) => {
  try {
    const result = await User.remove()

    res.status(200).send({
      message: 'Delete all users',
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error('Error when deleting all users')

    res.status(500).send({
      message: 'Failed to delete all users',
    })
  }
}

module.exports = deleteAll
