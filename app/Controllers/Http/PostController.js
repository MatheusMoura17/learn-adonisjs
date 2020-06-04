'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Post = use('App/Models/Post')

class PostController {
  async store({ request, response }) {

    const { title, description } = request.all()

    if (title && description) {
      const post = await Post.create({ title, description })
      response.send({ post })
    } else {
      response.status(406).send({ message: "Parametros insuficientes" })
    }
  }

  async show({ params, response }) {
    const { id } = params

    if (id) {
      const post = await Post.findOrFail(id)
      response.send({ post })
    } else {
      response.status(406).send({ message: "Parametros insuficientes" })
    }
  }

  async destroy({ params, response }) {
    const { id } = params

    if (id) {
      const post = await Post.findOrFail(id)
      const deleted = await post.delete()
      response.send({ deleted })
    } else {
      response.status(406).send({ message: "Parametros insuficientes" })
    }
  }

  async update({ params, response, request }) {
    const { id } = params
    const { title, description } = request.all()

    if (id && title && description) {
      const post = await Post.findOrFail(id)
      post.merge({ title, description })
      const updated = await post.save()
      response.send({ updated })
    } else {
      response.status(406).send({ message: "Parametros insuficientes" })
    }
  }
}

module.exports = PostController
