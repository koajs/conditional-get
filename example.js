
var conditional = require('./');
var etag = require('koa-etag');
var Koa = require('koa');
var app = new Koa();

// use it upstream from etag so
// that they are present

app.use(conditional());

// add etags

app.use(etag());

// respond

app.use(function(ctx, next){
  return next().then(function() {
    ctx.body = {
      name: 'tobi',
      species: 'ferret',
      age: 2
    };
  });
})

app.listen(3000);

console.log('listening on port 3000');
