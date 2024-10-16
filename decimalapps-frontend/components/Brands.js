import Image from "next/image";

const brandsData = [
  {
    id: 1,
    name: "Javascript",
    image: "/images/brands/javascript.svg",
  },
  {
    id: 2,
    name: "NodeJS",
    image: "/images/brands/node-js.svg",
  },
  {
    id: 3,
    name: "ReactJS",
    image: "/images/brands/react-logo.svg",
  },
  {
    id: 4,
    name: "AWS",
    image: "/images/brands/aws-logo.svg",
  },
  {
    id: 5,
    name: "Azure",
    image: "/images/brands/typescript.svg",
  },
];

const Brands = () => {
  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp flex flex-row items-center justify-center rounded-md bg-white/30 backdrop-blur sm:px-10 md:py-[40px] md:px-[50px] lg:flex-wrap xl:p-[50px] 2xl:py-[60px] 2xl:px-[70px]"
              data-wow-delay=".1s
              "
            >
              {brandsData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }) => {
  const { image, name } = brand;

  return (
    <div className="mx-3 flex w-full max-w-[160px] items-center justify-center py-[15px] sm:mx-4 lg:max-w-[130px] xl:mx-6 xl:max-w-[150px] 2xl:mx-8 2xl:max-w-[160px]">
      <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className="relative h-10 w-full"
      />
    </div>
  );
};
