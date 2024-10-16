import { HEADERS } from "../constants/headers";
import { updateDomain as updateDomainDB } from "../repositories/domainRepository.js";
import { connectDB } from "../utils/dbConnect.js";

exports.handler = async (event: any) => {
  await connectDB();

  try {
    const eventData = JSON.parse(event.body);

    if (!eventData.id) {
      throw new Error("Missing domain ID in the request");
    }

    const updateFields = {
      name: eventData.name,
      url: eventData.url ?? undefined,
      contactDetails: eventData.contactDetails ?? undefined,
      socialMediaUrls: [
        {
          name: eventData.socialMediaUrls[0].name,
          social_url: eventData.socialMediaUrls[0].socialMedia_url,
          icon: eventData.socialMediaUrls[0].icon,
        },
      ],
      streamingUrls: [
        {
          name: eventData.streamingUrls[0].name,
          stream_url: eventData.streamingUrls[0].streaming_url,
          icon: eventData.streamingUrls[0].icon,
        },
      ],
    };

    const domain = await updateDomainDB(eventData.id, updateFields);

    return new Response(JSON.stringify({ msg: "Updated success", domain }), {
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
