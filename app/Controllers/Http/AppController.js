'use strict'

const axios = require('axios');
const Release = use('App/Models/Release')
const Database = use('Database')
const Env = use('Env')

class AppController {
  async newApp({ params, response, request }) {
    var name = request.input('name')
    var email = request.input('email')
    var text = request.input('text')
    axios.get(encodeURI(`https://api.telegram.org/bot${Env.get(TELEGRAM_TOKEN)}/sendMessage?chat_id=${Env.get(TELEGRAM_CHAT_ID)}&text=Новое сообщение:\n\nИмя: ${name}\nEmail: ${email}\nСообщение: ${text}`))
    return response.redirect('/success')
  }
  async getReleases({ view }) {
    const data = await Database.table('releases')
      .orderBy('created_at', 'desc');

    return view.render('releases', { data: data });
  }
}

module.exports = AppController
