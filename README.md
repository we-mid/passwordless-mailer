# passwordless-mailer

Sends passwordless emails in your site

## Inspired By

[florianheinemann/passwordless](https://github.com/florianheinemann/passwordless)

## Usage

```js
var passwordless = require('passwordless-mailer')

var mailConf = require('./private/mail-conf')
var site = 'Facebook'
var prefix = 'http://facebook.com/login?a=1&b=2&token='
passwordless.setup(site, prefix, mailConf)

app.get('/passwordless', function(req, res){
  var email = req.query['email']
  var token = bindToken(email)
  passwordless.send(email, token, function(err, info){
    // stuff..
  })
})

app.get('/login', function(req, res){
  var token = req.query['token']
  var email = checkToken(token)
  // stuff..
})
```

## Todo

- Beautify email content
- Custom email content
- Multiple instances
- Custom link url
- More..