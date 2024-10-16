import { HEADERS } from "../constants/headers";
import { createDomain as createDomainDB } from "../repositories/domainRepository.mjs";
import { connectDB } from "../utils/dbConnect.mjs";

const createDomain = async (event) => {

  await connectDB();

  try {
    const eventcontext = JSON.stringify(event.body);
    const domain = await createDomainDB(eventcontext);

    return new Response(JSON.stringify({ msg: "Success", domain }), {
      headers: HEADERS,
      status: 200,
    });

  } catch (error) {
    
    console.log(error);
    return new Response(
      JSON.stringify({
        status: "Failed",
        message: error.message || "Internal Server Error",
      }),
      {
        headers: HEADERS,
        status: error.statusCode || 500,
      }
    );
  }
};

export default createDomain;
