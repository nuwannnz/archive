import { HEADERS } from "../constants/headers";
import { createDomain as createDomainDB } from "../repositories/domainRepository.mjs";
import { connectDB } from "../utils/dbConnect.mjs";

exports.handler = async (req, context) => {
  await connectDB();
  console.log("===> req: ", req.body);
  try {
    const dto = JSON.parse(req.body);
    const domain = await createDomainDB(dto);

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
