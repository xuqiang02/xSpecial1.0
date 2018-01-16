(function($) {
    
    //additional functions
    var AdditionalFS = {
        percentageBar: function(targetWrapper, param) {
            targetWrapper.children().each(function() {
                var $this = $(this);
                var perValue = $this.attr('data-percentage');

                $this.css(param, perValue + '%');
            });
        },
        tabHandlers: function(targetWrapper) {
            targetWrapper.find('.nav-tabs li a').hover(AdditionalFS.tabHoverOn, AdditionalFS.tabHoverOff).on('click touchstart', AdditionalFS.tabClick);
        },
        genHover: function(targetWrapper) {
            targetWrapper.hover(AdditionalFS.genHoverOn, AdditionalFS.genHoverOff);
        },
        tabHoverOn: function() {
            var $this = $(this);
            if (!$this.parent().hasClass('currentF')) {
                $this.data('defColor') || $this.data('defColor', $this.css('background-color'));
                $this.stop(true).animate({backgroundColor: $this.attr('data-hover')}, 150);
            }
        },
        tabHoverOff: function() {
            var $this = $(this);
            if (!$this.parent().hasClass('currentF'))
                $this.stop(true).animate({backgroundColor: $this.data('defColor')}, 150);
        },
        specPortfolioImgHover: function(targetWrapper){
            targetWrapper.hover(AdditionalFS.specPortfolioHoverOn, AdditionalFS.specPortfolioHoverOff);
        },
        specPortfolioHoverOn: function(){
            var thisRef = $(this);
            thisRef.find('img').stop(true).animate({top: -25}, 300);
            thisRef.find('.klax-spec-overlay').stop(true).animate({bottom: 0}, 300);
        },
        specPortfolioHoverOff: function(){
            var thisRef = $(this);
            thisRef.find('img').stop(true).stop(true).animate({top: 0}, 300);
            thisRef.find('.klax-spec-overlay').stop(true).animate({bottom: -50},300);
        },
        tabClick: function() {
            var $this = $(this),
                    thisParent = $this.parent();
            if(!thisParent.hasClass('currentF')){
                var prevActive = thisParent.siblings('.currentF').removeClass('currentF').find('a:first-child');		
                prevActive.css({backgroundColor: prevActive.data('defColor')});
                thisParent.addClass('currentF');
                $this.css({backgroundColor: thisParent.attr('data-active')});                
            }
            
            $('html, body').stop(true).animate({
				scrollTop: $this.parents('div.klax-wrapper').offset().top
            }, 1000);
            var tabPaneHref = $this.attr('href');
            var tabPane = $this.closest('.tabbable').find(tabPaneHref);
            AdditionalFS.animateStatisticsBars(tabPane);				
        },
        genHoverOn: function() {
            var $this = $(this);
            $this.data('defColor') || $this.data('defColor', $this.css('background-color'));
            $this.stop(true).animate({backgroundColor: $this.attr('data-hover')}, 200);
        },
        genHoverOff: function() {
            var $this = $(this);
            $this.stop(true).animate({backgroundColor: $this.data('defColor')}, 200);
        },
        animateStatisticsBars: function(tabPane){
            tabPane.find('.klax-statistics-bar').each(function(index){
                    var $this = $(this);
                    var blockWidth = $this.attr('data-width')+'%';
                    setTimeout(function(){
                            $this.delay(index*80).animate({width : blockWidth},400);
                    },800);				
            });
        },
        imgsLoad:  function (targetWrapper, clicked, callback) {
            var images = targetWrapper.find('img'),
                    imagesNum = images.length,
                    counter = 0,
                    firedFlag = false;
            
            if(typeof clicked !== 'undefined'){
                clicked.data('html', clicked.html())
                        .html('')
                        .css({'background-image': 'url(images/ajax-loader.gif)',
                            'background-repeat': 'no-repeat',
                            'background-position': 'center'});
            }
            
            var tm = setTimeout(function(){
                firedFlag = true;
                if(typeof clicked !== 'undefined')
                    clicked.html(clicked.data('html'))
                        .css({'background-image': 'none'});
                if(typeof callback !== 'undefined')
                    callback();
            }, 10000);
            
            images.each(function(){
                var $this = $(this);
                $this.attr('src', $this.attr('data-src')).on('load', function(){
                    if(++counter == imagesNum && !firedFlag){
                        clearTimeout(tm);
                        if(typeof clicked !== 'undefined')
                            clicked.html(clicked.data('html'))
                                .css({'background-image': 'none'});
                        if(typeof callback !== 'undefined')
                            callback();
                    }                        
                });                                
            });
        }
    }

    //portfolio part of carousel
    function Portfolio(targetWrapper, options) {
        this.targetWrapper = $(targetWrapper);
        this.options = options;
        this.heighFlag = true;

        this.targetWrapper.find('.klax-options ul li').on('click', $.proxy(this.optionClick, this));
        this.targetWrapper.find('.klax-option-exit').on('click', $.proxy(this.exitClick, this)).each(function() {
            AdditionalFS.genHover($(this));
        });

        this.init();
    }
    
    //portfolio methods
    Portfolio.prototype = {
        init: function() {
            this.targetWrapper.find('.carousel-indicators li').each(function() {
                AdditionalFS.genHover($(this));
            });
            this.targetWrapper.find('.klax-option-info-button').each(function() {
                AdditionalFS.genHover($(this));
            });
            this.targetWrapper.find('.klax-options ul li[data-overlay-txt]').each(function(){
                var thisRef = $(this),
                    overlayTxt = thisRef.attr('data-overlay-txt'),
                    overlayDiv = '<div class="klax-spec-overlay"><div><div>'+overlayTxt+'</div></div></div>';
                
                thisRef.append(overlayDiv);
                AdditionalFS.specPortfolioImgHover(thisRef);
            });
        },
        optionClick: function(e) {
            var $this = $(e.currentTarget), thisRef = this;

            if(this.heighFlag){
                this.targetWrapper.parents('.list-wrap').height(this.targetWrapper.height());
                this.heighFlag = false;
            }                
            $this.siblings().fadeOut(600, this.options.easing);
            $this.fadeOut(600, this.options.easing, function() {
                thisRef.targetWrapper.find('#' + $this.attr('data-option')).fadeIn(600, thisRef.options.easing, function(){
				var thisRefLoc= this, e = $.Event('portfolio_work_opened.klax',{portfolioOption: $this.get(0),portfolioOptionPane: thisRefLoc});//thisRefLoc = reference to local this
                    thisRef.targetWrapper.trigger(e);
                });
                var contentHeight = thisRef.targetWrapper.height();
                thisRef.targetWrapper.parents('.list-wrap').animate({height: contentHeight}, thisRef.options.easing);
            });
        },
        exitClick: function(e) {
            var thisRef = this;
            $(e.currentTarget).parent().fadeOut(300, function() {
                var $this =$(this), optionsRef = $this.prevAll('.klax-options');
                optionsRef.find('ul:first-child').children().fadeIn(300, thisRef.options.easing);
                thisRef.targetWrapper.parents('.list-wrap').animate({height: thisRef.targetWrapper.height()}, 300, thisRef.options.easing, function(){
                    var e = $.Event('portfolio_work_closed.klax',{portfolioOptionPane: $this.get(0)});
                    thisRef.targetWrapper.trigger(e);
                });
            });
        }
    }

    //secondary state of plugin (Second state)

    function Carousel(targetWrapper, activeElClass, options) {
        this.targetWrapper = targetWrapper;
        this.options = options;
        this.activeElClass = activeElClass;
        this.activeEl = targetWrapper.find(activeElClass);
        this.activeContent = null;
        this.leftControl = targetWrapper.find('.klax-left-control');
        this.rightControl = targetWrapper.find('.klax-right-control');
        this.containerUl = targetWrapper.find('.klax-nav-carousel ul');
        this.numOfElements = targetWrapper.find('.klax-nav-carousel ul li').length;
        this.widthFlag = -1;
        this.ctrlEnableF = '';        

        this.init();
    }

    //methods of carousel
    Carousel.prototype = {
        init: function() {
            var activeContent = '.klax-carousel-content-' + this.getActiveElNum(),
                    thisRef = this,
                    e;
            this.animateF = true;
            this.activeContent = this.targetWrapper.find(activeContent).addClass('klax-active-content').slideDown(this.options.easing, function(){
                var thisRefLoc = this;
                e = $.Event('expanded.klax',{activeElement: thisRef.activeEl.get(0),
                activeContent: thisRefLoc});
                thisRef.targetWrapper.trigger(e); 
                thisRef.animateF = false;
            });

            if (window.innerWidth >= 1200)
                this.widthFlag = 3
            else if (window.innerWidth >= 992 && window.innerWidth < 1200)
                this.widthFlag = 0;
            else if (window.innerWidth < 992 && window.innerWidth >= 768)
                this.widthFlag = 1;
            else if (window.innerWidth <= 768)
                this.widthFlag = 2;

            this.targetWrapper.find('.carousel').each(function() {
                var $this = $(this);
                $this.carousel({
                    interval: false
                });
                $this.find('.carousel-control').hover(function(){
                    $(this).stop(true).animate({opacity: 0.9}, 250, thisRef.options.easing);
                },function(){
                    $(this).stop(true).animate({opacity: 0.5}, 250, thisRef.options.easing);
                });
            });
            this.targetWrapper.find('.klax-back-overlay').one('click',function(){
                thisRef.targetWrapper.fadeOut(function(){
                    thisRef.targetWrapper.html(thisRef.targetWrapper.data('first-state'));
                    thisRef.targetWrapper.fadeIn(thisRef.options.easing);   
                    TeamView.init(thisRef.targetWrapper, thisRef.options);
                });
            });
            this.targetWrapper.find('.nav-tabs li .current').parent().addClass('currentF');
            this.targetWrapper.find('div[class*=klax-carousel-content]').organicTabs().each(function() {
                AdditionalFS.tabHandlers($(this));
            });
            this.targetWrapper.find('.klax-portfolio').each(function() {
                new Portfolio(this, thisRef.options);
            });
            this.targetWrapper.find('.klax-percentage-bar').each(function() {
                AdditionalFS.percentageBar($(this), 'width');
                AdditionalFS.percentageBar($(this), 'height');
            });

            this.leftControl.data('defColor', this.leftControl.css('background-color'));
            this.rightControl.data('defColor', this.rightControl.css('background-color'));

            if (this.getActiveElNum() != 0) {
                this.enableControl('leftControl');
            } else {
                this.disableControl('leftControl')
                this.ctrlEnableF = 'leftControl';
            }

            if (parseInt(this.getActiveElNum()) + 1 != this.numOfElements) {
                this.enableControl('rightControl');
            } else {
                this.disableControl('rightControl')
                this.ctrlEnableF = 'rightControl';
            }            
            this.leftControl.on('click', $.proxy(this.leftControlClick, this));
            this.rightControl.on('click', $.proxy(this.rightControlClick, this));
            $(window).resize($.proxy(this.resizeResponsive, this));
        },
        leftControlClick: function(e) {            
            if (this.getActiveElNum() == 0 ||
                    this.animateF == true ||
                    this.leftControl.css('background-image') != 'none' ||
                    this.rightControl.css('background-image') != 'none')
                return;
            else if (this.getActiveElNum() == 1) {
                this.disableControl('leftControl');
                this.ctrlEnableF = 'leftControl';
            }
            this.animateF = true;
            if (this.ctrlEnableF == 'rightControl') {
                this.enableControl('rightControl');
                this.ctrlEnableF = '';
            }
            
            var thisRef = this;
            
            AdditionalFS.imgsLoad(this.activeContent.prev(), $(e.currentTarget), function(){
                thisRef.activeEl.removeClass('klax-active', 600, thisRef.options.easing);
                thisRef.activeEl.prev().addClass('klax-active', 600, thisRef.options.easing, function() {
                    thisRef.activeElClass = thisRef.getActiveElClass();
                    thisRef.activeEl = $(this);
                });
                thisRef.containerUl.animate({
                    left: '+=240'
                }, 600, thisRef.options.easing);

                thisRef.activeContent.fadeOut(300, thisRef.options.easing, function() {
                    thisRef.activeContent.removeClass('klax-active-content');
                    thisRef.activeContent.prev().fadeIn(300, thisRef.options.easing, function() {
                        var $this = $(this), thisRefLoc = this;
                        thisRef.responsiveCSS(0);
                        $this.addClass('klax-active-content');
                        thisRef.activeContent = $this;
                        thisRef.carousingResponsive();

                        var e = $.Event('slid.klax',{activeElement: thisRef.activeEl.get(0),
                        activeContent: thisRefLoc});
                        thisRef.targetWrapper.trigger(e);
                        thisRef.animateF = false;
                    });
                });
            });           
        },
        rightControlClick: function(e) {
            if (parseInt(this.getActiveElNum()) + 1 == this.numOfElements ||
                    this.animateF == true ||
                    this.leftControl.css('background-image') != 'none' ||
                    this.rightControl.css('background-image') != 'none')
                return;
            else if (parseInt(this.getActiveElNum()) + 2 == this.numOfElements) {
                this.disableControl('rightControl');
                this.ctrlEnableF = 'rightControl';
            }
            this.animateF = true;
            if (this.ctrlEnableF == 'leftControl') {
                this.enableControl('leftControl');
                this.ctrlEnableF = '';
            }

            var thisRef = this;
            
            AdditionalFS.imgsLoad(this.activeContent.next(), $(e.currentTarget), function(){
                thisRef.activeEl.removeClass('klax-active', 600, thisRef.options.easing);
                thisRef.activeEl.next().addClass('klax-active', 600, thisRef.options.easing, function() {
                    thisRef.activeElClass = thisRef.getActiveElClass();
                    thisRef.activeEl = $(this);
                });
                thisRef.containerUl.animate({
                    left: '+=-240'
                }, 600, thisRef.options.easing);

                thisRef.activeContent.fadeOut(300, thisRef.options.easing, function() {
                    thisRef.activeContent.removeClass('klax-active-content');
                    thisRef.activeContent.next().fadeIn(300, thisRef.options.easing, function() {
                        var $this = $(this), thisRefLoc = this;
                        $this.addClass('klax-active-content');
                        thisRef.activeContent = $this;
                        thisRef.carousingResponsive();

                        var e = $.Event('slid.klax',{activeElement: thisRef.activeEl.get(0),
                        activeContent: thisRefLoc});
                        thisRef.targetWrapper.trigger(e);
                        thisRef.animateF = false;
                    });
                });
            });            
        },
        slideTo: function(index){
             if(this.numOfElements - 1 < index || index < 0 || this.animateF == true ||
                     this.leftControl.css('background-image') != 'none' ||
                     this.rightControl.css('background-image') != 'none')
                 return;
             this.animateF = true;
             if(index == 0) {
                this.disableControl('leftControl');
                (this.ctrlEnableF == 'rightControl') && this.enableControl(this.ctrlEnableF);
                this.ctrlEnableF = 'leftControl';
             }else if(index == this.numOfElements-1){
                this.disableControl('rightControl');
                (this.ctrlEnableF == 'leftControl') && this.enableControl(this.ctrlEnableF);
                this.ctrlEnableF = 'rightControl';
             }else if(this.ctrlEnableF != ''){
                this.enableControl(this.ctrlEnableF);
                this.ctrlEnableF = '';
             }
             
             var thisRef = this,
                leftVal = (parseInt(this.getActiveElNum()) - index) * 240,
                nextActiveCont = this.activeContent.siblings('.klax-carousel-content-'+index),
                clickArg;
            (leftVal < 0) ? clickArg = this.rightControl : clickArg = this.leftControl
        
            
            AdditionalFS.imgsLoad(nextActiveCont, clickArg, function(){
                thisRef.activeEl.removeClass('klax-active', 600, thisRef.options.easing);
                thisRef.activeEl.siblings('.klax-main-nav-el-'+index).addClass('klax-active', 600, thisRef.options.easing, function() {
                    thisRef.activeElClass = thisRef.getActiveElClass();
                    thisRef.activeEl = $(this);
                });

                thisRef.containerUl.animate({
                    left: '+='+leftVal
                }, 600, thisRef.options.easing);

                thisRef.activeContent.fadeOut(300, thisRef.options.easing, function() {
                    thisRef.activeContent.removeClass('klax-active-content');
                    nextActiveCont.fadeIn(300, thisRef.options.easing, function() {
                        var $this = $(this), thisRefLoc = this;
                        $this.addClass('klax-active-content');
                        thisRef.activeContent = $this;
                        thisRef.carousingResponsive();

                        var e = $.Event('slid.klax',{activeElement: thisRef.activeEl.get(0),
                        activeContent: thisRefLoc});
                        thisRef.targetWrapper.trigger(e);
                        thisRef.animateF = false;
                    });
                });
            });
        },
        carousingResponsive: function(){
            if (window.innerWidth < 520)
                this.responsiveCSS(1);
            else
                this.responsiveCSS(0);
        },
        getActiveElClass: function() {
            return '.' + this.targetWrapper.find('.klax-active').attr('class').split(' ').slice(-2, -1)[0];
        },
        getActiveElNum: function() {
            return this.activeElClass.substring(18);
        },
        enableControl: function(target) {
            var $this = this[target],
                    thisRef = this;
            $this.hover(function() {
                var $this = $(this);
                $this.stop(true).animate({backgroundColor: $this.attr('data-hover')}, 200, thisRef.options.easing, thisRef.options.easing);
            }, function() {
                var $this = $(this);
                $this.stop(true).animate({backgroundColor: $this.data('defColor')}, 200, thisRef.options.easing, thisRef.options.easing);
            }).stop(true).animate({backgroundColor: $this.data('defColor')}, 200, this.options.easing);
        },
        disableControl: function(target) {
            var $this = this[target];
            $this.unbind('mouseenter mouseleave');
            $this.stop(true).animate({backgroundColor: $this.attr('data-disabled')}, 200, this.options.easing);
        },
        resizeResponsive: function() {
            var width = window.innerWidth;
            if (width < 992 && width >= 768 && this.widthFlag != 1) {
                this.responsiveCSS(0);
                this.widthFlag = 1;
            } else if (width >= 992 && width < 1200 && this.widthFlag != 0) {
                this.responsiveCSS(0);
                this.widthFlag = 0
            } else if (width >= 1200 && this.widthFlag != 3) {
                this.responsiveCSS(0);
                this.widthFlag = 3;
            } else if (width < 768 && width >= 520) {
                this.responsiveCSS(0);
                this.widthFlag = 2;
            } else if (width < 520) {
                this.responsiveCSS(1);
            }
        },
        responsiveCSS: function(flag) {
            var newHeight = this.targetWrapper.find('.klax-active-content .list-wrap .tab-pane').filter(':visible').height();
            
            this.targetWrapper.find('.klax-active-content .list-wrap').height(newHeight);

            this.containerUl.css({top: flag * 80});
        }

    }

    //transformation between states
    function CrossTransformer(targetWrapper, cClass, options, initFlag) {
        this.targetWrapper = targetWrapper;
        this.options = options;
        this.initFlag = initFlag;
        this.targetEl = targetWrapper.find('.' + cClass);
        this.cClass = cClass;
        this.klaxMainTitle = targetWrapper.find('.klax-main-title');
        this.klaxMainNav = targetWrapper.children(':first-child');
        this.carousel = targetWrapper.find('.klax-nav-carousel');
        
        this.transform();
    }

    //transformation methods
    CrossTransformer.prototype = {
        transform: function() {
            if (this.initFlag)
                this.animateElements();
            else {
                this.modifyElements();                
            }
        },
        animateElements: function() {
            var ulContainer = this.klaxMainNav.find('ul'),
                    titleArrow = this.klaxMainNav.find('.klax-nav-triangle'),
                    leftControl = this.klaxMainNav.find('.klax-left-control'),
                    rightControl = this.klaxMainNav.find('.klax-right-control'),
                    ulNumEl = ulContainer.children().length,
                    elNum = parseInt(this.cClass.substring(17)),
                    params = this.ulContainerParams(elNum, this.options.itemAgrOpeningSpeed),
                    backButton = $('<div class="klax-back"><img src="images/gallery.png" alt=""></div><div class="klax-back-overlay"><img src="images/gallery-1.png" alt=""></div>'),
                    innerTopBar = this.targetEl.find('.klax-top-bar-inner'),
                    thisRef = this;
            
            this.klaxMainNav.prepend(backButton);
            this.targetEl.find('.klax-nav-img').animate({opacity: 0.0}, this.options.itemAgrOpeningSpeed, this.options.easing);
            $.when(this.targetEl.siblings().animate({opacity: 0.0}, thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing)).then(function() {//400
                thisRef.klaxMainNav.find('.klax-nav-img').slideUp(thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing);
                
                thisRef.klaxMainNav.addClass('klax-expanded');

                var ulWidth = ulContainer.width();
                ulContainer.css({position: 'absolute', width: ulWidth});
                ulContainer.animate({top: params.top}, params.topAnimSpeed, thisRef.options.easing, function() {// 400 ili 10
                    ulContainer.children().animate({width: '240px'}, thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing);//400
                    if(window.innerWidth > 991){
                        var rightInit = thisRef.klaxMainNav.width() - 560;
                        thisRef.carousel.addClass('klax-nav-carousel-anim').css({right: rightInit}).animate({right: 0}, thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing,function(){
                            var $this = $(this);
                            $this.addClass('klax-carousel-pos').css({right: ''});
                        });
                    }else
                        thisRef.carousel.addClass('klax-nav-carousel-anim').addClass('klax-carousel-pos');
                    ulContainer.find('.klax-top-bar-inner img').not(innerTopBar.find('img')).show(thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing);
                    innerTopBar.find('img').fadeIn(thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing);
                    ulContainer.animate({left: params.left, width: params.specWidth}, thisRef.options.itemAgrOpeningSpeed + 20, thisRef.options.easing, function() {//420
                        thisRef.targetEl.addClass('klax-active');
                        leftControl.fadeIn(thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing);
                        rightControl.fadeIn(thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing);
                        thisRef.carousel.css({overflow: 'hidden'});
                        ulContainer.css({left: elNum * (-240), top: params.topFlash, width: ulNumEl * 240 + 250});
                        thisRef.klaxMainNav.find('.klax-nav-background').animate({opacity: 1}, thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing, function() {//400
                            thisRef.klaxMainTitle.fadeIn(thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing);
                            backButton.fadeIn(thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing);
                            titleArrow.fadeIn(thisRef.options.itemAgrOpeningSpeed, thisRef.options.easing);
                            thisRef.targetEl.siblings().animate({opacity: 1}, thisRef.options.itemAgrOpeningSpeed + 200, thisRef.options.easing);//600
                            thisRef.targetWrapper.trigger('createCarousel.klax', [thisRef.cClass]);
                        });
                    });
                });
                
            });
        },
        modifyElements: function(){
            var thisRef = this,
                    ulContainer = this.klaxMainNav.find('ul'),
                    titleArrow = this.klaxMainNav.find('.klax-nav-triangle'),
                    leftControl = this.klaxMainNav.find('.klax-left-control'),
                    rightControl = this.klaxMainNav.find('.klax-right-control'),
                    ulNumEl = ulContainer.children().length,
                    elNum = parseInt(this.cClass.substring(17)),
                    backButton = $('<div class="klax-back"><img src="images/gallery.png" alt=""></div><div class=" klax-back-overlay"><img src="images/gallery-1.png" alt=""></div>'),
                    innerTopBar = this.targetEl.find('.klax-top-bar-inner'),
                    params = this.ulContainerParams(elNum);
            
            this.klaxMainNav.addClass('klax-expanded');
            
            this.klaxMainNav.prepend(backButton);
            this.klaxMainNav.find('.klax-nav-img').hide();
            ulContainer.css({top: params.topFlash, width: ulNumEl * 240 + 250, position: 'absolute', left: elNum * (-240)});
            ulContainer.children().css({width: '240px'});
            ulContainer.find('.klax-top-bar div').css({width: '150px'});
            ulContainer.find('.klax-top-bar-inner img').not(innerTopBar.find('img')).show();
            innerTopBar.find('img').show();
            this.carousel.addClass('klax-nav-carousel-anim').addClass('klax-carousel-pos');
            this.targetEl.addClass('klax-active');
            leftControl.show();
            rightControl.show();
            this.carousel.css({overflow: 'hidden'});
            this.klaxMainNav.find('.klax-nav-background').css({height: 80, opacity: 1});
            this.klaxMainTitle.show();
            backButton.show();
            titleArrow.show();
            this.targetEl.siblings().css({opacity: 1});
            this.targetWrapper.trigger('createCarousel.klax', [this.cClass]);            
            
            this.targetWrapper.next().fadeOut(function(){
                thisRef.targetWrapper.fadeIn(thisRef.options.itemAgrOpeningSpeed);
                $(this).remove();
            });       
        },
        ulContainerParams: function(elNum) {
            var pos = {left: 0, top: 0, topFlash: 0};
            var winWidth = window.innerWidth;
            if (winWidth < 992 && winWidth >= 520) {
                pos.top = elNum * (-105) + 'px';
                pos.specWidth = '320px';
                pos.left = 80;
                pos.topAnimSpeed = elNum ? 400 : 10;
            } else if (winWidth <= 519) {
                pos.top = ((elNum - 1) * (-105) - 25) + 'px';
                pos.specWidth = '320px';
                pos.topFlash = '80px';
                pos.topAnimSpeed = 400;
            } else {
                pos.top = Math.floor(parseInt(elNum) / 3) * (-80) + 'px';
                pos.left = (parseInt(elNum) % 3) * (-240) + 80 + 'px';
                pos.specWidth = 3 * 240;
                pos.topAnimSpeed = Math.floor(parseInt(elNum) / 3) ? this.options.itemAgrOpeningSpeed : 10;
            }
            return pos;
        }
    };


    //initial state of plugin (First state)
    var TeamView = {
        init: function(targetWrapper, options) {
            var lis = targetWrapper.find('.klax-nav-carousel > ul > li'),
                    buttons = targetWrapper.find('.klax-nav-desc-button');
            
            AdditionalFS.imgsLoad(targetWrapper.find('.klax-nav-carousel'));
            lis.hover(function(){
                TeamView.hoverOn($(this), options);
            }, function(){
                TeamView.hoverOff($(this), options);
            });
            buttons.one('click', function() {
                var $this = $(this),
                liParent = $this.parent().parent();
                
                lis.unbind('mouseenter mouseleave');
                targetWrapper.css('height', targetWrapper.height());
                
                var cClass = liParent.attr('class').split(' ').pop();
                var itemNum = cClass.split('-').pop();
                var imgWrapper = targetWrapper.find('.klax-carousel-content-' + itemNum);                
                                   
                AdditionalFS.imgsLoad(imgWrapper, $this, function(){
                    TeamView.hoverOff(liParent, options);
                    new CrossTransformer(targetWrapper, cClass, options, true);
                });
            }).each(function(){
                AdditionalFS.genHover($(this));
            });
            
        },
        hoverOn: function($this, options) {
            var barOverlay = $this.find('div.klax-top-bar-overlay');        
            barOverlay.stop(true).show().animate({opacity: 1}, 200, options.easing);
            barOverlay.parent().siblings('div.klax-nav-desc').stop(true).show().animate({opacity:1},200, options.easing);
        },
        hoverOff: function($this, options) {
            var barOverlay = $this.find('div.klax-top-bar-overlay');    
            barOverlay.stop(true).animate({opacity: 0}, 200, options.easing, function(){
                $(this).hide();
            });
            barOverlay.parent().siblings('div.klax-nav-desc').stop(true).animate({opacity:0}, 200, options.easing, function(){
                $(this).hide();
            });
        }
    };

    //general plugin class
    function KLax(targetWrapper, options) {
        this.targetWrapper = targetWrapper;
        this.options = options;
        this.carousel = null;

        this.init(false);
    }

    //plugin class methods
    KLax.prototype = {
        init: function() {    
            var thisRef = this;
            //loader animation preload
            $('body').append('<img style="display:none;" src="images/ajax-loader.gif" />');
            
            this.targetWrapper.on('createCarousel.klax', $.proxy(this.createCarousel, this));            
            this.targetWrapper.on('slid.klax', function(e){                    
                AdditionalFS.animateStatisticsBars($(e.activeContent).find('.tab-pane:visible'));
            }).on('expanded.klax', function(e){
                AdditionalFS.animateStatisticsBars($(e.activeContent).find('.tab-content div.active'));
                thisRef.targetWrapper.css('height', 'auto');                
            });
            
            this.targetWrapper.data('first-state',this.targetWrapper.html());
                                                             
            if (!this.options.expanded){
                this.targetWrapper.css('display', 'block');
                TeamView.init(this.targetWrapper, this.options);
            } else {   
                var loader = $('<img style="margin: auto; display: block;" id="k-lax-loader" src="images/loadingAnimation.gif" />'),
                imgWrapper = this.targetWrapper.find('.klax-carousel-content-' + this.options.expIndex);
                this.targetWrapper.after(loader);
                AdditionalFS.imgsLoad(this.targetWrapper.find('.klax-nav-carousel'));
                AdditionalFS.imgsLoad(imgWrapper, undefined, function(){
                    new CrossTransformer(thisRef.targetWrapper, 'klax-main-nav-el-' + thisRef.options.expIndex, thisRef.options, false);
                });                                                
            }                
        },
        createCarousel: function(e, cClass) {
            this.carousel = new Carousel($(e.currentTarget), '.' + cClass, this.options);
        },
        next: function() {
            this.carousel && this.carousel.rightControl.trigger('click');
        },
        prev: function() {
            this.carousel && this.carousel.leftControl.trigger('click');
        },
        slideTo: function(index){
            if(this.carousel)
                this.carousel.slideTo(index);
            else
                this.targetWrapper.find('.klax-main-nav-el-'+index+' div.klax-nav-desc-button').trigger('click');
        }
    }

    $.fn.klax = function(option) {
        return this.each(function() {
            var $this = $(this),
                    data = $this.data('klax'),
                    options = $.extend({}, $.fn.klax.defaults, typeof option == 'object' && option);
                                
            if (!data)
                $this.data('klax', (data = new KLax($this, options)));
            
            (typeof option == 'string') && data[option]();
            (typeof option == 'number') && data.slideTo(option);
        });
    };
    
    $.fn.klax.defaults = {
        expanded: false
        , expIndex: 0
        , itemAgrOpeningSpeed: 400
        , easing: 'swing'
    }
    

})(jQuery);
(function($) {

    $.organicTabs = function(el, options) {
    
        var base = this;
        base.$el = $(el);
        base.$nav = base.$el.find(".nav");
                
        base.init = function() {
        
            base.options = $.extend({},$.organicTabs.defaultOptions, options);
            
            // Accessible hiding fix
            $(".hide").css({
                "position": "relative",
                "top": 0,
                "left": 0,
                "display": "none"
            }); 
            
            base.$nav.delegate("li > a", "click", function() {
            
                // Figure out current list via CSS class
                var curList = base.$el.find("a.current").attr("href").substring(1),
                
                // List moving to
                    $newList = $(this),
                    
                // Figure out ID of new list
                    listID = $newList.attr("href").substring(1),
                
                // Set outer wrapper height to (static) height of current inner list
                    $allListWrap = base.$el.find(".list-wrap"),
                    curListHeight = $allListWrap.height();
                $allListWrap.height(curListHeight);
                                        
                if ((listID != curList) && ( base.$el.find(":animated").length == 0)) {
                                            
                    // Fade out current list
                    base.$el.find("#"+curList).fadeOut(base.options.speed, function() {
                        
                        // Fade in new list on callback
                        base.$el.find("#"+listID).fadeIn(base.options.speed);
                        
                        // Adjust outer wrapper to fit new list snuggly
                        var newHeight = base.$el.find("#"+listID).height();
                        $allListWrap.animate({
                            height: newHeight
                        });
                        
                        // Remove highlighting - Add to just-clicked tab
                        base.$el.find(".nav li a").removeClass("current");
                        $newList.addClass("current");
                            
                    });
                    
                }   
                
                // Don't behave like a regular link
                // Stop propegation and bubbling
                return false;
            });
            
        };
        base.init();
    };
    
    $.organicTabs.defaultOptions = {
        "speed": 300
    };
    
    $.fn.organicTabs = function(options) {
        return this.each(function() {
            (new $.organicTabs(this, options));
        });
    };
    
})(jQuery);