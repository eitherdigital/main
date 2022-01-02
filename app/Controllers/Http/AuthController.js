'use strict'

const User = use('App/Models/User')

class AuthController {
	async index({ request, auth, response}) {
        try {
            await auth.logout()
        }
        catch (e) {
            console.log('ok');
        }
        await auth.attempt(request.input('email'), request.input('password'))
		return response.route('/admin/index');
	}
	async logout({ auth, response }) {
		await auth.logout()
		return response.route('/')
	}
	async reg({ request, session, response, auth }) {
        const user = await User.create({
            username: request.input('username'),
            email: request.input('email'),
            password: request.input('password')
        })
        session.flash({ successmessage: 'User have been created successfully'})
        await auth.attempt(request.input('email'), request.input('password'))
        return response.route('/admin/index');
    }
}

module.exports = AuthController
