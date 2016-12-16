Function.prototype.extend=function(superCls){
	var self_prototype=this.prototype;
	var super_prototype=superCls.prototype;
	this.super=super_prototype;
	self_prototype.super=super_prototype;
	for(var key in super_prototype){
		if(!self_prototype[key]){
			self_prototype[key]=super_prototype[key];
		}
	}
	return this;
}
Function.prototype.body=function(obj){
	for(var p in obj){
		this.prototype[p]=obj[p];
	}
	return this;
}
/*
	Author: Eric Meng
	作者：孟详毅
	above code implement oop. following is demo. it is little different to java oop. every thing is override by sub-class. in Java, only method override.
	以上实现面向对象，以下是例子。有点不同和java面向对象，所有都被子类覆盖。java 只有方法被覆盖。
	please follow LGPL protocol
	请遵守 LGPL 协议
	my wechat is: treeiv email:cat555666@126.com, if you have question, my pleasure to discuss.
	我的微信是treeiv. 电邮 cat555666@126.com. 如果有问题欢迎讨论。


var Animal=function(){
	alert("Animal name is "+this.name);
}.body({
	name:"generic animal",
	sing:function(){
		alert(this.name+" sing");
	}
});

var Chiken=function(){
	Chiken.super.constructor.apply(this, arguments);// or this.super.constructor.apply(this, arguments);
	alert("Chiken name is "+this.name);
}.body({
	name:"chiken",
	sing:function(sth){
		alert(this.name+" sing ji ji gou " + sth);
	}
}).extend(Animal);

var Duck=function(){
	Duck.super.constructor.apply(this,arguments);
	alert("Duck name is "+this.name);
}.body({
	name:"duck",
	sing:function(){
		Duck.super.sing.apply(this,arguments)
		alert(this.name+" sing gua gua");
	}
}).extend(Animal);

var TomDuck=function(){
	TomDuck.super.constructor.apply(this,arguments);
	alert("TomDuck name is "+this.name);
}.body({
	name:"Tom duck",
	sing:function(){
		alert(this.name+" what's fuck sing");
	}
}).extend(Duck);

var tomDuck=new TomDuck();
tomDuck.sing();
var duck=new Duck();
duck.sing("....");

*/
