'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _loginCookie = require('../loginCookie');

var _loginCookie2 = _interopRequireDefault(_loginCookie);

var _constants = require('../constants');

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BBSavingsAccount = function () {
  function BBSavingsAccount(_ref) {
    var variation = _ref.variation,
        description = _ref.description;
    (0, _classCallCheck3.default)(this, BBSavingsAccount);

    this.variation = variation;
    this.description = description;
  }

  (0, _createClass3.default)(BBSavingsAccount, [{
    key: 'getTransactions',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
        var year = _ref3.year,
            month = _ref3.month;
        var pad, accountsUrl, params, response, text, json, session;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pad = function pad(s) {
                  return s.toString().padStart('0', 2);
                };

                accountsUrl = 'tela/ExtratoDePoupanca/menuPeriodo';
                params = {
                  metodo: 'mesAnterior',
                  variacao: this.variation,
                  periodo: '01/' + pad(month) + '/' + year
                };
                _context.next = 5;
                return (0, _nodeFetch2.default)('' + _constants.BASE_ENDPOINT + accountsUrl + '?' + _querystring2.default.stringify(params), {
                  headers: (0, _extends3.default)({}, _constants.DEFAULT_HEADERS, {
                    cookie: _loginCookie2.default.getGlobal()
                  })
                });

              case 5:
                response = _context.sent;
                _context.next = 8;
                return response.text();

              case 8:
                text = _context.sent;
                json = JSON.parse(text);
                session = json.conteiner.telas[0].sessoes.find(function (s) {
                  return s.cabecalho && s.cabecalho.includes('Mês referência');
                });
                return _context.abrupt('return', session.celulas.map(function (c) {
                  return c.componentes;
                }).filter(function (comp) {
                  return comp[0].componentes[0].texto !== 'Dia';
                }).map(function (c) {
                  return {
                    date: new Date(year, month - 1, c[0].componentes[0].texto),
                    description: (0, _helpers.treatDescription)(c[1].componentes[0].texto),
                    amount: (0, _helpers.parseAmountString)(c[2].componentes[0].texto)
                  };
                }));

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getTransactions(_x) {
        return _ref2.apply(this, arguments);
      }

      return getTransactions;
    }()
  }]);
  return BBSavingsAccount;
}();

exports.default = BBSavingsAccount;
//# sourceMappingURL=savingsAccount.js.map