const { Tag } = require('../models')
module.exports = {
    getAllTags() {
        return Tag.findAll()
    },
    addtag(tag) {
        return Tag.create(tag)
    },
    updateTag(tag) {
        return Tag.update(tag,
            {
                where: {
                    id: tag.id
                }
            })
    },
    deletetag(id) {
        return Tag.destroy(
            {
                where: {
                    id: id
                }
            })
    }
}









