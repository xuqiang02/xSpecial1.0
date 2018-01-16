(function($) {
  //闭包
  $.fn.sbPlugin = (function() {
    var compath = 'framecom/'; //插件根目录
    var jsPluginPathHash = {}; //js插件哈希表
    var cssPluginPathHash = {}; //css插件哈希表
    var pluginHash = {}; //特效节点哈希表
    var count = 1;
    return function() {
      if (!this.length) {
        return this;
      }
      this.each(function(index) {
        var $this = $(this);
        //获取特效路径
        if ($this.attr('pluginLoading') == 'done') {
          return true;
        }
        var lujing = $this.attr('path') || $this.attr('name');
        //获取特效方法
        var mingcheng = $this.attr('name');
        //获取特效JS路径
        var pluginJsPath = compath + lujing + '/js/' + mingcheng + '.js';
        //获取特效CSS路径
        if ($this.attr('usecss') != 'false') {
          var pluginCssPath = compath + lujing + '/css/' + mingcheng + '.css';
          if (!cssPluginPathHash[pluginCssPath]) {
            cssPluginPathHash[pluginCssPath] = true;
            var csstag = document.createElement('link');
            csstag.setAttribute('type', 'text/css');
            csstag.setAttribute('rel', 'stylesheet');
            csstag.setAttribute('class', 'pluginstyle');
            csstag.setAttribute('name', mingcheng);
            csstag.setAttribute('href', pluginCssPath);
            $("head")[0].appendChild(csstag);
          }
        }
        if ($this.attr('usecss') == 'only') {
          return true;
        }
        if($this.attr('usejs') != 'false') {
          //如果特效JS路径在哈希表中不存在
          if (!jsPluginPathHash[pluginJsPath]) {
            //将JS路径加入哈希表并将状态设置为LODING
            jsPluginPathHash[pluginJsPath] = 'loading';
            //为特效节点哈希表的当前特效建立数组
            pluginHash[mingcheng] = pluginHash[mingcheng] || [];
            //将当前节点插入对应数组队列
            pluginHash[mingcheng].push($this);
            console.log(mingcheng);
            //动态调用JS
            $.getScript(pluginJsPath, function() {
              //调用成功后将JS插件哈希表的当前特效状态调整为DONE
              jsPluginPathHash[pluginJsPath] = 'done';
              //循环对应特效节点数组
              for (var i in pluginHash[mingcheng]) {
                var thischajian = pluginHash[mingcheng][i];
                var optionsjson = eval('[' + thischajian.attr('options') + ']')[0];
                var zijiedian = thischajian.attr('childdoms');
                if (zijiedian) {
                  thischajian.find(zijiedian)[thischajian.attr('name')](optionsjson);
                } else {
                  thischajian[thischajian.attr('name')](optionsjson);
                }
                thischajian.attr('pluginLoading', 'done');
              }
              pluginHash[mingcheng] = [];
            })
          } else if (jsPluginPathHash[pluginJsPath] == 'loading') {
            pluginHash[mingcheng].push($this);
          } else if (jsPluginPathHash[pluginJsPath] == 'done') {
            var optionsjson = eval('[' + $this.attr('options') + ']')[0];
            var zijiedian = $this.attr('zijiedian');
            if (zijiedian) {
              $this.find(zijiedian)[$this.attr('name')](eval('[' + $this.attr('options')+ ']')[0]);
            } else {
              $this[$this.attr('name')](eval('[' + $this.attr('options')+ ']')[0]);
            }
          }
        }
      });
      return this;
    }
  })();
})(jQuery);
(function($) {
  $.fn.superbirdrTab = function(options) {
    if (!this.length) {
      return this;
    }
    var opts = $.extend(true, {}, $.fn.superbirdrTab.defaults, options);
    this.each(function() {
      var $this = $(this);
      var eventdata = $this.data("event");
      var tagclass = $this.data("tagclass") ? $this.data("tagclass") : ".tabtag";
      var contentclass = $this.data("contentclass") ? $this.data("contentclass") : '.tabcontent';
      var startindex = $this.data("startindex") ? $this.data("startindex") : 0;
      startindex = parseInt(startindex);
      var tag = $this.find(tagclass);
      var content = $this.find(contentclass);
      $(tag[startindex]).addClass('active');
      $(content[startindex]).addClass('active');
      tag.each(function(index, el) {
        var _this = $(this);
        if (eventdata == "hover") {
          _this.mouseenter(function(event) {
            showtab(tag, content, index)
          });
        } else {
          _this.click(function(event) {
            showtab(tag, content, index)
          });
        }
      });
    });

    function showtab(objNow, objContent, count) {
      objNow.removeClass('active');
      $(objNow[count]).addClass('active');

      objContent.removeClass('active');
      $(objContent[count]).addClass('active');
    }
    return this;
  };
})(jQuery);
(function($) {
  $.fn.superbirdLimitText = function(options) {
    if (!this.length) {
      return this;
    }
    this.each(function() {
      var $this = $(this);
      var text = $this.text();
      var needLength = $this.data("textlength") ? $this.data("textlength") : 20;
      var morestyle = $this.data("morestyle") ? $this.data("morestyle") : "...";
      needLength = parseInt(needLength);
      if (text.length > needLength) {
        $this.text(text.substr(0, needLength) + morestyle);
      }
    });
    return this;
  };
})(jQuery);


jQuery(document).ready(function($) {
  beforePlugin();
  $('.sbplugin').sbPlugin();
  afterPlugin();
  $('.sb-tab').superbirdrTab();
  $('.sb-limitText').superbirdLimitText();
});

function beforePlugin() {

}

function afterPlugin() {

}