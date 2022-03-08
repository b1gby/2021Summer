'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_wepy$page) {
    _inherits(Login, _wepy$page);

    function Login() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Login);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            usingComponents: {}
        }, _this.data = {
            icon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=miniprogram_icon.png'
        }, _this.methods = {
            formSubmit: function formSubmit(e) {
                var self = this;

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/login/student_login',
                    method: 'GET',
                    data: {
                        username: e.detail.value.username,
                        password: e.detail.value.password
                    },
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            if (res.data.Msg == "Student login success!") {
                                _wepy2.default.setStorageSync("sessionDate", Date.parse(new Date()));
                                _wepy2.default.setStorageSync("sessionToken", res.data.Data["token"]);
                                _wepy2.default.setStorageSync("sessionUserInfo", res.data.Data["userinfo"]);
                                _wepy2.default.$instance.globalData.userInfo = res.data.Data["userinfo"];
                                console.log("login success");
                                self.$apply();
                                setTimeout(function () {
                                    _wepy2.default.navigateBack({ delta: 1 });
                                }, 1000);
                            }
                        } else if (res.data.Code == 2) {
                            if (res.data.Msg == "Password not correct!") {
                                wx.showToast({
                                    title: '密码错误', //提示的内容,
                                    icon: 'error', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            } else if (res.data.Msg == "Name not exist!") {
                                wx.showToast({
                                    title: '用户名不存在', //提示的内容,
                                    icon: 'error', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            }
                        }
                    }
                });
            },
            gotoRegister: function gotoRegister() {
                this.$navigate({ url: "register" });
            },
            inputChange: function inputChange(e) {
                var self = this;
                self.userinfo[e.currentTarget.dataset.name] = e.detail.value.trim();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Login, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwidXNpbmdDb21wb25lbnRzIiwiZGF0YSIsImljb24iLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm1ldGhvZHMiLCJmb3JtU3VibWl0IiwiZSIsInNlbGYiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwidXNlcm5hbWUiLCJkZXRhaWwiLCJ2YWx1ZSIsInBhc3N3b3JkIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJDb2RlIiwiTXNnIiwic2V0U3RvcmFnZVN5bmMiLCJEYXRlIiwicGFyc2UiLCJEYXRhIiwidXNlckluZm8iLCIkYXBwbHkiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwibWFzayIsImdvdG9SZWdpc3RlciIsIiRuYXZpZ2F0ZSIsImlucHV0Q2hhbmdlIiwidXNlcmluZm8iLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm5hbWUiLCJ0cmltIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsNkJBQWlCO0FBRFosUyxRQU1UQyxJLEdBQUs7QUFDREMsa0JBQUtDLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0M7QUFEMUMsUyxRQUlMQyxPLEdBQVU7QUFFTkMsc0JBRk0sc0JBRUtDLENBRkwsRUFFTztBQUNULG9CQUFJQyxPQUFPLElBQVg7O0FBRUFQLCtCQUFLUSxPQUFMLENBQWE7QUFDVEMseUJBQUlULGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsMEJBRGpDO0FBRVRPLDRCQUFPLEtBRkU7QUFHVFosMEJBQUs7QUFDRGEsa0NBQVNMLEVBQUVNLE1BQUYsQ0FBU0MsS0FBVCxDQUFlRixRQUR2QjtBQUVERyxrQ0FBU1IsRUFBRU0sTUFBRixDQUFTQyxLQUFULENBQWVDO0FBRnZCLHFCQUhJO0FBT1RDLDZCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJDLGdDQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQSw0QkFBR0EsSUFBSWxCLElBQUosQ0FBU3FCLElBQVQsSUFBaUIsQ0FBcEIsRUFBdUI7QUFDbkIsZ0NBQUlILElBQUlsQixJQUFKLENBQVNzQixHQUFULElBQWdCLHdCQUFwQixFQUE2QztBQUN6Q3BCLCtDQUFLcUIsY0FBTCxDQUFvQixhQUFwQixFQUFtQ0MsS0FBS0MsS0FBTCxDQUFXLElBQUlELElBQUosRUFBWCxDQUFuQztBQUNBdEIsK0NBQUtxQixjQUFMLENBQW9CLGNBQXBCLEVBQW1DTCxJQUFJbEIsSUFBSixDQUFTMEIsSUFBVCxDQUFjLE9BQWQsQ0FBbkM7QUFDQXhCLCtDQUFLcUIsY0FBTCxDQUFvQixpQkFBcEIsRUFBc0NMLElBQUlsQixJQUFKLENBQVMwQixJQUFULENBQWMsVUFBZCxDQUF0QztBQUNBeEIsK0NBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQnVCLFFBQTFCLEdBQXFDVCxJQUFJbEIsSUFBSixDQUFTMEIsSUFBVCxDQUFjLFVBQWQsQ0FBckM7QUFDQVAsd0NBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0FYLHFDQUFLbUIsTUFBTDtBQUNBQywyQ0FBVyxZQUFZO0FBQ25CM0IsbURBQUs0QixZQUFMLENBQWtCLEVBQUNDLE9BQU0sQ0FBUCxFQUFsQjtBQUNILGlDQUZELEVBRUcsSUFGSDtBQUdIO0FBRUoseUJBYkQsTUFhTSxJQUFHYixJQUFJbEIsSUFBSixDQUFTcUIsSUFBVCxJQUFpQixDQUFwQixFQUFzQjtBQUN4QixnQ0FBR0gsSUFBSWxCLElBQUosQ0FBU3NCLEdBQVQsSUFBZ0IsdUJBQW5CLEVBQTJDO0FBQ3ZDVSxtQ0FBR0MsU0FBSCxDQUFhO0FBQ1hDLDJDQUFPLE1BREksRUFDSTtBQUNmakMsMENBQU0sT0FGSyxFQUVJO0FBQ2ZrQywwQ0FBTSxJQUhLLEVBR0M7QUFDWmxCLDZDQUFTLHNCQUFPLENBQUU7QUFKUCxpQ0FBYjtBQU1ILDZCQVBELE1BT08sSUFBR0MsSUFBSWxCLElBQUosQ0FBU3NCLEdBQVQsSUFBZ0IsaUJBQW5CLEVBQXFDO0FBQ3hDVSxtQ0FBR0MsU0FBSCxDQUFhO0FBQ1hDLDJDQUFPLFFBREksRUFDTTtBQUNqQmpDLDBDQUFNLE9BRkssRUFFSTtBQUNma0MsMENBQU0sSUFISyxFQUdDO0FBQ1psQiw2Q0FBUyxzQkFBTyxDQUFFO0FBSlAsaUNBQWI7QUFNSDtBQUNKO0FBQ0o7QUF2Q1EsaUJBQWI7QUF5Q0gsYUE5Q0s7QUFnRE5tQix3QkFoRE0sMEJBZ0RTO0FBQ1gscUJBQUtDLFNBQUwsQ0FBZSxFQUFDMUIsS0FBSSxVQUFMLEVBQWY7QUFDSCxhQWxESztBQW9ETjJCLHVCQXBETSx1QkFvRE05QixDQXBETixFQW9EUztBQUNYLG9CQUFJQyxPQUFPLElBQVg7QUFDQUEscUJBQUs4QixRQUFMLENBQWMvQixFQUFFZ0MsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLElBQXRDLElBQThDbEMsRUFBRU0sTUFBRixDQUFTQyxLQUFULENBQWU0QixJQUFmLEVBQTlDO0FBQ0g7QUF2REssUzs7Ozs7aUNBMkRELENBR1I7Ozs7RUF6RThCekMsZUFBSzBDLEk7O2tCQUFuQi9DLEsiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgd2VweS5wYWdle1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkYXRhPXtcclxuICAgICAgICBpY29uOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1taW5pcHJvZ3JhbV9pY29uLnBuZycsXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBcclxuICAgICAgICBmb3JtU3VibWl0KGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvbG9naW4vc3R1ZGVudF9sb2dpbicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTplLmRldGFpbC52YWx1ZS51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDplLmRldGFpbC52YWx1ZS5wYXNzd29yZCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuQ29kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Nc2cgPT0gXCJTdHVkZW50IGxvZ2luIHN1Y2Nlc3MhXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcInNlc3Npb25EYXRlXCIsIERhdGUucGFyc2UobmV3IERhdGUoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFwic2Vzc2lvblRva2VuXCIscmVzLmRhdGEuRGF0YVtcInRva2VuXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcInNlc3Npb25Vc2VySW5mb1wiLHJlcy5kYXRhLkRhdGFbXCJ1c2VyaW5mb1wiXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMuZGF0YS5EYXRhW1widXNlcmluZm9cIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gc3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe2RlbHRhOjF9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihyZXMuZGF0YS5Db2RlID09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5Nc2cgPT0gXCJQYXNzd29yZCBub3QgY29ycmVjdCFcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WvhueggemUmeivrycsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihyZXMuZGF0YS5Nc2cgPT0gXCJOYW1lIG5vdCBleGlzdCFcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+eUqOaIt+WQjeS4jeWtmOWcqCcsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ290b1JlZ2lzdGVyKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7dXJsOlwicmVnaXN0ZXJcIn0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5wdXRDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi51c2VyaW5mb1tlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXSA9IGUuZGV0YWlsLnZhbHVlLnRyaW0oKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==