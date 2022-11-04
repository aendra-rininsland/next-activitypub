// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type APActor = {
  "@context": string[];
  id: string;
  type: string;
  preferredUsername: string;
  inbox: string;
  publicKey: {
    id: string;
    owner: string;
    publicKeyPem: string;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<APActor>
) {
  const {
    ACTIVITYPUB_DOMAIN,
    ACTIVITYPUB_USERNAME,
    ACTIVITYPUB_PUBLIC_KEY_PEM,
  } = process.env;

  if (!ACTIVITYPUB_USERNAME) throw new Error("Please set ACTIVITYPUB_USERNAME");
  if (!ACTIVITYPUB_PUBLIC_KEY_PEM)
    throw new Error("Please set ACTIVITYPUB_PUBLIC_KEY_PEM");

  try {
    const response = {
      "@context": [
        "https://www.w3.org/ns/activitystreams",
        "https://w3id.org/security/v1",
      ],

      id: `https://${ACTIVITYPUB_DOMAIN}/actor`,
      type: "Person",
      preferredUsername: ACTIVITYPUB_USERNAME.toString(),
      inbox: `https://${ACTIVITYPUB_DOMAIN}/inbox`,

      publicKey: {
        id: `https://${ACTIVITYPUB_DOMAIN}/actor#main-key`,
        owner: "https://${ACTIVITYPUB_DOMAIN}/actor",
        publicKeyPem: ACTIVITYPUB_PUBLIC_KEY_PEM.toString(),
      },
    };
    res.status(200).json(response);
  } catch (e) {}
}
