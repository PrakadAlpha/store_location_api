const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')

const storeSchema = mongoose.Schema({

    storeId: {
      type: String,
      required: [true, 'Please add an id'],
      unique: true,
      trim: true,
      maxLength: [10, 'Store id must be less than 10 chars']
    },
    address: {
      type:String,
      required:[true, 'Please enter the address']
    },
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates:{
        type: [Number],
        index: '2dsphere'
      },
      formattedAddr:String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  })

  storeSchema.pre('save', async (next) => {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddr: loc[0].formattedAddress
    }

    this.address = undefined,
    next();
  })


module.exports = mongoose.model('Store', storeSchema);