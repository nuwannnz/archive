import { HEADERS } from "../constants/headers";
import { getDomains as getDomainDB } from "../repositories/domainRepository.mjs";
import { connectDB } from "../utils/dbConnect.mjs";

const findAllDomains = async (req, context) => {
  await connectDB();

  try {
    // const { limit, pageNumber } = req.queryStringParameters;
    if(req.method === "GET"){
      const domain = await getDomainDB();

    return new Response(JSON.stringify({ msg: "Success", domain }), {
      headers: HEADERS,
      status: 200,
    });
    }

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

export default findAllDomains;
