/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
  $('.js_check_all').selectCheckboxAll({
    parentClass: 'js_check_parent'
  });

  $('.js_check_all_c2').selectCheckboxAll({
    parentClass: 'js_check_pl2'
  });

  $('.sync-select').change(function (e) {
    var name = $(this).attr("name");
    var bothselects = $('.sync-select[name=' + name + ']');
    bothselects.val(this.value);
  });
  $(':checkbox').unbind('click').on('click', function () {
    var name = $(this).attr("name");
    var value = $(this).val();
    var isChecked = $(this).is(":checked");
    $("[name='" + name + "'][value='" + value + "']").prop("checked", isChecked);
  });
});


(function ($) {
  'use strict';
  $.fn.selectCheckboxAll = function (opts) {
    var defaults = {
      parentClass: 'js_check_parent',
      oneCheck: false, // if one children checked, parent will check.
      children: false,
      pparent: null
    };
    var opts = $.extend({}, defaults, opts);
    return this.each(function () {
      var $this = $(this);
      var $checkboxParent = $this.find('.' + opts.parentClass);
      $checkboxParent.change(function () {
        if ($(this).prop("checked")) {
          $checkboxParent.prop('checked', true);
          $this.find('input:checkbox[data-parent^="' + opts.parentClass + '"]:not(:disabled)').prop('checked', true).change();
        } else {
          $checkboxParent.prop('checked', false);
          $this.find('input:checkbox[data-parent^="' + opts.parentClass + '"]:not(:disabled)').prop('checked', false).change();
        }
      });
      $this.find('input:checkbox[data-parent^="' + opts.parentClass + '"]:not(:disabled)').change(function () {
        var len = $this.find('input:checkbox[data-parent^="' + opts.parentClass + '"]:not(:disabled):checked').length;
        var lenAll = $this.find('input:checkbox[data-parent^="' + opts.parentClass + '"]:not(:disabled)').length;
        if (opts.oneCheck) {
          $checkboxParent.prop("checked", true);
          if (len == 0) {
            $checkboxParent.prop("checked", false);
            if (opts.pparent != null) {
              $this.closest('div').find('.' + opts.pparent).prop("checked", false);
            }
          }
        } else {
          if (len < lenAll) {
            $checkboxParent.prop("checked", false);
            if (opts.pparent != null) {
              $this.closest('div').find('.' + opts.pparent).prop("checked", false);
            }
          } else {
            $checkboxParent.prop("checked", true);
          }
        }
      });
    });
  };
})(jQuery);


$(function (e) {
  if ($('.fixed-btn-gr').length > 0) {
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var fixedEndPosition = $('.fixed-end-position').offset().top;

    $(window).scroll(function (event) {
      didScroll = true;

    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 550); //250

    function hasScrolled() {
      var st = $(this).scrollTop();
      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta)
        return;

      if (st > lastScrollTop) {
        // Scroll Down
        $('.fixed-btn-gr').removeClass('show-up');
      } else {
        // Scroll Up
        //if (st + $(window).height() < $(document).height()) {
        if (st + $(window).height() < fixedEndPosition) {
          $('.fixed-btn-gr').addClass('show-up');
        }
      }
      lastScrollTop = st;
    }
  }
});