(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('qr.js/lib/QRCode'), require('qr.js/lib/ErrorCorrectLevel')) :
  typeof define === 'function' && define.amd ? define(['exports', 'qr.js/lib/QRCode', 'qr.js/lib/ErrorCorrectLevel'], factory) :
  (factory((global.VQrcode = {}),global.QRCodeImpl,global.ErrorCorrectLevel));
}(this, (function (exports,QRCodeImpl,ErrorCorrectLevel) { 'use strict';

  QRCodeImpl = QRCodeImpl && QRCodeImpl.hasOwnProperty('default') ? QRCodeImpl['default'] : QRCodeImpl;
  ErrorCorrectLevel = ErrorCorrectLevel && ErrorCorrectLevel.hasOwnProperty('default') ? ErrorCorrectLevel['default'] : ErrorCorrectLevel;

  (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

  var Component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-qrcode"},[_c('canvas',{directives:[{name:"show",rawName:"v-show",value:(_vm.type === 'canvas'),expression:"type === 'canvas'"}],ref:"canvas",style:({
      height: ((_vm.size) + "px"),
      width: ((_vm.size) + "px")
    }),attrs:{"height":_vm.size,"width":_vm.size}}),_vm._v(" "),(_vm.type === 'img')?_c('img',{style:({
      height: ((_vm.size) + "px"),
      width: ((_vm.size) + "px")
    }),attrs:{"src":_vm.imgData}}):_vm._e()])},staticRenderFns: [],
    name: 'VQrcode',
    props: {
      value: String,
      size: {
        type: Number,
        default: 160
      },
      level: {
        type: String,
        default: 'L'
      },
      bgColor: {
        type: String,
        default: '#FFFFFF'
      },
      fgColor: {
        type: String,
        default: '#000000'
      },
      type: {
        type: String,
        default: 'img'
      }
    },
    mounted: function mounted () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.render();
    });
    },
    data: function data () {
      return {
        imgData: ''
      }
    },
    watch: {
      value: function value () {
        this.render();
      },
      size: function size () {
        this.render();
      },
      level: function level () {
        this.render();
      },
      bgColor: function bgColor () {
        this.render();
      },
      fgColor: function fgColor () {
        this.render();
      }
    },
    methods: {
      render: function render () {
        var this$1 = this;

        if (typeof this.value === 'undefined') {
          return
        }

        var qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[this.level]);
        qrcode.addData(utf16to8(this.value));
        qrcode.make();

        var canvas = this.$refs.canvas;

        var ctx = canvas.getContext('2d');
        var cells = qrcode.modules;
        var tileW = this.size / cells.length;
        var tileH = this.size / cells.length;
        var scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx);
        canvas.height = canvas.width = this.size * scale;
        ctx.scale(scale, scale);

        cells.forEach(function (row, rdx) {
          row.forEach(function (cell, cdx) {
          ctx.fillStyle = cell ? this$1.fgColor : this$1.bgColor;
        var w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW));
        var h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH));
        ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h);
      });
      });
        if (this.type === 'img') {
          this.imgData = canvas.toDataURL('image/png');
        }
      }
    }
  }

  function getBackingStorePixelRatio (ctx) {
    return (
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1
    )
  }

  function utf16to8 (str) {
    var out, i, len, c;
    out = '';
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
    }
    return out
  }

  // Import vue component

  // install function executed by Vue.use()
  function install(Vue) {
    if (install.installed) { return }
    install.installed = true;
    Vue.component('VQrcode', Component);
  }

  // Create module definition for Vue.use()
  var plugin = {
    install: install
  };

  // To auto-install when vue is found
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  // It's possible to expose named exports when writing components that can
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = component;

  exports.install = install;
  exports.default = Component;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
