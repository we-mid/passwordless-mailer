var nodemailer = require('nodemailer')

var transporter
var site
var prefix
var conf

exports.send = function(to, token, cb){
  var url = prefix + token
  var mail = {
    to: to,
    from: site +' <'+ conf.auth.user +'>',
    subject: 'Passwordless Login/Register',
    html: [
      '<p>To Login or Register, Click: <a href="'+ url +'">'+ url +'</a></p>',
      '<br>',
      '<small>- Powered By Passwordless</small>'
    ].join('\n')
  }

  transporter.sendMail(mail, function(err, info){
    cb(err, info)
  })
}

exports.setup = function(_site, _prefix, _conf){
  site = _site
  prefix = _prefix
  conf = _conf
  transporter = nodemailer.createTransport(conf)
  /* {
    host: 'smtp.163.com',
    auth: {
      user: 'user@163.com',
      pass: 'password'
    }
  } */
}

exports.close = function(){
  transporter.close()
}