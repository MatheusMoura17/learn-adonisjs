'use strict'

const Post = use('App/Models/Post')

class PostController {
  async create({ request, response }) {

    const { title, description } = request.post()

    if (title && description) {
      const post = await Post.create({ title, description })
      response.send({ post })
    } else {
      response.status(406).send({ message: "Parametros insuficientes" })
    }
  }
}

module.exports = PostController
