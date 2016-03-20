
'use strict';

const conditional = require('./');
const etag = require('koa-etag');
const Koa = require('koa');
const app = new Koa();

// use it upstream from etag so
// that they are present

app.use(conditional());

// add etags

app.use(etag());

// respond

app.use((ctx, next) => {
  return next().then(() => {
    ctx.body = {
      name: 'tobi',
      species: 'ferret',
      age: 2
    };
  });
})

app.listen(3000);

console.log('listening on port 3000');
