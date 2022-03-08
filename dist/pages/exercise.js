'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _panel = require('./../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// alias example

var Exercise = function (_wepy$page) {
    _inherits(Exercise, _wepy$page);

    function Exercise() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Exercise);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Exercise.__proto__ || Object.getPrototypeOf(Exercise)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            usingComponents: {
                "mp-dialog": "/miniprogram_npm/weui-miniprogram/dialog/dialog",
                "mp-gallery": "weui-miniprogram/gallery/gallery"
            }

        }, _this.components = {
            panel: _panel2.default
        }, _this.data = {
            Sid: null,
            exerciseList: [],
            index: 0,
            answer: [],
            showOneButtonDialog: false,
            oneButton: [{ text: '确定' }],
            inputDisabled: null,
            imageUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            audioUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_audio?name=',
            imageListOfName: [],
            imageListOfAnswer: []
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
            clickLast: function clickLast() {
                var self = this;
                if (self.index != 0) {
                    self.index--;
                } else {
                    _wepy2.default.showToast({
                        title: '这是第一道题', //提示的内容,
                        icon: 'none', //图标,
                        duration: 2000, //延迟时间,
                        mask: true, //显示透明蒙层，防止触摸穿透,
                        success: function success(res) {}
                    });
                }
            },
            clickNext: function clickNext() {
                var self = this;
                if (self.index != self.exerciseList.length - 1) {
                    self.index++;
                } else {
                    _wepy2.default.showToast({
                        title: '已经是最后一题啦', //提示的内容,
                        icon: 'none', //图标,
                        duration: 2000, //延迟时间,
                        mask: true, //显示透明蒙层，防止触摸穿透,
                        success: function success(res) {}
                    });
                }
            },
            clickSubmit: function clickSubmit() {
                var self = this;

                // 检查题目是否全部完成
                var allSubmit = true;
                for (var i = 0; i < self.exerciseList.length; i++) {
                    if (self.exerciseList[i]['Answer'] == "") {
                        allSubmit = false;
                    }
                }

                if (allSubmit) {
                    self.showOneButtonDialog = true;
                    return;
                }

                var newData = {
                    answer: JSON.stringify(self.answer)

                    //清空答对题数目
                };self.rightNum = 0;

                var sendAnswer = {};
                for (var _i = 0; _i < self.exerciseList.length; _i++) {
                    sendAnswer[self.exerciseList[_i]['Exercise'].Eid] = self.answer[_i];
                }
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/today/judge_today_exercise',
                    method: 'GET',
                    data: {
                        "Sid": self.Sid,
                        "SendAnswer": sendAnswer
                    },
                    success: function success(res) {
                        wx.showToast({
                            title: "提交成功"
                        });
                        self.getTodayExercise();
                    }
                });
            },
            clickAskQuestion: function clickAskQuestion() {
                var self = this;

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/student/insert_ask_question',
                    method: 'POST',
                    data: {
                        "Sid": Number(self.Sid),
                        "Eid": Number(self.exerciseList[self.index]['Exercise'].Eid)
                    },
                    success: function success(res) {
                        wx.showToast({
                            title: "提问成功"
                        });
                    }
                });
            },
            tapDialogButton: function tapDialogButton(e) {
                var self = this;
                self.showOneButtonDialog = false;
            },
            inputChange: function inputChange(e) {
                var self = this;
                self.answer[self.index] = e.detail.value.trim();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Exercise, [{
        key: 'getTodayExercise',
        value: function getTodayExercise() {
            var self = this;
            var today = new Date();
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/today/get_today_exercise',
                data: {
                    Sid: self.Sid,
                    Date: today.toLocaleDateString()
                },
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code != 2 && res.data.Msg != "No exercise!") {
                        self.exerciseList = res.data.Data;
                        self.inputDisabled = new Array(self.exerciseList.length);

                        for (var i = 0; i < self.exerciseList.length; i++) {
                            if (self.exerciseList[i]['Exercise'].EnamePath != "") {
                                var tmpList = self.exerciseList[i]['Exercise'].EnamePath.split(";");
                                self.imageListOfName = tmpList.map(function (x) {
                                    return self.imageUrl + x;
                                });
                            }
                            if (self.exerciseList[i]['Exercise'].EanswerPath != "") {
                                var _tmpList = self.exerciseList[i]['Exercise'].EanswerPath.split(";");
                                self.imageListOfAnswer = _tmpList.map(function (x) {
                                    return self.imageUrl + x;
                                });
                            }
                            if (self.exerciseList[i]["Answer"] != "") {
                                self.inputDisabled[i] = true;
                            } else {
                                self.inputDisabled[i] = false;
                            }
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

            self.Sid = options.sid;

            self.getTodayExercise();
        }
    }]);

    return Exercise;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Exercise , 'pages/exercise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4ZXJjaXNlLmpzIl0sIm5hbWVzIjpbIkV4ZXJjaXNlIiwiY29uZmlnIiwidXNpbmdDb21wb25lbnRzIiwiY29tcG9uZW50cyIsInBhbmVsIiwiUGFuZWwiLCJkYXRhIiwiU2lkIiwiZXhlcmNpc2VMaXN0IiwiaW5kZXgiLCJhbnN3ZXIiLCJzaG93T25lQnV0dG9uRGlhbG9nIiwib25lQnV0dG9uIiwidGV4dCIsImlucHV0RGlzYWJsZWQiLCJpbWFnZVVybCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwiYXVkaW9VcmwiLCJpbWFnZUxpc3RPZk5hbWUiLCJpbWFnZUxpc3RPZkFuc3dlciIsIm1ldGhvZHMiLCJWaWV3SW1hZ2VPZk5hbWUiLCJlIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInVybCIsInd4IiwicHJldmlld0ltYWdlIiwidXJscyIsImN1cnJlbnQiLCJWaWV3SW1hZ2VPZkFuc3dlciIsImNsaWNrTGFzdCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwibWFzayIsInN1Y2Nlc3MiLCJjbGlja05leHQiLCJsZW5ndGgiLCJjbGlja1N1Ym1pdCIsImFsbFN1Ym1pdCIsImkiLCJuZXdEYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJpZ2h0TnVtIiwic2VuZEFuc3dlciIsIkVpZCIsInJlcXVlc3QiLCJtZXRob2QiLCJyZXMiLCJnZXRUb2RheUV4ZXJjaXNlIiwiY2xpY2tBc2tRdWVzdGlvbiIsIk51bWJlciIsInRhcERpYWxvZ0J1dHRvbiIsImlucHV0Q2hhbmdlIiwiZGV0YWlsIiwidmFsdWUiLCJ0cmltIiwidG9kYXkiLCJEYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwiQ29kZSIsIk1zZyIsIkRhdGEiLCJBcnJheSIsIkVuYW1lUGF0aCIsInRtcExpc3QiLCJzcGxpdCIsIm1hcCIsIngiLCJFYW5z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QUFBQSxpQ0FBWixDQUF6QjtBQUNIO0FBQ0QsZ0NBQUdyRCxLQUFLbEIsWUFBTCxDQUFrQndDLENBQWxCLEVBQXFCLFFBQXJCLEtBQWtDLEVBQXJDLEVBQXdDO0FBQ3BDdEIscUNBQUtaLGFBQUwsQ0FBbUJrQyxDQUFuQixJQUF3QixJQUF4QjtBQUNILDZCQUZELE1BRU07QUFDRnRCLHFDQUFLWixhQUFMLENBQW1Ca0MsQ0FBbkIsSUFBd0IsS0FBeEI7QUFDSDtBQUNKO0FBQ0R0Qiw2QkFBS3VELE1BQUw7QUFDSDtBQUdKO0FBakNRLGFBQWI7QUFtQ0g7OzsrQkFFTUMsTyxFQUFTO0FBQ1osZ0JBQUl4RCxPQUFPLElBQVg7O0FBRUFBLGlCQUFLbkIsR0FBTCxHQUFXMkUsUUFBUUMsR0FBbkI7O0FBRUF6RCxpQkFBS2dDLGdCQUFMO0FBQ0g7Ozs7RUFwTWlDMUMsZUFBS29FLEk7O2tCQUF0QnBGLFEiLCJmaWxlIjoiZXhlcmNpc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFBhbmVsIGZyb20gJ0AvY29tcG9uZW50cy9wYW5lbCcgLy8gYWxpYXMgZXhhbXBsZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhlcmNpc2UgZXh0ZW5kcyB3ZXB5LnBhZ2V7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICAgICAgIFwibXAtZGlhbG9nXCI6IFwiL21pbmlwcm9ncmFtX25wbS93ZXVpLW1pbmlwcm9ncmFtL2RpYWxvZy9kaWFsb2dcIixcclxuICAgICAgICAgICAgXCJtcC1nYWxsZXJ5XCI6IFwid2V1aS1taW5pcHJvZ3JhbS9nYWxsZXJ5L2dhbGxlcnlcIixcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIHBhbmVsOiBQYW5lbFxyXG4gICAgfVxyXG5cclxuICAgIGRhdGE9e1xyXG4gICAgICAgIFNpZDogbnVsbCxcclxuICAgICAgICBleGVyY2lzZUxpc3Q6IFtdLFxyXG4gICAgICAgIGluZGV4OiAwLFxyXG4gICAgICAgIGFuc3dlcjogW10sXHJcbiAgICAgICAgc2hvd09uZUJ1dHRvbkRpYWxvZzogZmFsc2UsXHJcbiAgICAgICAgb25lQnV0dG9uOiBbe3RleHQ6ICfnoa7lrponfV0sXHJcbiAgICAgICAgaW5wdXREaXNhYmxlZDpudWxsLFxyXG4gICAgICAgIGltYWdlVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT0nLFxyXG4gICAgICAgIGF1ZGlvVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfYXVkaW8/bmFtZT0nLFxyXG4gICAgICAgIGltYWdlTGlzdE9mTmFtZTogW10sXHJcbiAgICAgICAgaW1hZ2VMaXN0T2ZBbnN3ZXI6IFtdLFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgVmlld0ltYWdlT2ZOYW1lKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYuaW1hZ2VVcmwgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmwpXHJcbiAgICAgICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICB1cmxzOiBzZWxmLmltYWdlTGlzdE9mTmFtZSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHNlbGYuaW1hZ2VVcmwgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgVmlld0ltYWdlT2ZBbnN3ZXIoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5pbWFnZVVybCArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybClcclxuICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIHVybHM6IHNlbGYuaW1hZ2VMaXN0T2ZBbnN3ZXIsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBzZWxmLmltYWdlVXJsICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsaWNrTGFzdCgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgaWYoc2VsZi5pbmRleCE9MCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmluZGV4LS07XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+i/meaYr+esrOS4gOmBk+mimCcsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbGlja05leHQoKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaW5kZXghPXNlbGYuZXhlcmNpc2VMaXN0Lmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuaW5kZXgrKztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5bey57uP5piv5pyA5ZCO5LiA6aKY5ZWmJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvL+W7tui/n+aXtumXtCxcclxuICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsaWNrU3VibWl0KCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyDmo4Dmn6Xpopjnm67mmK/lkKblhajpg6jlrozmiJBcclxuICAgICAgICAgICAgbGV0IGFsbFN1Ym1pdCA9IHRydWVcclxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8c2VsZi5leGVyY2lzZUxpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLmV4ZXJjaXNlTGlzdFtpXVsnQW5zd2VyJ109PVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFN1Ym1pdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGFsbFN1Ym1pdCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dPbmVCdXR0b25EaWFsb2cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdEYXRhID17XHJcbiAgICAgICAgICAgICAgICBhbnN3ZXI6SlNPTi5zdHJpbmdpZnkoc2VsZi5hbnN3ZXIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v5riF56m6562U5a+56aKY5pWw55uuXHJcbiAgICAgICAgICAgIHNlbGYucmlnaHROdW0gPSAwXHJcblxyXG4gICAgICAgICAgICBsZXQgc2VuZEFuc3dlciA9IHt9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8c2VsZi5leGVyY2lzZUxpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBzZW5kQW5zd2VyW3NlbGYuZXhlcmNpc2VMaXN0W2ldWydFeGVyY2lzZSddLkVpZF0gPSBzZWxmLmFuc3dlcltpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC90b2RheS9qdWRnZV90b2RheV9leGVyY2lzZScsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJTaWRcIjogc2VsZi5TaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTZW5kQW5zd2VyXCI6c2VuZEFuc3dlcixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOlwi5o+Q5Lqk5oiQ5YqfXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0VG9kYXlFeGVyY2lzZSgpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsaWNrQXNrUXVlc3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvc3R1ZGVudC9pbnNlcnRfYXNrX3F1ZXN0aW9uJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJTaWRcIjogTnVtYmVyKHNlbGYuU2lkKSxcclxuICAgICAgICAgICAgICAgICAgICBcIkVpZFwiOiBOdW1iZXIoc2VsZi5leGVyY2lzZUxpc3Rbc2VsZi5pbmRleF1bJ0V4ZXJjaXNlJ10uRWlkKSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOlwi5o+Q6Zeu5oiQ5YqfXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0YXBEaWFsb2dCdXR0b24oZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNlbGYuc2hvd09uZUJ1dHRvbkRpYWxvZyA9IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5wdXRDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5hbnN3ZXJbc2VsZi5pbmRleF0gPSBlLmRldGFpbC52YWx1ZS50cmltKCkgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG9kYXlFeGVyY2lzZSgpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKClcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC90b2RheS9nZXRfdG9kYXlfZXhlcmNpc2UnLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgIFNpZDpzZWxmLlNpZCxcclxuICAgICAgICAgICAgICAgIERhdGU6dG9kYXkudG9Mb2NhbGVEYXRlU3RyaW5nKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLkNvZGUgIT0gMiAmJiByZXMuZGF0YS5Nc2cgIT0gXCJObyBleGVyY2lzZSFcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5leGVyY2lzZUxpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnB1dERpc2FibGVkID0gbmV3IEFycmF5KHNlbGYuZXhlcmNpc2VMaXN0Lmxlbmd0aClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxzZWxmLmV4ZXJjaXNlTGlzdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5leGVyY2lzZUxpc3RbaV1bJ0V4ZXJjaXNlJ10uRW5hbWVQYXRoIT1cIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0bXBMaXN0ID0gc2VsZi5leGVyY2lzZUxpc3RbaV1bJ0V4ZXJjaXNlJ10uRW5hbWVQYXRoLnNwbGl0KFwiO1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWFnZUxpc3RPZk5hbWUgPSB0bXBMaXN0Lm1hcCh4ID0+IHNlbGYuaW1hZ2VVcmwgKyB4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZXhlcmNpc2VMaXN0W2ldWydFeGVyY2lzZSddLkVhbnN3ZXJQYXRoIT1cIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0bXBMaXN0ID0gc2VsZi5leGVyY2lzZUxpc3RbaV1bJ0V4ZXJjaXNlJ10uRWFuc3dlclBhdGguc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltYWdlTGlzdE9mQW5zd2VyID0gdG1wTGlzdC5tYXAoeCA9PiBzZWxmLmltYWdlVXJsICsgeClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmV4ZXJjaXNlTGlzdFtpXVtcIkFuc3dlclwiXSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW5wdXREaXNhYmxlZFtpXSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnB1dERpc2FibGVkW2ldID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBzZWxmLlNpZCA9IG9wdGlvbnMuc2lkXHJcbiAgICAgICAgXHJcbiAgICAgICAgc2VsZi5nZXRUb2RheUV4ZXJjaXNlKClcclxuICAgIH0gXHJcbn1cclxuIl19