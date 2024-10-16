import { HEADERS } from "../constants/headers";
import { createDomain as createDomainDB } from "../repositories/domainRepository.js";
import { connectDB } from "../utils/dbConnect.js";

exports.handler = async (req: any, context: any) => {
  await connectDB();
  console.log("===> req: ", req);
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
        message: "Internal Server Error",
      }),
      {
        headers: HEADERS,
        status: 500,
      }
    );
  }
};
