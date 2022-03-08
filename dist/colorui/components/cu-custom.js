'use strict';

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp();

Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: _wepy2.default.$instance.globalData.StatusBar,
    CustomBar: _wepy2.default.$instance.globalData.CustomBar,
    Custom: _wepy2.default.$instance.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage: function BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome: function toHome() {
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1LWN1c3RvbS5qcyJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCJDb21wb25lbnQiLCJvcHRpb25zIiwiYWRkR2xvYmFsQ2xhc3MiLCJtdWx0aXBsZVNsb3RzIiwicHJvcGVydGllcyIsImJnQ29sb3IiLCJ0eXBlIiwiU3RyaW5nIiwiZGVmYXVsdCIsImlzQ3VzdG9tIiwiQm9vbGVhbiIsImlzQmFjayIsImJnSW1hZ2UiLCJkYXRhIiwiU3RhdHVzQmFyIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJDdXN0b21CYXIiLCJDdXN0b20iLCJtZXRob2RzIiwiQmFja1BhZ2UiLCJ3eCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwidG9Ib21lIiwicmVMYXVuY2giLCJ1cmwiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7OztBQURBLElBQU1BLE1BQU1DLFFBQVo7O0FBRUFDLFVBQVU7QUFDUjs7O0FBR0FDLFdBQVM7QUFDUEMsb0JBQWdCLElBRFQ7QUFFUEMsbUJBQWU7QUFGUixHQUpEO0FBUVI7OztBQUdBQyxjQUFZO0FBQ1ZDLGFBQVM7QUFDUEMsWUFBTUMsTUFEQztBQUVQQyxlQUFTO0FBRkYsS0FEQztBQUtWQyxjQUFVO0FBQ1JILFlBQU0sQ0FBQ0ksT0FBRCxFQUFVSCxNQUFWLENBREU7QUFFUkMsZUFBUztBQUZELEtBTEE7QUFTVkcsWUFBUTtBQUNOTCxZQUFNLENBQUNJLE9BQUQsRUFBVUgsTUFBVixDQURBO0FBRU5DLGVBQVM7QUFGSCxLQVRFO0FBYVZJLGFBQVM7QUFDUE4sWUFBTUMsTUFEQztBQUVQQyxlQUFTO0FBRkY7QUFiQyxHQVhKO0FBNkJSOzs7QUFHQUssUUFBTTtBQUNKQyxlQUFXQyxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJILFNBRGpDO0FBRUpJLGVBQVdILGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FGakM7QUFHSkMsWUFBUUosZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCRTtBQUg5QixHQWhDRTtBQXFDUjs7O0FBR0FDLFdBQVM7QUFDUEMsWUFETyxzQkFDSTtBQUNUQyxTQUFHQyxZQUFILENBQWdCO0FBQ2RDLGVBQU87QUFETyxPQUFoQjtBQUdELEtBTE07QUFNUEMsVUFOTyxvQkFNQztBQUNOSCxTQUFHSSxRQUFILENBQVk7QUFDVkMsYUFBSztBQURLLE9BQVo7QUFHRDtBQVZNO0FBeENELENBQVYiLCJmaWxlIjoiY3UtY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gZ2V0QXBwKCk7XG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuQ29tcG9uZW50KHtcbiAgLyoqXG4gICAqIOe7hOS7tueahOS4gOS6m+mAiemhuVxuICAgKi9cbiAgb3B0aW9uczoge1xuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxuICAgIG11bHRpcGxlU2xvdHM6IHRydWVcbiAgfSxcbiAgLyoqXG4gICAqIOe7hOS7tueahOWvueWkluWxnuaAp1xuICAgKi9cbiAgcHJvcGVydGllczoge1xuICAgIGJnQ29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcnXG4gICAgfSwgXG4gICAgaXNDdXN0b206IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGlzQmFjazoge1xuICAgICAgdHlwZTogW0Jvb2xlYW4sIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgYmdJbWFnZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJydcbiAgICB9LFxuICB9LFxuICAvKipcbiAgICog57uE5Lu255qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgU3RhdHVzQmFyOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLlN0YXR1c0JhcixcbiAgICBDdXN0b21CYXI6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuQ3VzdG9tQmFyLFxuICAgIEN1c3RvbTogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5DdXN0b21cbiAgfSxcbiAgLyoqXG4gICAqIOe7hOS7tueahOaWueazleWIl+ihqFxuICAgKi9cbiAgbWV0aG9kczoge1xuICAgIEJhY2tQYWdlKCkge1xuICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgZGVsdGE6IDFcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdG9Ib21lKCl7XG4gICAgICB3eC5yZUxhdW5jaCh7XG4gICAgICAgIHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcsXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSkiXX0=