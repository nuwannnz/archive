import SectionTitle from "./common/SectionTitle";

const Features = () => {
  return (
    <>
      <section
        id="expertiseSection"
        className="bg-primary/[.03] py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <SectionTitle
            title="What we offer?"
            paragraph="Reasons to choose us to build your business."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;

const SingleFeature = ({ feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

const featuresData = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-table-options"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="#00bfd8"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7" />
        <path d="M3 10h18" />
        <path d="M10 3v18" />
        <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M19.001 15.5v1.5" />
        <path d="M19.001 21v1.5" />
        <path d="M22.032 17.25l-1.299 .75" />
        <path d="M17.27 20l-1.3 .75" />
        <path d="M15.97 17.25l1.3 .75" />
        <path d="M20.733 20l1.3 .75" />
      </svg>
    ),
    title: "Customized Development",
    paragraph:
      "Our team of experienced developers will tailor the software to your specific needs, ensuring that it aligns perfectly with your business requirements.",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-cloud-lock"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="#00bfd8"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1c.397 -1.768 -.285 -3.593 -1.788 -4.787c-1.503 -1.193 -3.6 -1.575 -5.5 -1s-3.315 2.019 -3.712 3.787c-2.199 -.088 -4.155 1.326 -4.666 3.373c-.512 2.047 .564 4.154 2.566 5.027" />
        <path d="M8 15m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
        <path d="M10 15v-2a2 2 0 1 1 4 0v2" />
      </svg>
    ),
    title: "Robust Security",
    paragraph:
      "e implement industry-standard security practices to protect your software and sensitive data, giving you peace of mind and maintaining user trust.",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-layout-collage"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="#00bfd8"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
        <path d="M10 4l4 16" />
        <path d="M12 12l-8 2" />
      </svg>
    ),
    title: "User-Friendly Interface",
    paragraph:
      "We prioritize creating intuitive user interfaces that enhance user experience, ensuring that your software is easy to use and navigate.",
  },
  {
    id: 4,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-radar"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="#00bfd8"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M21 12h-8a1 1 0 1 0 -1 1v8a9 9 0 0 0 9 -9" />
        <path d="M16 9a5 5 0 1 0 -7 7" />
        <path d="M20.486 9a9 9 0 1 0 -11.482 11.495" />
      </svg>
    ),
    title: "Cutting-Edge Technologies",
    paragraph:
      "We stay up-to-date with the latest technologies and leverage them to build innovative software solutions that give your business a competitive edge.",
  },
  {
    id: 5,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-24-hours"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="#00bfd8"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
        <path d="M4 13a8.094 8.094 0 0 0 3 5.24" />
        <path d="M11 15h2a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-1a1 1 0 0 0 -1 1v1a1 1 0 0 0 1 1h2" />
        <path d="M17 15v2a1 1 0 0 0 1 1h1" />
        <path d="M20 15v6" />
      </svg>
    ),
    title: "Continuous Support",
    paragraph:
      "Our commitment to your success doesn't end with the software delivery. We provide ongoing support to ensure your software performs optimally and address any issues that arise.",
  },
  {
    id: 6,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-chart-arrows-vertical"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="#00bfd8"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 21v-14" />
        <path d="M9 15l3 -3l3 3" />
        <path d="M15 10l3 -3l3 3" />
        <path d="M3 21l18 0" />
        <path d="M12 21l0 -9" />
        <path d="M3 6l3 -3l3 3" />
        <path d="M6 21v-18" />
      </svg>
    ),
    title: "Scalable Architecture",
    paragraph:
      "We build software solutions with a scalable architecture, allowing your application to handle growing user demand and increased workload effortlessly.",
  },
];
