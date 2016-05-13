/**
 * Robinhood API NodeJS Wrapper
 * @author Alejandro U. Alvarez
 * @forkedandextendedby Patrick W. Ackerman
 * @license AGPLv3 - See LICENSE file for more details
 * @typedef Promise
 */

'use strict';

// Dependencies
const request = require('request');
const q = require('q');
// Context
const baseUrl = 'https://api.robinhood.com';
let _private = new WeakMap();
let _endpoints = new WeakMap();
let _request = request.defaults();

let endpoints = {
        login:  `${baseUrl}/api-token-auth/`,
        investment_profile: `${baseUrl}/user/investment_profile/`,
        accounts: `${baseUrl}/accounts/`,
        ach_iav_auth: `${baseUrl}/ach/iav/auth/`,
        ach_relationships:  `${baseUrl}/ach/relationships/`,
        ach_transfers:`${baseUrl}/ach/transfers/`,
        applications: `${baseUrl}/applications/`,
        dividends:  `${baseUrl}/dividends/`,
        edocuments: `${baseUrl}/documents/`,
        instruments:  `${baseUrl}/instruments/`,
        margin_upgrade:  `${baseUrl}/margin/upgrades/`,
        markets:  `${baseUrl}/markets/`,
        notifications:  `${baseUrl}/notifications/`,
        orders: `${baseUrl}/orders/`,
        password_reset: `${baseUrl}/password_reset/request/`,
        quotes: `${baseUrl}/quotes/`,
        document_requests:  `${baseUrl}/upload/document_requests/`,
        user: `${baseUrl}/user/`,
        watchlists: `${baseUrl}/watchlists/`,
        positions: `${baseUrl}/positions/`,
        notes: `${baseUrl}/midlands/notifications/stack/`,
        movers: `${baseUrl}/midlands/movers/sp500/`
    }
//I don't think a lot of these headers are necessary for this to work, though are a holdover from previous package
    let headers = {
              'Accept': '*/*',
              'Accept-Encoding': 'gzip, deflate',
              'Accept-Language': 'en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
              'X-Robinhood-API-Version': '1.0.0',
              'Connection': 'keep-alive',
              'User-Agent': 'Robinhood/823 (iPhone; iOS 7.1.2; Scale/2.00)'
          }

/**
 * Class representing the RobinhoodWepApi object for interacting with the API.
 */
class RobinhoodWebApi {
  /**
   * Create an instance of the class. The constructor sets headers, endpoints, and private variables.
   * @constructor
   * @param {object} opts - an object with username and password fields.
   */
  constructor(opts) {
    opts.headers = headers;
    _private.set(this, opts);
    _endpoints.set(this, endpoints);
    this._setHeaders()
  }

  _setHeaders(){
    let __private = _private.get(this);
    _request = request.defaults({
      headers: __private.headers,
      json: true,
      gzip: true
    });
  }

  /**
   * Logs the user into Robinhood based on the provided details in the constructor, and stores that value as the 'session' within the object (only one session at a time per RobinhoodWebApi instance). Returns a Promise.
   * @promise
   * @returns {Promise.<string>} token
   */
  login(){
    let dfd = q.defer();
    let __endpoints = _endpoints.get(this);
    let __private = _private.get(this);
    let self = this;
      _request.post({
        uri: __endpoints.login,
        form: {
          password: __private.password,
          username: __private.username
        }
      }, (err, httpResponse, body)=>{
        if(err) {
          dfd.reject(err);
        }
        __private.account = body.account;
        __private.auth_token = body.token;
        __private.headers.Authorization = 'Token ' + __private.auth_token;

        console.log('private', __private);
        _private.set(self, __private);

        self._setHeaders();

        dfd.resolve(body.token)
      });
      return dfd.promise;
    }
  /**
   * Can only be called once a user has been logged in. Gathers the details about a specific user as stored by the Robinhood API. Returns a promise.
   * @promise
   * @returns {Promise.<object>} user details
   */
  user(){
    let dfd = q.defer();
    let __endpoints = _endpoints.get(this);
    _request.get({
        "uri": __endpoints.user
      }, (err, httpResponse, body) => {
        if(err){
          console.log('err', err)
          dfd.reject(err)
        }
        dfd.resolve(body)
      });
      return dfd.promise;
    }
    /**
     * Gathers the orders that are currently in place for the selected user. Returns a Promise.
     * @promise
     * @returns {Promise.<array>} order details
     */
    orders(){
      let dfd = q.defer();
      let __endpoints = _endpoints.get(this);
      _request.get({
          "uri": __endpoints.orders
        }, (err, httpResponse, body) => {
          if(err){
            console.log('err', err)
            dfd.reject(err)
          }
          dfd.resolve(body)
        });
        return dfd.promise;
      }

