'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Student = function (_wepy$page) {
    _inherits(Student, _wepy$page);

    function Student() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Student);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Student.__proto__ || Object.getPrototypeOf(Student)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            Sid: null,
            student: {},
            copyStudent: {},
            imgList: [],
            copyImgList: [],
            gradePicker: ['七年级', '八年级', '九年级', '高一', '高二', '高三'],
            gradeIndex: null,
            isClickEdit: false,
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name='
        }, _this.methods = {
            onClickEditPassword: function onClickEditPassword() {
                var self = this;
                _wepy2.default.navigateTo({ url: 'edit-password' + '?sid=' + self.Sid });
            },
            onClickExitLogin: function onClickExitLogin() {
                var self = this;
                wx.showModal({
                    title: '退出登录',
                    content: '确定要退出登录吗？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function success(res) {
                        if (res.confirm) {
                            // 清除session缓存
                            _wepy2.default.removeStorageSync("sessionToken");
                            _wepy2.default.removeStorageSync("sessionDate");
                            _wepy2.default.removeStorageSync("sessionUserInfo");
                            console.log("remove session!");
                            _wepy2.default.$instance.onLaunch();
                            self.onShow();
                            self.$apply();
                        }
                    }
                });
            },
            pickerGradeChange: function pickerGradeChange(e) {
                var self = this;
                self.gradeIndex = e.detail.value;
            },
            onClickEditStudent: function onClickEditStudent() {
                var self = this;
                self.isClickEdit = self.isClickEdit ? false : true;
            },
            onClickLearnSituation: function onClickLearnSituation() {
                this.$navigate({ url: "learnsituation" });
            },
            ChooseImage: function ChooseImage(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'],
                    success: function success(res) {
                        self.imgList = res.tempFilePaths;
                        self.$apply();
                    }
                });
            },
            ViewImage: function ViewImage(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.previewImage({
                    urls: self.imgList,
                    current: e.currentTarget.dataset.url
                });
            },
            DelImg: function DelImg(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.showModal({
                    title: '删除题目图片',
                    content: '确定要删除这张图片吗？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function success(res) {
                        if (res.confirm) {
                            self.imgList.splice(e.currentTarget.dataset.index, 1);
                            self.$apply();
                        }
                    }
                });
            },
            formSubmit: function formSubmit(e) {
                var self = this;

                var successUp = 0; //成功
                var failUp = 0; //失败
                var count = 0; //第几张
                var length = self.imgList.length; //总数

                var sendFormData = e.detail.value; // form 表单数据
                sendFormData['Sid'] = Number(self.Sid);

                if (self.imgList.length == 0) {
                    sendFormData['Sicon'] = "";
                } else if (self.imgList[0].indexOf(self.imgUrl) != -1) {
                    sendFormData['Sicon'] = self.imgList[0].replace(self.imgUrl, "");
                } else {
                    var lastindex = self.imgList[0].lastIndexOf("/");
                    sendFormData['Sicon'] = "user_avatar/" + self.imgList[0].substring(lastindex + 1, self.imgList[0].length);
                }

                console.log(sendFormData);
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/student/update_student',
                    method: 'POST',
                    data: sendFormData,
                    header: _wepy2.default.$instance.setHeader(),
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            wx.showToast({
                                title: '修改成功', //提示的内容,
                                icon: 'success', //图标,
                                mask: true, //显示透明蒙层，防止触摸穿透,
                                success: function success(res) {}
                            });

                            //添加头像
                            if (length > 0 && self.imgList[0].indexOf(self.imgUrl) == -1) {
                                self.recursionImgUpload(self, self.imgList, successUp, failUp, count, length);
                            } else {
                                self.getStudentData();
                            }

                            self.isClickEdit = false;
                            self.$apply();
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Student, [{
        key: 'recursionImgUpload',


        // 递归方式上传多张图片
        value: function recursionImgUpload(self, imgPaths, successUp, failUp, count, length) {
            var _wepy$uploadFile;

            _wepy2.default.uploadFile((_wepy$uploadFile = {
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/file/upload_file', //开发者服务器 url
                header: _wepy2.default.$instance.setHeader(),
                filePath: imgPaths[count], //要上传文件资源的路径
                name: 'uploadFile', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                formData: {
                    dirName: "images/user_avatar"
                }
            }, _defineProperty(_wepy$uploadFile, 'header', {
                'content-type': 'multipart/form-data'
            }), _defineProperty(_wepy$uploadFile, 'success', function success(e) {
                if (e.data.Code == 1) {
                    console.log("上传成功第" + count + "张");
                }
                successUp++; //成功+1
            }), _defineProperty(_wepy$uploadFile, 'fail', function fail(e) {
                failUp++; //失败+1
            }), _defineProperty(_wepy$uploadFile, 'complete', function complete(e) {

                count++;
                if (count == length) {
                    console.log("上传成功");
                    self.getStudentData();
                } else {
                    self.recursionImgUpload(self, imgPaths, successUp, failUp, count, length);
                }
            }), _wepy$uploadFile));
        }
    }, {
        key: 'getStudentData',
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
                        self.copyStudent = JSON.parse(JSON.stringify(self.student)); //深拷贝

                        self.imgList = [];
                        self.imgList.push(self.imgUrl + res.data.Data.Sicon);
                        self.copyImgList = JSON.parse(JSON.stringify(self.imgList)); //深拷贝

                        self.$apply();

                        for (var i = 0; i < self.gradePicker.length; i++) {
                            if (self.gradePicker[i] == res.data.Data.SgradeName) {
                                self.gradeIndex = i;
                            }
                        }
                    }
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {}
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;
            console.log(_wepy2.default.$instance.globalData);
            if (_wepy2.default.$instance.globalData.userInfo != null) {
                self.Sid = _wepy2.default.$instance.globalData.userInfo.Sid;
            } else {
                self.Sid = null;
                self.student = {};
                self.copyStudent = {};
                self.copyImgList = [];
            }

            self.getStudentData();
        }
    }]);

    return Student;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Student , 'pages/my'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIlN0dWRlbnQiLCJkYXRhIiwiU2lkIiwic3R1ZGVudCIsImNvcHlTdHVkZW50IiwiaW1nTGlzdCIsImNvcHlJbWdMaXN0IiwiZ3JhZGVQaWNrZXIiLCJncmFkZUluZGV4IiwiaXNDbGlja0VkaXQiLCJpbWdVcmwiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm1ldGhvZHMiLCJvbkNsaWNrRWRpdFBhc3N3b3JkIiwic2VsZiIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJvbkNsaWNrRXhpdExvZ2luIiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjYW5jZWxUZXh0IiwiY29uZmlybVRleHQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsInJlbW92ZVN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsIm9uTGF1bmNoIiwib25TaG93IiwiJGFwcGx5IiwicGlja2VyR3JhZGVDaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJvbkNsaWNrRWRpdFN0dWRlbnQiLCJvbkNsaWNrTGVhcm5TaXR1YXRpb24iLCIkbmF2aWdhdGUiLCJDaG9vc2VJbWFnZSIsImZpbGUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJ0ZW1wRmlsZVBhdGhzIiwiVmlld0ltYWdlIiwicHJldmlld0ltYWdlIiwidXJscyIsImN1cnJlbnQiLCJEZWxJbWciLCJzcGxpY2UiLCJpbmRleCIsImZvcm1TdWJtaXQiLCJzdWNjZXNzVXAiLCJmYWlsVXAiLCJsZW5ndGgiLCJzZW5kRm9ybURhdGEiLCJOdW1iZXIiLCJpbmRleE9mIiwicmVwbGFjZSIsImxhc3RpbmRleCIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsInNldEhlYWRlciIsIkNvZGUiLCJzaG93VG9hc3QiLCJpY29uIiwibWFzayIsInJlY3Vyc2lvbkltZ1VwbG9hZCIsImdldFN0dWRlbnREYXRhIiwiaW1nUGF0aHMiLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJuYW1lIiwiZm9ybURhdGEiLCJkaXJOYW1lIiwiRGF0YSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInB1c2giLCJTaWNvbiIsImkiLCJTZ3JhZGVOYW1lIiwidXNlckluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFLO0FBQ0RDLGlCQUFLLElBREo7QUFFREMscUJBQVMsRUFGUjtBQUdEQyx5QkFBYSxFQUhaO0FBSURDLHFCQUFTLEVBSlI7QUFLREMseUJBQWEsRUFMWjtBQU1EQyx5QkFBWSxDQUFDLEtBQUQsRUFBTyxLQUFQLEVBQWEsS0FBYixFQUFtQixJQUFuQixFQUF3QixJQUF4QixFQUE2QixJQUE3QixDQU5YO0FBT0RDLHdCQUFXLElBUFY7QUFRREMseUJBQWEsS0FSWjtBQVNEQyxvQkFBT0MsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQztBQVQ1QyxTLFFBWUxDLE8sR0FBUztBQUNMQywrQkFESyxpQ0FDZ0I7QUFDakIsb0JBQUlDLE9BQU8sSUFBWDtBQUNBTiwrQkFBS08sVUFBTCxDQUFnQixFQUFFQyxLQUFLLGtCQUFrQixPQUFsQixHQUE0QkYsS0FBS2YsR0FBeEMsRUFBaEI7QUFDSCxhQUpJO0FBTUxrQiw0QkFOSyw4QkFNYTtBQUNkLG9CQUFJSCxPQUFPLElBQVg7QUFDQUksbUJBQUdDLFNBQUgsQ0FBYTtBQUNUQywyQkFBTyxNQURFO0FBRVRDLDZCQUFTLFdBRkE7QUFHVEMsZ0NBQVksSUFISDtBQUlUQyxpQ0FBYSxJQUpKO0FBS1RDLDZCQUFTLHNCQUFPO0FBQzNCLDRCQUFJQyxJQUFJQyxPQUFSLEVBQWlCO0FBQ0U7QUFDQWxCLDJDQUFLbUIsaUJBQUwsQ0FBdUIsY0FBdkI7QUFDQW5CLDJDQUFLbUIsaUJBQUwsQ0FBdUIsYUFBdkI7QUFDQW5CLDJDQUFLbUIsaUJBQUwsQ0FBdUIsaUJBQXZCO0FBQ0FDLG9DQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDQXJCLDJDQUFLQyxTQUFMLENBQWVxQixRQUFmO0FBQ0FoQixpQ0FBS2lCLE1BQUw7QUFDQWpCLGlDQUFLa0IsTUFBTDtBQUNIO0FBQ2hCO0FBaEJvQixpQkFBYjtBQWtCSCxhQTFCSTtBQTRCTEMsNkJBNUJLLDZCQTRCYUMsQ0E1QmIsRUE0QmU7QUFDaEIsb0JBQUlwQixPQUFPLElBQVg7QUFDQUEscUJBQUtULFVBQUwsR0FBa0I2QixFQUFFQyxNQUFGLENBQVNDLEtBQTNCO0FBQ0gsYUEvQkk7QUFrQ0xDLDhCQWxDSyxnQ0FrQ2dCO0FBQ2pCLG9CQUFJdkIsT0FBTyxJQUFYO0FBQ0FBLHFCQUFLUixXQUFMLEdBQW1CUSxLQUFLUixXQUFMLEdBQWlCLEtBQWpCLEdBQXVCLElBQTFDO0FBQ0gsYUFyQ0k7QUF1Q0xnQyxpQ0F2Q0ssbUNBdUNrQjtBQUNuQixxQkFBS0MsU0FBTCxDQUFlLEVBQUN2QixLQUFJLGdCQUFMLEVBQWY7QUFDSCxhQXpDSTtBQTRDTHdCLHVCQTVDSyx1QkE0Q09OLENBNUNQLEVBNENVO0FBQ1gsb0JBQUlwQixPQUFPLElBQVg7QUFDQSxvQkFBSTJCLE9BQU9QLEVBQUVRLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRixJQUFuQztBQUNBdkIsbUJBQUcwQixXQUFILENBQWU7QUFDWEMsMkJBQU8sQ0FESSxFQUNEO0FBQ1ZDLDhCQUFVLENBQUMsVUFBRCxFQUFhLFlBQWIsQ0FGQyxFQUUyQjtBQUN0Q0MsZ0NBQVksQ0FBQyxPQUFELEVBQVUsUUFBVixDQUhEO0FBSVh2Qiw2QkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2RYLDZCQUFLWixPQUFMLEdBQWN1QixJQUFJdUIsYUFBbEI7QUFDQWxDLDZCQUFLa0IsTUFBTDtBQUNIO0FBUFUsaUJBQWY7QUFTSCxhQXhESTtBQTBETGlCLHFCQTFESyxxQkEwREtmLENBMURMLEVBMERRO0FBQ1Qsb0JBQUlwQixPQUFPLElBQVg7QUFDQSxvQkFBSTJCLE9BQU9QLEVBQUVRLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRixJQUFuQztBQUNBdkIsbUJBQUdnQyxZQUFILENBQWdCO0FBQ1pDLDBCQUFNckMsS0FBS1osT0FEQztBQUVaa0QsNkJBQVNsQixFQUFFUSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QjNCO0FBRnJCLGlCQUFoQjtBQUlILGFBakVJO0FBbUVMcUMsa0JBbkVLLGtCQW1FRW5CLENBbkVGLEVBbUVLO0FBQ04sb0JBQUlwQixPQUFPLElBQVg7QUFDQSxvQkFBSTJCLE9BQU9QLEVBQUVRLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRixJQUFuQztBQUNBdkIsbUJBQUdDLFNBQUgsQ0FBYTtBQUNUQywyQkFBTyxRQURFO0FBRVRDLDZCQUFTLGFBRkE7QUFHVEMsZ0NBQVksSUFISDtBQUlUQyxpQ0FBYSxJQUpKO0FBS1RDLDZCQUFTLHNCQUFPO0FBQ1osNEJBQUlDLElBQUlDLE9BQVIsRUFBaUI7QUFDYlosaUNBQUtaLE9BQUwsQ0FBYW9ELE1BQWIsQ0FBb0JwQixFQUFFUSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QlksS0FBNUMsRUFBbUQsQ0FBbkQ7QUFDQXpDLGlDQUFLa0IsTUFBTDtBQUNIO0FBQ0o7QUFWUSxpQkFBYjtBQVlILGFBbEZJO0FBb0ZMd0Isc0JBcEZLLHNCQW9GTXRCLENBcEZOLEVBb0ZTO0FBQ1Ysb0JBQUlwQixPQUFPLElBQVg7O0FBRUEsb0JBQUkyQyxZQUFZLENBQWhCLENBSFUsQ0FHUztBQUNuQixvQkFBSUMsU0FBUyxDQUFiLENBSlUsQ0FJTTtBQUNoQixvQkFBSWIsUUFBUSxDQUFaLENBTFUsQ0FLSztBQUNmLG9CQUFJYyxTQUFTN0MsS0FBS1osT0FBTCxDQUFheUQsTUFBMUIsQ0FOVSxDQU13Qjs7QUFFbEMsb0JBQUlDLGVBQWUxQixFQUFFQyxNQUFGLENBQVNDLEtBQTVCLENBUlUsQ0FRd0I7QUFDbEN3Qiw2QkFBYSxLQUFiLElBQXNCQyxPQUFPL0MsS0FBS2YsR0FBWixDQUF0Qjs7QUFFQSxvQkFBR2UsS0FBS1osT0FBTCxDQUFheUQsTUFBYixJQUF1QixDQUExQixFQUE0QjtBQUN4QkMsaUNBQWEsT0FBYixJQUF3QixFQUF4QjtBQUNILGlCQUZELE1BRU0sSUFBRzlDLEtBQUtaLE9BQUwsQ0FBYSxDQUFiLEVBQWdCNEQsT0FBaEIsQ0FBd0JoRCxLQUFLUCxNQUE3QixLQUF3QyxDQUFDLENBQTVDLEVBQThDO0FBQ2hEcUQsaUNBQWEsT0FBYixJQUF3QjlDLEtBQUtaLE9BQUwsQ0FBYSxDQUFiLEVBQWdCNkQsT0FBaEIsQ0FBd0JqRCxLQUFLUCxNQUE3QixFQUFvQyxFQUFwQyxDQUF4QjtBQUNILGlCQUZLLE1BRUQ7QUFDRCx3QkFBSXlELFlBQVlsRCxLQUFLWixPQUFMLENBQWEsQ0FBYixFQUFnQitELFdBQWhCLENBQTRCLEdBQTVCLENBQWhCO0FBQ0FMLGlDQUFhLE9BQWIsSUFBd0IsaUJBQWlCOUMsS0FBS1osT0FBTCxDQUFhLENBQWIsRUFBZ0JnRSxTQUFoQixDQUEwQkYsWUFBWSxDQUF0QyxFQUF5Q2xELEtBQUtaLE9BQUwsQ0FBYSxDQUFiLEVBQWdCeUQsTUFBekQsQ0FBekM7QUFDSDs7QUFFRC9CLHdCQUFRQyxHQUFSLENBQVkrQixZQUFaO0FBQ0FwRCwrQkFBSzJELE9BQUwsQ0FBYTtBQUNUbkQseUJBQUlSLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsNkJBRGpDO0FBRVR5RCw0QkFBTyxNQUZFO0FBR1R0RSwwQkFBTThELFlBSEc7QUFJVFMsNEJBQVE3RCxlQUFLQyxTQUFMLENBQWU2RCxTQUFmLEVBSkM7QUFLVDlDLDZCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJHLGdDQUFRQyxHQUFSLENBQVlKLEdBQVo7QUFDQSw0QkFBSUEsSUFBSTNCLElBQUosQ0FBU3lFLElBQVQsSUFBaUIsQ0FBckIsRUFBdUI7QUFDbkJyRCwrQkFBR3NELFNBQUgsQ0FBYTtBQUNQcEQsdUNBQU8sTUFEQSxFQUNRO0FBQ2ZxRCxzQ0FBTSxTQUZDLEVBRVU7QUFDakJDLHNDQUFNLElBSEMsRUFHSztBQUNabEQseUNBQVMsc0JBQU8sQ0FBRTtBQUpYLDZCQUFiOztBQU9BO0FBQ0EsZ0NBQUdtQyxTQUFPLENBQVAsSUFBWTdDLEtBQUtaLE9BQUwsQ0FBYSxDQUFiLEVBQWdCNEQsT0FBaEIsQ0FBd0JoRCxLQUFLUCxNQUE3QixLQUF3QyxDQUFDLENBQXhELEVBQTBEO0FBQ3RETyxxQ0FBSzZELGtCQUFMLENBQXdCN0QsSUFBeEIsRUFBNkJBLEtBQUtaLE9BQWxDLEVBQTJDdUQsU0FBM0MsRUFBc0RDLE1BQXRELEVBQThEYixLQUE5RCxFQUFxRWMsTUFBckU7QUFDSCw2QkFGRCxNQUVLO0FBQ0Q3QyxxQ0FBSzhELGNBQUw7QUFDSDs7QUFFRDlELGlDQUFLUixXQUFMLEdBQW1CLEtBQW5CO0FBQ0FRLGlDQUFLa0IsTUFBTDtBQUNIO0FBQ0o7QUF6QlEsaUJBQWI7QUE0Qkg7QUFySUksUzs7Ozs7OztBQTJJVDsyQ0FDbUJsQixJLEVBQUsrRCxRLEVBQVVwQixTLEVBQVdDLE0sRUFBUWIsSyxFQUFPYyxNLEVBQU87QUFBQTs7QUFDL0RuRCwyQkFBS3NFLFVBQUw7QUFDSTlELHFCQUFLUixlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLHVCQUQvQyxFQUN3RTtBQUNwRTBELHdCQUFRN0QsZUFBS0MsU0FBTCxDQUFlNkQsU0FBZixFQUZaO0FBR0lTLDBCQUFVRixTQUFTaEMsS0FBVCxDQUhkLEVBRytCO0FBQzNCbUMsc0JBQU0sWUFKVixFQUl3QjtBQUNwQkMsMEJBQVM7QUFDTEMsNkJBQVE7QUFESDtBQUxiLDJEQVFZO0FBQ0osZ0NBQWdCO0FBRFosYUFSWixpRUFXWWhELENBWFosRUFXYztBQUNOLG9CQUFJQSxFQUFFcEMsSUFBRixDQUFPeUUsSUFBUCxJQUFhLENBQWpCLEVBQW1CO0FBQ2YzQyw0QkFBUUMsR0FBUixDQUFZLFVBQVVnQixLQUFWLEdBQWtCLEdBQTlCO0FBQ0g7QUFDRFksNEJBSk0sQ0FJTTtBQUNmLGFBaEJMLDJEQWlCU3ZCLENBakJULEVBaUJXO0FBQ0h3Qix5QkFERyxDQUNNO0FBQ1osYUFuQkwsbUVBb0JheEIsQ0FwQmIsRUFvQmU7O0FBRVBXO0FBQ0Esb0JBQUdBLFNBQVNjLE1BQVosRUFBb0I7QUFDaEIvQiw0QkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQWYseUJBQUs4RCxjQUFMO0FBQ0gsaUJBSEQsTUFHSztBQUNEOUQseUJBQUs2RCxrQkFBTCxDQUF3QjdELElBQXhCLEVBQTZCK0QsUUFBN0IsRUFBc0NwQixTQUF0QyxFQUFpREMsTUFBakQsRUFBeURiLEtBQXpELEVBQWdFYyxNQUFoRTtBQUNIO0FBQ0osYUE3Qkw7QUFnQ0g7Ozt5Q0FFZ0I7QUFDYixnQkFBSTdDLE9BQU8sSUFBWDtBQUNBTiwyQkFBSzJELE9BQUwsQ0FBYTtBQUNUbkQscUJBQUlSLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsMEJBRGpDO0FBRVR5RCx3QkFBTyxLQUZFO0FBR1RDLHdCQUFRN0QsZUFBS0MsU0FBTCxDQUFlNkQsU0FBZixFQUhDO0FBSVR4RSxzQkFBSztBQUNEQyx5QkFBSWUsS0FBS2Y7QUFEUixpQkFKSTtBQU9UeUIseUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQkcsNEJBQVFDLEdBQVIsQ0FBWUosR0FBWjtBQUNBLHdCQUFJQSxJQUFJM0IsSUFBSixDQUFTeUUsSUFBVCxJQUFpQixDQUFyQixFQUF1QjtBQUNuQnpELDZCQUFLZCxPQUFMLEdBQWV5QixJQUFJM0IsSUFBSixDQUFTcUYsSUFBeEI7QUFDQXJFLDZCQUFLYixXQUFMLEdBQW1CbUYsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxTQUFMLENBQWV4RSxLQUFLZCxPQUFwQixDQUFYLENBQW5CLENBRm1CLENBRXlDOztBQUU1RGMsNkJBQUtaLE9BQUwsR0FBZSxFQUFmO0FBQ0FZLDZCQUFLWixPQUFMLENBQWFxRixJQUFiLENBQWtCekUsS0FBS1AsTUFBTCxHQUFja0IsSUFBSTNCLElBQUosQ0FBU3FGLElBQVQsQ0FBY0ssS0FBOUM7QUFDQTFFLDZCQUFLWCxXQUFMLEdBQW1CaUYsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxTQUFMLENBQWV4RSxLQUFLWixPQUFwQixDQUFYLENBQW5CLENBTm1CLENBTXlDOztBQUU1RFksNkJBQUtrQixNQUFMOztBQUVBLDZCQUFJLElBQUl5RCxJQUFFLENBQVYsRUFBWUEsSUFBRTNFLEtBQUtWLFdBQUwsQ0FBaUJ1RCxNQUEvQixFQUFzQzhCLEdBQXRDLEVBQTBDO0FBQ3RDLGdDQUFHM0UsS0FBS1YsV0FBTCxDQUFpQnFGLENBQWpCLEtBQXVCaEUsSUFBSTNCLElBQUosQ0FBU3FGLElBQVQsQ0FBY08sVUFBeEMsRUFBbUQ7QUFDL0M1RSxxQ0FBS1QsVUFBTCxHQUFrQm9GLENBQWxCO0FBQ0g7QUFDSjtBQUVKO0FBQ0o7QUExQlEsYUFBYjtBQTRCSDs7O2lDQUdRLENBRVI7OztpQ0FFTztBQUNKLGdCQUFJM0UsT0FBTyxJQUFYO0FBQ0FjLG9CQUFRQyxHQUFSLENBQVlyQixlQUFLQyxTQUFMLENBQWVDLFVBQTNCO0FBQ0EsZ0JBQUdGLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQmlGLFFBQTFCLElBQW9DLElBQXZDLEVBQTRDO0FBQ3hDN0UscUJBQUtmLEdBQUwsR0FBV1MsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCaUYsUUFBMUIsQ0FBbUM1RixHQUE5QztBQUNILGFBRkQsTUFFSztBQUNEZSxxQkFBS2YsR0FBTCxHQUFXLElBQVg7QUFDQWUscUJBQUtkLE9BQUwsR0FBZSxFQUFmO0FBQ0FjLHFCQUFLYixXQUFMLEdBQW1CLEVBQW5CO0FBQ0FhLHFCQUFLWCxXQUFMLEdBQW1CLEVBQW5CO0FBQ0g7O0FBRURXLGlCQUFLOEQsY0FBTDtBQUNIOzs7O0VBOU9nQ3BFLGVBQUtvRixJOztrQkFBckIvRixPIiwiZmlsZSI6Im15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0dWRlbnQgZXh0ZW5kcyB3ZXB5LnBhZ2V7XHJcbiAgICBkYXRhPXtcclxuICAgICAgICBTaWQ6IG51bGwsXHJcbiAgICAgICAgc3R1ZGVudDoge30sXHJcbiAgICAgICAgY29weVN0dWRlbnQ6IHt9LFxyXG4gICAgICAgIGltZ0xpc3Q6IFtdLFxyXG4gICAgICAgIGNvcHlJbWdMaXN0OiBbXSxcclxuICAgICAgICBncmFkZVBpY2tlcjpbJ+S4g+W5tOe6pycsJ+WFq+W5tOe6pycsJ+S5neW5tOe6pycsJ+mrmOS4gCcsJ+mrmOS6jCcsJ+mrmOS4iSddLFxyXG4gICAgICAgIGdyYWRlSW5kZXg6bnVsbCxcclxuICAgICAgICBpc0NsaWNrRWRpdDogZmFsc2UsXHJcbiAgICAgICAgaW1nVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT0nLFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHM9IHtcclxuICAgICAgICBvbkNsaWNrRWRpdFBhc3N3b3JkKCl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oeyB1cmw6ICdlZGl0LXBhc3N3b3JkJyArICc/c2lkPScgKyBzZWxmLlNpZCB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrRXhpdExvZ2luKCl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfpgIDlh7rnmbvlvZUnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+ehruWumuimgemAgOWHuueZu+W9leWQl++8nycsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxUZXh0OiAn5Y+W5raIJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcblx0XHRcdFx0XHRpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5riF6Zmkc2Vzc2lvbue8k+WtmFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKFwic2Vzc2lvblRva2VuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoXCJzZXNzaW9uRGF0ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKFwic2Vzc2lvblVzZXJJbmZvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZlIHNlc3Npb24hXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuJGluc3RhbmNlLm9uTGF1bmNoKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vblNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwaWNrZXJHcmFkZUNoYW5nZShlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuZ3JhZGVJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG9uQ2xpY2tFZGl0U3R1ZGVudCgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuaXNDbGlja0VkaXQgPSBzZWxmLmlzQ2xpY2tFZGl0P2ZhbHNlOnRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrTGVhcm5TaXR1YXRpb24oKXtcclxuICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGUoe3VybDpcImxlYXJuc2l0dWF0aW9uXCJ9KVxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICBDaG9vc2VJbWFnZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbGVcclxuICAgICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDEsIC8v6buY6K6kOVxyXG4gICAgICAgICAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAvL+WPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgICAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3Q9IHJlcy50ZW1wRmlsZVBhdGhzXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBWaWV3SW1hZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWxlXHJcbiAgICAgICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICB1cmxzOiBzZWxmLmltZ0xpc3QsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgRGVsSW1nKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsZVxyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTpopjnm67lm77niYcnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+ehruWumuimgeWIoOmZpOi/meW8oOWbvueJh+WQl++8nycsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxUZXh0OiAn5Y+W5raIJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nTGlzdC5zcGxpY2UoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzVXAgPSAwOyAvL+aIkOWKn1xyXG4gICAgICAgICAgICBsZXQgZmFpbFVwID0gMDsgLy/lpLHotKVcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDsgLy/nrKzlh6DlvKBcclxuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IHNlbGYuaW1nTGlzdC5sZW5ndGg7IC8v5oC75pWwXHJcblxyXG4gICAgICAgICAgICBsZXQgc2VuZEZvcm1EYXRhID0gZS5kZXRhaWwudmFsdWUgLy8gZm9ybSDooajljZXmlbDmja5cclxuICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydTaWQnXSA9IE51bWJlcihzZWxmLlNpZClcclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaW1nTGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbJ1NpY29uJ10gPSBcIlwiXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHNlbGYuaW1nTGlzdFswXS5pbmRleE9mKHNlbGYuaW1nVXJsKSAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbJ1NpY29uJ10gPSBzZWxmLmltZ0xpc3RbMF0ucmVwbGFjZShzZWxmLmltZ1VybCxcIlwiKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0aW5kZXggPSBzZWxmLmltZ0xpc3RbMF0ubGFzdEluZGV4T2YoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbJ1NpY29uJ10gPSBcInVzZXJfYXZhdGFyL1wiICsgc2VsZi5pbWdMaXN0WzBdLnN1YnN0cmluZyhsYXN0aW5kZXggKyAxLCBzZWxmLmltZ0xpc3RbMF0ubGVuZ3RoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZW5kRm9ybURhdGEpXHJcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9zdHVkZW50L3VwZGF0ZV9zdHVkZW50JyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBzZW5kRm9ybURhdGEsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S/ruaUueaIkOWKnycsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5re75Yqg5aS05YOPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxlbmd0aD4wICYmIHNlbGYuaW1nTGlzdFswXS5pbmRleE9mKHNlbGYuaW1nVXJsKSA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY3Vyc2lvbkltZ1VwbG9hZChzZWxmLHNlbGYuaW1nTGlzdCwgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRTdHVkZW50RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNDbGlja0VkaXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOmAkuW9kuaWueW8j+S4iuS8oOWkmuW8oOWbvueJh1xyXG4gICAgcmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsaW1nUGF0aHMsIHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKXtcclxuICAgICAgICB3ZXB5LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS91cGxvYWRfZmlsZScsIC8v5byA5Y+R6ICF5pyN5Yqh5ZmoIHVybFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBmaWxlUGF0aDogaW1nUGF0aHNbY291bnRdLCAvL+imgeS4iuS8oOaWh+S7tui1hOa6kOeahOi3r+W+hFxyXG4gICAgICAgICAgICBuYW1lOiAndXBsb2FkRmlsZScsIC8v5paH5Lu25a+55bqU55qEIGtleSAsIOW8gOWPkeiAheWcqOacjeWKoeWZqOerr+mAmui/h+i/meS4qiBrZXkg5Y+v5Lul6I635Y+W5Yiw5paH5Lu25LqM6L+b5Yi25YaF5a65XHJcbiAgICAgICAgICAgIGZvcm1EYXRhOntcclxuICAgICAgICAgICAgICAgIGRpck5hbWU6XCJpbWFnZXMvdXNlcl9hdmF0YXJcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzcyhlKXtcclxuICAgICAgICAgICAgICAgIGlmIChlLmRhdGEuQ29kZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuIrkvKDmiJDlip/nrKxcIiArIGNvdW50ICsgXCLlvKBcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NVcCsrOy8v5oiQ5YqfKzFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChlKXtcclxuICAgICAgICAgICAgICAgIGZhaWxVcCsrOy8v5aSx6LSlKzFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGUoZSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA9PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0U3R1ZGVudERhdGEoKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWN1cnNpb25JbWdVcGxvYWQoc2VsZixpbWdQYXRocyxzdWNjZXNzVXAsIGZhaWxVcCwgY291bnQsIGxlbmd0aClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0dWRlbnREYXRhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3N0dWRlbnQvZ2V0X3N0dWRlbnQnLFxyXG4gICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgU2lkOnNlbGYuU2lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdHVkZW50ID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29weVN0dWRlbnQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlbGYuc3R1ZGVudCkpIC8v5rex5ou36LSdXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0ID0gW11cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3QucHVzaChzZWxmLmltZ1VybCArIHJlcy5kYXRhLkRhdGEuU2ljb24pXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3B5SW1nTGlzdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2VsZi5pbWdMaXN0KSkgLy/mt7Hmi7fotJ1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHNlbGYuZ3JhZGVQaWNrZXIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZ3JhZGVQaWNrZXJbaV0gPT0gcmVzLmRhdGEuRGF0YS5TZ3JhZGVOYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ3JhZGVJbmRleCA9IGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgY29uc29sZS5sb2cod2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YSlcclxuICAgICAgICBpZih3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnVzZXJJbmZvIT1udWxsKXtcclxuICAgICAgICAgICAgc2VsZi5TaWQgPSB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnVzZXJJbmZvLlNpZFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzZWxmLlNpZCA9IG51bGxcclxuICAgICAgICAgICAgc2VsZi5zdHVkZW50ID0ge31cclxuICAgICAgICAgICAgc2VsZi5jb3B5U3R1ZGVudCA9IHt9XHJcbiAgICAgICAgICAgIHNlbGYuY29weUltZ0xpc3QgPSBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5nZXRTdHVkZW50RGF0YSgpXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==