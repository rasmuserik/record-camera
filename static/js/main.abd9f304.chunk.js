(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{215:function(e,t,a){"use strict";a.r(t);var n=a(89),r=a(0),i=a.n(r),o=a(18),c=a.n(o),s=a(53),u=a.n(s),l=a(83),v=a(84),d=a(24),m=a(92),h=a(85),p=a(91),f=a(30),g=a(54),b=a.n(g),w=a(56),y=a.n(w),E=a(55),D=a.n(E),O=a(32),k=a.n(O),j=function(e){function t(){var e;return Object(v.a)(this,t),(e=Object(m.a)(this,Object(h.a)(t).call(this))).state={videoDevice:"",audioDevice:"",stream:void 0,streams:[],devices:[]},e.startCamera(),e}return Object(p.a)(t,e),Object(d.a)(t,[{key:"startCamera",value:function(){var e=Object(l.a)(u.a.mark(function e(){var t,a,n;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("here1"),this.state.prevVideo!==this.state.videoDevice||this.state.prevAudio!==this.state.audioDevice){e.next=3;break}return e.abrupt("return");case 3:return this.state.prevVideo=this.state.videoDevice,this.state.prevAudio=this.state.audioDevice,console.log("here2"),e.next=8,navigator.mediaDevices.getUserMedia({audio:!1,video:!!this.state.videoDevice||{deviceId:this.state.videoDevice}});case 8:return t=e.sent,this.setState({stream:t}),e.next=12,window.navigator.mediaDevices.enumerateDevices();case 12:a=e.sent,this.setState({devices:a}),(n=document.getElementById("cameraPreview")).srcObject=t,n.play();case 17:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){var e=this.state.streams,t=!0,a=!1,n=void 0;try{for(var r,i=e[Symbol.iterator]();!(t=(r=i.next()).done);t=!0){var o=r.value,c=o.id,s=o.stream,u=document.getElementById(c);console.log("didUpdate",u,s),u.srcObject=s,u.play()}}catch(l){a=!0,n=l}finally{try{t||null==i.return||i.return()}finally{if(a)throw n}}}},{key:"render",value:function(){var e=this;return setTimeout(function(){return e.startCamera()},0),i.a.createElement(k.a,{container:!0,spacing:24},i.a.createElement(k.a,{item:!0,xs:6},i.a.createElement(b.a,{value:this.state.videoDevice,onChange:function(t){return e.setState({videoDevice:t.target.value})}},this.state.devices.filter(function(e){return"videoinput"===e.kind}).map(function(e){var t=e.deviceId,a=(e.groupId,e.kind,e.label);return i.a.createElement(D.a,{control:i.a.createElement(y.a,null),key:t,value:t,label:a})}))),i.a.createElement(k.a,{item:!0,xs:6},i.a.createElement(b.a,{value:this.state.audioDevice,onChange:function(t){return e.setState({audioDevice:t.target.value})}},this.state.devices.filter(function(e){return"audioinput"===e.kind}).map(function(e){var t=e.deviceId,a=(e.groupId,e.kind,e.label);return i.a.createElement(D.a,{control:i.a.createElement(y.a,null),key:t,value:t,label:a})}))),i.a.createElement(k.a,{item:!0,xs:12},i.a.createElement("video",{id:"cameraPreview",autoplay:!0})))}}]),t}(r.Component),x=Object(f.withStyles)(function(e){return{button:{margin:e.spacing.unit}}})(j);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var S=a(90),I=a(25),C=a(87),_=a(88).a.fromJS({hello:"world"}),T={};var B=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||I.c,M=Object(I.d)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;if(T[t.type])return T[t.type](e,t)},B(Object(I.a)(C.a)));a(201);Object(n.a)();var P=Object(f.createMuiTheme)({typography:{useNextVariants:!0}});c.a.render(i.a.createElement(S.a,{store:M},i.a.createElement(f.MuiThemeProvider,{theme:P},i.a.createElement(x,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},97:function(e,t,a){e.exports=a(215)}},[[97,1,2]]]);
//# sourceMappingURL=main.abd9f304.chunk.js.map