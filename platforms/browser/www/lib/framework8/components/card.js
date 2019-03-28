(function framework7ComponentLoader(e,a){void 0===a&&(a=!0);document,window;var r=e.$,t=(e.Template7,e.utils),n=(e.device,e.support),o=(e.Class,e.Modal,e.ConstructorMethods,e.ModalMethods,{open:function(e,a){var t;void 0===e&&(e=".card-expandable"),void 0===a&&(a=!0);var o=this;if(!r(".card-opened").length){var s=r(e).eq(0);if(s&&s.length&&!(s.hasClass("card-opened")||s.hasClass("card-opening")||s.hasClass("card-closing"))){var d,c=s.parents(".page").eq(0);if(c.length)if(s.trigger("card:beforeopen",{prevent:F}),o.emit("cardBeforeOpen",s[0],F),!d){var i,l,p;o.params.card.backrop&&((i=s.parents(".page-content").find(".card-backdrop")).length||(i=r('<div class="card-backdrop"></div>'),s.parents(".page-content").append(i))),o.params.card.hideNavbarOnOpen&&((l=c.children(".navbar")).length||c[0].f7Page&&(l=c[0].f7Page.$navbarEl)),o.params.card.hideToolbarOnOpen&&((p=c.children(".toolbar")).length||(p=c.parents(".view").children(".toolbar")),p.length||(p=c.parents(".views").children(".toolbar")));var h,f=s.css("transform");f&&f.match(/[2-9]/)&&(h=!0);var g=s.children(".card-content"),v=r(document.createElement("div")).addClass("card-expandable-size");s.append(v);var b,m,u=s[0].offsetWidth,C=s[0].offsetHeight,x=c[0].offsetWidth,w=c[0].offsetHeight,k=v[0].offsetWidth||x,O=v[0].offsetHeight||w,T=k/u,E=O/C,M=s.offset(),H=c.offset();M.left-=H.left,M.top-=H.top,h?(b=s[0].offsetLeft,m=s[0].offsetTop-s.parents(".page-content")[0].scrollTop):(b=M.left,m=M.top-c.offset().top,o.rtl&&(b-=s[0].scrollLeft)),m-=(w-O)/2;var $=k-u-(b-=(x-k)/2);o.rtl&&(b=(t=[$,b])[0],$=t[1]);var B,W,q,N,P,y,z,L,X,Y,D,I=O-C-m,j=($-b)/2,A=(I-m)/2;o.params.card.hideNavbarOnOpen&&l&&l.length&&o.navbar.hide(l,a),o.params.card.hideToolbarOnOpen&&p&&p.length&&o.toolbar.hide(p,a),i&&i.removeClass("card-backdrop-out").addClass("card-backdrop-in"),s.removeClass("card-transitioning"),a&&s.addClass("card-opening"),s.trigger("card:open"),o.emit("cardOpen",s[0]),g.css({width:k+"px",height:O+"px"}).transform("translate3d("+(o.rtl?b+j:-b-j)+"px, 0px, 0) scale("+1/T+", "+1/E+")"),s.transform("translate3d("+j+"px, "+A+"px, 0) scale("+T+", "+E+")"),a?s.transitionEnd(function(){G()}):G(),c.addClass("page-with-card-opened"),s[0].detachEventHandlers=function(){o.off("resize",J),n.touch&&o.params.card.swipeToClose&&(o.off("touchstart:passive",K),o.off("touchmove:active",Q),o.off("touchend:passive",R))},o.on("resize",J),n.touch&&o.params.card.swipeToClose&&(o.on("touchstart:passive",K),o.on("touchmove:active",Q),o.on("touchend:passive",R))}}}function F(){d=!0}function G(){s.addClass("card-opened"),s.removeClass("card-opening"),s.trigger("card:opened"),o.emit("cardOpened",s[0])}function J(){var e;s.removeClass("card-transitioning"),u=s[0].offsetWidth,C=s[0].offsetHeight,x=c[0].offsetWidth,w=c[0].offsetHeight,k=v[0].offsetWidth||x,O=v[0].offsetHeight||w,T=k/u,E=O/C,s.transform("translate3d(0px, 0px, 0) scale(1)"),M=s.offset(),H=c.offset(),M.left-=H.left,M.top-=H.top,b=M.left-(x-k)/2,o.rtl&&(b-=s[0].scrollLeft),m=M.top-(w-O)/2,$=k-u-b,I=O-C-m,o.rtl&&(b=(e=[$,b])[0],$=e[1]),j=($-b)/2,A=(I-m)/2,s.transform("translate3d("+j+"px, "+A+"px, 0) scale("+T+", "+E+")"),g.css({width:k+"px",height:O+"px"}).transform("translate3d("+(o.rtl?b+j:-b-j)+"px, 0px, 0) scale("+1/T+", "+1/E+")")}function K(e){r(e.target).closest(s).length&&s.hasClass("card-opened")&&(B=g.scrollTop(),W=!0,N=e.targetTouches[0].pageX,P=e.targetTouches[0].pageY,L=void 0,Y=!1,D=!1)}function Q(e){if(W){if(y=e.targetTouches[0].pageX,z=e.targetTouches[0].pageY,void 0===L&&(L=!!(L||Math.abs(z-P)>Math.abs(y-N))),D||Y||(!L&&e.targetTouches[0].clientX<=50?D=!0:Y=!0),!D&&!Y||Y&&0!==B)return W=!0,void(q=!0);q||s.removeClass("card-transitioning"),q=!0,((X=Y?Math.max((z-P)/150,0):Math.max((y-N)/(u/2),0))>0&&Y||D)&&(Y&&o.device.ios&&(g.css("-webkit-overflow-scrolling","auto"),g.scrollTop(0)),e.preventDefault()),X>1&&(X=Math.pow(X,.3)),X>(Y?1.3:1.1)?(W=!1,q=!1,o.card.close(s)):s.transform("translate3d("+j+"px, "+A+"px, 0) scale("+T*(1-.2*X)+", "+E*(1-.2*X)+")")}}function R(){W&&q&&(W=!1,q=!1,o.device.ios&&g.css("-webkit-overflow-scrolling",""),X>=.8?o.card.close(s):s.addClass("card-transitioning").transform("translate3d("+j+"px, "+A+"px, 0) scale("+T+", "+E+")"))}},close:function(e,a){void 0===e&&(e=".card-expandable.card-opened"),void 0===a&&(a=!0);var t=this,n=r(e).eq(0);if(n&&n.length&&n.hasClass("card-opened")&&!n.hasClass("card-opening")&&!n.hasClass("card-closing")){var o,s,d,c=n.children(".card-content"),i=n.parents(".page").eq(0);if(i.length)t.params.card.backrop&&(d=n.parents(".page-content").find(".card-backdrop")),t.params.card.hideNavbarOnOpen&&((o=i.children(".navbar")).length||i[0].f7Page&&(o=i[0].f7Page.$navbarEl),o&&o.length&&t.navbar.show(o,a)),t.params.card.hideToolbarOnOpen&&((s=i.children(".toolbar")).length||(s=i.parents(".view").children(".toolbar")),s.length||(s=i.parents(".views").children(".toolbar")),s&&s.length&&t.toolbar.show(s,a)),i.removeClass("page-with-card-opened"),d&&d.length&&d.removeClass("card-backdrop-in").addClass("card-backdrop-out"),n.removeClass("card-opened card-transitioning"),a?n.addClass("card-closing"):n.addClass("card-no-transition"),n.transform(""),n.trigger("card:close"),t.emit("cardClose",n[0]),c.css({width:"",height:""}).transform("").scrollTop(0,a?300:0),a?c.transitionEnd(function(){l()}):l(),n[0].detachEventHandlers&&(n[0].detachEventHandlers(),delete n[0].detachEventHandlers)}function l(){n.removeClass("card-closing card-no-transition"),n.trigger("card:closed"),n.find(".card-expandable-size").remove(),t.emit("cardClosed",n[0])}},toggle:function(e,a){void 0===e&&(e=".card-expandable");var t=r(e).eq(0);t.length&&(t.hasClass("card-opened")?this.card.close(t,a):this.card.open(t,a))}}),s={name:"card",params:{card:{hideNavbarOnOpen:!0,hideToolbarOnOpen:!0,swipeToClose:!0,closeByBackdropClick:!0,backrop:!0}},create:function(){t.extend(this,{card:{open:o.open.bind(this),close:o.close.bind(this),toggle:o.toggle.bind(this)}})},on:{pageBeforeIn:function(e){if(this.params.card.hideNavbarOnOpen&&e.navbarEl&&e.$el.find(".card-opened.card-expandable").length&&this.navbar.hide(e.navbarEl),this.params.card.hideToolbarOnOpen&&e.$el.find(".card-opened.card-expandable").length){var a=e.$el.children(".toolbar");a.length||(a=e.$el.parents(".view").children(".toolbar")),a.length||(a=e.$el.parents(".views").children(".toolbar")),a&&a.length&&this.toolbar.hide(a)}}},clicks:{".card-close":function(e,a){this.card.close(a.card)},".card-open":function(e,a){this.card.open(a.card)},".card-expandable":function(e,a,t){e.hasClass("card-opened")||e.hasClass("card-opening")||e.hasClass("card-closing")||r(t.target).closest(".card-prevent-open").length||this.card.open(e)},".card-backdrop-in":function(){var e=!1;this.params.card.closeByBackdropClick&&(e=!0);var a=r(".card-opened");a.length&&("true"===a.attr("data-close-on-backdrop-click")?e=!0:"false"===a.attr("data-close-on-backdrop-click")&&(e=!1),e&&this.card.close(a))}}};if(a){if(e.prototype.modules&&e.prototype.modules[s.name])return;e.use(s),e.instance&&(e.instance.useModuleParams(s,e.instance.params),e.instance.useModule(s))}return s}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))