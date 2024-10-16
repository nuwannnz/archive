const Contact = () => {
  return (
    <section
      id="supportSection"
      className="overflow-hidden"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="lg:w-12/12 xl:w-12/12 w-full px-4">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] flex lg:flex-row flex-col justify-between items-center lg:items-start"
              data-wow-delay=".15s
              "
            >
              <div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl text-center lg:text-left">
                Need Help? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-body-color text-center lg:text-left">
                Our support team will get back to you ASAP via email.
              </p>
              </div>
               <div className=" px-4">
                <a href="mailto:support@decimalapp.com?subject=Contact DecimalApps">
                    <button className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                      Submit Ticket
                    </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;