    quote_data(symbol){
      let dfd = q.defer();
      let __endpoints = _endpoints.get(this);
      _request.get({
          uri: __endpoints.quotes,
          qs: {'symbols': symbol.toUpperCase() }
        }, (err, httpResponse, body) => {
          if(err){
            console.log('err', err)
            dfd.reject(err)
          }
          dfd.resolve(body)
        });
      return dfd.promise;
    }

    place_order(options){
      let dfd = q.defer();
      let __endpoints = _endpoints.get(this);
      _request.get({
          uri: __endpoints.orders,
          form: {
            account: _private.account,
            instrument: options.instrument.url,
            price: options.bid_price,
            stop_price: options.stop_price,
            quantity: options.quantity,
            side: options.transaction,
            symbol: options.instrument.symbol.toUpperCase(),
            time_in_force: options.time || 'gfd',
            trigger: options.trigger || 'immediate',
            type: options.type || 'market'
          }
        }, (err, httpResponse, body) => {
          if(err){
            console.log('err', err)
            dfd.reject(err)
          }
          dfd.resolve(body)
        });
      return dfd.promise;
    }

    place_buy_order(options){
      options.transaction = 'buy';
      return place_order(options)
    }

    place_sell_order(options){
      options.transaction = 'sell';
      return place_order(options)
    }

    investment_profile(){
      let dfd = q.defer();
      let __endpoints = _endpoints.get(this);
      _request.get({
          uri: __endpoints.investment_profile
        }, (err, httpResponse, body) => {
          if(err){
            console.log('err', err)
            dfd.reject(err)
          }
          dfd.resolve(body)
        });
      return dfd.promise;
    }

    instruments(symbol){
      let dfd = q.defer();
      let __endpoints = _endpoints.get(this);
      _request.get({
          uri: __endpoints.instruments,
          qs: {'symbols': symbol.toUpperCase() }
        }, (err, httpResponse, body) => {
          if(err){
            console.log('err', err)
            dfd.reject(err)
          }
          dfd.resolve(body)
        });
      return dfd.promise;
    }

    dividends(){
      let dfd = q.defer();
      let __endpoints = _endpoints.get(this);
      _request.get({
          uri: __endpoints.dividends
        }, (err, httpResponse, body) => {
          if(err){
            console.log('err', err)
            dfd.reject(err)
          }
          dfd.resolve(body)
        });
      return dfd.promise;
    }

    notes(){
      let dfd = q.defer();
      let __endpoints = _endpoints.get(this);
      _request.get({
          uri: __endpoints.notes
        }, (err, httpResponse, body) => {
          if(err){
            console.log('err', err)
            dfd.reject(err)
          }
          dfd.resolve(body)
        });
      return dfd.promise;
    }
    //DIRECTION: 'up' or 'down'
    movers(direction){
      let dfd = q.defer();
      let __endpoints = _endpoints.get(this);
      _request.get({
          uri: __endpoints.movers,
          qs: {'direction': direction }
        }, (err, httpResponse, body) => {
          if(err){
            console.log('err', err)
            dfd.reject(err)
          }
          dfd.resolve(body)
        });
      return dfd.promise;
    }


    multiple_quotes(symbols){
      let dfd = q.defer();
      let __endpoints = _endpoints.get(this);
      symbols = symbols.map(symbol => symbol.toUpperCase())
      _request.get({
          uri: __endpoints.quotes,
          qs: {'symbols': symbols.join(',') }
        }, (err, httpResponse, body) => {
          if(err){
            console.log('err', err)
            dfd.reject(err)
          }
          dfd.resolve(body)
        });
      return dfd.promise;
    }

    positions(){
      let dfd = q.defer();
      let __endpoints = _endpoints.get(this);
      _request.get({
          uri: __endpoints.positions
        }, (err, httpResponse, body) => {
          if(err){
            console.log('err', err)
            dfd.reject(err)
          }
          dfd.resolve(body)
        });
      return dfd.promise;
    }

    accounts(){
      let dfd = q.defer();
      let __endpoints = _endpoints.get(this);
      _request.get({
        uri: __endpoints.accounts
      }, (err, httpResponse, body) => {
        if(err){
          console.log('err', err)
          dfd.reject(err)
        }
        dfd.resolve(body)
      });
      return dfd.promise;
    }

}

module.exports = RobinhoodWebApi;
