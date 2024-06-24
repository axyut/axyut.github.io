// timeline
$(function () {
  var stickyTop = 0,
    scrollTarget = false;
  var wrapperTimeline = $(".wrapperTimeline");
  var timeline = $(".timeline__nav"),
    items = $("li", timeline),
    milestones = $(".timeline__section .milestone"),
    offsetTop = parseInt(timeline.css("top"));
  var TIMELINE_VALUES = {
    start: 50,
    step: 30,
  };

  // set the top offset
  $(window)
    .resize(function () {
      timeline.removeClass("fixed");
      stickyTop = timeline.offset().top - offsetTop;
      $(window).trigger("scroll");
    })
    .trigger("resize");
  $(window)
    .scroll(function () {
      if ($(window).scrollTop() > stickyTop) {
        timeline.addClass("fixed");
      } else {
        timeline.removeClass("fixed");
      }
    })
    .trigger("scroll");

  // click on timeline items
  items.find("span").click(function () {
    var li = $(this).parent(),
      index = li.index(),
      milestone = milestones.eq(index);

    if (!li.hasClass("active") && milestone.length) {
      scrollTarget = index;
      var scrollTargetTop =
        milestone.position().top + wrapperTimeline.scrollTop() - 30;
      $(wrapperTimeline).animate(
        {
          scrollTop: scrollTargetTop,
        },
        {
          duration: 400,
          complete: function complete() {
            // make mouse scroll active again with false value
            scrollTarget = false;
          },
        }
      );
    }
  });

  // mouse scroll in wrapperTimeline div
  $(wrapperTimeline)
    .scroll(function () {
      var viewLine = $(window).scrollTop() + $(window).height() / 3,
        active = -1;

      if (scrollTarget === false) {
        milestones.each(function () {
          if ($(this).offset().top - viewLine > 0) {
            return false;
          }

          active++;
        });
      } else {
        active = scrollTarget;
      }

      timeline.css(
        "top",
        -1 * active * TIMELINE_VALUES.step + TIMELINE_VALUES.start + "px"
      );
      items.filter(".active").removeClass("active");
      items.eq(active != -1 ? active : 0).addClass("active");
    })
    .trigger("scroll");
});
