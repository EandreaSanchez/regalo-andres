"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [showGift, setShowGift] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [scratchCount, setScratchCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  useEffect(() => {

    if(!showGift) return;

    const canvas = canvasRef.current;

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    if(!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );

    gradient.addColorStop(0, "#d4d4d8");
    gradient.addColorStop(.5, "#a1a1aa");
    gradient.addColorStop(1, "#71717a");

    ctx.fillStyle = gradient;

    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#000";

    ctx.font = "bold 28px sans-serif";

    ctx.textAlign = "center";

    ctx.fillText(
      "✨ Descubre lo que viene",
      canvas.width / 2,
      canvas.height / 2
    );

  }, [showGift]);

  function revealGift(){

    setRevealed(true);

  }

  return (

    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* VIDEO */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/iphone.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}

      <div className="fixed inset-0 bg-black/45"></div>

      {/* HERO */}

      <section className="relative z-10 flex items-center justify-center min-h-screen px-5">

        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1.2 }}
          className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-[32px] p-6 w-full max-w-md text-center shadow-2xl"
        >

          <p className="tracking-[5px] text-xs text-zinc-300 mb-5">
            SOMETHING SPECIAL IS COMING
          </p>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Andrés,
            <br />
            algo increíble
            está por llegar.
          </h1>

          <p className="text-white/70 text-lg leading-relaxed">
            Un regalo pensado especialmente para ti.
          </p>

          <button
            onClick={() => {

              setShowGift(true);

              setTimeout(() => {

                window.scrollTo({
                  top: window.innerHeight,
                  behavior:"smooth"
                });

              }, 300);

            }}
            className="mt-10 w-full py-4 rounded-full bg-white text-black font-semibold"
          >
            Descubrir sorpresa
          </button>

        </motion.div>

      </section>

      {/* SCRATCH */}

      {
        showGift && (

          <section className="relative z-10 min-h-screen flex items-center justify-center px-5">

            <motion.div
              initial={{ opacity:0, scale:.9 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:.8 }}
              className="w-full max-w-md mx-auto"
            >

              <div className="overflow-hidden rounded-[32px]">

                <div className="relative h-[500px] bg-black border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">

                  {/* SCRATCH */}

                  <canvas
                    ref={canvasRef}
                    className={`absolute inset-0 z-20 rounded-[32px] transition-opacity duration-700 ${
                      scratchCount >= 40
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                    }`}

                    onMouseDown={() => {
                      isDrawing.current = true;
                    }}

                    onMouseUp={() => {
                      isDrawing.current = false;
                    }}

                    onMouseMove={(e) => {

                      if(!isDrawing.current) return;

                      const canvas = canvasRef.current;

                      if(!canvas) return;

                      const ctx = canvas.getContext("2d");

                      if(!ctx) return;

                      const rect = canvas.getBoundingClientRect();

                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;

                      ctx.globalCompositeOperation = "destination-out";

                      ctx.beginPath();

                      ctx.arc(x,y,35,0,Math.PI * 2);

                      ctx.fill();

                      setScratchCount(prev => {

                        const value = prev + 1;

                        if(value >= 40){
                          revealGift();
                        }

                        return value;

                      });

                    }}

                    onTouchStart={() => {
                      isDrawing.current = true;
                    }}

                    onTouchEnd={() => {
                      isDrawing.current = false;
                    }}

                    onTouchMove={(e) => {

                      if(!isDrawing.current) return;

                      const touch = e.touches[0];

                      const canvas = canvasRef.current;

                      if(!canvas) return;

                      const ctx = canvas.getContext("2d");

                      if(!ctx) return;

                      const rect = canvas.getBoundingClientRect();

                      const x = touch.clientX - rect.left;
                      const y = touch.clientY - rect.top;

                      ctx.globalCompositeOperation = "destination-out";

                      ctx.beginPath();

                      ctx.arc(x,y,40,0,Math.PI * 2);

                      ctx.fill();

                      setScratchCount(prev => {

                        const value = prev + 1;

                        if(value >= 40){
                          revealGift();
                        }

                        return value;

                      });

                    }}

                  />

                  {/* REVEAL */}

                  <motion.div
                    initial={{ opacity:0, scale:.8 }}
                    animate={{
                      opacity: revealed ? 1 : 0,
                      scale: revealed ? 1 : .8
                    }}
                    transition={{
                      duration:1.4,
                      ease:"easeOut"
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
                  >

                    <div className="absolute w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>

                    <motion.div
                      initial={{ opacity:0, y:30 }}
                      animate={{
                        opacity: revealed ? 1 : 0,
                        y: revealed ? 0 : 30
                      }}
                      transition={{
                        duration:1.2,
                        delay:.3
                      }}
                      className="relative mb-8"
                    >

                      <Image
                        src="/iphone.png"
                        alt="iPhone 17 Pro"
                        width={260}
                        height={260}
                        className="relative z-10 object-contain drop-shadow-2xl"
                      />

                    </motion.div>

                    <h3 className="text-4xl font-bold text-white mb-4">
                      📱 iPhone 17 Pro
                    </h3>

                    <p className="text-white/70 text-xl leading-relaxed">
                      Tu nuevo iPhone llegará
                      terminando mayo.
                    </p>
                    <p className="text-white/40 text-sm mt-6 italic">
                      Con amor, de tu esposa ❤️
                    </p>

                    <p className="text-white/40 text-sm mt-6 italic">
                      Porque te mereces algo extraordinario.
                    </p>

                  </motion.div>

                </div>

              </div>

            </motion.div>

          </section>

        )
      }

    </main>

  );

}