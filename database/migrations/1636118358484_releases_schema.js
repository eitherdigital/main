'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReleasesSchema extends Schema {
  up () {
    this.create('releases', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('artist').notNullable()
      table.string('cover').notNullable()
      table.string('promo').notNullable()
      table.string('link').notNullable()
      table.string('date').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('releases')
  }
}

module.exports = ReleasesSchema
