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

var Teacher = function (_wepy$page) {
    _inherits(Teacher, _wepy$page);

    function Teacher() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Teacher);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Teacher.__proto__ || Object.getPrototypeOf(Teacher)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            Sid: null,
            teacher: {},
            imgList: [],
            AddressIndex: 0,
            AddressNameList: ['思明', '湖里', '集美', '海沧', '翔安', '同安', '其他'],

            sexList: [{
                value: "0",
                name: "先生",
                checked: false
            }, {
                value: "1",
                name: "女士",
                checked: false
            }],

            checkboxList: {
                'subject': [{
                    value: "0",
                    name: "语文",
                    checked: false
                }, {
                    value: "1",
                    name: "数学",
                    checked: false
                }, {
                    value: "2",
                    name: "英语",
                    checked: false
                }, {
                    value: "3",
                    name: "物理",
                    checked: false
                }, {
                    value: "4",
                    name: "化学",
                    checked: false
                }],

                'week': [{
                    value: "0",
                    name: "星期一",
                    checked: false
                }, {
                    value: "1",
                    name: "星期二",
                    checked: false
                }, {
                    value: "2",
                    name: "星期三",
                    checked: false
                }, {
                    value: "3",
                    name: "星期四",
                    checked: false
                }, {
                    value: "4",
                    name: "星期五",
                    checked: false
                }, {
                    value: "5",
                    name: "星期六",
                    checked: false
                }, {
                    value: "6",
                    name: "星期日",
                    checked: false
                }],

                'timeSlot': [{
                    value: "0",
                    name: "上午",
                    checked: false
                }, {
                    value: "1",
                    name: "下午",
                    checked: false
                }, {
                    value: "2",
                    name: "晚上",
                    checked: false
                }]

            },

            isClickEdit: false,
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name='
        }, _this.methods = {
            pickerAddressChange: function pickerAddressChange(e) {
                var self = this;
                self.AddressIndex = e.detail.value;
            },
            sexRadioChange: function sexRadioChange(e) {
                var self = this;
                console.log('radio发生change事件，携带value值为：', e.detail.value);

                for (var i = 0, len = self.sexList.length; i < len; ++i) {
                    self.sexList[i].checked = self.sexList[i].value === e.detail.value;
                }
            },
            checkboxChange: function checkboxChange(e) {
                var self = this;
                console.log('checkbox发生change事件，携带value值为：', e.detail.value);

                var values = e.detail.value;
                var type = e.currentTarget.dataset.type;
                for (var i = 0, lenI = self.checkboxList[type].length; i < lenI; ++i) {
                    self.checkboxList[type][i].checked = false;

                    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                        if (self.checkboxList[type][i].value === values[j]) {
                            self.checkboxList[type][i].checked = true;
                            break;
                        }
                    }
                }
            },
            formSubmit: function formSubmit(e) {
                var self = this;

                var sendFormData = e.detail.value; // form 表单数据
                var sex = "";
                if (self.sexList[0].checked) {
                    sex = "先生";
                } else if (self.sexList[1].checked) {
                    sex = "女士";
                }
                sendFormData['OTcontactName'] = sendFormData['OTcontactName'] + sex;
                sendFormData['Sid'] = Number(self.Sid);
                sendFormData['OTsubject'] = self.getCheckedList("subject");
                sendFormData['OTweek'] = self.getCheckedList("week");
                sendFormData['OTtimeSlot'] = self.getCheckedList("timeSlot");

                console.log(sendFormData);
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/student/insert_order_teacher',
                    method: 'POST',
                    data: sendFormData,
                    header: _wepy2.default.$instance.setHeader(),
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            wx.showToast({
                                title: '修改成功，请重新登录', //提示的内容,
                                icon: 'success', //图标,
                                mask: true, //显示透明蒙层，防止触摸穿透,
                                success: function success(res) {}
                            });

                            self.$apply();
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Teacher, [{
        key: 'getCheckedList',
        value: function getCheckedList(type) {
            var self = this;

            var res = "";
            for (var i = 0; i < self.checkboxList[type].length; i++) {
                if (self.checkboxList[type][i].checked == true) {
                    res += self.checkboxList[type][i].name + ";";
                }
            }
            res = res.slice(0, -1);
            return res;
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var self = this;

            self.Sid = options.sid;
        }
    }]);

    return Teacher;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Teacher , 'pages/create-orderTeacher'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS1vcmRlclRlYWNoZXIuanMiXSwibmFtZXMiOlsiVGVhY2hlciIsImRhdGEiLCJTaWQiLCJ0ZWFjaGVyIiwiaW1nTGlzdCIsIkFkZHJlc3NJbmRleCIsIkFkZHJlc3NOYW1lTGlzdCIsInNleExpc3QiLCJ2YWx1ZSIsIm5hbWUiLCJjaGVja2VkIiwiY2hlY2tib3hMaXN0IiwiaXNDbGlja0VkaXQiLCJpbWdVcmwiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm1ldGhvZHMiLCJwaWNrZXJBZGRyZXNzQ2hhbmdlIiwiZSIsInNlbGYiLCJkZXRhaWwiLCJzZXhSYWRpb0NoYW5nZSIsImNvbnNvbGUiLCJsb2ciLCJpIiwibGVuIiwibGVuZ3RoIiwiY2hlY2tib3hDaGFuZ2UiLCJ2YWx1ZXMiLCJ0eXBlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJsZW5JIiwiaiIsImxlbkoiLCJmb3JtU3VibWl0Iiwic2VuZEZvcm1EYXRhIiwic2V4IiwiTnVtYmVyIiwiZ2V0Q2hlY2tlZExpc3QiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwic3VjY2VzcyIsInJlcyIsIkNvZGUiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm1hc2siLCIkYXBwbHkiLCJzbGljZSIsIm9wdGlvbnMiLCJzaWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEksR0FBSztBQUNEQyxpQkFBSyxJQURKO0FBRURDLHFCQUFTLEVBRlI7QUFHREMscUJBQVMsRUFIUjtBQUlEQywwQkFBYSxDQUpaO0FBS0RDLDZCQUFpQixDQUNiLElBRGEsRUFDUixJQURRLEVBQ0gsSUFERyxFQUNFLElBREYsRUFDTyxJQURQLEVBQ1ksSUFEWixFQUNpQixJQURqQixDQUxoQjs7QUFTREMscUJBQVEsQ0FBQztBQUNMQyx1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QTdDLEVBQWlEO0FBQzdDLG9CQUFHTCxLQUFLVixZQUFMLENBQWtCb0IsSUFBbEIsRUFBd0JMLENBQXhCLEVBQTJCaEIsT0FBM0IsSUFBc0MsSUFBekMsRUFBOEM7QUFDMUNzQywyQkFBTzNCLEtBQUtWLFlBQUwsQ0FBa0JvQixJQUFsQixFQUF3QkwsQ0FBeEIsRUFBMkJqQixJQUEzQixHQUFrQyxHQUF6QztBQUNIO0FBQ0o7QUFDRHVDLGtCQUFNQSxJQUFJUSxLQUFKLENBQVUsQ0FBVixFQUFZLENBQUMsQ0FBYixDQUFOO0FBQ0EsbUJBQU9SLEdBQVA7QUFDSDs7OytCQUVNUyxPLEVBQVM7QUFDWixnQkFBSXBDLE9BQU8sSUFBWDs7QUFFQUEsaUJBQUtuQixHQUFMLEdBQVd1RCxRQUFRQyxHQUFuQjtBQUVIOzs7O0VBNUxnQzVDLGVBQUs2QyxJOztrQkFBckIzRCxPIiwiZmlsZSI6ImNyZWF0ZS1vcmRlclRlYWNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhY2hlciBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgIGRhdGE9e1xyXG4gICAgICAgIFNpZDogbnVsbCxcclxuICAgICAgICB0ZWFjaGVyOiB7fSxcclxuICAgICAgICBpbWdMaXN0OiBbXSxcclxuICAgICAgICBBZGRyZXNzSW5kZXg6MCxcclxuICAgICAgICBBZGRyZXNzTmFtZUxpc3Q6IFtcclxuICAgICAgICAgICAgJ+aAneaYjicsJ+a5lumHjCcsJ+mbhue+jicsJ+a1t+aypycsJ+e/lOWuiScsJ+WQjOWuiScsJ+WFtuS7lidcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBzZXhMaXN0Olt7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIjBcIixcclxuICAgICAgICAgICAgbmFtZTogXCLlhYjnlJ9cIixcclxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIjFcIixcclxuICAgICAgICAgICAgbmFtZTogXCLlpbPlo6tcIixcclxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgfV0sXHJcblxyXG4gICAgICAgIGNoZWNrYm94TGlzdDoge1xyXG4gICAgICAgICAgICAnc3ViamVjdCc6W3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIjBcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi6K+t5paHXCIsXHJcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIuaVsOWtplwiLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiMlwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLoi7Hor61cIixcclxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIjNcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi54mp55CGXCIsXHJcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCI0XCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIuWMluWtplwiLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIH1dLFxyXG5cclxuICAgICAgICAgICAgJ3dlZWsnOlt7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIuaYn+acn+S4gFwiLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLmmJ/mnJ/kuoxcIixcclxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIjJcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi5pif5pyf5LiJXCIsXHJcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIzXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIuaYn+acn+Wbm1wiLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiNFwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLmmJ/mnJ/kupRcIixcclxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIjVcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi5pif5pyf5YWtXCIsXHJcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCI2XCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIuaYn+acn+aXpVwiLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIH1dLFxyXG5cclxuICAgICAgICAgICAgJ3RpbWVTbG90Jzpbe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLkuIrljYhcIixcclxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIjFcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi5LiL5Y2IXCIsXHJcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCIyXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIuaZmuS4ilwiLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIH1dLFxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgaXNDbGlja0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgIGltZ1VybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9JyxcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzPSB7XHJcbiAgICAgICAgcGlja2VyQWRkcmVzc0NoYW5nZShlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuQWRkcmVzc0luZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXhSYWRpb0NoYW5nZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmFkaW/lj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbGYuc2V4TGlzdC5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXhMaXN0W2ldLmNoZWNrZWQgPSBzZWxmLnNleExpc3RbaV0udmFsdWUgPT09IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2hlY2tib3hDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrYm945Y+R55SfY2hhbmdl5LqL5Lu277yM5pC65bimdmFsdWXlgLzkuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50eXBlXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5JID0gc2VsZi5jaGVja2JveExpc3RbdHlwZV0ubGVuZ3RoOyBpIDwgbGVuSTsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNoZWNrYm94TGlzdFt0eXBlXVtpXS5jaGVja2VkID0gZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbGVuSiA9IHZhbHVlcy5sZW5ndGg7IGogPCBsZW5KOyArK2opIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jaGVja2JveExpc3RbdHlwZV1baV0udmFsdWUgPT09IHZhbHVlc1tqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoZWNrYm94TGlzdFt0eXBlXVtpXS5jaGVja2VkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICBcclxuICAgICAgICBmb3JtU3VibWl0KGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgICAgICBsZXQgc2VuZEZvcm1EYXRhID0gZS5kZXRhaWwudmFsdWUgLy8gZm9ybSDooajljZXmlbDmja5cclxuICAgICAgICAgICAgbGV0IHNleCA9IFwiXCJcclxuICAgICAgICAgICAgaWYoc2VsZi5zZXhMaXN0WzBdLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICAgICAgc2V4ID0gXCLlhYjnlJ9cIlxyXG4gICAgICAgICAgICB9ZWxzZSBpZihzZWxmLnNleExpc3RbMV0uY2hlY2tlZCl7XHJcbiAgICAgICAgICAgICAgICBzZXggPSBcIuWls+Wjq1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydPVGNvbnRhY3ROYW1lJ10gPSBzZW5kRm9ybURhdGFbJ09UY29udGFjdE5hbWUnXSArIHNleFxyXG4gICAgICAgICAgICBzZW5kRm9ybURhdGFbJ1NpZCddID0gTnVtYmVyKHNlbGYuU2lkKVxyXG4gICAgICAgICAgICBzZW5kRm9ybURhdGFbJ09Uc3ViamVjdCddID0gc2VsZi5nZXRDaGVja2VkTGlzdChcInN1YmplY3RcIilcclxuICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydPVHdlZWsnXSA9IHNlbGYuZ2V0Q2hlY2tlZExpc3QoXCJ3ZWVrXCIpXHJcbiAgICAgICAgICAgIHNlbmRGb3JtRGF0YVsnT1R0aW1lU2xvdCddID0gc2VsZi5nZXRDaGVja2VkTGlzdChcInRpbWVTbG90XCIpXHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VuZEZvcm1EYXRhKVxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvc3R1ZGVudC9pbnNlcnRfb3JkZXJfdGVhY2hlcicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogc2VuZEZvcm1EYXRhLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkv67mlLnmiJDlip/vvIzor7fph43mlrDnmbvlvZUnLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGVja2VkTGlzdCh0eXBlKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgIGxldCByZXMgPSBcIlwiXHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzZWxmLmNoZWNrYm94TGlzdFt0eXBlXS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoc2VsZi5jaGVja2JveExpc3RbdHlwZV1baV0uY2hlY2tlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHJlcyArPSBzZWxmLmNoZWNrYm94TGlzdFt0eXBlXVtpXS5uYW1lICsgXCI7XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXMgPSByZXMuc2xpY2UoMCwtMSlcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgc2VsZi5TaWQgPSBvcHRpb25zLnNpZFxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19