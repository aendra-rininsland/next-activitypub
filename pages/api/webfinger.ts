// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type WebfingerResource = {
  subject: string;
  links: [
    {
      rel: "self";
      type: "application/activity+json";
      href: string;
    }
  ];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WebfingerResource>
) {
  const {
    ACTIVITYPUB_DOMAIN,
    ACTIVITYPUB_USERNAME,
    ACTIVITYPUB_PUBLIC_KEY_PEM,
  } = process.env;

  const { resource } = req.query;

  if (!ACTIVITYPUB_USERNAME) throw new Error("Please set ACTIVITYPUB_USERNAME");
  if (!ACTIVITYPUB_PUBLIC_KEY_PEM)
    throw new Error("Please set ACTIVITYPUB_PUBLIC_KEY_PEM");

  if (!resource) {
    return res.status(500);
  }

  res.status(200).json({
    subject: resource.toString(),

    links: [
      {
        rel: "self",
        type: "application/activity+json",
        href: `https://${ACTIVITYPUB_DOMAIN}/actor`,
      },
    ],
  });
}
