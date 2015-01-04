Finance.js
[financejs.org](http://financejs.org)
==========

Finance.js makes it easy to incorporate common financial calculations into your application. The library is built on pure JavaScript without any dependencies.

This project is [hosted on GitHub](https://github.com/essamjoubori/finance.js). You can report bugs and discuss features on the [GitHub issues page](https://github.com/essamjoubori/finance.js/issues). Finance.js is available for use under the [MIT software license](https://github.com/essamjoubori/finance.js/blob/master/LICENSE.md).

##Getting Started

### Installation

```shell
  npm install financejs --save
```
**or**

- Download or fork the repository from GitHub.
- Extract the file finance.js from the project and include it in your application.

### Example Usage

```js
  var Finance = require('financejs');
  var finance = new Finance();
  
  // To calculate Amortization
  finance.AM(20000, 7.5, 5, 0);
  // => 400.76
```
To see all available calculations and their usage, visit [financejs.org](http://financejs.org).

### Tests

```shell
   npm test
``` 

### Contributing

Contributions are welcome to aid in the expansion of the library. In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality, and please lint and test your code.
