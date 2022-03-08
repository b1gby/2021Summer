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

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            usingComponents: {}
        }, _this.data = {
            Wid: 0,
            Sname: "",
            wrongProblem: {},
            imageUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            audioUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_audio?name=',
            imageListOfName: [],
            imageListOfAnswer: [],
            imageListOfMyAnswer: []
        }, _this.methods = {
            ViewImageOfName: function ViewImageOfName(e) {
                var self = this;
                console.log(self.imageUrl + e.currentTarget.dataset.url);
                wx.previewImage({
                    urls: self.imageListOfName,
                    current: self.imageUrl + e.currentTarget.dataset.url
                });
            },
            ViewImageOfAnswer: function ViewImageOfAnswer(e) {
                var self = this;
                console.log(self.imageUrl + e.currentTarget.dataset.url);
                wx.previewImage({
                    urls: self.imageListOfAnswer,
                    current: self.imageUrl + e.currentTarget.dataset.url
                });
            },
            ViewImageOfMyAnswer: function ViewImageOfMyAnswer(e) {
                var self = this;
                console.log(self.imageUrl + e.currentTarget.dataset.url);
                wx.previewImage({
                    urls: self.imageListOfMyAnswer,
                    current: self.imageUrl + e.currentTarget.dataset.url
                });
            },
            onClickEditWrongProblem: function onClickEditWrongProblem(e) {
                var self = this;
                wx.navigateTo({
                    url: "edit-wrongproblem?wid=" + self.wrongProblem.Wid
                });
            },
            onClickDeleteWrongProblem: function onClickDeleteWrongProblem() {
                var self = this;
                wx.showModal({
                    title: '删除错题',
                    content: '确定要删除此错题？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function success(res) {
                        if (res.confirm) {
                            _wepy2.default.request({
                                url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/delete_wrong_problem/:id' + '?Wid=' + self.wrongProblem.Wid.toString(),
                                method: 'DELETE',
                                header: _wepy2.default.$instance.setHeader(),
                                success: function success(res) {
                                    console.log(res);
                                    if (res.data.Code == 1) {
                                        _wepy2.default.showToast({
                                            title: '删除成功', //提示的内容,
                                            icon: 'success', //图标,
                                            duration: 2000, //延迟时间,
                                            mask: true, //显示透明蒙层，防止触摸穿透,
                                            success: function success() {
                                                setTimeout(function () {
                                                    _wepy2.default.navigateBack({
                                                        delta: 1
                                                    });
                                                }, 1000);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'getWrongProblem',
        value: function getWrongProblem() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/get_wrong_problem',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Wid: self.Wid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.wrongProblem = res.data.Data;
                        if (res.data.Data.WproblemPath != "") {
                            var tmpList = res.data.Data.WproblemPath.split(";");
                            self.imageListOfName = tmpList.map(function (x) {
                                return self.imageUrl + x;
                            });
                        }
                        if (res.data.Data.WanswerPath != "") {
                            var _tmpList = res.data.Data.WanswerPath.split(";");
                            self.imageListOfAnswer = _tmpList.map(function (x) {
                                return self.imageUrl + x;
                            });
                        }
                        if (res.data.Data.WmyAnswerPath != "") {
                            var _tmpList2 = res.data.Data.WmyAnswerPath.split(";");
                            self.imageListOfMyAnswer = _tmpList2.map(function (x) {
                                return self.imageUrl + x;
                            });
                        }
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var self = this;

            self.Wid = options.wid;
            self.Sname = options.sname;
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;
            self.getWrongProblem();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/wrongproblem-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndyb25ncHJvYmxlbS1kZXRhaWwuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJkYXRhIiwiV2lkIiwiU25hbWUiLCJ3cm9uZ1Byb2JsZW0iLCJpbWFnZVVybCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwiYXVkaW9VcmwiLCJpbWFnZUxpc3RPZk5hbWUiLCJpbWFnZUxpc3RPZkFuc3dlciIsImltYWdlTGlzdE9mTXlBbnN3ZXIiLCJtZXRob2RzIiwiVmlld0ltYWdlT2ZOYW1lIiwiZSIsInNlbGYiLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ1cmwiLCJ3eCIsInByZXZpZXdJbWFnZSIsInVybHMiLCJjdXJyZW50IiwiVmlld0ltYWdlT2ZBbnN3ZXIiLCJWaWV3SW1hZ2VPZk15QW5zd2VyIiwib25DbGlja0VkaXRXcm9uZ1Byb2JsZW0iLCJuYXZpZ2F0ZVRvIiwib25DbGlja0RlbGV0ZVdyb25nUHJvYmxlbSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNhbmNlbFRleHQiLCJjb25maXJtVGV4dCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwicmVxdWVzdCIsInRvU3RyaW5nIiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwiQ29kZSIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsIm1hc2siLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJEYXRhIiwiV3Byb2JsZW1QYXRoIiwidG1wTGlzdCIsInNwbGl0IiwibWFwIiwieCIsIldhbnN3ZXJQYXRoIiwiV215QW5zd2VyUGF0aCIsIiRhcHBseSIsIm9wdGlvbnMiLCJ3aWQiLCJzbmFtZSIsImdldFdyb25nUHJvYmxlbSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7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R3BCLElBQUlyQyxJQUFKLENBQVNvRCxJQUFULENBQWNNLFdBQWQsSUFBMkIsRUFBOUIsRUFBaUM7QUFDN0IsZ0NBQUlKLFdBQVVqQixJQUFJckMsSUFBSixDQUFTb0QsSUFBVCxDQUFjTSxXQUFkLENBQTBCSCxLQUExQixDQUFnQyxHQUFoQyxDQUFkO0FBQ0F2QyxpQ0FBS0wsaUJBQUwsR0FBeUIyQyxTQUFRRSxHQUFSLENBQVk7QUFBQSx1Q0FBS3hDLEtBQUtaLFFBQUwsR0FBZ0JxRCxDQUFyQjtBQUFBLDZCQUFaLENBQXpCO0FBQ0g7QUFDRCw0QkFBR3BCLElBQUlyQyxJQUFKLENBQVNvRCxJQUFULENBQWNPLGFBQWQsSUFBNkIsRUFBaEMsRUFBbUM7QUFDL0IsZ0NBQUlMLFlBQVVqQixJQUFJckMsSUFBSixDQUFTb0QsSUFBVCxDQUFjTyxhQUFkLENBQTRCSixLQUE1QixDQUFrQyxHQUFsQyxDQUFkO0FBQ0F2QyxpQ0FBS0osbUJBQUwsR0FBMkIwQyxVQUFRRSxHQUFSLENBQVk7QUFBQSx1Q0FBS3hDLEtBQUtaLFFBQUwsR0FBZ0JxRCxDQUFyQjtBQUFBLDZCQUFaLENBQTNCO0FBQ0g7QUFDRHpDLDZCQUFLNEMsTUFBTDtBQUNIO0FBQ0o7QUF6QkksYUFBYjtBQTJCSDs7OytCQUVNQyxPLEVBQVM7QUFDWixnQkFBSTdDLE9BQU8sSUFBWDs7QUFFQUEsaUJBQUtmLEdBQUwsR0FBVzRELFFBQVFDLEdBQW5CO0FBQ0E5QyxpQkFBS2QsS0FBTCxHQUFhMkQsUUFBUUUsS0FBckI7QUFFSDs7O2lDQUVPO0FBQ0osZ0JBQUkvQyxPQUFPLElBQVg7QUFDQUEsaUJBQUtnRCxlQUFMO0FBQ0g7Ozs7RUFySThCM0QsZUFBSzRELEk7O2tCQUFuQnBFLEsiLCJmaWxlIjoid3Jvbmdwcm9ibGVtLWRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHVzaW5nQ29tcG9uZW50czp7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgV2lkOjAsXHJcbiAgICAgICAgU25hbWU6XCJcIixcclxuICAgICAgICB3cm9uZ1Byb2JsZW06e30sXHJcbiAgICAgICAgaW1hZ2VVcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPScsXHJcbiAgICAgICAgYXVkaW9Vcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9hdWRpbz9uYW1lPScsXHJcbiAgICAgICAgaW1hZ2VMaXN0T2ZOYW1lOiBbXSxcclxuICAgICAgICBpbWFnZUxpc3RPZkFuc3dlcjogW10sXHJcbiAgICAgICAgaW1hZ2VMaXN0T2ZNeUFuc3dlcjogW10sXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBcclxuICAgICAgICBWaWV3SW1hZ2VPZk5hbWUoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5pbWFnZVVybCArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybClcclxuICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIHVybHM6IHNlbGYuaW1hZ2VMaXN0T2ZOYW1lLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudDogc2VsZi5pbWFnZVVybCArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBWaWV3SW1hZ2VPZkFuc3dlcihlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmltYWdlVXJsICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsKVxyXG4gICAgICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdXJsczogc2VsZi5pbWFnZUxpc3RPZkFuc3dlcixcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHNlbGYuaW1hZ2VVcmwgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgVmlld0ltYWdlT2ZNeUFuc3dlcihlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmltYWdlVXJsICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsKVxyXG4gICAgICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdXJsczogc2VsZi5pbWFnZUxpc3RPZk15QW5zd2VyLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudDogc2VsZi5pbWFnZVVybCArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrRWRpdFdyb25nUHJvYmxlbShlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOlwiZWRpdC13cm9uZ3Byb2JsZW0/d2lkPVwiK3NlbGYud3JvbmdQcm9ibGVtLldpZCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrRGVsZXRlV3JvbmdQcm9ibGVtKCl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTplJnpopgnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+ehruWumuimgeWIoOmZpOatpOmUmemimO+8nycsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxUZXh0OiAn5Y+W5raIJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC93cm9uZ19wcm9ibGVtL2RlbGV0ZV93cm9uZ19wcm9ibGVtLzppZCcgKyAnP1dpZD0nICsgc2VsZi53cm9uZ1Byb2JsZW0uV2lkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOaIkOWKnycsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvL+W7tui/n+aXtumXtCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFdyb25nUHJvYmxlbSgpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC93cm9uZ19wcm9ibGVtL2dldF93cm9uZ19wcm9ibGVtJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBXaWQ6c2VsZi5XaWQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndyb25nUHJvYmxlbSA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuRGF0YS5XcHJvYmxlbVBhdGghPVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRtcExpc3QgPSByZXMuZGF0YS5EYXRhLldwcm9ibGVtUGF0aC5zcGxpdChcIjtcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VMaXN0T2ZOYW1lID0gdG1wTGlzdC5tYXAoeCA9PiBzZWxmLmltYWdlVXJsICsgeClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5EYXRhLldhbnN3ZXJQYXRoIT1cIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0bXBMaXN0ID0gcmVzLmRhdGEuRGF0YS5XYW5zd2VyUGF0aC5zcGxpdChcIjtcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VMaXN0T2ZBbnN3ZXIgPSB0bXBMaXN0Lm1hcCh4ID0+IHNlbGYuaW1hZ2VVcmwgKyB4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLkRhdGEuV215QW5zd2VyUGF0aCE9XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wTGlzdCA9IHJlcy5kYXRhLkRhdGEuV215QW5zd2VyUGF0aC5zcGxpdChcIjtcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VMaXN0T2ZNeUFuc3dlciA9IHRtcExpc3QubWFwKHggPT4gc2VsZi5pbWFnZVVybCArIHgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICBzZWxmLldpZCA9IG9wdGlvbnMud2lkXHJcbiAgICAgICAgc2VsZi5TbmFtZSA9IG9wdGlvbnMuc25hbWVcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgc2VsZi5nZXRXcm9uZ1Byb2JsZW0oKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==