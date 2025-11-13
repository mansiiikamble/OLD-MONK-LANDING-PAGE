function show(){
    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, 
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();}
    
    show()

    

    gsap.from("#bottle", {
      rotate: -15,
      scrollTrigger: {
        trigger: "#bottle",
        scroller: "#main",
        start: "top 5%",
        end: "top -416%",
        scrub: true,
        pin: true

      }
    })

    gsap.to("#bottle", {
     scale: 0.5,
     scrollTrigger: {
      trigger: "#page5 h5",
      scroller: "#main",
      start: "top 430%",
      end: "top -430%",
      scrub: true,
      pin: true

    }
    })

    let t1 = gsap.timeline() 
    t1.from("#main #page1_dog_image", {
      opacity: 0,
      duration: 1,
      scale: 0.1,
    })

    t1.from("#bottle", {
      opacity: 0,
      duration: 1,
      scale: 0.2,
    })

    t1.from("#nav_top>button", {
      xPercent:200,
    })

    gsap.from("#page2_part1>button",{
      scrollTrigger: {
        trigger: ("#page2_part1>button"),
        scroller: ("#main"),
        start: "top 70%",
      },
      xPercent:-300,
      duration:1,
    })


    gsap.from("#page6_part2>button",{
      scrollTrigger: {
        trigger: ("#page6_part2>button"),
        scroller: ("#main"),
        start: "top 70%",
      },
      xPercent:600,
      duration:1,
    })


// === Run GSAP/ScrollTrigger only at the 600px mobile breakpoint ===
(function mobile600Animations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  ScrollTrigger.matchMedia({
    // Runs for screen widths <= 600px
    "(max-width: 600px)": function() {

      // Make sure initial visual state is consistent (overrides CSS that set opacity:0 or margins)
      gsap.set("#image33", { y: -200, opacity: 0, rotate: -15 });

      // Left floating bottle subtle move (existing behavior kept)
      const bottleTween = gsap.from("#bottle", {
        y: 80,
        scale: 0.95,
        opacity: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: "#bottle",
          scroller: "#main",
          start: "top 85%",
          end: "bottom 40%",
          scrub: 0.6,
          // markers: true
        }
      });

      // existing productTween (fixed selector)
      const productTween = gsap.to("#bottle", {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#page5_bottel_image33",   // fixed selector (was missing '#')
          scroller: "#main",
          start: "top 90%",
          end: "bottom 60%",
          scrub: false,
          // markers: true
        }
      });

      // === NEW: Robust #image33 Drop Animation for 600px screens ===
      // This tween moves the middle bottle from above and stops above the h4 text.
      const middleBottle = gsap.fromTo("#image33",
        {
          y: -200,         // start far above
          opacity: 0,
          rotate: -15
        },
        {
          y: -10,          // final vertical offset (tweak -10 / -20 / 0 if you want higher/lower)
          opacity: 1,
          rotate: -15,
          ease: "power1.out",
          scrollTrigger: {
            trigger: "#page5_bottel_image33 h4", // target the text so bottle aligns above it
            scroller: "#main",
            start: "top 90%",   // when h4 reaches 90% of viewport height (near bottom)
            end: "top 55%",     // when h4 reaches 55% of viewport height (adjust to taste)
            scrub: true,
            // markers: true  // <<< uncomment during debugging to see start/end positions
          }
        }
      );

      // return cleanup function to kill tweens & triggers when breakpoint no longer matches
      return () => {
        if (bottleTween && bottleTween.scrollTrigger) bottleTween.scrollTrigger.kill();
        if (productTween && productTween.scrollTrigger) productTween.scrollTrigger.kill();
        if (middleBottle && middleBottle.scrollTrigger) middleBottle.scrollTrigger.kill();

        if (bottleTween) bottleTween.kill();
        if (productTween) productTween.kill();
        if (middleBottle) middleBottle.kill();

        ScrollTrigger.refresh();
      };
    },

    // Keep other sizes unchanged
    "all": function() {}
  });
})();


