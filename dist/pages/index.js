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
      usingComponents: {
        "mp-dialog": "/miniprogram_npm/weui-miniprogram/dialog/dialog"
      }
    }, _this.data = {
      userInfo: null,
      studentIconNoLogin: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=none_userinfo.png',
      dialogShow: false,
      dialogShowOneButton: false,
      buttons: [{ text: '稍后登录' }, { text: '确定' }],
      oneButton: [{ text: '确定' }],
      imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name='
    }, _this.methods = {
      onClick: function onClick(e) {
        var self = this;
        this.$navigate({ url: e.currentTarget.dataset.url + "?sid=" + self.userInfo.Sid });
      },
      onClickLogin: function onClickLogin() {
        var self = this;
        if (self.userInfo == null) {
          this.$navigate({ url: "login" });
        }
      },
      tapDialogOneButton: function tapDialogOneButton(e) {
        var self = this;
        this.$navigate({ url: "login" });
        self.dialogShowOneButton = false;
      },
      tapDialogButton: function tapDialogButton(e) {
        var self = this;
        if (e.detail.index == 1) {
          this.$navigate({ url: "login" });
        }
        self.dialogShow = false;
      },
      clickAskQuestion: function clickAskQuestion() {
        var self = this;

        _wepy2.default.request({
          url: _wepy2.default.$instance.globalData.serverUrl + '/app/student/insert_ask_question',
          method: 'POST',
          data: {
            "Sid": Number(self.userInfo.Sid),
            "Eid": Number(-1)
          },
          success: function success(res) {
            _wepy2.default.showToast({
              title: '提问成功，请耐心等待老师回复!', //提示的内容,
              icon: 'none', //图标,
              duration: 2000, //延迟时间,
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: function success(res) {}
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onLoad",
    value: function onLoad() {
      var self = this;
    }
  }, {
    key: "onShow",
    value: function onShow() {

      var self = this;
      if (_wepy2.default.$instance.globalData.userInfo != null) {
        self.userInfo = _wepy2.default.$instance.globalData.userInfo;
      } else {
        self.userInfo = null;
      }
      if (self.userInfo == null && !self.dialogShowOneButton) {
        self.dialogShow = true;
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwidXNpbmdDb21wb25lbnRzIiwiZGF0YSIsInVzZXJJbmZvIiwic3R1ZGVudEljb25Ob0xvZ2luIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJzZXJ2ZXJVcmwiLCJkaWFsb2dTaG93IiwiZGlhbG9nU2hvd09uZUJ1dHRvbiIsImJ1dHRvbnMiLCJ0ZXh0Iiwib25lQnV0dG9uIiwiaW1nVXJsIiwibWV0aG9kcyIsIm9uQ2xpY2siLCJlIiwic2VsZiIsIiRuYXZpZ2F0ZSIsInVybCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiU2lkIiwib25DbGlja0xvZ2luIiwidGFwRGlhbG9nT25lQnV0dG9uIiwidGFwRGlhbG9nQnV0dG9uIiwiZGV0YWlsIiwiaW5kZXgiLCJjbGlja0Fza1F1ZXN0aW9uIiwicmVxdWVzdCIsIm1ldGhvZCIsIk51bWJlciIsInN1Y2Nlc3MiLCJyZXMiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsIm1hc2siLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyx1QkFBZ0I7QUFDWixxQkFBYTtBQUREO0FBRFQsSyxRQU1UQyxJLEdBQUs7QUFDSEMsZ0JBQVUsSUFEUDtBQUVIQywwQkFBbUJDLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsNENBRnREO0FBR0hDLGtCQUFZLEtBSFQ7QUFJSEMsMkJBQXFCLEtBSmxCO0FBS0hDLGVBQVMsQ0FBQyxFQUFDQyxNQUFNLE1BQVAsRUFBRCxFQUFpQixFQUFDQSxNQUFNLElBQVAsRUFBakIsQ0FMTjtBQU1IQyxpQkFBVyxDQUFDLEVBQUNELE1BQU0sSUFBUCxFQUFELENBTlI7QUFPSEUsY0FBT1QsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQztBQVAxQyxLLFFBVUxPLE8sR0FBUztBQUNQQyxhQURPLG1CQUNDQyxDQURELEVBQ0k7QUFDVCxZQUFJQyxPQUFPLElBQVg7QUFDQSxhQUFLQyxTQUFMLENBQWUsRUFBQ0MsS0FBSUgsRUFBRUksYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLEdBQXhCLEdBQThCLE9BQTlCLEdBQXdDRixLQUFLZixRQUFMLENBQWNvQixHQUEzRCxFQUFmO0FBQ0QsT0FKTTtBQU1QQyxrQkFOTywwQkFNUTtBQUNiLFlBQUlOLE9BQU8sSUFBWDtBQUNBLFlBQUdBLEtBQUtmLFFBQUwsSUFBZSxJQUFsQixFQUF1QjtBQUNyQixlQUFLZ0IsU0FBTCxDQUFlLEVBQUNDLEtBQUksT0FBTCxFQUFmO0FBQ0Q7QUFDRixPQVhNO0FBY1BLLHdCQWRPLDhCQWNZUixDQWRaLEVBY2U7QUFDcEIsWUFBSUMsT0FBTyxJQUFYO0FBQ0EsYUFBS0MsU0FBTCxDQUFlLEVBQUNDLEtBQUksT0FBTCxFQUFmO0FBQ0FGLGFBQUtSLG1CQUFMLEdBQTJCLEtBQTNCO0FBQ0QsT0FsQk07QUFvQlBnQixxQkFwQk8sMkJBb0JTVCxDQXBCVCxFQW9CWTtBQUNqQixZQUFJQyxPQUFPLElBQVg7QUFDQSxZQUFJRCxFQUFFVSxNQUFGLENBQVNDLEtBQVQsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDdkIsZUFBS1QsU0FBTCxDQUFlLEVBQUNDLEtBQUksT0FBTCxFQUFmO0FBQ0Q7QUFDREYsYUFBS1QsVUFBTCxHQUFrQixLQUFsQjtBQUNELE9BMUJNO0FBNEJQb0Isc0JBNUJPLDhCQTRCVztBQUNaLFlBQUlYLE9BQU8sSUFBWDs7QUFFQWIsdUJBQUt5QixPQUFMLENBQWE7QUFDVFYsZUFBSWYsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQyxrQ0FEakM7QUFFVHVCLGtCQUFRLE1BRkM7QUFHVDdCLGdCQUFLO0FBQ0QsbUJBQU84QixPQUFPZCxLQUFLZixRQUFMLENBQWNvQixHQUFyQixDQUROO0FBRUQsbUJBQU9TLE9BQU8sQ0FBQyxDQUFSO0FBRk4sV0FISTtBQU9UQyxtQkFBUSxpQkFBU0MsR0FBVCxFQUFjO0FBQ3BCN0IsMkJBQUs4QixTQUFMLENBQWU7QUFDYkMscUJBQU8saUJBRE0sRUFDYTtBQUMxQkMsb0JBQU0sTUFGTyxFQUVDO0FBQ2RDLHdCQUFVLElBSEcsRUFHRztBQUNoQkMsb0JBQU0sSUFKTyxFQUlEO0FBQ1pOLHVCQUFTLHNCQUFPLENBQUU7QUFMTCxhQUFmO0FBUUQ7QUFoQlEsU0FBYjtBQWtCSDtBQWpESSxLOzs7Ozs2QkF1REE7QUFDUCxVQUFJZixPQUFPLElBQVg7QUFFRDs7OzZCQUVROztBQUVQLFVBQUlBLE9BQU8sSUFBWDtBQUNBLFVBQUdiLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkosUUFBMUIsSUFBb0MsSUFBdkMsRUFBNEM7QUFDMUNlLGFBQUtmLFFBQUwsR0FBZ0JFLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkosUUFBMUM7QUFDRCxPQUZELE1BRUs7QUFDSGUsYUFBS2YsUUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNELFVBQUdlLEtBQUtmLFFBQUwsSUFBZSxJQUFmLElBQXVCLENBQUNlLEtBQUtSLG1CQUFoQyxFQUFvRDtBQUNsRFEsYUFBS1QsVUFBTCxHQUFrQixJQUFsQjtBQUNEO0FBQ0Y7Ozs7RUF4RmdDSixlQUFLbUMsSTs7a0JBQW5CekMsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICB1c2luZ0NvbXBvbmVudHM6e1xuICAgICAgICAgIFwibXAtZGlhbG9nXCI6IFwiL21pbmlwcm9ncmFtX25wbS93ZXVpLW1pbmlwcm9ncmFtL2RpYWxvZy9kaWFsb2dcIixcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRhPXtcbiAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgc3R1ZGVudEljb25Ob0xvZ2luOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1ub25lX3VzZXJpbmZvLnBuZycsXG4gICAgICBkaWFsb2dTaG93OiBmYWxzZSxcbiAgICAgIGRpYWxvZ1Nob3dPbmVCdXR0b246IGZhbHNlLFxuICAgICAgYnV0dG9uczogW3t0ZXh0OiAn56iN5ZCO55m75b2VJ30sIHt0ZXh0OiAn56Gu5a6aJ31dLFxuICAgICAgb25lQnV0dG9uOiBbe3RleHQ6ICfnoa7lrponfV0sXG4gICAgICBpbWdVcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPScsXG4gICAgfVxuXG4gICAgbWV0aG9kcz0ge1xuICAgICAgb25DbGljayhlKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7dXJsOmUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybCArIFwiP3NpZD1cIiArIHNlbGYudXNlckluZm8uU2lkfSlcbiAgICAgIH0sXG5cbiAgICAgIG9uQ2xpY2tMb2dpbigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIGlmKHNlbGYudXNlckluZm89PW51bGwpe1xuICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKHt1cmw6XCJsb2dpblwifSlcbiAgICAgICAgfVxuICAgICAgfSxcblxuXG4gICAgICB0YXBEaWFsb2dPbmVCdXR0b24oZSkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoe3VybDpcImxvZ2luXCJ9KVxuICAgICAgICBzZWxmLmRpYWxvZ1Nob3dPbmVCdXR0b24gPSBmYWxzZVxuICAgICAgfSxcblxuICAgICAgdGFwRGlhbG9nQnV0dG9uKGUpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIGlmIChlLmRldGFpbC5pbmRleCA9PSAxKSB7XG4gICAgICAgICAgdGhpcy4kbmF2aWdhdGUoe3VybDpcImxvZ2luXCJ9KVxuICAgICAgICB9XG4gICAgICAgIHNlbGYuZGlhbG9nU2hvdyA9IGZhbHNlXG4gICAgICB9LFxuXG4gICAgICBjbGlja0Fza1F1ZXN0aW9uKCl7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcblxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9zdHVkZW50L2luc2VydF9hc2tfcXVlc3Rpb24nLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBcIlNpZFwiOiBOdW1iZXIoc2VsZi51c2VySW5mby5TaWQpLFxuICAgICAgICAgICAgICAgICAgICBcIkVpZFwiOiBOdW1iZXIoLTEpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5Dpl67miJDlip/vvIzor7fogJDlv4PnrYnlvoXogIHluIjlm57lpI0hJywgLy/mj5DnpLrnmoTlhoXlrrksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJywgLy/lm77moIcsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvL+W7tui/n+aXtumXtCxcbiAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICB9XG5cblxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBcbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICBcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYod2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS51c2VySW5mbyE9bnVsbCl7XG4gICAgICAgIHNlbGYudXNlckluZm8gPSB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgICB9ZWxzZXtcbiAgICAgICAgc2VsZi51c2VySW5mbz1udWxsXG4gICAgICB9XG4gICAgICBpZihzZWxmLnVzZXJJbmZvPT1udWxsICYmICFzZWxmLmRpYWxvZ1Nob3dPbmVCdXR0b24pe1xuICAgICAgICBzZWxmLmRpYWxvZ1Nob3cgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiJdfQ==