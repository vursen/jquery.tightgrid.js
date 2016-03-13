'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
  var TightGrid = function () {
    function TightGrid($el) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      _classCallCheck(this, TightGrid);

      this.options = options;
      this.$el = $el;

      this.columnWidth = this.options.columnWidth || this.$el.find(this.options.itemSelector).first().outerWidth(true);

      this.build();

      if (this.options.resize) {
        this.resizeHandler = this.rebuild.bind(this);
        $(window).on('resize', this.resizeHandler);
      }
    }

    _createClass(TightGrid, [{
      key: 'build',
      value: function build() {
        var _this = this;

        var colsInRow = Math.floor(this.$el.width() / this.columnWidth);

        var $items = this.$el.find(this.options.itemSelector);

        var grid = $items.get().reduce(function (grid, item) {
          var i = grid.length;
          var $item = $(item);

          if (i >= colsInRow) {
            (function () {
              var $itemAbove = grid[i - colsInRow];

              var delta = $item.offset().top - parseInt($item.css('margin-bottom')) - $itemAbove.offset().top - $itemAbove.outerHeight() - parseInt($itemAbove.css('margin-bottom'));

              if (delta) {
                $item.css('margin-top', function (_, value) {
                  return parseInt(value) - delta;
                });
              }
            })();
          }

          var cols = Math.floor($item.outerWidth(true) / _this.columnWidth);
          var items = [];

          for (var j = 0; j < cols; j++) {
            items.push($item);
          }

          return grid.concat(items);
        }, []);
      }
    }, {
      key: 'rebuild',
      value: function rebuild() {
        this.reset();
        this.build();
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.$el.find(this.options.itemSelector).css('margin-top', '');
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.reset();

        this.options.resize && $(window).off('resize', this.resizeHandler);
      }
    }]);

    return TightGrid;
  }();

  $.fn.tightGrid = function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    options = $.extend({}, $.fn.tightGrid.defaults, options);

    this.each(function () {
      var $this = $(this);

      if (!$this.data('tightGrid')) {
        $this.data('tightGrid', new TightGrid($this, options));
      }
    });
  };

  $.fn.tightGrid.defaults = {
    itemSelector: '.js-item',
    columnWidth: null,
    resize: true
  };
})(jQuery);