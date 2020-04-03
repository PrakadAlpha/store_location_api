const express = require('express');
const {getStores, createStore} = require('../controllers/stores')
const router = express.Router();

router.route('/')
      .get(getStores)
      .post(createStore);


module.exports = router;