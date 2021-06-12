const { Articles } = require('../models')
const models = require('../models')

module.exports = {

    getAllArticles() {
        return Articles.findAll()
    },

    getArticles(offset = 0, limit = 10) {
        return User.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {}
        })
    },



    getArticle(id) {
        return Articles.findOne({
            where: {
                id: id
            }
        }
        )
    },

    addArticle(article) {
        return Articles.create(article)
    },

    updateArticle(article) {
        return Articles.update(article,
            {
                where: {
                    id: article.id
                }
            })
    },

    deleteArticle(id) {
        return Articles.destroy(
            {
                where: {
                    id: id
                }
            }
        )
    },

    getArticlewithComments(id) {
        return Articles.findOne({
            where: {
                id: id
            },
            include: models.Comment
        })
    }

}