/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[10],{574:function(xa,ta,n){n.r(ta);var qa=n(584),na=n(143),oa=n(52),ha=n(89);xa=function(){function la(){this.Yb=this.Hf=this.Kc=this.ed=null;this.ag=!1}la.prototype.clear=function(){Object(oa.b)(this.ed);this.Kc="";Object(oa.b)(this.Hf);Object(oa.b)(this.Yb);this.ag=!1};la.prototype.pe=function(){this.ed=[];this.Hf=[];this.Yb=[];this.ag=!1};la.prototype.KF=function(ia){for(var z="",aa=0,r,h,f;aa<ia.length;)r=ia.charCodeAt(aa),9===
r?(z+=String.fromCharCode(10),aa++):128>r?(z+=String.fromCharCode(r),aa++):191<r&&224>r?(h=ia.charCodeAt(aa+1),z+=String.fromCharCode((r&31)<<6|h&63),aa+=2):(h=ia.charCodeAt(aa+1),f=ia.charCodeAt(aa+2),z+=String.fromCharCode((r&15)<<12|(h&63)<<6|f&63),aa+=3);return z};la.prototype.initData=function(ia){this.ed=[];this.Hf=[];this.Yb=[];this.ag=!1;try{var z=new ha.a(ia);this.Kc="";z.Va();if(!z.advance())return;var aa=z.current.textContent;this.Kc=aa=this.KF(aa);Object(oa.b)(this.Hf);z.advance();aa=
z.current.textContent;for(var r=aa.split(","),h=Object(na.a)(r);h.$o();){var f=h.current;try{var a=parseInt(f.trim(),10);this.Hf.push(a)}catch(x){}}Object(oa.b)(this.ed);z.advance();aa=z.current.textContent;r=aa.split(",");for(var b=Object(na.a)(r);b.$o();){f=b.current;try{a=parseFloat(f.trim()),this.ed.push(a)}catch(x){}}Object(oa.b)(this.Yb);z.advance();aa=z.current.textContent;r=aa.split(",");ia=[];z=[];aa=0;for(var e=Object(na.a)(r);e.$o();){f=e.current;switch(f){case "Q":aa=1;break;case "R":aa=
2;break;case "S":aa=3;break;default:aa=0}if(aa)ia.push(0),z.push(aa);else try{a=parseFloat(f.trim()),ia.push(a),z.push(aa)}catch(x){return}}aa=0;var w=ia.length;h=e=f=r=void 0;for(var ea=b=0,y=0;y<w;){var ba=z[y];if(0<ba)aa=ba,++y,3===aa&&(b=ia[y],ea=ia[y+1],y+=2);else if(1===aa)for(a=0;8>a;++a)this.Yb.push(ia[y++]);else 2===aa?(r=ia[y++],f=ia[y++],e=ia[y++],h=ia[y++],this.Yb.push(r),this.Yb.push(f),this.Yb.push(e),this.Yb.push(f),this.Yb.push(e),this.Yb.push(h),this.Yb.push(r),this.Yb.push(h)):3===
aa&&(r=ia[y++],f=b,e=ia[y++],h=ea,this.Yb.push(r),this.Yb.push(f),this.Yb.push(e),this.Yb.push(f),this.Yb.push(e),this.Yb.push(h),this.Yb.push(r),this.Yb.push(h))}}catch(x){return}this.Kc.length&&this.Kc.length===this.Hf.length&&8*this.Kc.length===this.Yb.length&&(this.ag=!0)};la.prototype.ready=function(){return this.ag};la.prototype.gB=function(){var ia=new qa.a;if(!this.ed.length)return ia.Hi(this.ed,-1,this.Kc,this.Yb,0),ia;ia.Hi(this.ed,1,this.Kc,this.Yb,1);return ia};la.prototype.tf=function(){return this.Yb};
la.prototype.getData=function(){return{m_Struct:this.ed,m_Str:this.Kc,m_Offsets:this.Hf,m_Quads:this.Yb,m_Ready:this.ag}};return la}();ta["default"]=xa},584:function(xa,ta,n){var qa=n(104),na=n(64),oa=n(596);xa=function(){function ha(){this.lf=0;this.Xb=this.Pa=this.sg=null;this.Od=0;this.kf=null}ha.prototype.pe=function(){this.lf=-1;this.Od=0;this.kf=[]};ha.prototype.Hi=function(la,ia,z,aa,r){this.lf=ia;this.Od=r;this.kf=[];this.sg=la;this.Pa=z;this.Xb=aa};ha.prototype.vd=function(la){return this.lf===
la.lf};ha.prototype.wm=function(){return Math.abs(this.sg[this.lf])};ha.prototype.Vo=function(){return 0<this.sg[this.lf]};ha.prototype.zi=function(){var la=this.Vo()?6:10,ia=new oa.a;ia.Hi(this.sg,this.lf+la,this.lf,this.Pa,this.Xb,1);return ia};ha.prototype.t4=function(la){if(0>la||la>=this.wm())return la=new oa.a,la.Hi(this.sg,-1,-1,this.Pa,this.Xb,0),la;var ia=this.Vo()?6:10,z=this.Vo()?5:11,aa=new oa.a;aa.Hi(this.sg,this.lf+ia+z*la,this.lf,this.Pa,this.Xb,1+la);return aa};ha.prototype.uj=function(){var la=
this.lf+parseInt(this.sg[this.lf+1],10);if(la>=this.sg.length)return la=new ha,la.Hi(this.sg,-1,this.Pa,this.Xb,0),la;var ia=new ha;ia.Hi(this.sg,la,this.Pa,this.Xb,this.Od+1);return ia};ha.prototype.getBBox=function(la){if(this.Vo())la.x1=this.sg[this.lf+2+0],la.y1=this.sg[this.lf+2+1],la.x2=this.sg[this.lf+2+2],la.y2=this.sg[this.lf+2+3];else{for(var ia=1.79769E308,z=qa.a.MIN,aa=1.79769E308,r=qa.a.MIN,h=0;4>h;++h){var f=this.sg[this.lf+2+2*h],a=this.sg[this.lf+2+2*h+1];ia=Math.min(ia,f);z=Math.max(z,
f);aa=Math.min(aa,a);r=Math.max(r,a)}la.x1=ia;la.y1=aa;la.x2=z;la.y2=r}};ha.prototype.oI=function(){if(this.kf.length)return this.kf[0];var la=new na.a,ia=new na.a,z=new oa.a;z.pe();var aa=this.zi(),r=new oa.a;r.pe();for(var h=this.zi();!h.vd(z);h=h.Ci())r=h;z=Array(8);h=Array(8);aa.Zf(0,z);la.x=(z[0]+z[2]+z[4]+z[6])/4;la.y=(z[1]+z[3]+z[5]+z[7])/4;r.Zf(r.vm()-1,h);ia.x=(h[0]+h[2]+h[4]+h[6])/4;ia.y=(h[1]+h[3]+h[5]+h[7])/4;.01>Math.abs(la.x-ia.x)&&.01>Math.abs(la.y-ia.y)&&this.kf.push(0);la=Math.atan2(ia.y-
la.y,ia.x-la.x);la*=180/3.1415926;0>la&&(la+=360);this.kf.push(la);return 0};return ha}();ta.a=xa},596:function(xa,ta,n){var qa=n(584),na=n(117),oa=n(104);xa=function(){function ha(){this.Jn=this.Ke=0;this.Xb=this.Pa=this.ed=null;this.Od=0}ha.prototype.pe=function(){this.Jn=this.Ke=-1;this.Od=0};ha.prototype.Hi=function(la,ia,z,aa,r,h){this.Ke=ia;this.Jn=z;this.ed=la;this.Pa=aa;this.Xb=r;this.Od=h};ha.prototype.vd=function(la){return this.Ke===la.Ke};ha.prototype.vm=function(){return parseInt(this.ed[this.Ke],
10)};ha.prototype.Nk=function(){return parseInt(this.ed[this.Ke+2],10)};ha.prototype.Fi=function(){return parseInt(this.ed[this.Ke+1],10)};ha.prototype.Vo=function(){return 0<this.ed[this.Jn]};ha.prototype.Isa=function(){return Math.abs(this.ed[this.Jn])};ha.prototype.Ci=function(){var la=this.Vo(),ia=la?5:11;if(this.Ke>=this.Jn+(la?6:10)+(this.Isa()-1)*ia)return ia=new ha,ia.Hi(this.ed,-1,-1,this.Pa,this.Xb,0),ia;la=new ha;la.Hi(this.ed,this.Ke+ia,this.Jn,this.Pa,this.Xb,this.Od+1);return la};ha.prototype.Rra=
function(la){var ia=this.vm();return 0>la||la>=ia?-1:parseInt(this.ed[this.Ke+1],10)+la};ha.prototype.Zf=function(la,ia){la=this.Rra(la);if(!(0>la)){var z=new qa.a;z.Hi(this.ed,this.Jn,this.Pa,this.Xb,0);if(z.Vo()){var aa=new na.a;z.getBBox(aa);z=aa.y1<aa.y2?aa.y1:aa.y2;aa=aa.y1>aa.y2?aa.y1:aa.y2;la*=8;ia[0]=this.Xb[la];ia[1]=z;ia[2]=this.Xb[la+2];ia[3]=ia[1];ia[4]=this.Xb[la+4];ia[5]=aa;ia[6]=this.Xb[la+6];ia[7]=ia[5]}else for(la*=8,z=0;8>z;++z)ia[z]=this.Xb[la+z]}};ha.prototype.sf=function(la){var ia=
new qa.a;ia.Hi(this.ed,this.Jn,this.Pa,this.Xb,0);if(ia.Vo()){var z=this.ed[this.Ke+3],aa=this.ed[this.Ke+4];if(z>aa){var r=z;z=aa;aa=r}r=new na.a;ia.getBBox(r);ia=r.y1<r.y2?r.y1:r.y2;r=r.y1>r.y2?r.y1:r.y2;la[0]=z;la[1]=ia;la[2]=aa;la[3]=ia;la[4]=aa;la[5]=r;la[6]=z;la[7]=r}else for(z=this.Ke+3,aa=0;8>aa;++aa)la[aa]=this.ed[z+aa]};ha.prototype.getBBox=function(la){var ia=new qa.a;ia.Hi(this.ed,this.Jn,this.Pa,this.Xb,0);if(ia.Vo()){var z=this.ed[this.Ke+3],aa=this.ed[this.Ke+4];if(z>aa){var r=z;z=
aa;aa=r}r=new na.a;ia.getBBox(r);ia=r.y1<r.y2?r.y1:r.y2;r=r.y1>r.y2?r.y1:r.y2;la[0]=z;la[1]=ia;la[2]=aa;la[3]=r}else{z=1.79769E308;aa=oa.a.MIN;ia=1.79769E308;r=oa.a.MIN;for(var h=this.Ke+3,f=0;4>f;++f){var a=this.ed[h+2*f],b=this.ed[h+2*f+1];z=Math.min(z,a);aa=Math.max(aa,a);ia=Math.min(ia,b);r=Math.max(r,b)}la[0]=z;la[1]=ia;la[2]=aa;la[3]=r}};return ha}();ta.a=xa}}]);}).call(this || window)
