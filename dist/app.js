'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      pages: ['pages/index', 'pages/login', 'pages/my', 'pages/edit-password', 'pages/exercise', 'pages/register', 'pages/wrongproblem', 'pages/wrongproblem-detail', 'pages/create-wrongproblem', 'pages/edit-wrongproblem', 'pages/create-orderTeacher', 'pages/learnsituation'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      // "style" : "v2",
      "tabBar": {
        "list": [{
          "pagePath": "pages/index",
          "iconPath": "images/homepage.png",
          "selectedIconPath": "images/homepagefill.png",
          "text": "主页"
        }, {
          "pagePath": "pages/my",
          "iconPath": "images/my.png",
          "selectedIconPath": "images/myfill.png",
          "text": "我的"
        }]
      },
      useExtendedLib: {
        weui: true
      },
      usingComponents: {
        "cu-custom": "/colorui/components/cu-custom"
      }
    }, _this.globalData = {
      userInfo: null,
      serverUrl: "https://www.kaigestudy.top:8080"
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      var self = this;
      //检查sessionid是否过期
      self.onCheckSessionTimeout();

      if (_wepy2.default.getStorageSync("sessionUserInfo")) {
        this.globalData.userInfo = _wepy2.default.getStorageSync("sessionUserInfo");
      } else {
        this.globalData.userInfo = null;
      }
    }

    //检查sessionid是否过期的方法

  }, {
    key: 'onCheckSessionTimeout',
    value: function onCheckSessionTimeout() {
      var self = this;
      console.log("checking session");
      var SESSION_TIMEOUT = 3 * 60 * 60 * 1000; //登陆状态有效时间为3小时
      var sessionToken = _wepy2.default.getStorageSync("sessionToken");
      var sessionTime = _wepy2.default.getStorageSync("sessionDate");

      if (sessionToken == null || sessionToken == undefined || sessionToken == "" || sessionTime == null || sessionTime == undefined || sessionTime == "") {
        console.log("session is empty");
        return;
      }

      var aftertimestamp = Date.parse(new Date());
      if (aftertimestamp - sessionTime >= SESSION_TIMEOUT) {
        // 过期后清除session缓存
        _wepy2.default.removeStorageSync("sessionToken");
        _wepy2.default.removeStorageSync("sessionDate");
        _wepy2.default.removeStorageSync("sessionUserInfo");
        console.log("remove session!");
      }
    }
  }, {
    key: 'sleep',
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('promise resolved');
        }, s * 1000);
      });
    }

    // 设置带有cookie的request header，每次request都带这个header

  }, {
    key: 'setHeader',
    value: function setHeader() {
      var self = this;
      var header = {
        'Content-type': 'application/json; charset=utf-8',
        'TTToken': _wepy2.default.getStorageSync("sessionToken") //读取本地保存好的上一次cookie
      };
      return header;
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2VFeHRlbmRlZExpYiIsIndldWkiLCJ1c2luZ0NvbXBvbmVudHMiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXJ2ZXJVcmwiLCJzZWxmIiwib25DaGVja1Nlc3Npb25UaW1lb3V0Iiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsIlNFU1NJT05fVElNRU9VVCIsInNlc3Npb25Ub2tlbiIsInNlc3Npb25UaW1lIiwidW5kZWZpbmVkIiwiYWZ0ZXJ0aW1lc3RhbXAiLCJEYXRlIiwicGFyc2UiLCJyZW1vdmVTdG9yYWdlU3luYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJoZWFkZXIiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswTEFJRUEsTSxHQUFTO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLFVBSEssRUFJTCxxQkFKSyxFQUtMLGdCQUxLLEVBTUwsZ0JBTkssRUFPTCxvQkFQSyxFQVFMLDJCQVJLLEVBU0wsMkJBVEssRUFVTCx5QkFWSyxFQVdMLDJCQVhLLEVBWUwsc0JBWkssQ0FEQTtBQWVQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixNQUZ4QjtBQUdOQyxnQ0FBd0IsUUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BZkQ7QUFxQlA7QUFDQSxnQkFBVztBQUNULGdCQUFRLENBQ047QUFDSSxzQkFBWSxhQURoQjtBQUVJLHNCQUFZLHFCQUZoQjtBQUdJLDhCQUFvQix5QkFIeEI7QUFJSSxrQkFBUTtBQUpaLFNBRE0sRUFPTjtBQUNJLHNCQUFZLFVBRGhCO0FBRUksc0JBQVksZUFGaEI7QUFHSSw4QkFBb0IsbUJBSHhCO0FBSUksa0JBQVE7QUFKWixTQVBNO0FBREMsT0F0Qko7QUFzQ1BDLHNCQUFnQjtBQUNkQyxjQUFNO0FBRFEsT0F0Q1Q7QUF5Q1BDLHVCQUFnQjtBQUNkLHFCQUFhO0FBREM7QUF6Q1QsSyxRQThDVEMsVSxHQUFhO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsaUJBQVc7QUFGQSxLOzs7OzsrQkFLRjtBQUNULFVBQUlDLE9BQU8sSUFBWDtBQUNBO0FBQ0FBLFdBQUtDLHFCQUFMOztBQUVBLFVBQUdDLGVBQUtDLGNBQUwsQ0FBb0IsaUJBQXBCLENBQUgsRUFBMEM7QUFDeEMsYUFBS04sVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJJLGVBQUtDLGNBQUwsQ0FBb0IsaUJBQXBCLENBQTNCO0FBQ0QsT0FGRCxNQUVLO0FBQ0gsYUFBS04sVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkIsSUFBM0I7QUFDRDtBQUVGOztBQUVEOzs7OzRDQUN3QjtBQUN0QixVQUFJRSxPQUFPLElBQVg7QUFDQUksY0FBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0EsVUFBTUMsa0JBQWtCLElBQUksRUFBSixHQUFTLEVBQVQsR0FBYyxJQUF0QyxDQUhzQixDQUdxQjtBQUMzQyxVQUFJQyxlQUFlTCxlQUFLQyxjQUFMLENBQW9CLGNBQXBCLENBQW5CO0FBQ0EsVUFBSUssY0FBY04sZUFBS0MsY0FBTCxDQUFvQixhQUFwQixDQUFsQjs7QUFFQSxVQUFJSSxnQkFBZ0IsSUFBaEIsSUFBd0JBLGdCQUFnQkUsU0FBeEMsSUFBcURGLGdCQUFnQixFQUFyRSxJQUF5RUMsZUFBZSxJQUF4RixJQUFnR0EsZUFBZUMsU0FBL0csSUFBNEhELGVBQWUsRUFBL0ksRUFBbUo7QUFDakpKLGdCQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDQTtBQUNEOztBQUVELFVBQUlLLGlCQUFpQkMsS0FBS0MsS0FBTCxDQUFXLElBQUlELElBQUosRUFBWCxDQUFyQjtBQUNBLFVBQUlELGlCQUFpQkYsV0FBakIsSUFBZ0NGLGVBQXBDLEVBQXFEO0FBQ25EO0FBQ0FKLHVCQUFLVyxpQkFBTCxDQUF1QixjQUF2QjtBQUNBWCx1QkFBS1csaUJBQUwsQ0FBdUIsYUFBdkI7QUFDQVgsdUJBQUtXLGlCQUFMLENBQXVCLGlCQUF2QjtBQUNBVCxnQkFBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0Q7QUFDRjs7OzBCQUVNUyxDLEVBQUc7QUFDUixhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFXLFlBQU07QUFDZkYsa0JBQVEsa0JBQVI7QUFDRCxTQUZELEVBRUdGLElBQUksSUFGUDtBQUdELE9BSk0sQ0FBUDtBQUtEOztBQUdEOzs7O2dDQUNZO0FBQ1YsVUFBSWQsT0FBTyxJQUFYO0FBQ0EsVUFBSW1CLFNBQVM7QUFDWCx3QkFBZ0IsaUNBREw7QUFFWCxtQkFBV2pCLGVBQUtDLGNBQUwsQ0FBb0IsY0FBcEIsQ0FGQSxDQUVvQztBQUZwQyxPQUFiO0FBSUEsYUFBT2dCLE1BQVA7QUFDRDs7OztFQTFHMEJqQixlQUFLa0IsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuXG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvbXknLFxuICAgICAgJ3BhZ2VzL2VkaXQtcGFzc3dvcmQnLFxuICAgICAgJ3BhZ2VzL2V4ZXJjaXNlJyxcbiAgICAgICdwYWdlcy9yZWdpc3RlcicsXG4gICAgICAncGFnZXMvd3Jvbmdwcm9ibGVtJyxcbiAgICAgICdwYWdlcy93cm9uZ3Byb2JsZW0tZGV0YWlsJyxcbiAgICAgICdwYWdlcy9jcmVhdGUtd3Jvbmdwcm9ibGVtJyxcbiAgICAgICdwYWdlcy9lZGl0LXdyb25ncHJvYmxlbScsXG4gICAgICAncGFnZXMvY3JlYXRlLW9yZGVyVGVhY2hlcicsXG4gICAgICAncGFnZXMvbGVhcm5zaXR1YXRpb24nLFxuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXG4gICAgfSxcbiAgICAvLyBcInN0eWxlXCIgOiBcInYyXCIsXG4gICAgXCJ0YWJCYXJcIiA6IHtcbiAgICAgIFwibGlzdFwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9pbmRleFwiLFxuICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9ob21lcGFnZS5wbmdcIixcbiAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9ob21lcGFnZWZpbGwucG5nXCIsXG4gICAgICAgICAgICBcInRleHRcIjogXCLkuLvpobVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvbXlcIixcbiAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvbXkucG5nXCIsXG4gICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJpbWFnZXMvbXlmaWxsLnBuZ1wiLFxuICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5oiR55qEXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgdXNlRXh0ZW5kZWRMaWI6IHtcbiAgICAgIHdldWk6IHRydWVcbiAgICB9LFxuICAgIHVzaW5nQ29tcG9uZW50czp7XG4gICAgICBcImN1LWN1c3RvbVwiOiBcIi9jb2xvcnVpL2NvbXBvbmVudHMvY3UtY3VzdG9tXCIsXG4gICAgfSxcbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgc2VydmVyVXJsOiBcImh0dHBzOi8vd3d3LmthaWdlc3R1ZHkudG9wOjgwODBcIixcbiAgfVxuICBcbiAgb25MYXVuY2goKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgLy/mo4Dmn6VzZXNzaW9uaWTmmK/lkKbov4fmnJ9cbiAgICBzZWxmLm9uQ2hlY2tTZXNzaW9uVGltZW91dCgpXG5cbiAgICBpZih3ZXB5LmdldFN0b3JhZ2VTeW5jKFwic2Vzc2lvblVzZXJJbmZvXCIpKXtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJzZXNzaW9uVXNlckluZm9cIilcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IG51bGxcbiAgICB9XG4gICAgXG4gIH1cblxuICAvL+ajgOafpXNlc3Npb25pZOaYr+WQpui/h+acn+eahOaWueazlVxuICBvbkNoZWNrU2Vzc2lvblRpbWVvdXQoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgY29uc29sZS5sb2coXCJjaGVja2luZyBzZXNzaW9uXCIpXG4gICAgY29uc3QgU0VTU0lPTl9USU1FT1VUID0gMyAqIDYwICogNjAgKiAxMDAwIC8v55m76ZmG54q25oCB5pyJ5pWI5pe26Ze05Li6M+Wwj+aXtlxuICAgIGxldCBzZXNzaW9uVG9rZW4gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFwic2Vzc2lvblRva2VuXCIpXG4gICAgbGV0IHNlc3Npb25UaW1lID0gd2VweS5nZXRTdG9yYWdlU3luYyhcInNlc3Npb25EYXRlXCIpXG5cbiAgICBpZiAoc2Vzc2lvblRva2VuID09IG51bGwgfHwgc2Vzc2lvblRva2VuID09IHVuZGVmaW5lZCB8fCBzZXNzaW9uVG9rZW4gPT0gXCJcInx8c2Vzc2lvblRpbWUgPT0gbnVsbCB8fCBzZXNzaW9uVGltZSA9PSB1bmRlZmluZWQgfHwgc2Vzc2lvblRpbWUgPT0gXCJcIikge1xuICAgICAgY29uc29sZS5sb2coXCJzZXNzaW9uIGlzIGVtcHR5XCIpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgYWZ0ZXJ0aW1lc3RhbXAgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkpXG4gICAgaWYgKGFmdGVydGltZXN0YW1wIC0gc2Vzc2lvblRpbWUgPj0gU0VTU0lPTl9USU1FT1VUKSB7XG4gICAgICAvLyDov4fmnJ/lkI7muIXpmaRzZXNzaW9u57yT5a2YXG4gICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKFwic2Vzc2lvblRva2VuXCIpXG4gICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKFwic2Vzc2lvbkRhdGVcIilcbiAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoXCJzZXNzaW9uVXNlckluZm9cIilcbiAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZlIHNlc3Npb24hXCIpXG4gICAgfVxuICB9XG5cbiAgc2xlZXAgKHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoJ3Byb21pc2UgcmVzb2x2ZWQnKVxuICAgICAgfSwgcyAqIDEwMDApXG4gICAgfSlcbiAgfVxuXG5cbiAgLy8g6K6+572u5bim5pyJY29va2ll55qEcmVxdWVzdCBoZWFkZXLvvIzmr4/mrKFyZXF1ZXN06YO95bim6L+Z5LiqaGVhZGVyXG4gIHNldEhlYWRlcigpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBsZXQgaGVhZGVyID0ge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICdUVFRva2VuJzogd2VweS5nZXRTdG9yYWdlU3luYyhcInNlc3Npb25Ub2tlblwiKSAvL+ivu+WPluacrOWcsOS/neWtmOWlveeahOS4iuS4gOasoWNvb2tpZVxuICAgIH07XG4gICAgcmV0dXJuIGhlYWRlclxuICB9XG5cbn1cbiJdfQ==