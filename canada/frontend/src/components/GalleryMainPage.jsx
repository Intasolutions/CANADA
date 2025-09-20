import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const years = ["All", "2023", "2022", "2021"];
const events = ["All", "Festival", "Community", "Celebration", "Tradition"];

export default function GalleryMainPage() {
  const galleryRef = useRef(null);
  const [images, setImages] = useState([]);
  const [lightboxImg, setLightboxImg] = useState(null);

  const [yearFilter, setYearFilter] = useState("All");
  const [eventFilter, setEventFilter] = useState("All");

  useEffect(() => {
    // Fetch gallery data from backend
    fetch("http://15.157.67.144/api/gallery/")
      .then((res) => res.json())
      .then((data) => {
        const items = data.results || data;
        setImages(items);
      })
      .catch((err) => console.error("Failed to fetch gallery images:", err));
  }, []);

const filteredImages = images.filter((img) => {
  return (
    (yearFilter === "All" || img.year.toString() === yearFilter) &&
    (eventFilter === "All" || img.event === eventFilter)
  );
});


  useEffect(() => {
    const ctx = gsap.context(() => {
      const revealContainers = gsap.utils.toArray(".reveal");

      revealContainers.forEach((container, i) => {
        const image = container.querySelector("img");

        gsap.set(container, {
          autoAlpha: 1,
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          overflow: "hidden",
        });
        gsap.set(image, { scale: 1.4 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.1,
        });

        tl.to(container, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power3.out",
        });

        tl.to(
          image,
          {
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "<"
        );
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [filteredImages]);

  useEffect(() => {
    const cards = document.querySelectorAll(".gallery-card");
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [filteredImages]);

  useEffect(() => {
    const activeChips = document.querySelectorAll(".chip-active");
    gsap.fromTo(
      activeChips,
      { scale: 0.9, boxShadow: "0 0 0px rgba(0,0,0,0)" },
      {
        scale: 1,
        boxShadow: "0 0 15px rgba(20,184,166,0.6)",
        duration: 0.4,
        ease: "back.out(2)",
        stagger: 0.1,
      }
    );
  }, [yearFilter, eventFilter]);

  useEffect(() => {
    if (lightboxImg) {
      gsap.fromTo(
        ".lightbox-img",
        { opacity: 0, scale: 0.85, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [lightboxImg]);

  return (
    <section ref={galleryRef} className="relative px-6 md:px-16 py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 relative inline-block">
          Our Gallery
          <span className="block w-20 h-1 bg-gradient-to-r from-green-500 to-teal-400 mx-auto mt-3 rounded-full"></span>
        </h2>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          A vibrant showcase of our community events, festivals, and traditions.
          Each snapshot reflects moments of culture, joy, and togetherness.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <div className="flex gap-2">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setYearFilter(y)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition chip 
                ${
                  yearFilter === y
                    ? "bg-teal-500 text-white chip-active"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {y}
            </button>
          ))}
        </div>

        {/* <div className="flex gap-2">
          {events.map((e) => (
            <button
              key={e}
              onClick={() => setEventFilter(e)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition chip 
                ${
                  eventFilter === e
                    ? "bg-green-500 text-white chip-active"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {e}
            </button>
          ))}
        </div> */}
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {filteredImages.map((img, index) => (
          <div
            key={img.id}
            className="gallery-card relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group break-inside-avoid reveal opacity-0"
            onClick={() => setLightboxImg(img.src)}
          >
            <img
              src={img.src}
              alt={img.event}
              className="w-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-start p-6">
              <p className="text-white font-semibold text-lg tracking-wide">
                {img.event} 
              </p>
            </div>
          </div>
        ))}
      </div>

      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setLightboxImg(null)}
        >
          <img
            src={lightboxImg}
            alt="Full View"
            className="lightbox-img max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
