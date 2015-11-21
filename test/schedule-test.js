var replay = require('replay');
var request = require('supertest');
var express = require('express');
var app = require('../app')

var input = require('../fixtures/input');

describe('POST /schedules', function(){
  it('respond with json', function(done){
    request(app)
    .post('/schedules')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Accept', 'application/json')
    .send(input)
    .expect('Content-Type', /json/)
    .expect(200, done);
  })
})
