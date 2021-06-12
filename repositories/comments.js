const { Comment } = require('../models')
const sequelize = require('sequelize')
const models = require('../models')

module.exports = {

    getAllComment() {
        return Comment.findAll({
            attributes: [[sequelize.fn('count', sequelize.col('ArticleId')), "nbComments"]],
            group: ['articleId'],
            include: [{
                model: models.Article,
                attributes: ["title"]
            }
            ],
        })
    },
    getComment(id) {
        return Comment.findAll({
            where: {
                id: id
            }
        }
        )
    },

    addComment(comment) {
        return Comment.create(comment)
    },

    updateComment(comment) {
        return Comment.update(comment,
            {
                where: {
                    id: comment.id
                }
            })
    },

    deleteComment(id) {
        return Comment.destroy(
            {
                where: {
                    id: id
                }
            }
        )
    }
}