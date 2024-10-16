import Image from "next/image";
import SectionTitle from "./common/SectionTitle";

const About = () => {
  return (
    <section id="aboutSection" className="py-16 md:py-20 lg:py-28">
      <SectionTitle
        title="About Us"
        paragraph="Empowering Innovation Through Software Solutions"
        center
      />
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full overflow-hidden px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] rounded-xl bg-white/30 text-center backdrop-blur lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/people-who-support-svgrepo-com.svg"
                alt="about image"
                layout='fill'
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Our Mission
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  At DecimalApps, we empower businesses through innovative
                  software solutions. Our mission is to deliver exceptional
                  products that exceed client expectations and drive success.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Our Expertise
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  With extensive experience in software development, our team at
                  DecimalApps specializes in web, mobile, and enterprise
                  solutions. We bring together top talent and cutting-edge
                  technologies to deliver outstanding results.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Our Approach
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  At DecimalApps, we take a client-centric approach to software
                  development. We prioritize open communication, collaboration,
                  and transparency to ensure tailored solutions that meet
                  specific requirements ensuring long-term partnerships and
                  client satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
