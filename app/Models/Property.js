'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Property extends Model {

    user () {
        return this.belongsTo('App/Models/User')
    }


    images () {
        return this.hasMany('App/models/Image')
    }

    static scopeNearBy (query, latitude, longitude, distance) {
        const haversine = `(6371 * acos(cos(radians(${latitude}))
            * cos(radians(latitude))
            * cos(radians(longitude)
            - radians(${longitude}))
            + sin(radians(${latitude}))
            * sin(radians(latitude))))`

        return query
            .select('*', Database.raw(`${haversine} as distance`))
            .whereRaw(`${haversine} < ${distance}`)
}
}

module.exports = Property
