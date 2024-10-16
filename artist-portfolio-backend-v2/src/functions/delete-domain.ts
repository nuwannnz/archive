import { HEADERS } from "../constants/headers";
import { deleteDomain as deleteDomainDB } from "../repositories/domainRepository.js";
import { connectDB } from "../utils/dbConnect.js";

exports.handler = async (event: any) => {
  await connectDB();

  try {
    const domainId = event.pathParameters;

    if (!domainId) {
      throw new Error("DomainId not provided");
    }

    console.log(domainId);

    const domain = await deleteDomainDB(domainId);

    return new Response(JSON.stringify({ msg: "Success delete", domain }), {
      headers: HEADERS,
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({
        status: "Failed",
        message: "Internal Server Error",
      }),
      {
        headers: HEADERS,
        status: 500,
      }
    );
  }
};
