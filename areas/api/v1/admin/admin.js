'use strict';

const express = require('express'),
  cache = require("memory-cache"),
  util = require('../../../../lib/util.js'),
  router = express.Router();

router.use('/user', require(`./user.js`));

router.use('/strikes', require(`./strikes.js`));

router.use('/contest', require(`./contest.js`));


router.post("/clearcache",  util.ensureAuthenticated, util.hasRole("superadmin"), async function(req, res){
  try{

      let data = req.body;
    
      cache.del(data.key);

      res.status(200).send("ok");
  } catch(err){
      console.log(err);
      res.status(500).send(err);
  }
});

module.exports = router;