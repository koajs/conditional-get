
var conditional = require('./');
var etag = require('koa-etag');
var koa = require('koa');
var app = koa();

// use it upstream from etag so
// that they are present

app.use(conditional());

// add etags

app.use(etag());

// respond

app.use(function(next){
  return function *(){
    yield next;
    
    this.body = {
      name: 'tobi',
      species: 'ferret',
      age: 2
    };
  }
})

app.listen(3000);

console.log('listening on port 3000');