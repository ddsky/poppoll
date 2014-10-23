(function($) {

    $.fn.poppoll = function(options) {

        var popupDiv = this;

        // settings with default options.
        var settings = $.extend({
            // these are the defaults.
//            suggestUrl: '',
//            queryVisualizationHeadline: '',
//            highlight: true,
//            throttleTime: 50,
//            animationSpeed: 300,
//            instantVisualFeedback: 'all',
//            enterCallback: undefined,
//            extraHtml: undefined,
//            minChars: 3,
//            maxWidth: popupDiv.outerWidth()
        }, options);

        PopPoll.init(popupDiv, settings);

        return this;
    };

}(jQuery));


var PopPoll = function() {
    //// common vars
    // div line height

    // index of selected entry
    //var selectedEntryIndex = -1;

    function getSearchBoxOffset() {
        //return searchBox.offset().left - $('body').offset().left;
    }

    // return an object, through closure all methods keep bound to returned object
    return {
        init: function(searchBoxObject, options) {
//            searchBox = searchBoxObject;
//            highlight = options.highlight;
//            extraHtml = options.extraHtml;
//            suggestUrl = options.suggestUrl;
//            throttleTime = options.throttleTime;
//            animationSpeed = options.animationSpeed;
//            minChars = options.minChars;
//            enterCallback = options.enterCallback;
//            instantVisualFeedback = options.instantVisualFeedback;
//            queryVisualizationHeadline = options.queryVisualizationHeadline;

           searchBoxObject.show(100);

        }
    }
}();
