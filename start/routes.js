'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index')
Route.on('/about').render('about')
Route.on('/contact').render('contact')
Route.on('/success').render('success')
Route.get('/releases', 'AppController.getReleases')
Route.on('/admin').render('admin/login')
Route.on('/reg/yes/bebra/reg').render('admin/reg')

Route.post('/api/login','AuthController.index').as('login')
Route.post('/api/newApp','AppController.newApp').as('newApp')
Route.post('/api/reg','AuthController.reg').as('reg')

Route.group(() => {
    Route.on('/admin/index').render('admin/index')
    Route.get('/admin/releases', 'AdminController.getReleases')
    Route.on('/admin/new').render('admin/new')
    Route.get('/admin/users', 'AdminController.getUsers')

    Route.post('/api/logout','AuthController.logout').as('logout')
    Route.get('/api/deleteUser/:id','AdminController.deleteUser').as('deleteUser')
    Route.post('/api/editUser/:id','AdminController.editUser').as('editUser')
    Route.post('/api/adminReg','AdminController.reg').as('newAdmin')
    Route.get('/api/deleteRelease/:id','AdminController.deleteUser').as('deleteUser')
    Route.post('/api/newRelease','AdminController.newRelease').as('newRelease')
}).middleware(['auth'])