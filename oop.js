Function.prototype.extend=function(superCls){
	var self_prototype=this.prototype;
	var super_prototype=superCls.prototype;
	this.super=super_prototype;
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
	���ߣ�������
	above code implement oop. following is demo. it is little different to java oop. every thing is override by sub-class. in Java, only method override.
	����ʵ������������������ӡ��е㲻ͬ��java����������ж������า�ǡ�java ֻ�з��������ǡ�
	please follow LGPL protocol
	������ LGPL Э��
	my wechat is: treeiv email:cat555666@126.com, if you have question, my pleasure to discuss.
	�ҵ�΢����treeiv. ���� cat555666@126.com. ��������⻶ӭ���ۡ�


var Animal=function(){
	alert("Animal name is "+this.name);
}.body({
	name:"generic animal",
	sing:function(){
		alert(this.name+" sing");
	}
});

var Chiken=function(){
	Chiken.super.constructor.apply(this);
	alert("Chiken name is "+this.name);
}.body({
	name:"chiken",
	sing:function(sth){
		alert(this.name+" sing ji ji gou " + sth);
	}
}).extend(Animal);

var Duck=function(){
	Duck.super.constructor.apply(this);
	alert("Duck name is "+this.name);
}.body({
	name:"duck",
	sing:function(){
		Duck.super.sing.apply(this,arguments)
		alert(this.name+" sing gua gua");
	}
}).extend(Animal);

var TomDuck=function(){
	TomDuck.super.constructor.apply(this);
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