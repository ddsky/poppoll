(function ($) {

    $.fn.poppoll = function (options) {

        var popupDiv = this;

        // settings with default options.
        var settings = $.extend({
            // these are the defaults
            showConditions: {
                time: 5000,
                scrolledDown: true,
                likelihood: 0.5,
                conditionCheck: function () {
                    return true;
                }
            }
        }, options);

        PopPoll.init(popupDiv, settings);

        return this;
    };

}(jQuery));


var PopPoll = function () {

    // the poppoll node
    var popPollNode;

    // the unique id of the poll (should be globally unique, across multiple domains)
    var pollId;

    // a callback for when the pop is shown
    var showCallback;

    // a callback for when the pop is hidden
    var hideCallback;

    // an object of conditions that must be met before showing the poppoll
    var showConditions;

    // whether the user has scrolled almost to the end of the page
    var scrolledDown = false;

    // the reference to the check interval
    var checkInterval;

    // the number of milliseconds the user has been on the site
    var activeTime = 0;

    /**
     * Show the poppoll if the user hasn't seen it yet.
     */
    function showPoppoll() {

        if (hasSeenPoll()) {
            return;
        }
        document.cookie = "poppoll_"+pollId+"=1;path=/";
        clearInterval(checkInterval);

        if (showCallback != undefined) {
            showCallback();
        } else {
            $(popPollNode).fadeIn(300);
        }
    }

    /**
     * Hide the poppoll.
     */
    function hidePoppoll() {
        if (hideCallback != undefined) {
            hideCallback();
        } else {
            $(popPollNode).fadeOut(300);
        }
    }

    /**
     * Get the cookie by its name.
     * @param cname The name of the cookie.
     * @returns {string} The cookie value.
     */
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
        }
        return '';
    }

    /**
     * Check whether the current user has seen the poll already (using cookies).
     */
    function hasSeenPoll() {
        // FIXME
        return false;
        var cookie = getCookie('poppoll_'+pollId);
        if (cookie == '') {
            return false;
        }
        return true;
    }


    /**
     * Return an object, through closure all methods keep bound to returned object.
      */
    return {
        init: function (node, options) {
            popPollNode = node;
            pollId = options.pollId;
            showCallback = options.showCallback;
            hideCallback = options.hideCallback;
            showConditions = options.showConditions;

            // clicking _outside_ the popup will close it
            $('body').bind('click', function(){
                hidePoppoll();
            });
            $(popPollNode).bind('click', function(){
                return false;
            });

            // start a timer to check for show conditions, but only if the user is chosen and hasn't seen it yet
            if (showConditions != undefined && showConditions.likelihood > Math.random() && !hasSeenPoll()) {

                // set the interval to check for conditions
                checkInterval = setInterval(function () {

                    activeTime += 100;

                    // check scroll condition
                    if (options.showConditions.scrolledDown == true && scrolledDown == false) {
                        return;
                    }

                    // check condition function
                    if (options.showConditions.conditionCheck != undefined && !options.showConditions.conditionCheck()) {
                        return;
                    }

                    // check time
                    if (options.showConditions.time != undefined && activeTime < options.showConditions.time) {
                        return;
                    }

                    // if we haven't returned by now, all conditions are met and we show the poll
                    showPoppoll();

                },100);

                // check scrolling conditions
                $(window).scroll(function () {
                    var imagePos = $(node).offset().top;
                    var scrollY = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var bodyHeight = $('body').height();

                    //console.log(scrollY+","+windowHeight+","+bodyHeight);

                    if (scrollY + windowHeight > bodyHeight - 100) {
                        //console.log("scrolled down");
                        scrolledDown = true;
                    }
                });
            }

        }
    }
}();
