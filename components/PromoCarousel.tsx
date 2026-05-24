"use client";

import { useEffect, useRef, useState } from "react";

export default function PromoCarousel() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          "/api/articles?type=carousel&limit=10"
        );

        const json = await res.json();

        setItems(json?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    if (!scrollRef.current || items.length === 0) return;

    const container = scrollRef.current;

    const interval = setInterval(() => {
      const width = window.innerWidth;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: width,
          behavior: "smooth",
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <section className="relative bg-black overflow-hidden">
      {/* HEADER FLOAT */}
      <div
        className="
          absolute
          top-0
          left-0
          z-20
          w-full
          px-5 md:px-10
          pt-5 md:pt-5
          pointer-events-none
        "
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="
              text-[11px]
              uppercase
              tracking-[4px]
              font-black
              text-red-500
              mb-3
            "
          >
            Promo & Highlight
          </p>
{/* 
          <h2
            className="
              text-white
              text-3xl
              md:text-6xl
              font-black
              tracking-tight
            "
          >
            Artikel Pilihan
          </h2> */}
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="h-[85vh] bg-zinc-900 animate-pulse" />
      ) : (
        <div
          ref={scrollRef}
          className="
            flex
            overflow-x-auto
            snap-x
            snap-mandatory
            scroll-smooth
            no-scrollbar
          "
        >
          {items.map((item) => (
            <a
              key={item._id}
              href={`/artikel/${item.slug}`}
              className="
                relative
                w-screen
                h-[85vh]
                shrink-0
                snap-start
                overflow-hidden
                group
              "
            >
              {/* IMAGE */}
              <img
                src={
                  item.bannerUrl ||
                  item.thumbnailUrl ||
                  "https://placehold.co/1920x1080"
                }
                alt={item.title}
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-105
                  transition-transform
                  duration-[2500ms]
                "
              />

              {/* OVERLAY */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-black/85
                  via-black/45
                  to-black/20
                "
              />

              {/* BOTTOM FADE */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-60
                  bg-gradient-to-t
                  from-black
                  to-transparent
                "
              />

              {/* CONTENT */}
              <div
                className="
                  relative
                  z-10
                  h-full
                  max-w-7xl
                  mx-auto
                  px-5 md:px-10
                  flex
                  items-end
                  pb-16 md:pb-24
                "
              >
                <div className="max-w-3xl">
                  {/* TAG */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.tags?.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="
                          px-4 py-1.5
                          rounded-full
                          bg-white/10
                          backdrop-blur-md
                          border
                          border-white/10
                          text-white
                          text-[10px]
                          uppercase
                          tracking-[2px]
                          font-black
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* TITLE */}
                  <h3
                    className="
                      text-white
                      text-[38px]
                      sm:text-[54px]
                      md:text-[82px]
                      leading-[0.95]
                      tracking-[-3px]
                      font-black
                      uppercase
                    "
                  >
                    {item.title}
                  </h3>

                  {/* EXCERPT */}
                  {item.excerpt && (
                    <p
                      className="
                        mt-6
                        text-white/70
                        text-sm
                        md:text-lg
                        leading-relaxed
                        max-w-2xl
                      "
                    >
                      {item.excerpt}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="mt-8 flex items-center gap-4">
                    {/* <span
                      className="
                        inline-flex
                        h-14
                        px-8
                        rounded-full
                        bg-red-600
                        text-white
                        text-[11px]
                        uppercase
                        tracking-[2px]
                        font-black
                        items-center
                        justify-center
                        group-hover:bg-red-700
                        transition-colors
                      "
                    >
                      Baca Selengkapnya
                    </span> */}
{/* 
                    {item.isFeatured && (
                      <span
                        className="
                          text-white/60
                          text-xs
                          uppercase
                          tracking-[3px]
                          font-bold
                        "
                      >
                        Featured Article
                      </span>
                    )} */}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* INDICATOR */}
      {!loading && items.length > 0 && (
        <div
          className="
            absolute
            bottom-6
            left-1/2
            -translate-x-1/2
            z-30
            flex
            gap-2
          "
        >
          {items.map((_, idx) => (
            <div
              key={idx}
              className="
                w-10
                h-[3px]
                rounded-full
                bg-white/30
                overflow-hidden
              "
            >
              <div
                className="
                  h-full
                  bg-red-500
                  animate-progress
                "
              />
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }

        .animate-progress {
          animation: progress 5s linear infinite;
        }
      `}</style>
    </section>
  );
}