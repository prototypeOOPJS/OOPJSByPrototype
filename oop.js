var m={
	copyLevels:0,
	deepCopy:function(fromObj,toObj,override){
		m.copyLevels=0;
		if(typeof override == "undefined"){
			override=true;
		}
		m.oneLevelCopy(fromObj,toObj,override);
	},
	oneLevelCopy:function(fromObj,toObj,override){
		if(m.copyLevels++>19){//avoid death loop
			for(var key in fromObj){
				if(typeof toObj[key] == 'undefined'){
					toObj[key]=fromObj[key];
				}else{
					if(override){
						toObj[key]=fromObj[key];
					}
				}
			}
			return;
		}
		console.log("ss "+m.copyLevels)
		for(var key in fromObj){
			if(typeof fromObj[key] == 'object'){
				if(typeof toObj[key] == 'undefined'){
					toObj[key]={};
					m.oneLevelCopy(fromObj[key],toObj[key],override);
				}else if(typeof toObj[key] == 'object'){
					m.oneLevelCopy(fromObj[key],toObj[key],override);
				}else{// means fromObj is object, but target is String int e.g.
					if(override){
						toObj[key]={};
						m.oneLevelCopy(fromObj[key],toObj[key],override);
					}
				}
			}else{
				if(typeof toObj[key] == 'undefined'){
					toObj[key]=fromObj[key];
				}else{
					if(override){
						toObj[key]=fromObj[key];
					}
				}
			}
		}
	}
};
Function.prototype.extend=function(superCls){
	var self_prototype=this.prototype;
	var super_prototype=superCls.prototype;
	self_prototype.super=super_prototype;
	m.deepCopy(super_prototype,self_prototype,false);
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
	以上实现面向对象，以下是例子。
	please follow LGPL protocol
	请遵守 LGPL 协议
	my wechat is: treeiv email:cat555666@126.com, if you have question, my pleasure to discuss.
	我的微信是treeiv. 电邮 cat555666@126.com. 如果有问题欢迎讨论。


var Animal=function(){
	alert("Animal name is "+this.name);
}.body({
	self:this,
	name:"generic animal",
	sing:function(){
		alert(this.name+" sing");
	}
});

var Chiken=function(){
	this.super.constructor.apply(this);
	alert("Chiken name is "+this.name);
}.body({
	name:"chiken",
	sing:function(sth){
		alert(this.name+" sing ji ji gou " + sth);
	}
}).extend(Animal);

var Duck=function(){
	this.super.constructor.apply(this);
	alert("Duck name is "+this.name);
}.body({
	name:"duck",
	sing:function(){
		this.super.sing.apply(this,arguments)
		alert(this.name+" sing gua gua");
	}
}).extend(Animal);

var TomDuck=function(){
	this.super.constructor.apply(this);
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