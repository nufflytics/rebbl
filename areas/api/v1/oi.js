'use strict';
const db = require('../../../lib/signupService.js')
  , util = require('../../../lib/util.js')
  , express = require('express')
  , router = express.Router();

router.get('/', util.ensureAuthenticated, util.hasRole("admin"), async function(req, res,next){

  const signups = await db.getSignUps({'OI':true});

  let data = signups.all;

  const csv = data.map(function(row){
    return `${JSON.stringify(row.team)},${JSON.stringify(row.race)},${JSON.stringify(row.timezone)},${JSON.stringify(row.reddit)},${JSON.stringify(row.discord)},${JSON.stringify(row.coach)},${JSON.stringify(row.steam)},${JSON.stringify(row.league)}`
  });

  csv.unshift('team name,race,timezone,reddit name,discord,blood bowl 2 name,steam name,reqion');


  res.setHeader("content-type", "text/csv");
  res.set('Content-Type', 'application/octet-stream');
  res.attachment('oi.csv');
  res.status(200).send(csv.join('\r\n'));

});


module.exports = router;