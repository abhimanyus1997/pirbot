(function framework7ComponentLoader(t,o){void 0===o&&(o=!0);document,window;var e=t.$,i=(t.Template7,t.utils),r=(t.device,t.support),s=t.Class,n=(t.Modal,t.ConstructorMethods),a=(t.ModalMethods,function(t){function o(o,s){void 0===s&&(s={}),t.call(this,o,s);var n=this,a=i.extend({},o.params.tooltip);n.useModulesParams(a),n.params=i.extend(a,s);var l=n.params.targetEl;if(!l)return n;var p=e(l);if(0===p.length)return n;if(p[0].f7Tooltip)return p[0].f7Tooltip;var h=e(n.render()).eq(0);i.extend(n,{app:o,$targetEl:p,targetEl:p&&p[0],$el:h,el:h&&h[0],text:n.params.text||"",visible:!1,opened:!1}),p[0].f7Tooltip=n;var u,f={};function c(t){u||(u=!0,f.x="touchstart"===t.type?t.targetTouches[0].pageX:t.pageX,f.y="touchstart"===t.type?t.targetTouches[0].pageY:t.pageY,n.show(this))}function d(t){if(u){var o="touchmove"===t.type?t.targetTouches[0].pageX:t.pageX,e="touchmove"===t.type?t.targetTouches[0].pageY:t.pageY;Math.pow(Math.pow(o-f.x,2)+Math.pow(e-f.y,2),.5)>50&&(u=!1,n.hide())}}function v(){u&&(u=!1,n.hide())}function g(){n.show(this)}function m(){n.hide()}function y(){h.hasClass("tooltip-in")||h.removeClass("tooltip-out").remove()}return n.attachEvents=function(){if(h.on("transitionend",y),r.touch){var t=!!r.passiveListener&&{passive:!0};p.on(o.touchEvents.start,c,t),o.on("touchmove",d),o.on("touchend:passive",v)}else p.on("mouseenter",g),p.on("mouseleave",m)},n.detachEvents=function(){if(h.off("transitionend",y),r.touch){var t=!!r.passiveListener&&{passive:!0};p.off(o.touchEvents.start,c,t),o.off("touchmove",d),o.off("touchend:passive",v)}else p.off("mouseenter",g),p.off("mouseleave",m)},n.useModules(),n.init(),n}return t&&(o.__proto__=t),o.prototype=Object.create(t&&t.prototype),o.prototype.constructor=o,o.prototype.position=function(t){var o=this.$el,i=this.app;o.css({left:"",top:""});var r,s,n,a,l=e(t||this.targetEl),p=[o.width(),o.height()],h=p[0],u=p[1];if(o.css({left:"",top:""}),l&&l.length>0){r=l.outerWidth(),s=l.outerHeight();var f=l.offset();n=f.left-i.left,a=f.top-i.top;var c=l.parents(".page");c.length>0&&(a-=c[0].scrollTop)}var d=[0,0,0],v=d[0],g=d[1],m="top";u<a?g=a-u:u<i.height-a-s?(m="bottom",g=a+s):(m="middle",(g=s/2+a-u/2)<=0?g=8:g+u>=i.height&&(g=i.height-u-8)),"top"===m||"bottom"===m?((v=r/2+n-h/2)<8&&(v=8),v+h>i.width&&(v=i.width-h-8),v<0&&(v=0)):"middle"===m&&((v=n-h)<8||v+h>i.width)&&(v<8&&(v=n+r),v+h>i.width&&(v=i.width-h-8)),o.css({top:g+"px",left:v+"px"})},o.prototype.show=function(t){var o=this.app,i=this.$el,r=this.$targetEl;o.root.append(i),this.position(t);var s=e(t);return this.visible=!0,this.opened=!0,r.trigger("tooltip:show",this),i.trigger("tooltip:show",this),s.length&&s[0]!==r[0]&&s.trigger("tooltip:show",this),this.emit("local::show tooltipShow",this),i.removeClass("tooltip-out").addClass("tooltip-in"),this},o.prototype.hide=function(){var t=this.$el,o=this.$targetEl;return this.visible=!1,this.opened=!1,o.trigger("tooltip:hide",this),t.trigger("tooltip:hide",this),this.emit("local::hide tooltipHide",this),t.addClass("tooltip-out").removeClass("tooltip-in"),this},o.prototype.render=function(){if(this.params.render)return this.params.render.call(this,this);var t=this.params;return('\n      <div class="tooltip '+(t.cssClass||"")+'">\n        <div class="tooltip-content">'+(t.text||"")+"</div>\n      </div>\n    ").trim()},o.prototype.setText=function(t){return void 0===t?this:(this.params.text=t,this.text=t,this.$el&&this.$el.children(".tooltip-content").html(t),this.opened&&this.position(),this)},o.prototype.init=function(){this.attachEvents()},o.prototype.destroy=function(){this.$targetEl&&!this.destroyed&&(this.$targetEl.trigger("tooltip:beforedestroy",this),this.emit("local::beforeDestroy tooltipBeforeDestroy",this),this.$el.remove(),delete this.$targetEl[0].f7Tooltip,this.detachEvents(),i.deleteProps(this),this.destroyed=!0)},o}(s)),l={name:"tooltip",static:{Tooltip:a},create:function(){this.tooltip=n({defaultSelector:".tooltip",constructor:a,app:this,domProp:"f7Tooltip"}),this.tooltip.show=function(t){var o=e(t);if(0!==o.length){var i=o[0].f7Tooltip;if(i)return i.show(o[0]),i}},this.tooltip.hide=function(t){var o=e(t);if(0!==o.length){var i=o[0].f7Tooltip;if(i)return i.hide(),i}},this.tooltip.setText=function(t,o){var i=e(t);if(0!==i.length){var r=i[0].f7Tooltip;if(r)return r.setText(o),r}}},params:{tooltip:{targetEl:null,text:null,cssClass:null,render:null}},on:{tabMounted:function(t){var o=this;e(t).find(".tooltip-init").each(function(t,i){var r=e(i).attr("data-tooltip");r&&o.tooltip.create({targetEl:i,text:r})})},tabBeforeRemove:function(t){e(t).find(".tooltip-init").each(function(t,o){o.f7Tooltip&&o.f7Tooltip.destroy()})},pageInit:function(t){var o=this;t.$el.find(".tooltip-init").each(function(t,i){var r=e(i).attr("data-tooltip");r&&o.tooltip.create({targetEl:i,text:r})}),"ios"===o.theme&&t.view&&t.view.router.separateNavbar&&t.$navbarEl&&t.$navbarEl.length>0&&t.$navbarEl.find(".tooltip-init").each(function(t,i){var r=e(i).attr("data-tooltip");r&&o.tooltip.create({targetEl:i,text:r})})},pageBeforeRemove:function(t){t.$el.find(".tooltip-init").each(function(t,o){o.f7Tooltip&&o.f7Tooltip.destroy()}),"ios"===this.theme&&t.view&&t.view.router.separateNavbar&&t.$navbarEl&&t.$navbarEl.length>0&&t.$navbarEl.find(".tooltip-init").each(function(t,o){o.f7Tooltip&&o.f7Tooltip.destroy()})}},vnode:{"tooltip-init":{insert:function(t){var o=t.elm,i=e(o).attr("data-tooltip");i&&this.tooltip.create({targetEl:o,text:i})},destroy:function(t){var o=t.elm;o.f7Tooltip&&o.f7Tooltip.destroy()}}}};if(o){if(t.prototype.modules&&t.prototype.modules[l.name])return;t.use(l),t.instance&&(t.instance.useModuleParams(l,t.instance.params),t.instance.useModule(l))}return l}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
