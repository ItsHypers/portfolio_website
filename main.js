$(function () {
  var isMobile;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    isMobile = true;

    // Mobile height fix
    $(".height-fix").each(function () {
      var h = $(this).height();
      $(this).height(h);
    });
  }

  // RESIZE RESETS
  $(window).resize(function () {
    posFilterBar($(".filter").first());
  });

  // Sticky Nav on Mobile
  if (isMobile) {
    $("nav").addClass("fixed");
  } else {
    $("nav").addClass("desk");
  }

  // NAV POSITION
  var navPos = $("nav").position().top;
  var lastPos = 0;
  var lockTimer;

  $(window).on("scroll", function () {
    var pos = $(window).scrollTop();
    var pos2 = pos + 50;
    var scrollBottom = pos + $(window).height();

    if (!isMobile) {
      if (pos >= navPos + $("nav").height() && lastPos < pos) {
        $("nav").addClass("fixed");
      }
      if (pos < navPos && lastPos > pos) {
        $("nav").removeClass("fixed");
      }
      lastPos = pos;
    }

    // Link Highlighting
    if (pos2 > $("#home").offset().top) {
      highlightLink("home");
      $("nav").removeClass("fixed");
    }
    if (pos2 > $("#about").offset().top) {
      highlightLink("about");
      $("nav").addClass("fixed");
    }
    if (pos2 > $("#portfolio").offset().top) {
      highlightLink("portfolio");
    }
    if (
      pos2 > $("#contact").offset().top ||
      pos + $(window).height() === $(document).height()
    ) {
      highlightLink("contact");
    }

    // Prevent Hover on Scroll
    clearTimeout(lockTimer);
    if (!$("body").hasClass("disable-hover")) {
      $("body").addClass("disable-hover");
    }

    lockTimer = setTimeout(function () {
      $("body").removeClass("disable-hover");
    }, 500);
  });

  function highlightLink(anchor) {
    $("nav .active").removeClass("active");
    $("nav")
      .find('[dest="' + anchor + '"]')
      .addClass("active");
  }

  // EVENT HANDLERS
  $(".page-link").click(function () {
    var anchor = $(this).attr("dest");
    $(".link-wrap").removeClass("visible");

    $("nav span").removeClass("active");
    $("nav")
      .find('[dest="' + anchor + '"]')
      .addClass("active");

    $("html, body").animate(
      {
        scrollTop: $("#" + anchor).offset().top,
      },
      400
    );
  });

  $(".mdi-menu").click(function () {
    $(".link-wrap").toggleClass("visible");
  });
  // GALLERY
  $("#gallery").mixItUp({});

  function mixClear() {
    setTimeout(function () {
      $("#gallery").removeClass("waypoint");
    }, 2000);
  }

  // SCROLL ANIMATIONS
  function onScrollInit(items, elemTrigger) {
    var offset = $(window).height() / 1.6;
    items.each(function () {
      var elem = $(this),
        animationClass = elem.attr("data-animation"),
        animationDelay = elem.attr("data-delay");

      elem.css({
        "-webkit-animation-delay": animationDelay,
        "-moz-animation-delay": animationDelay,
        "animation-delay": animationDelay,
      });

      var trigger = elemTrigger ? trigger : elem;

      trigger.waypoint(
        function () {
          elem.addClass("animated").addClass(animationClass);
          if (elem.get(0).id === "gallery") mixClear(); //OPTIONAL
        },
        {
          triggerOnce: true,
          offset: offset,
        }
      );
    });
  }

  // CONTACT FORM
  $("#contact-form").submit(function (e) {
    e.preventDefault();

    $.ajax({
      url: "https://formspree.io/mattwilliams85@gmail.com",
      method: "POST",
      data: { message: $("form").serialize() },
      dataType: "json",
    }).done(function (response) {
      $("#success").addClass("expand");
      $("#contact-form")
        .find("input[type=text], input[type=email], textarea")
        .val("");
    });
  });

  $("#close").click(function () {
    $("#success").removeClass("expand");
  });
});

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();
