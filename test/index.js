
var request = require('supertest');
var conditional = require('..');
var etag = require('koa-etag');
var koa = require('koa');
var fs = require('fs');

describe('conditional()', function(){
  describe('when cache is fresh', function(){
    it('should respond with 304', function(done){
      var app = koa();

      app.use(conditional());
      app.use(etag());

      app.use(function *(next){
        yield next;

        this.body = {
          name: 'tobi',
          species: 'ferret',
          age: 2
        };
      })

      request(app.listen())
      .get('/')
      .set('If-None-Match', '"-1572211827"')
      .expect(304, done);
    })
  })

  describe('when cache is stale', function(){
    it('should do nothing', function(done){
      var app = koa();

      app.use(conditional());
      app.use(etag());

      app.use(function *(next){
        yield next;

        this.body = {
          name: 'tobi',
          species: 'ferret',
          age: 2
        };
      })

      request(app.listen())
      .get('/')
      .set('If-None-Match', 'tobi')
      .expect(200, done);
    })
  })
})