"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaHeart, FaPlay, FaCamera } from "react-icons/fa";

// 🔁 REPLACE these paths with your real files.
// Drop photos/videos into /public/gallery/ and update `src` below.
// - Photos: .jpg / .png / .webp
// - Videos: .mp4 (keep them short & compressed for web)
//
// `span` controls the size in the grid:
//   "normal"  → 1 column
//   "wide"    → 2 columns (on larger screens)
//   "tall"    → 2 rows
//   "big"     → 2 cols x 2 rows (hero card)
//
// Photos and videos are INTERLEAVED here for a scrapbook feel.
const MEDIA = [
  {
    type: "photo",
    src: "/gallery/photo1.jpg",
    caption: "The face that started everything 💙",
    rotate: -4,
    span: "big",
  },
  {
    type: "video",
    src: "/gallery/video1.mp4",
    caption: "How is this even real? 😍",
    rotate: 3,
    span: "normal",
  },
  {
    type: "video",
    src: "/gallery/video2.mp4",
    caption: "She doesn't even try. And that's the magic.",
    rotate: -3,
    span: "normal",
  },
  {
    type: "photo",
    src: "/gallery/photo2.jpg",
    caption: "This smile owns me — and it knows it.",
    rotate: 4,
    span: "tall",
  },
  {
    type: "video",
    src: "/gallery/video3.mp4",
    caption: "Could watch this forever.",
    rotate: -5,
    span: "normal",
  },
  {
    type: "photo",
    src: "/gallery/photo3.jpg",
    caption: "My favorite view, period.",
    rotate: 2,
    span: "wide",
  },
  {
    type: "video",
    src: "/gallery/video4.mp4",
    caption: "The way she moves. The way she smiles. Everything.",
    rotate: -2,
    span: "normal",
  },
  {
    type: "photo",
    src: "/gallery/photo4.jpg",
    caption: "Every frame of her is my favorite frame.",
    rotate: 5,
    span: "normal",
  },
  {
    type: "video",
    src: "/gallery/video5.mp4",
    caption: "My favorite person, in motion 💙",
    rotate: -3,
    span: "normal",
  },
  {
    type: "photo",
    src: "/gallery/photo5.jpg",
    caption: "Her. Just her. Always her. 💗",
    rotate: 3,
    span: "tall",
  },
  {
    type: "video",
    src: "/gallery/video6.mp4",
    caption: "This laugh is my whole world.",
    rotate: -4,
    span: "normal",
  },
  {
    type: "video",
    src: "/gallery/video7.mp4",
    caption: "Every version of her is my favorite.",
    rotate: 2,
    span: "wide",
  },
  {
    type: "photo",
    src: "/gallery/photo6.jpg",
    caption: "The most beautiful person I know.",
    rotate: -2,
    span: "normal",
  },
  {
    type: "video",
    src: "/gallery/video8.mp4",
    caption: "Yeah... I'm obsessed. Sue me. 💗",
    rotate: 4,
    span: "normal",
  },
];

// Map `span` → Tailwind grid classes
const SPAN_CLASSES = {
  normal: "",
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  big: "sm:col-span-2 sm:row-span-2",
};

function MediaCard({ item, index, inView }) {
  const isVideo = item.type === "video";
  const spanClass = SPAN_CLASSES[item.span] || "";

  // Extra rotation for scrapbook randomness on hover-return
  const hoverRotate = item.rotate > 0 ? item.rotate - 2 : item.rotate + 2;

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
        delay: 0.08 * (index % 8),
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.04,
        rotate: 0,
        zIndex: 30,
        transition: { duration: 0.3 },
      }}
      className={`relative ${spanClass} bg-white p-3 pb-14 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.6)] cursor-pointer`}
    >
      {/* Washi tape decoration (top-left, only on some cards) */}
      {index % 3 === 0 && (
        <div
          className="absolute -top-2 -left-2 w-12 h-5 bg-pink-400/70 rotate-[-15deg] shadow-sm"
          style={{
            clipPath:
              "polygon(0 10%, 100% 0, 95% 100%, 5% 90%)",
          }}
        />
      )}
      {index % 4 === 1 && (
        <div
          className="absolute -top-2 -right-2 w-12 h-5 bg-blue-400/70 rotate-[12deg] shadow-sm"
          style={{
            clipPath:
              "polygon(5% 0, 100% 10%, 95% 90%, 0 100%)",
          }}
        />
      )}

      {/* Media area */}
      <div className="relative w-full h-full aspect-square bg-blue-900/40 overflow-hidden rounded-sm">
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
                '<div class="w-full h-full flex flex-col items-center justify-center text-blue-200/60 text-sm gap-2"><span style="font-size:32px">💙</span><span>Add photo here</span></div>';
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

      {/* Scrapbook grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-6 max-w-6xl w-full">
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