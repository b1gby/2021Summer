"use strict";

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
            "usingComponents": {
                "mp-slideview": "weui-miniprogram/slideview/slideview",
                "mp-dialog": "/miniprogram_npm/weui-miniprogram/dialog/dialog"
            }
        }, _this.data = {
            Sid: -1,
            student: {},
            wrongProblemList: null,
            exerciseField: null,
            activeTab: 0,
            screenCur: {
                subjectCur: 0,
                difficultyCur: 0,
                typeCur: 0,
                gradeCur: 0,
                unitCur: 0
            },
            difficultyColor: {
                "简单": "cyan",
                "中等": "olive",
                "困难": "pink",
                "竞赛": "black"
            },

            imageScreen: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/screen.png',
            modalName: "",
            slideButtons: [{
                type: 'warn',
                src: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/del.png'
            }],
            buttons: [{
                text: '取消'
            }, {
                text: '确定',
                extClass: 'DeleteButton'
            }],
            dialogShow: false,
            deleteIndex: -1,
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name='
        }, _this.methods = {
            onTabClick: function onTabClick(e) {
                var self = this;
                var index = e.detail.index;
                self.activeTab = index;
            },
            onTabChange: function onTabChange(e) {
                var self = this;
                var index = e.detail.index;
                self.activeTab = index;
            },
            tabSelectIndex: function tabSelectIndex(e) {
                var self = this;
                self.screenCur[e.currentTarget.dataset.name + "Cur"] = e.currentTarget.dataset.id;
                self.getSortedWrongProblem(self);
            },
            tabSelect: function tabSelect(e) {
                var self = this;
                self.screenCur[e.currentTarget.dataset.name + "Cur"] = e.currentTarget.dataset.id;
            },
            showModal: function showModal(e) {
                var self = this;
                self.modalName = e.currentTarget.dataset.target;
            },
            hideModal: function hideModal(e) {
                var self = this;
                self.modalName = null;
                self.getSortedWrongProblem();
            },
            slideButtonTap: function slideButtonTap(e) {
                var self = this;
                self.deleteIndex = e.currentTarget.dataset.index;
                self.dialogShow = true;
            },
            tapDeleteDialogButton: function tapDeleteDialogButton(e) {
                var self = this;
                self.dialogShow = false;
                if (e.detail.index == 1) {
                    self.deleteWrongProblem();
                }
            },
            onClickWrongProblem: function onClickWrongProblem(e) {
                var self = this;
                var exerciseIndex = e.currentTarget.dataset.id;
                wx.navigateTo({
                    url: "wrongproblem-detail?wid=" + self.wrongProblemList[exerciseIndex].Wid + "&sname=" + self.student.Snickname

                });
            },
            onClickCreateWrongProblem: function onClickCreateWrongProblem(e) {
                var self = this;
                wx.navigateTo({
                    url: "create-wrongproblem?sid=" + self.Sid
                });
            },
            inputChangeSearch: function inputChangeSearch(e) {
                var self = this;

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/user/common/search_wrong_problem',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    data: {
                        Sid: self.Sid,
                        word: e.detail.value
                    },
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            self.wrongProblemList = res.data.Data;
                            self.$apply();
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: "getWrongProblem",
        value: function getWrongProblem() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/get_wrong_problem_list',
                method: 'GET',
                data: {
                    Sid: self.Sid
                },
                header: _wepy2.default.$instance.setHeader(),
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.wrongProblemList = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: "getExerciseField",
        value: function getExerciseField() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/user/common/get_exercise_field',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.exerciseField = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: "getSortedWrongProblem",
        value: function getSortedWrongProblem() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/get_sorted_wrong_problem',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Sid: self.Sid,
                    subject: self.exerciseField.Esubject[self.screenCur.subjectCur],
                    type: self.exerciseField.Etype[self.exerciseField.Esubject[self.screenCur.subjectCur]][self.screenCur.typeCur],
                    unit: self.exerciseField.Eunit[self.exerciseField.Esubject[self.screenCur.subjectCur]][self.screenCur.unitCur],
                    difficulty: self.exerciseField.Edifficulty[self.screenCur.difficultyCur],
                    grade: self.exerciseField.Egrade[self.screenCur.gradeCur]
                },
                success: function success(res) {
                    if (res.data.Code == 1) {
                        self.wrongProblemList = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: "deleteWrongProblem",
        value: function deleteWrongProblem() {
            var self = this;
            if (self.deleteIndex == -1) return;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/delete_wrong_problem/:id' + '?Wid=' + self.wrongProblemList[self.deleteIndex].Wid.toString(),
                method: 'DELETE',
                header: _wepy2.default.$instance.setHeader(),
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        wx.showToast({
                            title: '删除成功'
                        });
                        self.getWrongProblem();
                        self.getExerciseField();
                    }
                }
            });
        }
    }, {
        key: "getStudentData",
        value: function getStudentData() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/student/get_student',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Sid: self.Sid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.student = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: "onLoad",
        value: function onLoad(options) {
            var self = this;
            console.log(options);

            self.Sid = options.sid;
        }
    }, {
        key: "onShow",
        value: function onShow(options) {
            var self = this;
            self.getWrongProblem();
            self.getExerciseField();
            self.getStudentData();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/wrongproblem'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndyb25ncHJvYmxlbS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsImRhdGEiLCJTaWQiLCJzdHVkZW50Iiwid3JvbmdQcm9ibGVtTGlzdCIsImV4ZXJjaXNlRmllbGQiLCJhY3RpdmVUYWIiLCJzY3JlZW5DdXIiLCJzdWJqZWN0Q3VyIiwiZGlmZmljdWx0eUN1ciIsInR5cGVDdXIiLCJncmFkZUN1ciIsInVuaXRDdXIiLCJkaWZmaWN1bHR5Q29sb3IiLCJpbWFnZVNjcmVlbiIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwibW9kYWxOYW1lIiwic2xpZGVCdXR0b25zIiwidHlwZSIsInNyYyIsImJ1dHRvbnMiLCJ0ZXh0IiwiZXh0Q2xhc3MiLCJkaWFsb2dTaG93IiwiZGVsZXRlSW5kZXgiLCJpbWdVcmwiLCJtZXRob2RzIiwib25UYWJDbGljayIsImUiLCJzZWxmIiwiaW5kZXgiLCJkZXRhaWwiLCJvblRhYkNoYW5nZSIsInRhYlNlbGVjdEluZGV4IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJuYW1lIiwiaWQiLCJnZXRTb3J0ZWRXcm9uZ1Byb2JsZW0iLCJ0YWJTZWxlY3QiLCJzaG93TW9kYWwiLCJ0YXJnZXQiLCJoaWRlTW9kYWwiLCJzbGlkZUJ1dHRvblRhcCIsInRhcERlbGV0ZURpYWxvZ0J1dHRvbiIsImRlbGV0ZVdyb25nUHJvYmxlbSIsIm9uQ2xpY2tXcm9uZ1Byb2JsZW0iLCJleGVyY2lzZUluZGV4Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiV2lkIiwiU25pY2tuYW1lIiwib25DbGlja0NyZWF0ZVdyb25nUHJvYmxlbSIsImlucHV0Q2hhbmdlU2VhcmNoIiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsInNldEhlYWRlciIsIndvcmQiLCJ2YWx1ZSIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiQ29kZSIsIkRhdGEiLCIkYXBwbHkiLCJzdWJqZWN0IiwiRXN1YmplY3QiLCJFdHlwZSIsInVuaXQiLCJFdW5pdCIsImRpZmZpY3VsdHkiLCJFZGlmZmljdWx0eSIsImdyYWRlIiwiRWdyYWRlIiwidG9TdHJpbmciLCJzaG93VG9hc3QiLCJ0aXRsZSIsImdldFdyb25nUHJvYmxlbSIsImdldEV4ZXJjaXNlRmllbGQiLCJvcHRpb25zIiwic2lkIiwiZ2V0U3R1ZGVudERhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMLCtCQUFtQjtBQUNmLGdDQUFnQixzQ0FERDtBQUVmLDZCQUFhO0FBRkU7QUFEZCxTLFFBT1RDLEksR0FBSztBQUNEQyxpQkFBTSxDQUFDLENBRE47QUFFREMscUJBQVMsRUFGUjtBQUdEQyw4QkFBbUIsSUFIbEI7QUFJREMsMkJBQWdCLElBSmY7QUFLREMsdUJBQVcsQ0FMVjtBQU1EQyx1QkFBVztBQUNQQyw0QkFBWSxDQURMO0FBRVBDLCtCQUFlLENBRlI7QUFHUEMseUJBQVEsQ0FIRDtBQUlQQywwQkFBVSxDQUpIO0FBS1BDLHlCQUFTO0FBTEYsYUFOVjtBQWFEQyw2QkFBZ0I7QUFDWixzQkFBSyxNQURPO0FBRVosc0JBQUssT0FGTztBQUdaLHNCQUFLLE1BSE87QUFJWixzQkFBSztBQUpPLGFBYmY7O0FBb0JEQyx5QkFBWUMsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQywwQ0FwQmpEO0FBcUJEQyx1QkFBWSxFQXJCWDtBQXNCREMsMEJBQWMsQ0FBQztBQUNQQyxzQkFBTSxNQURDO0FBRVBDLHFCQUFJUCxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDO0FBRm5DLGFBQUQsQ0F0QmI7QUEwQkRLLHFCQUFTLENBQUM7QUFDRkMsc0JBQU07QUFESixhQUFELEVBRUg7QUFDRUEsc0JBQU0sSUFEUjtBQUVFQywwQkFBVTtBQUZaLGFBRkcsQ0ExQlI7QUFnQ0RDLHdCQUFZLEtBaENYO0FBaUNEQyx5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QU07QUFERyx5QkFBYjtBQUdBbEQsNkJBQUttRCxlQUFMO0FBQ0FuRCw2QkFBS29ELGdCQUFMO0FBQ0g7QUFDSjtBQWJRLGFBQWI7QUFlSDs7O3lDQUVnQjtBQUNiLGdCQUFJcEQsT0FBTyxJQUFYO0FBQ0FqQiwyQkFBSzJDLE9BQUwsQ0FBYTtBQUNUTCxxQkFBSXRDLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsMEJBRGpDO0FBRVR5Qyx3QkFBTyxLQUZFO0FBR1RDLHdCQUFRN0MsZUFBS0MsU0FBTCxDQUFlNkMsU0FBZixFQUhDO0FBSVQ1RCxzQkFBSztBQUNEQyx5QkFBSThCLEtBQUs5QjtBQURSLGlCQUpJO0FBT1Q4RCx5QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CQyw0QkFBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0Esd0JBQUlBLElBQUloRSxJQUFKLENBQVNtRSxJQUFULElBQWlCLENBQXJCLEVBQXVCO0FBQ25CcEMsNkJBQUs3QixPQUFMLEdBQWU4RCxJQUFJaEUsSUFBSixDQUFTb0UsSUFBeEI7QUFDQXJDLDZCQUFLc0MsTUFBTDtBQUNIO0FBQ0o7QUFiUSxhQUFiO0FBZUg7OzsrQkFFTWUsTyxFQUFTO0FBQ1osZ0JBQUlyRCxPQUFPLElBQVg7QUFDQWtDLG9CQUFRQyxHQUFSLENBQVlrQixPQUFaOztBQUVBckQsaUJBQUs5QixHQUFMLEdBQVdtRixRQUFRQyxHQUFuQjtBQUNIOzs7K0JBRU1ELE8sRUFBUztBQUNaLGdCQUFJckQsT0FBTyxJQUFYO0FBQ0FBLGlCQUFLbUQsZUFBTDtBQUNBbkQsaUJBQUtvRCxnQkFBTDtBQUNBcEQsaUJBQUt1RCxjQUFMO0FBRUg7Ozs7RUFsUDhCeEUsZUFBS3lFLEk7O2tCQUFuQnpGLEsiLCJmaWxlIjoid3Jvbmdwcm9ibGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdle1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIFwidXNpbmdDb21wb25lbnRzXCI6IHtcclxuICAgICAgICAgICAgXCJtcC1zbGlkZXZpZXdcIjogXCJ3ZXVpLW1pbmlwcm9ncmFtL3NsaWRldmlldy9zbGlkZXZpZXdcIixcclxuICAgICAgICAgICAgXCJtcC1kaWFsb2dcIjogXCIvbWluaXByb2dyYW1fbnBtL3dldWktbWluaXByb2dyYW0vZGlhbG9nL2RpYWxvZ1wiLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkYXRhPXtcclxuICAgICAgICBTaWQgOiAtMSxcclxuICAgICAgICBzdHVkZW50OiB7fSxcclxuICAgICAgICB3cm9uZ1Byb2JsZW1MaXN0IDogbnVsbCxcclxuICAgICAgICBleGVyY2lzZUZpZWxkIDogbnVsbCxcclxuICAgICAgICBhY3RpdmVUYWI6IDAsXHJcbiAgICAgICAgc2NyZWVuQ3VyOiB7XHJcbiAgICAgICAgICAgIHN1YmplY3RDdXI6IDAsXHJcbiAgICAgICAgICAgIGRpZmZpY3VsdHlDdXI6IDAsXHJcbiAgICAgICAgICAgIHR5cGVDdXI6MCxcclxuICAgICAgICAgICAgZ3JhZGVDdXI6IDAsXHJcbiAgICAgICAgICAgIHVuaXRDdXI6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaWZmaWN1bHR5Q29sb3I6e1xyXG4gICAgICAgICAgICBcIueugOWNlVwiOlwiY3lhblwiLFxyXG4gICAgICAgICAgICBcIuS4reetiVwiOlwib2xpdmVcIixcclxuICAgICAgICAgICAgXCLlm7Dpmr5cIjpcInBpbmtcIixcclxuICAgICAgICAgICAgXCLnq57otZtcIjpcImJsYWNrXCIsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW1hZ2VTY3JlZW46d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPWljb24vc2NyZWVuLnBuZycsXHJcbiAgICAgICAgbW9kYWxOYW1lIDogXCJcIixcclxuICAgICAgICBzbGlkZUJ1dHRvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnd2FybicsXHJcbiAgICAgICAgICAgICAgICBzcmM6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPWljb24vZGVsLnBuZycsXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgIGJ1dHRvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5Y+W5raIJyxcclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn56Gu5a6aJyxcclxuICAgICAgICAgICAgICAgIGV4dENsYXNzOiAnRGVsZXRlQnV0dG9uJyxcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgZGlhbG9nU2hvdzogZmFsc2UsXHJcbiAgICAgICAgZGVsZXRlSW5kZXg6LTEsXHJcbiAgICAgICAgaW1nVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT0nLFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHM9e1xyXG4gICAgICAgIG9uVGFiQ2xpY2soZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gZS5kZXRhaWwuaW5kZXhcclxuICAgICAgICAgICAgc2VsZi5hY3RpdmVUYWI9IGluZGV4XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25UYWJDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gZS5kZXRhaWwuaW5kZXhcclxuICAgICAgICAgICAgc2VsZi5hY3RpdmVUYWI9IGluZGV4XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdGFiU2VsZWN0SW5kZXgoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLnNjcmVlbkN1cltlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lK1wiQ3VyXCJdPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgICAgICBzZWxmLmdldFNvcnRlZFdyb25nUHJvYmxlbShzZWxmKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRhYlNlbGVjdChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLnNjcmVlbkN1cltlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lK1wiQ3VyXCJdPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3dNb2RhbChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLm1vZGFsTmFtZT0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZU1vZGFsKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYubW9kYWxOYW1lPSBudWxsXHJcbiAgICAgICAgICAgIHNlbGYuZ2V0U29ydGVkV3JvbmdQcm9ibGVtKClcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzbGlkZUJ1dHRvblRhcChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmRlbGV0ZUluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgICAgICAgc2VsZi5kaWFsb2dTaG93ID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRhcERlbGV0ZURpYWxvZ0J1dHRvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmRpYWxvZ1Nob3cgPSBmYWxzZVxyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuaW5kZXggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kZWxldGVXcm9uZ1Byb2JsZW0oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja1dyb25nUHJvYmxlbShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZXhlcmNpc2VJbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOlwid3Jvbmdwcm9ibGVtLWRldGFpbD93aWQ9XCIrc2VsZi53cm9uZ1Byb2JsZW1MaXN0W2V4ZXJjaXNlSW5kZXhdLldpZCArIFwiJnNuYW1lPVwiK3NlbGYuc3R1ZGVudC5Tbmlja25hbWUsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrQ3JlYXRlV3JvbmdQcm9ibGVtKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOlwiY3JlYXRlLXdyb25ncHJvYmxlbT9zaWQ9XCIrc2VsZi5TaWQsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5wdXRDaGFuZ2VTZWFyY2goZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC91c2VyL2NvbW1vbi9zZWFyY2hfd3JvbmdfcHJvYmxlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpZDogc2VsZi5TaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmQ6ZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud3JvbmdQcm9ibGVtTGlzdCA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFdyb25nUHJvYmxlbSgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC93cm9uZ19wcm9ibGVtL2dldF93cm9uZ19wcm9ibGVtX2xpc3QnLFxyXG4gICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgU2lkOnNlbGYuU2lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53cm9uZ1Byb2JsZW1MaXN0ID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RXhlcmNpc2VGaWVsZCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC91c2VyL2NvbW1vbi9nZXRfZXhlcmNpc2VfZmllbGQnLFxyXG4gICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5leGVyY2lzZUZpZWxkID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U29ydGVkV3JvbmdQcm9ibGVtKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3dyb25nX3Byb2JsZW0vZ2V0X3NvcnRlZF93cm9uZ19wcm9ibGVtJyxcclxuICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgIFNpZDogc2VsZi5TaWQsXHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0OnNlbGYuZXhlcmNpc2VGaWVsZC5Fc3ViamVjdFtzZWxmLnNjcmVlbkN1ci5zdWJqZWN0Q3VyXSxcclxuICAgICAgICAgICAgICAgIHR5cGU6c2VsZi5leGVyY2lzZUZpZWxkLkV0eXBlW3NlbGYuZXhlcmNpc2VGaWVsZC5Fc3ViamVjdFtzZWxmLnNjcmVlbkN1ci5zdWJqZWN0Q3VyXV1bc2VsZi5zY3JlZW5DdXIudHlwZUN1cl0sXHJcbiAgICAgICAgICAgICAgICB1bml0OnNlbGYuZXhlcmNpc2VGaWVsZC5FdW5pdFtzZWxmLmV4ZXJjaXNlRmllbGQuRXN1YmplY3Rbc2VsZi5zY3JlZW5DdXIuc3ViamVjdEN1cl1dW3NlbGYuc2NyZWVuQ3VyLnVuaXRDdXJdLFxyXG4gICAgICAgICAgICAgICAgZGlmZmljdWx0eTpzZWxmLmV4ZXJjaXNlRmllbGQuRWRpZmZpY3VsdHlbc2VsZi5zY3JlZW5DdXIuZGlmZmljdWx0eUN1cl0sXHJcbiAgICAgICAgICAgICAgICBncmFkZTpzZWxmLmV4ZXJjaXNlRmllbGQuRWdyYWRlW3NlbGYuc2NyZWVuQ3VyLmdyYWRlQ3VyXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLndyb25nUHJvYmxlbUxpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVXcm9uZ1Byb2JsZW0oKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgaWYoc2VsZi5kZWxldGVJbmRleCA9PSAtMSkgcmV0dXJuXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvd3JvbmdfcHJvYmxlbS9kZWxldGVfd3JvbmdfcHJvYmxlbS86aWQnICsgJz9XaWQ9JyArIHNlbGYud3JvbmdQcm9ibGVtTGlzdFtzZWxmLmRlbGV0ZUluZGV4XS5XaWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOifliKDpmaTmiJDlip8nXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFdyb25nUHJvYmxlbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRFeGVyY2lzZUZpZWxkKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R1ZGVudERhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvc3R1ZGVudC9nZXRfc3R1ZGVudCcsXHJcbiAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICBTaWQ6c2VsZi5TaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0dWRlbnQgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpXHJcblxyXG4gICAgICAgIHNlbGYuU2lkID0gb3B0aW9ucy5zaWRcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuZ2V0V3JvbmdQcm9ibGVtKClcclxuICAgICAgICBzZWxmLmdldEV4ZXJjaXNlRmllbGQoKVxyXG4gICAgICAgIHNlbGYuZ2V0U3R1ZGVudERhdGEoKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==