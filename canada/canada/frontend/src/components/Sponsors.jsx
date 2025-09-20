import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
  {
    id: 1,
    image: "/sponsor/S-1.png",
    name: "Prakash Chandran",
    description: "Leading Real Estate Agent",
    companyInfo: "Buying, selling, or investing? Call your trusted local realtor today.",
    badge: "Mega Sponsor",
  },
  {
    id: 2,
    image: "/sponsor/s-2.png",
    name: "Revive Physio Care",
    description: "Physiotherapy Belleville",
    companyInfo: "Physiotherapy Belleville in Canada",
    badge: "Gold Sponsor",
  },
  {
    id: 3,
    image: "/sponsor/s-4.png",
    name: "Access Healthcare Inc ",
    description: "Staffing Solutions & Transportation services.",

    badge: "Platinum Sponsor",
  },
  {
    id: 4,
    image: "/sponsor/s-6.png",
    name: "Rophe Rehab",
    description: "We specialize in Physiotheraphy",
    companyInfo: "Physiotheraphy Specialist in canada",
    badge: "Gold Sponsor",
  },
  {
    id: 5,
    image: "/sponsor/s-8.png",
    name: "Dani the Detailer",
    description: "Steam cleaning & Detailing Center",
    companyInfo: "Car Detailing Company, serving 1M+ patients globally.",
    badge: "Gold Sponsor",
  },
   {
    id: 6,
    image: "/sponsor/s-7.png",
    name: "Bay Mazda",
    description: "Mazda Dealer in canada ",
    companyInfo: "Bay Mazda is premium mazda Dealership in bellevile",
    badge: "Community Sponsor",
  },

];

export default function Sponsors() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const bubbleContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const track = trackRef.current;
      const panels = gsap.utils.toArray(track.children);

      gsap.set(track, { width: `${panels.length * 100}vw` });
      ScrollTrigger.getAll().forEach((t) => t.kill());

      const horizontalScroll = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.3,
            ease: "power1.inOut",
          },
        },
      });

      gsap.from(panels, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      panels.forEach((panel) => {
        const img = panel.querySelector("img");
        const textContent = panel.querySelector(".text-content");

        gsap.from(textContent, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalScroll,
            start: "left center",
            end: "right center",
            scrub: 0.5,
          },
        });

        gsap.from(img, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalScroll,
            start: "left center",
            end: "right center",
            scrub: 0.5,
          },
        });
      });

      // Bubbles
      const bubbleContainer = bubbleContainerRef.current;
      for (let i = 0; i < 25; i++) {
        const bubble = document.createElement("div");
        bubble.className =
          "bubble absolute rounded-full opacity-40 pointer-events-none";
        const size = gsap.utils.random(20, 50); // Reduced size for mobile
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.background = gsap.utils.random([
          "#E63946", // red
          "#2D6A4F", // dark green
          "#C5C5C5", // gray
        ]);
        bubble.style.top = `${gsap.utils.random(0, 100)}%`;
        bubble.style.left = `${gsap.utils.random(0, 100)}%`;
        bubbleContainer.appendChild(bubble);

        gsap.to(bubble, {
          y: "-=150", // Reduced movement for mobile
          x: "+=" + gsap.utils.random(-30, 30),
          duration: gsap.utils.random(6, 12),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-r from-white via-gray-50 to-gray-100 py-12 sm:py-16 md:py-20">
      {/* Bubbles */}
      <div
        ref={bubbleContainerRef}
        className="absolute inset-0 z-0 overflow-hidden"
      ></div>

      <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2D6A4F] text-center mb-4 sm:mb-5">
        Our Sponsors
      </h2>
      <p className="relative z-10 text-base sm:text-lg text-gray-700 max-w-xl sm:max-w-2xl mx-auto text-center mb-8 sm:mb-10">
        Meet the companies that make everything possible.
      </p>

      <div ref={containerRef} className="relative z-10">
        <div className="flex h-[80vh] sm:h-screen" ref={trackRef}>
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex-shrink-0 w-screen h-[80vh] sm:h-screen flex items-center justify-center px-4 sm:px-6 md:px-12"
            >
              <div className="relative w-full max-w-lg sm:max-w-3xl md:max-w-5xl h-[60vh] sm:h-[65vh] md:h-[70vh] rounded-3xl shadow-2xl border border-gray-200 bg-white backdrop-blur-lg flex flex-col sm:flex-row overflow-hidden transition-all duration-500 hover:shadow-red-400/40 hover:scale-105">
                <div className="w-full sm:w-1/2 flex flex-col justify-center p-6 sm:p-8 md:p-12 text-content">
                  {/* Badge */}
                  <span className="inline-block mb-3 px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-green-600 rounded-full shadow-md w-fit">
                    {sponsor.badge}
                  </span>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2D6A4F] mb-3 sm:mb-4 tracking-tight drop-shadow-sm">
                    {sponsor.name}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-800 mb-3 sm:mb-4 font-medium leading-relaxed">
                    {sponsor.description}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 italic font-light leading-relaxed">
                    {sponsor.companyInfo}
                  </p>
                </div>
                <div className="w-full sm:w-1/2 flex items-center justify-center bg-gray-50/30 overflow-hidden p-4 sm:p-5">
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className="max-w-full max-h-[200px] sm:max-h-[250px] md:max-h-full object-contain rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}