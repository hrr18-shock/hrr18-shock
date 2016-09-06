var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;

// this is where the actual routes should be, if its not here pls update!!!
var app = require('../index.js');

// this is where the connection to the DB is
var db = require('../app/config');

// this is the link to the schema file (or files?)
var User =
var Trainer =

describe('', function(){

  beforeEach(function(done) {
    // log out current signed in user
    request(app)
    // should be log out get request
      .get('/logout')
      .end(function(err, res){
        // Delete objects from db so they can be created later for the test

        done();
      });
  });

  describe('Signup / Signin:', function(){
    it('There should be a sign in page', function(done){
      request(app)
        .get('/signup')
        .expect(200)
        .expect(function(res){
          expect(res.headers.location).to.equal('/signup');
        })
        .end(done);
    });
  });

});