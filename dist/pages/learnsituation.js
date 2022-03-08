'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _moment = require('./../npm/moment/moment.js');

var _moment2 = _interopRequireDefault(_moment);

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
            "usingComponents": {}
        }, _this.data = {
            Sid: null,
            learnSituationList: {},
            learnSituationId: -1,
            isClickCreateLearnSituation: false,
            isClickEditLearnSituation: false,
            slideButtons: [{
                type: 'warn',
                text: '删除',
                extClass: 'DeleteButton'
            }],
            buttons: [{
                text: '取消'
            }, {
                text: '确定',
                extClass: 'DeleteButton'
            }],
            dialogShow: false,
            deleteIndex: -1,
            insertLearnSituationData: { 'daily': ['', '', ''], 'exam': ['', '', ''] },
            insertLSDate: { 'daily': '', 'exam': '' },
            copyLearnSituationList: [],
            tabCur: 0,
            tabList: [{ value: 'daily', name: '平时' }, { value: 'exam', name: '考试' }]
        }, _this.methods = {
            tabSelectBar: function tabSelectBar(e) {
                var self = this;
                self.tabCur = e.currentTarget.dataset.id;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'getLearnSituationData',
        value: function getLearnSituationData() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/student/get_learn_situation_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Sid: self.Sid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.learnSituationList = res.data.Data;

                        for (var i = 0; i < self.learnSituationList['daily'].length; i++) {
                            self.learnSituationList['daily'][i].LSdate = self.learnSituationList['daily'][i].LSdate.substring(0, 10);
                        }

                        for (var _i = 0; _i < self.learnSituationList['exam'].length; _i++) {
                            self.learnSituationList['exam'][_i].LSdate = self.learnSituationList['exam'][_i].LSdate.substring(0, 10);
                        }

                        self.copyLearnSituationList = JSON.parse(JSON.stringify(self.learnSituationList)); //深拷贝
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var self = this;

            self.Sid = _wepy2.default.$instance.globalData.userInfo.Sid;
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;

            self.getLearnSituationData();

            var date = new Date();
            self.insertLSDate['daily'] = (0, _moment2.default)().format('YYYY-MM-DD');
            self.insertLSDate['exam'] = (0, _moment2.default)().format('YYYY-MM-DD');
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/learnsituation'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxlYXJuc2l0dWF0aW9uLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiZGF0YSIsIlNpZCIsImxlYXJuU2l0dWF0aW9uTGlzdCIsImxlYXJuU2l0dWF0aW9uSWQiLCJpc0NsaWNrQ3JlYXRlTGVhcm5TaXR1YXRpb24iLCJpc0NsaWNrRWRpdExlYXJuU2l0dWF0aW9uIiwic2xpZGVCdXR0b25zIiwidHlwZSIsInRleHQiLCJleHRDbGFzcyIsImJ1dHRvbnMiLCJkaWFsb2dTaG93IiwiZGVsZXRlSW5kZXgiLCJpbnNlcnRMZWFyblNpdHVhdGlvbkRhdGEiLCJpbnNlcnRMU0RhdGUiLCJjb3B5TGVhcm5TaXR1YXRpb25MaXN0IiwidGFiQ3VyIiwidGFiTGlzdCIsInZhbHVlIiwibmFtZSIsIm1ldGhvZHMiLCJ0YWJTZWxlY3RCYXIiLCJlIiwic2VsZiIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJzZXJ2ZXJVcmwiLCJtZXRob2QiLCJoZWFkZXIiLCJzZXRIZWFkZXIiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsIkNvZGUiLCJEYXRhIiwiaSIsImxlbmd0aCIsIkxTZGF0ZSIsInN1YnN0cmluZyIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIiRhcHBseSIsInVzZXJJbmZvIiwiZ2V0TGVhcm5TaXR1YXRpb25EYXRhIiwiZGF0ZSIsIkRhdGUiLCJmb3JtYXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0wsK0JBQW1CO0FBRGQsUyxRQU1UQyxJLEdBQU87QUFDSEMsaUJBQUksSUFERDtBQUVIQyxnQ0FBbUIsRUFGaEI7QUFHSEMsOEJBQWtCLENBQUMsQ0FIaEI7QUFJSEMseUNBQTZCLEtBSjFCO0FBS0hDLHVD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QixlQUFLRyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJtQixRQUExQixDQUFtQ2pELEdBQTlDO0FBQ0g7OztpQ0FFUTtBQUNMLGdCQUFJc0IsT0FBTyxJQUFYOztBQUVBQSxpQkFBSzRCLHFCQUFMOztBQUVBLGdCQUFJQyxPQUFPLElBQUlDLElBQUosRUFBWDtBQUNBOUIsaUJBQUtULFlBQUwsQ0FBa0IsT0FBbEIsSUFBOEIsd0JBQVN3QyxNQUFULENBQWdCLFlBQWhCLENBQTlCO0FBQ0EvQixpQkFBS1QsWUFBTCxDQUFrQixNQUFsQixJQUE2Qix3QkFBU3dDLE1BQVQsQ0FBZ0IsWUFBaEIsQ0FBN0I7QUFDSDs7OztFQXRGOEIzQixlQUFLNEIsSTs7a0JBQW5CekQsSyIsImZpbGUiOiJsZWFybnNpdHVhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICAgIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JzsgXHJcbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgICAgICBjb25maWcgPSB7XHJcbiAgICAgICAgICAgIFwidXNpbmdDb21wb25lbnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgU2lkOm51bGwsXHJcbiAgICAgICAgICAgIGxlYXJuU2l0dWF0aW9uTGlzdDp7fSxcclxuICAgICAgICAgICAgbGVhcm5TaXR1YXRpb25JZDogLTEsXHJcbiAgICAgICAgICAgIGlzQ2xpY2tDcmVhdGVMZWFyblNpdHVhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzQ2xpY2tFZGl0TGVhcm5TaXR1YXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICBzbGlkZUJ1dHRvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dhcm4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfliKDpmaQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4dENsYXNzOiAnRGVsZXRlQnV0dG9uJyxcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICBidXR0b25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflj5bmtognLFxyXG4gICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+ehruWumicsXHJcbiAgICAgICAgICAgICAgICAgICAgZXh0Q2xhc3M6ICdEZWxldGVCdXR0b24nLFxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIGRpYWxvZ1Nob3c6IGZhbHNlLFxyXG4gICAgICAgICAgICBkZWxldGVJbmRleDotMSxcclxuICAgICAgICAgICAgaW5zZXJ0TGVhcm5TaXR1YXRpb25EYXRhOnsnZGFpbHknOlsnJywnJywnJ10sJ2V4YW0nOlsnJywnJywnJ119LFxyXG4gICAgICAgICAgICBpbnNlcnRMU0RhdGU6eydkYWlseSc6JycsJ2V4YW0nOicnfSxcclxuICAgICAgICAgICAgY29weUxlYXJuU2l0dWF0aW9uTGlzdDpbXSxcclxuICAgICAgICAgICAgdGFiQ3VyOiAwLFxyXG4gICAgICAgICAgICB0YWJMaXN0OiBbe3ZhbHVlOidkYWlseScsbmFtZTon5bmz5pe2J30se3ZhbHVlOidleGFtJyxuYW1lOifogIPor5UnfV0sXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0YWJTZWxlY3RCYXIoZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgICAgICBzZWxmLnRhYkN1ciA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBnZXRMZWFyblNpdHVhdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9zdHVkZW50L2dldF9sZWFybl9zaXR1YXRpb25fbGlzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpZDpzZWxmLlNpZCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZWFyblNpdHVhdGlvbkxpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWxmLmxlYXJuU2l0dWF0aW9uTGlzdFsnZGFpbHknXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZWFyblNpdHVhdGlvbkxpc3RbJ2RhaWx5J11baV0uTFNkYXRlID0gc2VsZi5sZWFyblNpdHVhdGlvbkxpc3RbJ2RhaWx5J11baV0uTFNkYXRlLnN1YnN0cmluZygwLCAxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlbGYubGVhcm5TaXR1YXRpb25MaXN0WydleGFtJ10ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGVhcm5TaXR1YXRpb25MaXN0WydleGFtJ11baV0uTFNkYXRlID0gc2VsZi5sZWFyblNpdHVhdGlvbkxpc3RbJ2V4YW0nXVtpXS5MU2RhdGUuc3Vic3RyaW5nKDAsIDEwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcHlMZWFyblNpdHVhdGlvbkxpc3QgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlbGYubGVhcm5TaXR1YXRpb25MaXN0KSkgLy/mt7Hmi7fotJ1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgb25Mb2FkKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgIFxyXG4gICAgICAgICAgICBzZWxmLlNpZCA9IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEudXNlckluZm8uU2lkXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgb25TaG93KCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNlbGYuZ2V0TGVhcm5TaXR1YXRpb25EYXRhKClcclxuICAgIFxyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcclxuICAgICAgICAgICAgc2VsZi5pbnNlcnRMU0RhdGVbJ2RhaWx5J10gPSAgbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJylcclxuICAgICAgICAgICAgc2VsZi5pbnNlcnRMU0RhdGVbJ2V4YW0nXSA9ICBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICJdfQ==