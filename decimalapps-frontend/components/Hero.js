"use client";
import Image from "next/image";
import Link from "next/link";

const scrolltoHash = (element_id) => {
  const element = document.getElementById(element_id);
  element?.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
};

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Empower your business with our innovative software solutions
                </h1>
                <p className="mb-12 text-base font-medium !leading-relaxed text-black dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  Elevate your business with our tailored software solutions.
                  Boost efficiency, and drive growth with our innovative
                  applications. From web to enterprise software, we deliver
                  customized solutions using cutting-edge technologies.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <button
                    onClick={() => scrolltoHash("supportSection")}
                    className="dark:hover:text-white/1000 rounded-md py-4 px-8 text-base font-semibold text-black/60 duration-300 ease-in-out hover:text-black/100 dark:text-white/60 dark:hover:text-white/100"
                  >
                    🔥 Got a project -{">"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fill class= absolute top-0 left-0 right-0 bottom-0 z-[-10] bg-[url('/images/video/landing-animation.svg')] bg-cover" />
      </section>
    </>
  );
};

export default Hero;
