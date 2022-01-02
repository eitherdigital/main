'use strict'

const Release = use('App/Models/Release')
const Database = use('Database')
const User = use('App/Models/User')
const Helpers = use('Helpers')

class AdminController {
	async getReleases({ view }) {
    const data = await Database.table('releases')
      .orderBy('created_at', 'desc');

    return view.render('admin/releases', { data: data });
  }
  async getUsers({ view, auth }) {
    const data = await Database.table('users')
      .orderBy('created_at', 'desc');
    return view.render('admin/users', { data: data });
  }
  async deleteUser({ params, response, auth }) {
    if (!params.id) {
        return response.badRequest('Произошла ошибка, попробуйте позже.');
    }
    const user = await User.find(params.id)

    if(!user) return response.redirect('/')

    await user.delete();
    return response.redirect('/admin/users')
  }
  async reg({ request, session, response, auth }) {

    const user = await User.create({
      username: request.input('username'),
      email: request.input('email'),
      password: request.input('password')
    })
    session.flash({ successmessage: 'User have been created successfully'})
    return response.route('/admin/users');
  }
  async deleteRelease({ params, response, auth }) {
    if (!params.id) {
        return response.badRequest('Произошла ошибка, попробуйте позже.');
    }
    const release = await Release.find(params.id)

    if(!release) return response.redirect('/')

    await release.delete();
    return response.redirect('/admin/releases')
  }
  async newRelease({ auth,request, response, session }) {
      const release = new Release()

      const validationOptions = {
        types: ['jpeg'],
        size: '10mb',
      }
      const imageFile = request.file('cover', validationOptions)
      await imageFile.move(Helpers.publicPath('/covers'), {
        name: request.input('artist')+'_'+request.input('title')+'.jpg',
        overwrite: true,
      })
      if (!imageFile.moved()) {
        return imageFile.error()
      }

      release.title = request.input('title')
      release.artist = request.input('artist')
      release.date = request.input('date')
      release.promo = request.input('promo')
      release.cover = '/covers/'+request.input('artist')+'_'+request.input('title')+'.jpg'
      release.link = request.input('link')
      release.date = request.input('date')
      release.link = request.input('link')


      await release.save()

      session.flash({ notification: 'You create new release!' })

      return response.redirect('/admin/releases')
  }
  async editUser({ params, response, auth, request }) {
    if (!params.id) {
        return response.badRequest('Произошла ошибка, попробуйте позже.');
    }
    const user = await User.find(params.id)

    if(!user) return response.redirect('/')

    if(request.input('username')) {
      user.username = request.input('username')
    }
    if(request.input('email')) {
      user.email = request.input('email')
    }
    if(request.input('password')) {
      user.password = request.input('password')
    }

    await user.save();
    return response.redirect('/admin/users')
  }
}

module.exports = AdminController
