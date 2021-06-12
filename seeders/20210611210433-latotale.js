'use strict';
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userData = []
    const roles = ['admin', 'author', 'guest']
    const tagData = []
    const articleData = []
    const articleTagsData = []
    const commentData = []

    for (let i = 0; i < 10; i++) {
      const tagDate = faker.date.between(new Date(2000, 1, 1, 0, 0, 0), new Date())
      const tag = {
        id: (i + 1),
        name: faker.lorem.sentence(3),
        createdAt: tagDate,
        updatedAt: tagDate
      }
      tagData.push(tag)
    }
    let articleid = 1;
    for (let k = 0; k < 20; k++) {
      const date = faker.date.between(new Date(2000, 1, 1, 0, 0, 0), new Date())
      const user = {
        id: (k + 1),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.randomize(roles),
        createdAt: date,
        updatedAt: date
      }
      for (let i = 0; i < Math.floor(Math.random() * (10 - 2) + 2); i++) {
        const articleDate = faker.date.between(new Date(2000, 1, 1, 0, 0, 0), new Date())
        const article = {
          id: articleid,
          userId: (i + 1),
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(),
          createdAt: articleDate,
          updatedAt: articleDate
        }
        for (let l = 1; l < Math.floor(Math.random() * (6 - 2) + 2); l++) {
          const articleTag = {
            ArticleId: articleid,
            TagId: 1,
            createdAt: articleDate,
            updatedAt: articleDate
          }
          articleTagsData.push(articleTag)
        }
        for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
          const commentDate = faker.date.between(new Date(2000, 1, 1, 0, 0, 0), new Date())
          const comment = {
            content: faker.lorem.text(),
            ArticleId: articleid,
            createdAt: commentDate,
            updatedAt: commentDate
          }
          commentData.push(comment)
        }
        articleid++
        articleData.push(article)
      }
      userData.push(user)
    }
    await queryInterface.bulkInsert('Users', userData)
    console.log("users inserted")

    await queryInterface.bulkInsert('Tags', tagData)
    console.log("tags inserted")

    await queryInterface.bulkInsert('Articles', articleData)
    console.log("Articles inserted")

    await queryInterface.bulkInsert('ArticleTags', articleTagsData)
    console.log("articleTags inserted")

    await queryInterface.bulkInsert('Comments', commentData)
    console.log("comments inserted")


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
