webpackJsonp([5],{

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);

var PROD_URL = "http://m.dev.shequ.qqdayu.com"; //process.env.BASE_URL在webpack中配置。dev.env.js为测试环境，prod.env.js为发布环境
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.baseURL = PROD_URL; // 配置 apiURL
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.timeout = 50000; // 超时
// http request interceptor
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// Add a response interceptor

__WEBPACK_IMPORTED_MODULE_0_axios___default.a.interceptors.response.use(function (response) {
    // 通过状态码来识别服务器提示信息
    switch (response.status) {
        case 200:
            break;
    }
    let code = response.data.code;
    if (code == 401) {
        window.goLogin();
    }
    if (code == 402) {
        window.location.replace(window.location.origin);
    }
    return response;
}, function (error) {
    // 非状态码错误  在此通过正则处理
    console.log('捕获到一个错误，错误信息：' + error);
    if (/Network Error/i.test(error)) {
        alert('您当前无法上网，请检查你的移动数据开关或wifi是否正常');
    }
    if (/ms exceeded/i.test(error)) {
        alert('您的网络连接不稳定，请检查你的移动数据开关或wifi是否正常');
        $(".weui_loading_toast").hide();
    }
    if (/code 500/i.test(error)) {
        alert('网络异常，请稍后重试');
    }
    return Promise.reject(error);
});
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_axios___default.a);

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var config = {
    wechatConfig: {
        appID: 'wx04d39bf1eb2916cd',
        appsecret: 'e66c1a6d425db43fa1cba7a343d8bfb5',
        redirectUrl: encodeURIComponent(window.location.href)
    }
};
/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * author loins
 * time 20181220
 * 判断是否为微信环境
 */

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
const isWechat = () => {
    let ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger';
};
var wechatConfig = {
    authorizationPage: function (_config, params) {
        if (isWechat()) {
            debugger;
            console.log(_config.wechatCode);
            console.log('loins提醒：当前环境为微信环境');
            if (!localStorage.getItem('wechatCode')) {
                if (window.location.href.split('code').length == 1) {
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${_config.wechatConfig.appID}&redirect_uri=${_config.wechatConfig.redirectUrl}&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect`;
                } else {
                    localStorage.setItem('wechatCode', getQueryString('code'));
                }
            }
        } else {
            console.log('loins提醒：当前环境为非微信环境');
        }
        console.log('config', _config);
    }
};

/* harmony default export */ __webpack_exports__["a"] = (wechatConfig);

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var $utils = {
    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    isWechat: function () {
        let ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    }
};
/* harmony default export */ __webpack_exports__["a"] = ($utils);

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["timeAgo"] = timeAgo;
/* harmony export (immutable) */ __webpack_exports__["formatDate"] = formatDate;
function pluralize(time, label) {
  return time + label + '前';
}

function timeAgo(time) {
  const between = (+Date.now() - +new Date(time)) / 1000;
  if (between < 60) {
    return pluralize(~~between, ' 秒');
  } else if (between < 3600) {
    return pluralize(~~(between / 60), ' 分钟');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' 小时');
  } else if (between < 86400 * 30) {
    return pluralize(~~(between / 86400), ' 天');
  } else if (between < 86400 * 30 * 12) {
    return pluralize(~~(between / (86400 * 30)), '个月');
  } else {
    return pluralize(~~(between / (86400 * 30 * 12)), '年');
  }
}

/* 日期格式化*/
function formatDate(date, fmt) {
  date = new Date(date);
  fmt = fmt || 'yyyy-MM-dd hh:mm';
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
}

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(281);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/',
        name: 'index',
        component: resolve => __webpack_require__.e/* require */(1).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(287)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe)
    }, {
        path: '/showCli',
        name: 'showCli',
        component: resolve => __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(290)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
        meta: {
            scrollToTop: true
        }
    }, {
        path: '/map',
        name: 'map',
        component: resolve => __webpack_require__.e/* require */(3).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(288)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
        meta: {
            scrollToTop: true
        }
    }, {
        path: '*',
        name: 'page404',
        component: resolve => __webpack_require__.e/* require */(2).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(289)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe)
    }]
}));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "/"))

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(286);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

const store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
  state: {
    loading: false,
    direction: 'forward'
  },

  actions: {
    FETCH_LOADING: ({ commit, state }) => {
      return state.loading;
    }
  },

  mutations: {
    SET_LOADING: (state, bool) => {
      state.loading = bool;
    },

    SET_DIRECTION: (state, str) => {
      state.direction = str;
    }
  },

  getters: {
    loading(state, getters) {
      return state.loading;
    },
    direction(state, getters) {
      return state.direction;
    }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_axios__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__filters__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_config__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_config_wechatConfig_js__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_utils__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vux_src_plugins_wechat_index_js__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_vux_src_plugins_ajax_index_js__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vue_verify_plugin__ = __webpack_require__(127);











__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_8_vux_src_plugins_wechat_index_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_9_vux_src_plugins_ajax_index_js__["a" /* default */]);

console.log(__WEBPACK_IMPORTED_MODULE_0_vue___default.a.wechat);

/**
* 获取渠道;
*/
let channelId = __WEBPACK_IMPORTED_MODULE_7__components_utils__["a" /* default */].getQueryString('channelId');
console.log('渠道来源', channelId);

__WEBPACK_IMPORTED_MODULE_6__components_config_wechatConfig_js__["a" /* default */].authorizationPage(__WEBPACK_IMPORTED_MODULE_5__components_config__["a" /* default */], {});


var myRules = {
  phone: {
    test: /^1[34578]\d{9}$/,
    message: "电话号码格式不正确"
  }
};
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_10_vue_verify_plugin__["a" /* default */], {
  blur: true, // 是否失去焦点后开始验证
  rules: myRules
});

const FastClick = __webpack_require__(126);
FastClick.attach(document.body);

Object.keys(__WEBPACK_IMPORTED_MODULE_4__filters__).forEach(key => {
  __WEBPACK_IMPORTED_MODULE_0_vue___default.a.filter(key, __WEBPACK_IMPORTED_MODULE_4__filters__[key]);
});

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$axios = __WEBPACK_IMPORTED_MODULE_3__components_axios__["a" /* default */];

const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);
__WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].beforeEach((to, from, next) => {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex || toIndex === '0' && fromIndex === '0') {
      __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].commit('SET_DIRECTION', 'forward');
    } else {
      __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].commit('SET_DIRECTION', 'reverse');
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].commit('SET_DIRECTION', 'forward');
  }
  next();
});
/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */]
});

/***/ })

},[146]);