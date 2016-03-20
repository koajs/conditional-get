
'use strict';

const request = require('supertest');
const calculate = require('etag');
const conditional = require('..');
const etag = require('koa-etag');
const Koa = require('koa');
const fs = require('fs');

var body = {
  name: 'tobi',
  species: 'ferret',
  age: 2
};

describe('conditional()', function(){
  describe('when cache is fresh', function(){
    it('should respond with 304', function(done){
      const app = new Koa();

      app.use(conditional());
      app.use(etag());

      app.use((ctx, next) => {
        return next().then(() => {
          ctx.body = body;
        });
      });

      request(app.listen())
      .get('/')
      .set('If-None-Match', calculate(JSON.stringify(body)))
      .expect(304, done);
    })
  })

  describe('when cache is stale', function(){
    it('should do nothing', function(done){
      const app = new Koa();

      app.use(conditional());
      app.use(etag());

      app.use((ctx, next) => {
        return next().then(() => {
          ctx.body = body;
        });
      });

      request(app.listen())
      .get('/')
      .set('If-None-Match', 'tobi')
      .expect(200, done);
    })
  })
})
