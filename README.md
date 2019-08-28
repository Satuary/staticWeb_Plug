静态官网3件套
====  

### backTop返回顶部

* backTopSpeed：返回顶部速度<br/>
* btnContent：按钮内容<br/>

#### 注意：

1. 返回头部元素设定id='goToTop'
2. css可自定义


```js
$("body").backTop()
```

```js
// 给按钮添加自定义内容
$("body").backTop({
	btnContent: "<i class='iconfont iconzhiding'></i>"
})
```

```css
#goToTop{
	width: 60px;
	height: 60px;
	line-height: 60px;
	border-radius: 50%;
	background: rgba(0, 0, 0, .6);
	position: fixed;
	bottom: 50px;
	right: 60px;
	z-index: 2;
	cursor: pointer;
	transition: .3s;
	text-align: center;
}
#goToTop:hover{
	box-shadow:1px 1px 4px 3px rgba(0, 0, 0, 0.2);
}
#goToTop:before{
	content: '';
	width: 20px;
	height: 2px;
	background: #fff;
	position: absolute;
	bottom: 0;
	transform: rotate(132deg) translate(-10px,31px);
}
#goToTop:after{
	content: '';
	width: 20px;
	height: 2px;
	background: #fff;
	position: absolute;
	transform: rotate(-132deg) translate(-20px,-22px);
}
```

<br/> 
### fullScreen满屏插件
 
====  
* ExcludeObj：需要排除(减掉)的元素<br/>
* model：设置属性使自身满屏 0 / 1<br/>
* offsetNum：偏移值，在居中的基础上偏移<br/>
* media：哪个分辨率下不执行全屏<br/>

#### 注意：

1. model = 0 设置 height，model = 1 设置pading
2. 偏移值：offsetNum=padding-top + offsetNum / -offsetNum padding-top - offsetNum


```js
$(".bannerText").fullScreen();
```

```js
// 设置排除元素
$(".content_box").fullScreen({
	model: 0,
	ExcludeObj: [$(".navbar"), $(".content .form")]
});
```

```js
// 设置偏移值和不起效分辨率
$(".banner").fullScreen({
	offsetNum: -20,
	media: 640
});
```
 
 
<br/>
### anchor锚点跳转滚动
 
====  

* navClass：滚动后添加的className<br/>
* excludeObj：不包含进导航栏的区块<br/>
* anchorSpeed：锚点滚动到区块速度<br/>
* customAction：自定义操作<br/>

#### 注意：

1. 锚点a标签必须添加'anchorJump' className
2. 默认的导航栏滚动后className是“headerScroll” 
3. 自定义操作会在点击锚点跳转和页面滚动的时候执行


```js
$(".navbar").anchor({
	navClass: 'headerChange',
	ExcludeObj: [$(".header"), $(".needs")]
});
```

```html
<div class="navBox collapse navbar-collapse col-lg-9 col-md-9 col-sm-9 col-xs-12 clearfix"  id="bs-example-navbar-collapse-1" >
	<ul class="login pull-right">
		<li><a class="anchorJump" href="#about" name="about">ABOUT US</a></li>
		<li><a class="anchorJump" href="#map" name="map">LOCATIONS</a></li>
		<li><a class="anchorJump" href="#services" name="services">SERVICES</a></li>
		<li><a class="anchorJump" href="#team" name="team">TEAM</a></li>
		<li><a class="anchorJump" href="#clinic" name="clinic">CLINIC CENTER</a></li>
		<li><a class="anchorJump" href="#projects" name="projects">PROJECTS</a></li>
	</ul>
</div>
```
