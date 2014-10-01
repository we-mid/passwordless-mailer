var passwordless = require('../')
var express = require('express')
var request = require('request')
var assert = require('assert')
var app = express()

var mailConf = require('./private/mail-conf') // private
var site = 'Facebook'
var prefix = 'http://127.0.0.1/login?a=1&b=2&token='
passwordless.setup(site, prefix, mailConf)

app.get('/passwordless', function(req, res){
  var email = req.query['email']
  var token = Math.random()
  passwordless.send(email, token, function(err, info){
    if (err) return res.send(err)
    res.send(info)
  })
})

app.get('/login', function(req, res){
  // stuff..
})

app.listen(8188, function(){
  request({
    url: 'http://127.0.0.1:8188/passwordless',
    qs: {
      email: 'uxfritz@163.com'
    },
    json: true
  }, function(err, res, info){
    assert.equal(err, null)
    assert.equal(typeof info, 'object')
    assert(/\bok\b/i.test(info.response))
    passwordless.close()
    process.exit()
  })
})