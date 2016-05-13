# Robinhood API NodeJS Wrapper

**Forked And Extended By**: Patrick W. Ackerman
**Original Author:** Alejandro U. Alvarez
**License**: AGPLv3 - See LICENSE file for more details
<h1><img src="https://raw.githubusercontent.com/aurbano/robinhood-node/master/.github/robinhood-node.png"/></h1>

This is a fork of Alejandro A. Alvarez's project to make trades with the private [Robinhood](https://www.robinhood.com/) API. I have promisified many of the methods (using the Q library) to avoid race conditions with some of the asynchronous callbacks in the original. In addition, much of the code has been altered to use ES6 WeakMaps for private variables, rather than the simply preceding underscores to denote intended data hiding. I have also added some additional endpoints that were not covered in the original library.

As with the original, using this API is not encouraged, since it's not officially available and it has been reverse engineered. See this [blog post](https://medium.com/@rohanpai25/reversing-robinhood-free-accessible-automated-stock-trading-f40fba1e7d8b) for more information on Alejandro A. Alvarez's original API wrapper library.

It is Alejandro's opinion after having read the Robinhood Terms of Service [Robinhood's Terms and Conditions](https://brokerage-static.s3.amazonaws.com/assets/robinhood/legal/Robinhood%20Terms%20and%20Conditions.pdf) that interacting with their servers using the API is not prohibited.

> Alejandro's original framework was inspired by a deprecated Python framework originally developed by [@Rohanpai](https://github.com/rohanpai).

## Classes

<dl>
<dt><a href="#RobinhoodWebApi">RobinhoodWebApi</a></dt>
<dd><p>Class representing the RobinhoodWepApi object for interacting with the API.</p>
</dd>
</dl>

<a name="RobinhoodWebApi"></a>

## RobinhoodWebApi
This documentation is not exhaustive and will be added to periodically.

Class representing the RobinhoodWepApi object for interacting with the API.

**Kind**: global class

* [RobinhoodWebApi](#RobinhoodWebApi)
    * [new RobinhoodWebApi(opts)](#new_RobinhoodWebApi_new)
    * [.login()](#RobinhoodWebApi+login) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.user()](#RobinhoodWebApi+user) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.orders()](#RobinhoodWebApi+orders) ⇒ <code>Promise.&lt;array&gt;</code>

<a name="new_RobinhoodWebApi_new"></a>

### new RobinhoodWebApi(opts)
Create an instance of the class. The constructor sets headers, endpoints, and private variables.


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | an object with username and password fields. |

<a name="RobinhoodWebApi+login"></a>

### robinhoodWebApi.login() ⇒ <code>Promise.&lt;string&gt;</code>
Logs the user into Robinhood based on the provided details in the constructor, and stores that value as the 'session' within the object (only one session at a time per RobinhoodWebApi instance). Returns a Promise.

**Kind**: instance method of <code>[RobinhoodWebApi](#RobinhoodWebApi)</code>
**Returns**: <code>Promise.&lt;string&gt;</code> - token
**Promise**:
<a name="RobinhoodWebApi+user"></a>

### robinhoodWebApi.user() ⇒ <code>Promise.&lt;object&gt;</code>
Can only be called once a user has been logged in. Gathers the details about a specific user as stored by the Robinhood API. Returns a promise.

**Kind**: instance method of <code>[RobinhoodWebApi](#RobinhoodWebApi)</code>
**Returns**: <code>Promise.&lt;object&gt;</code> - user details
**Promise**:
<a name="RobinhoodWebApi+orders"></a>

### robinhoodWebApi.orders() ⇒ <code>Promise.&lt;array&gt;</code>
Gathers the orders that are currently in place for the selected user. Returns a Promise.

**Kind**: instance method of <code>[RobinhoodWebApi](#RobinhoodWebApi)</code>
**Returns**: <code>Promise.&lt;array&gt;</code> - order details
**Promise**:
<a name="Promise"></a>

# This Fork Managed By
* Patrick W. Ackerman ([@pwackerman](https://github.com/pwackerman))

# Original Contributors

* Alejandro U. Alvarez ([@aurbano](https://github.com/aurbano))
* Wei-Sheng Su ([@ted7726](https://github.com/ted7726))
* Alex Ryan ([@ialexryan](https://github.com/ialexryan))
* Dustin Moore ([@dustinmoorenet](https://github.com/dustinmoorenet))
* Ben Van Treese ([@vantreeseba](https://github.com/vantreeseba))
* Jason Truluck ([@jasontruluck](https://github.com/jasontruluck))
* Justin Keller ([@nodesocket](https://github.com/nodesocket))
* Chris Busse ([@busse](https://github.com/busse))

------------------
Like the original, this framework is still in a very alpha version and will likely change, so production usage is completely discouraged.

>Just like Alejandro, I am not affiliated in any way with Robinhood Financial LLC. No harm or disruption towards their service is inteded by providing this library.
