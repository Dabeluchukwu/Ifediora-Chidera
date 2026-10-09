"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaHeart, FaPlay, FaCamera } from "react-icons/fa";

// 🔁 REPLACE these paths with your real files.
// Drop photos/videos into /public/gallery/ and update `src` below.
// - Photos: .jpg / .png / .webp
// - Videos: .mp4 (keep them short & compressed for web)
//
// Photos and videos are INTERLEAVED here for a scrapbook feel.
// 5 photos + 18 videos = 23 cards total.
const MEDIA = [
  {
    type: "photo",
    src: "/gallery/photo1.jpg.jpeg",
    caption: "The face that started everything 💙",
    rotate: -4,
  },
  {
    type: "video",
    src: "/gallery/vedio1.mp4",
    caption: "How is this even real? 😍",
    rotate: 3,
  },
  {
    type: "video",
    src: "/gallery/vedio2.mp4",
    caption: "She doesn't even try. And that's the magic.",
    rotate: -3,
  },
  {
    type: "video",
    src: "/gallery/vedio3.mp4",
    caption: "Could watch this forever.",
    rotate: 4,
  },
  {
    type: "video",
    src: "/gallery/vedio4.mp4",
    caption: "The way she moves. The way she smiles. Everything.",
    rotate: -5,
  },
  {
    type: "photo",
    src: "/gallery/photo2.jpg.jpeg",
    caption: "This smile owns me — and it knows it.",
    rotate: 2,
  },
  {
    type: "video",
    src: "/gallery/vedio5.mp4",
    caption: "My favorite person, in motion 💙",
    rotate: -2,
  },
  {
    type: "video",
    src: "/gallery/vedio6.mp4",
    caption: "This laugh is my whole world.",
    rotate: 5,
  },
  {
    type: "video",
    src: "/gallery/vedio7.mp4",
    caption: "Every version of her is my favorite.",
    rotate: -3,
  },
  {
    type: "video",
    src: "/gallery/vedio8.mp4",
    caption: "Yeah... I'm obsessed. Sue me. 💗",
    rotate: 3,
  },
  {
    type: "photo",
    src: "/gallery/photo3.jpg.jpeg",
    caption: "My favorite view, period.",
    rotate: -4,
  },
  {
    type: "video",
    src: "/gallery/vedio9.mp4",
    caption: "The way she laughs at nothing. I love it.",
    rotate: 2,
  },
  {
    type: "video",
    src: "/gallery/vedio10.mp4",
    caption: "Every little thing she does, I notice.",
    rotate: -2,
  },
  {
    type: "video",
    src: "/gallery/Snapchat1.mp4",
    caption: "This is what happiness looks like.",
    rotate: 4,
  },
  {
    type: "video",
    src: "/gallery/Snapchat2.mp4",
    caption: "I could replay this forever.",
    rotate: -5,
  },
  {
    type: "photo",
    src: "/gallery/photo4.jpg.jpeg",
    caption: "Every frame of her is my favorite frame.",
    rotate: 3,
  },
  {
    type: "video",
    src: "/gallery/Snapchat3.mp4",
    caption: "Her energy. Nothing compares.",
    rotate: -3,
  },
  {
    type: "photo",
    src: "/gallery/Snapchat5.jpg",
    caption: "Her. Just her. Always her. 💗",
    rotate: -4,
  },
  {
    type: "video",
    src: "/gallery/Snapchat4.mp4",
    caption: "The prettiest girl I've ever seen.",
    rotate: 5,
  },
  {
    type: "video",
    src: "/gallery/Snapchat6.mp4",
    caption: "Caught her being perfect again. Classic.",
    rotate: -2,
  },
  {
    type: "video",
    src: "/gallery/Snapchat7.mp4",
    caption: "Every second of her is a favorite second.",
    rotate: 2,
  },
  {
    type: "photo",
    src: "/gallery/photo5.jpg.jpeg",
    caption: "Her. Just her. Always her. 💗",
    rotate: -4,
  },
  {
    type: "video",
    src: "/gallery/Snapchat8.mp4",
    caption: "I fall harder every time I watch this.",
    rotate: 3,
  },
  {
    type: "video",
    src: "/gallery/Snapchat9.mp4",
    caption: "The most beautiful person I know.",
    rotate: -3,
  },
];

function MediaCard({ item, index, inView }) {
  const isVideo = item.type === "video";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.9 }}
      animate={
        inView
          ? { opacity: 1, y: 0, rotate: item.rotate, scale: 1 }
          : {}
      }
      transition={{
        duration: 0.7,
        delay: 0.06 * (index % 8),
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.04,
        rotate: 0,
        zIndex: 30,
        transition: { duration: 0.3 },
      }}
      className="relative bg-white p-3 pb-14 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.6)] cursor-pointer"
    >
      {/* Washi tape decoration */}
      {index % 3 === 0 && (
        <div
          className="absolute -top-2 -left-2 w-12 h-5 bg-pink-400/70 rotate-[-15deg] shadow-sm"
          style={{
            clipPath: "polygon(0 10%, 100% 0, 95% 100%, 5% 90%)",
          }}
        />
      )}
      {index % 4 === 1 && (
        <div
          className="absolute -top-2 -right-2 w-12 h-5 bg-blue-400/70 rotate-[12deg] shadow-sm"
          style={{
            clipPath: "polygon(5% 0, 100% 10%, 95% 90%, 0 100%)",
          }}
        />
      )}

      {/* Media area */}
      <div className="relative w-full aspect-square bg-blue-900/40 overflow-hidden rounded-sm">
        {isVideo ? (
          <>
            <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center">
              <FaPlay className="text-white text-[10px] translate-x-[1px]" />
            </div>
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.caption}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.innerHTML =
                '<div class="w-full h-full flex items-center justify-center text-blue-200/60 text-sm gap-2"><span style="font-size:32px">💙</span><span>Add photo here</span></div>';
            }}
          />
        )}
      </div>

      {/* Caption */}
      <p className="absolute bottom-3 left-0 right-0 text-center text-black text-sm font-medium px-2 leading-tight">
        {item.caption}
      </p>

      {/* Heart corner */}
      <FaHeart className="absolute top-1 right-1 text-pink-400/60 text-xs" />
    </motion.div>
  );
}

export default function HerGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen px-4 py-24 flex flex-col items-center justify-center"
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <FaCamera className="text-pink-400 text-xl" />
        <p className="text-blue-300/80 tracking-[0.3em] text-xs uppercase">
          Just for you
        </p>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-cursive text-5xl sm:text-6xl text-center gradient-text mb-4"
      >
        Her, In Every Frame
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-blue-200/70 text-center mb-16 max-w-lg px-4"
      >
        Photos, videos, moments — every single one is my favorite, because
        it's her.
      </motion.p>

      {/* Uniform scrapbook grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {MEDIA.map((item, i) => (
          <MediaCard key={i} item={item} index={i} inView={inView} />
        ))}
      </div>

      {/* Closing line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.8 }}
        className="font-cursive text-2xl sm:text-3xl text-pink-300/80 mt-16 text-center px-4"
      >
        ...and I'm just getting started 💗
      </motion.p>
    </section>
  );
}