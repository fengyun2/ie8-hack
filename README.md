# ie8-hack(兼容IE6/7/8)

### 1. 背景透明,文字不透明 (background-opacity文件夹):
---
# 【原】CSS实现背景透明，文字不透明，兼容所有浏览器

## 如何实现背景透明，文字不透明，兼容所有浏览器？

我们平时所说的调整透明度，其实在样式中是调整`不透明度`


实现透明的css方法通常有以下3种方式，以下是不透明度都为80%的写法
* css3的 `opacity:x`，x 的取值从 0 到 1，如opacity: 0.8
* css3的 `rgba(red, green, blue, alpha)`，alpha的取值从 0 到 1，如rgba(255,255,255,0.8)
* IE专属滤镜 `filter:Alpha(opacity=x)`，x 的取值从 0 到 100，如filter:Alpha(opacity=80)

### css3的 opacity

**兼容性：**
IE6、7、8不支持,IE9及以上版本和标准浏览器都支持。
![](http://images.cnitblog.com/blog/278431/201411/131109403195700.jpg)

**使用说明：**
设置opacity元素的`所有后代元素会随着一起具有透明性`，一般用于调整图片或者模块的整体不透明度

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>opacity</title>
<style>
*{
    padding: 0;
    margin: 0;
}
body{
    padding: 50px;
    background: url(img/bg.png) 0 0 repeat;
}
.demo{
  padding: 25px;
  background-color:#000000;
  opacity: 0.2;
}
.demo p{
    color: #FFFFFF;
}
</style>
</head>
<body>

<div class="demo">
    <p>背景透明，文字也透明</p>
</div>

</html>
```

使用opacity后整个模块都透明了，展现如下：
![](http://images.cnitblog.com/blog/278431/201411/111813124757383.jpg)

**总结:**
那么使用 `opacity` 实现《背景透明，文字不透明》是 `不可取` 的。

### css3的rgba
**兼容性:**
IE6、7、8不支持,IE9及以上版本和标准浏览器都支持。
![](http://images.cnitblog.com/blog/278431/201411/131109403195700.jpg)

**使用说明：**
设置颜色的不透明度，一般用于调整`background-color`、`color`、`box-shadow`等的不透明度。
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>css3的rgba</title>
<style>
*{
    padding: 0;
    margin: 0;
}
body{
    padding: 50px;
    background: url(img/bg.png) 0 0 repeat;
}
.demo{
  padding: 25px;
  background-color:#000000;/* IE6和部分IE7内核的浏览器(如QQ浏览器)下颜色被覆盖 */
  background-color:rgba(0,0,0,0.2); /* IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂，但解析为透明 */
}
.demo p{
    color: #FFFFFF;
}
</style>
</head>
<body>

<div class="demo">
    <p>背景透明，文字也透明</p>
</div>

</html>
```
在background-color中使用rgba，标准浏览器中，背景透明，文字不透明，展现如下：
![](http://images.cnitblog.com/blog/278431/201411/131121263031782.jpg)

很奇葩的是，IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂rgba，解析后颜色为透明，其实应该是null

![](http://images.cnitblog.com/blog/278431/201411/131336068034020.jpg)

**总结:**
那么使用`opacity`实现背景透明，文字不透明是`可取`的。

### IE专属滤镜 filter:Alpha(opacity=x)

**使用说明:**
IE浏览器专属，问题多多，本文以设置背景透明为例子，如下：

1. 仅支持IE6、7、8、9，在IE10版本被废除
2. 在IE6、7中，需要激活IE的haslayout属性(如：*zoom:1或者*overflow:hidden)，让它读懂filter:Alpha
3. 在IE6、7、8中，设置了filter:Alpha的元素，父元素设置position:static(默认属性)，其子元素为相对定位，可让子元素不透明

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>opacity</title>
<style>
*{
    padding: 0;
    margin: 0;
}
body{
    padding: 50px;
    background: url(img/bg.png) 0 0 repeat;
}
.demo{
  padding: 25px;
  background: #000000;
  filter:Alpha(opacity=50);/* 只支持IE6、7、8、9 */
  position:static; /* IE6、7、8只能设置position:static(默认属性) ，否则会导致子元素继承Alpha值 */
  *zoom:1; /* 激活IE6、7的haslayout属性，让它读懂Alpha */
}
.demo p{
    color: #FFFFFF;
    position: relative;/* 设置子元素为相对定位，可让子元素不继承Alpha值，保证字体颜色不透明 */
}

</style>
</head>
<body>

<div class="demo">
    <p>背景透明，文字不透明</p>
</div>
</body>
</html>
```

### 全兼容的方案
上以上3点分析可知，设置透明背景文字不透明，可采用的属性有`rgba`和IE的专属滤镜`filter:Alpha`，其兼容性如下图所示：
![](http://images.cnitblog.com/blog/278431/201411/131314299751998.jpg)

针对IE6、7、8浏览器，我们可以采用fiter:Alpha，针对标准浏览器我们采用rgba，那么问题来了，IE9浏览器2个属性都支持，一起使用会重复降低不透明度...

那么，如何只对IE6、7、8使用fiter:Alpha如何实现呢？2年前写过[《CSS hack整理》](http://www.cnblogs.com/PeunZhang/archive/2012/04/09/2437563.html)一文，最新我也做了点更新，里面有IE的相关hack，找到只支持IE 6、7、8的方案，如下：
```css
/* 只支持IE6、7、8 */

@media \0screen\,screen\9 {...}
```
ok，所有问题都解决了，全部代码如下：
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>背景透明，文字不透明</title>
<style>
*{
    padding: 0;
    margin: 0;
}

body{
  padding: 50px;
  background: url(img/bg.png) 0 0 repeat;
}

.demo{
  padding: 25px;
  background-color: rgba(0,0,0,0.5);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
}
.demo p{
  color: #FFFFFF;
}
@media \0screen\,screen\9 {/* 只支持IE6、7、8 */
  .demo{
    background-color:#000000;
    filter:Alpha(opacity=50);
    position:static; /* IE6、7、8只能设置position:static(默认属性) ，否则会导致子元素继承Alpha值 */
    *zoom:1; /* 激活IE6、7的haslayout属性，让它读懂Alpha */
  }
  .demo p{
    position: relative;/* 设置子元素为相对定位，可让子元素不继承Alpha值 */
  }
}

</style>
</head>
<body>

<div class="demo">
    <p>背景透明，文字不透明</p>
</div>

</body>
</html>
```



### 参考网址:
1. http://www.cnblogs.com/PeunZhang/p/4089894.html


### 2. 支持html5(html5-tag文件夹):
---
`html5shiv` - 让ie6/ie7/ie8下支持HTML5标签

### 一、 简介
HTML5的语义化标签以及属性，可以让开发者非常方便地实现清晰的web页面布局，加上CSS3的效果渲染，快速建立丰富灵活的web页面显得非常简单。

HTML5的新标签元素有：

*  <header>定义页面或区段的头部；
*  <footer>定义页面或区段的尾部；
*  <nav>定义页面或区段的导航区域；
*  <section>页面的逻辑区域或内容组合；
*  <article>定义正文或一篇完整的内容；
*  <aside>定义补充或相关内容；

### 二、解决方法

#### 2.1 方式一: 手写JavaScript
```js
<!--[if lt IE 9]>
<script>
   (function() {
     if (!
     /*@cc_on!@*/
     0) return;
     var e = "abbr, article, aside, audio, canvas, datalist, details, dialog, eventsource, figure, footer, header, hgroup, mark, menu, meter, nav, output, progress, section, time, video".split(', ');
     var i= e.length;
     while (i--){
         document.createElement(e[i])
     }
})()
</script>
<![endif]-->
```

#### 2.2 第二种方法：使用Google的html5shiv包（推荐）
```js
<!--[if lt IE 9]>
<script src="http://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.js"></script>
<![endif]-->
```
**但是不管使用以上哪种方法,都要初始化新标签的CSS.因为HTML5在默认情况下表现为内联元素，对这些元素进行布局我们需要利用CSS手工把它们转为块状元素方便布局**

```css
/*html5*/
article,aside,dialog,footer,header,section,footer,nav,figure,menu{display:block}
```

但是如果ie6/7/8 禁用脚本的用户,那么就变成了无样式的"白板"网页,我们该怎么解决呢?

我们可以参照facebook的做法，即引导用户进入带有noscript标识的 “/?_fb_noscript=1”页面，用 html4 标签替换 html5 标签，这要比为了保持兼容性而写大量 hack 的做法更轻便一些。
```html
<!--[if lte IE 8]>
<noscript>
     <style>.html5-wrappers{display:none!important;}</style>
     <div class="ie-noscript-warning">您的浏览器禁用了脚本，请<a href="">查看这里</a>来启用脚本!或者<a href="/?noscript=1">继续访问</a>.
     </div>
</noscript>
<![endif]-->
```

### 三、参考网址:
1. http://www.cnblogs.com/Capricornus/archive/2013/03/26/2982122.html
2. https://github.com/aFarkas/html5shiv





### 3. 支持媒体查询(media-query文件夹):
---
`respond.js` 让IE6-8支持CSS3 Media Query媒体查询

### 一、简介
`Respond.js` 是一个快速、轻量的 polyfill，用于为 Internet Explorer 6-8 以及其它不支持 CSS3 Media Queries 的浏览器提供媒体查询的 `min-width` 和 `max-width` 特性，实现响应式网页设计（Responsive Web Design）。

### 2、使用

1. 首先引用`respond.min.js`脚本（1kb min/gzipped），放到所有css文件之后（它越早运行，ie用户看到非media内容的闪烁的几率越小）

2. 使用 `min-width/max-width` Media Queries 手写你的 `css`, 首先适应移动端的布局,然后到PC端。
```css
@media screen and (min-width: 480px){
    styles for 480px and up go here
}
```

### 三、 内容分发网络/多域名启动（CDN/X-Domain Setup）
Respond.js通过AJAX请求一个你的css的原始副本，那么如果你部署你的样式文件在cdn上（或者子域名下），你需要上传一个代理页面来跨域通信。

看一个跨域的demo – `cross-domain/example.html`[或者参考[`github`](https://github.com/scottjehl/Respond/tree/master/cross-domain)]:

上传 `cross-domain/respond-proxy.html` 到你的外部域名上
上传 `cross-domain/respond.proxy.gif` 到你的原始域名
通过元素 来引用文件：
```html
<!-- Respond.js proxy on external server -->
<link href="http://externalcdn.com/respond-proxy.html" id="respond-proxy" rel="respond-proxy" />
<!-- Respond.js redirect location on local server -->
<link href="/path/to/respond.proxy.gif" id="respond-redirect" rel="respond-redirect" />
<!-- Respond.js proxy script on local server -->
<script src="/path/to/respond.proxy.js"></script>
```

### 四、支持和注意事项（caveats）
一些注意事项要牢记：

脚本的着重点故意收窄的，仅仅对 min-width 和 max-width media queries 以及所有的media types(screen,print,等等)不支持的浏览器提供支持。我只是想保持文件的简化，可维护性，执行性能。因此 我特意限制支持某些属性，这些属性对设计响应性设计（首要移动端）来说有潜在需要。将来，我可能返工一些事情来通过钩子（hook）引进其他 media query 特性–敬请期待！

对于原生支持css3 mqdia queries的浏览器要尽可能的选择退出执行此脚本。在测试支持中，所有其他经过快速测试的浏览器在运行此脚本之前决定他们是否支持 media query。这些测试所需文件现在都是include在页面顶部，如果使用window.matchMedia polyfill 请点击这里。如果你已经通过Modernizr或者以其他方式包含了这样的polyfill，请随时删除该部分（maybe matchMedia.js）。

这个脚本不依赖其他脚本或库（它内部包含了matchMedia polyfill）,并且为移动端做了优化（~1kb total filesize min/gzip）。

正如你所想，在考虑css 解析规则时，这个实现是想当笨的。这是个好事情，因为这让你运行的真正快起来，但是它的松散可能会一些意外的表现。例如：如果在评论里括住一个完整的 media query故意打破它的规则，你可能发现这些规则在不支持media query的浏览器里失效了。

Respond.js 不解析通过@import引用的css，也不解析包含在style标签内联的media queries，因为这些样式不能重新请求解析。

因为安全的限制，一些浏览器可能不允许这个脚本在file://ruls里起作用(因为他使用XMLHTTPRequest)。在服务器端运行它。

目前，写在link元素上的media属性是被支持的，但只有当链接的样式里没有包含media queries时。如果它包含queries，media属性将会被忽略，文件内部的queries将会被正常解析。换句话说，在css文件里的 @media表达式具有优先权。

据说，如果css文件是用UTF-8有BOM(Byte-Order-Mark)编码,在加载有Respond.js的IE7、IE8浏览器里，将不起作用。

警告：包含@font-face规则的media query将会导致IE7和IE8在加载中挂起。为了解决这个问题，将@font-face规则放的更宽广，让它作为其他media queries的一个同辈。

### 五、工作原理
基本上，这个脚本循环遍历所有的页面上的css引用，运行1、2个正则表达式来查找media queries和他们相关的css块。在ie浏览器里，样式的内容是不可能从它的预解析的状态（在ie8-,意味它的media queries已经从文本中移除了）取到的，因此 Respond.js 使用Ajax重新请求css文件，解析返回来的文本。确保你配置正确，缓存你的css文件，这样这些重新请求实际上没有到服务器端，而是取自浏览器的缓存 里。

从这，每个media query 块会以次追加到head标签里，这些样式元素起不起作用（注意：追加和移除从DOM），取决于他们的min/max width与浏览器宽度的比较结果。在style元素上的media属性将会匹配在css文件里的 query，这样它就可能是”screen”,”projector”或者任何你想要的类型。任何在css里的相对路径将会加上他们样式的href属性的 前缀，因此图片地址将会指向他们正确的目标。

### 六、API选项？

没错，就一对：

respond.update():返回解析器（如果你增加样式到页面，它需要被转换时，这很有用）
respond.mediaQueriesSupported：如果浏览器原生支持media queries时，设为true。


### 参考网址:
1. http://www.uedsc.com/respond-js.html
2. https://github.com/scottjehl/Respond

### 4. 支持CSS3选择器之圆角(border-radius文件夹):
---
# PIE ~ 让 IE6 ~ 9 支持 CSS3一些新特性(例如 border-radius属性)
项目首页: http://css3pie.com/

### 简介

### 特性

* border-radius
* box-shadow
* border-image
* multiple background images
* linear-gradient as background image

### 使用
在 css 中引入 PIE.htc

例子:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../css/border-radius.css" />
  <style type="text/css">
    body {
      font-size: 12px;
    }
    #tests div {
      padding: 1.5em;
      margin: 1em 0;
      behavior: url(../js/PIE.htc);
      position: relative;
      background: #CCF;
      overflow: hidden;
    }

    .br10 {
      border-radius: 10px;
    }
    .br1em {
      border-radius: 1em;
    }
    .br20 {
      border-radius: 20%;
    }
  </style>

</head>
<body>


  <h1>PIE Demo: border-radius</h1>


  <!-- noformat on -->

  <p>This page demonstrates various aspects of PIE's <code>border-radius</code> rendering. Load this page in IE 6-8 to see it in action.</p>

  <div id="tests">
    <h2>Uniform</h2>
    <div class="br10">border-radius: 10px;</div>
    <div class="br1em">border-radius: 1em;</div>
    <div class="br20">border-radius: 20%;</div>
  </div>

</body>
</html>


```

### 参考地址:
1. https://github.com/lojjic/PIE




### 5. 使CSS3支持nth-child 和 使JQuery选择器nth-child支持$('div: nth-child(2)') (nth-child文件夹):
---

# Selectivizr-让IE6~8支持CSS3伪类和属性选择器[即是让ie7/ie8支持CSS3的nth-child选择器和jquery的nth-child选择器]

此项目首页: http://selectivizr.com/

### 一、简介
`selectivizr`是一个JavaScript工具，使IE浏览器也可以支持CSS3伪类以及属性选择器，使用很简单，只要把js include到页面上，然后你就可以(～ o ～)~zZ补觉了。

**优点在于：**
1. 让老的IE浏览器支持19个CSS3伪类，2个伪元素，以及所有的属性选择器。
2. 即使你完全不懂JavaScript，也没有关系，因为你只要链接这个文件就ok了。
3. 可以与现存的JavaScript库协调工作。

### 二、使用
直接调用 JavaScript 文件就可以了
```html
<script type="text/javascript" src="[JS library]"></script>

<!- -[if (gte IE 6)&(lte IE 8)]>

      <script type="text/javascript" src="selectivizr.js"></script>

      <noscript><link rel="stylesheet" href="[fallback css]" /></noscript>

<![endif]- ->
```

但是经过测试,我改为以下才能运行:
```html
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/selectivizr-min.js"></script>
<link rel="stylesheet" href="../css/nth.css" />
```
按照原作者的说法，JavaScript文件要放在页面的`<head>`标签里，而且需要使用一种下图所示的JavaScript库。

下图为JavaScript库和Selectivizr对CSS3伪类等特性的支持情况表的截图（点击图片可查看大图）：
![](http://image.zhangxinxu.com/image/blog/201009/2010-09-14_225522.png)

### 三、必须知道的一些注意事项
1. Selectivizr自动检测最佳的JavaScript库，如果你一个JavaScript库都没有调用，则IE下的伪类是不起作用的。
2. 样式属性必须使用`<link>`标签，但是你可以使用@import在你的样式表里面，以<style>标签定义的CSS样式是不会被解析的。
3. 由于安全原因，样式文件需以域的形式调用，像是file:是不起作用的。
4. 此效果非动态的。一旦样式被应用就被固定了，DOM改变时不会映射过去的。
5. 如果JavaScript不可以，你可以使用<noscript>标签调用一个用以反馈提示的样式文件。
6. Selectivizr要想在IE下起作用，需要时标准模式，请检查您的页面头部是否有DTD 。

### 参考网址:
1. http://www.zhangxinxu.com/wordpress/2010/09/selectivizr-%E8%AE%A9ie6ie7ie8%E6%94%AF%E6%8C%81css3%E4%BC%AA%E7%B1%BB%E5%92%8C%E5%B1%9E%E6%80%A7%E9%80%89%E6%8B%A9%E5%99%A8/
