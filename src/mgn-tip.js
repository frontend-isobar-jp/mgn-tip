/*

Megane Template

Website: http://megane-template.com/
License: Dentsu Isobar All Rights Reserved.

*/
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.mgnTip = factory();
    }
}(this, function() {

    function mgnTip(selector, option) {

        this.selector = selector;
        this.tip = document.querySelectorAll( this.selector );

        //option
        if(option == null) option = {};

        this.event = option.event ? option.event : "hover";
        this.fadeSpeed = option.fadeSpeed ? option.fadeSpeed : 0;
        this.btn = option.btnElm ? option.btnElm : ".j-tip_btn";
        this.detail = option.detailElm ? option.detailElm : ".j-tip_detail";

        this.btnElm = document.querySelectorAll(this.btn);
        this.detailElm = document.querySelectorAll(this.detail);

        this.targetBtn;
        this.direction;

        this.ShowEnd = function(){};
        this.HideEnd = function(){};

        this.Init();

    }

    /**
    **
    ** Init
    **
    **/
    mgnTip.prototype.Init = function() {

        var this_ = this;

        var Listener = function(e) {

            this_.direction = e.target.getAttribute("data-direction");

            var PARENT = this_.GetParent( e.target, this_.selector );
            var DETAIL_ELM = PARENT.querySelectorAll(this_.detail)[0];

            if( !this_.HasClass(e.target,"active") ){

                this_.SetCss( e.target, DETAIL_ELM );
                this_.Show( e.target, DETAIL_ELM );

            } else {

                this_.Hide( e.target, DETAIL_ELM );

            }

        }

        var AddEvent = function(i) {

            if( this_.event == "hover" ){
                this_.btnElm[i].addEventListener( "mouseenter", Listener );
                this_.btnElm[i].addEventListener( "mouseleave", Listener );
            } else {
                this_.btnElm[i].addEventListener( this_.event, Listener );
            }

        }

        for (var i = 0; i < this.tip.length; i++) {

            this.tip[i].style.display = "inline-block";
            AddEvent(i);

        }
        for (var i = 0; i < this.detailElm.length; i++) {

            this.detailElm[i].style.opacity = 0;
            this.detailElm[i].style.pointerEvents = "none";
            this.detailElm[i].style.transition = "all " + this.fadeSpeed / 1000 + "s ease";
            this.detailElm[i].style.setProperty("-webkit-transition", "all " + this.fadeSpeed / 1000 + "s ease");
            this.detailElm[i].style.position = "absolute";

        }

    };

    /**
    **
    ** SetCss
    **
    **/
    mgnTip.prototype.SetCss = function( targetBtn, targetDetail ) {

        var ELM_POS = this.GetOffset(targetBtn);
        var ELM_WIDTH = targetBtn.scrollWidth;
        var ELM_HEIGHT = targetBtn.scrollHeight;

        var DETAIL_ELM_WIDTH = targetDetail.scrollWidth;
        var DETAIL_ELM_HEIGHT = targetDetail.scrollHeight;

        var ELM_HEIGHT_FIX = ( ( DETAIL_ELM_HEIGHT - ELM_HEIGHT ) / 2 );

        if( this.direction == "left" ) {

            targetDetail.style.top = ELM_POS.top - ELM_HEIGHT_FIX + "px";
            targetDetail.style.left = ELM_POS.left - DETAIL_ELM_WIDTH - 10 + "px";

        } else if ( this.direction == "top" ) {

            targetDetail.style.top = ELM_POS.top - DETAIL_ELM_HEIGHT - 10 + "px";
            targetDetail.style.left = ELM_POS.left + "px";

        } else if ( this.direction == "right" ) {

            targetDetail.style.top = ELM_POS.top + (-ELM_HEIGHT_FIX) + "px";
            targetDetail.style.left = ELM_POS.left + ELM_WIDTH + 10 + "px";

        } else if ( this.direction == "bottom" ) {

            targetDetail.style.top = ELM_POS.top + ELM_HEIGHT + 10 + "px";
            targetDetail.style.left = ELM_POS.left + "px";

        }

    };

    /**
    **
    ** Show
    **
    **/
    mgnTip.prototype.Show = function( targetBtn, targetDetail ) {

        var this_ = this;

        this.AddClass(targetBtn,"active");
        this.AddClass(targetDetail,this.direction);

        targetDetail.style.opacity = 1;
        targetDetail.style.pointerEvents = "inherit";

        var EndFunc = function() {
            this_.ShowEnd();
            targetDetail.removeEventListener("transitionend", EndFunc, false);
        };

        targetDetail.addEventListener("transitionend", EndFunc, false);

    };

    /**
    **
    ** Hide
    **
    **/
    mgnTip.prototype.Hide = function( targetBtn, targetDetail ) {

        var this_ = this;

        this.RemoveClass(targetBtn,"active");
        this.RemoveClass(targetDetail,this.direction);

        targetDetail.style.opacity = 0;
        targetDetail.style.pointerEvents = "none";

        var EndFunc = function() {
            this_.HideEnd();
            targetDetail.removeEventListener("transitionend", EndFunc, false);
        };

        targetDetail.addEventListener("transitionend", EndFunc, false);

    };

    /**
    **
    ** GetOffset
    **
    **/
    mgnTip.prototype.GetOffset = function(el) {

        var BOX = el.getBoundingClientRect();

        return {
            top: BOX.top + window.pageYOffset - document.documentElement.clientTop,
            left: BOX.left + window.pageXOffset - document.documentElement.clientLeft
        }

    }

    /**
    **
    ** GetParent
    **
    **/
    mgnTip.prototype.GetParent = function( element, target ) {

        var parent = element,
            i = 0,
            t;

        if ( target.split(".")[1] ) {

            t = target.split(".")[1];

        } else if ( target.split("#")[1] ) {

            t = target.split("#")[1];

        } else {

            t = target;

        }

        while ( i < 100 ){

            parent = parent.parentNode;

            if( parent.tagName.toLowerCase() == t ) break;

            if( parent.className ) {
                if( parent.className.match( t ) ) break;
            } else if( parent.id ) {
                if( parent.id.match( t ) ) break;
            }

            i++;

        }

        return parent;

    }
    mgnTip.prototype.AddClass = function( element, _className ) {

        if (element.classList) {
            element.classList.add(_className);
        } else {
            element.className += ' ' + _className;
        }

    }
    mgnTip.prototype.RemoveClass = function( element, _className ) {

        if (element.classList) {
            element.classList.remove(_className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + _className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }

    }
    mgnTip.prototype.HasClass = function( element, _className ) {

        var ignore = false;

        if (element.classList) {
            if( element.classList.contains(_className) ) ignore = true;
        } else {
            if( new RegExp('(^| )' + _className + '( |$)', 'gi').test( element.className ) ) ignore = true;
        }

        return ignore;

    }

    return mgnTip;

}));
