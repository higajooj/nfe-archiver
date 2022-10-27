// src/pages/api/test.ts
import busboy from "busboy";
import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

// TODO: authenticate api
const nfe_upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const bb = busboy({ headers: req.headers });
  bb.on("file", async (name, file, info) => {
    console.log(name, "123123");
    console.log("parsing....");
    console.log(info);
    const str = (await streamToString(file)) as string;
    console.log(str);
  });
  bb.on("error", (err) => {
    console.log(err);
    res.send("error");
  });
  bb.on("close", () => {
    console.log("parsed successfully.");
    res.send("file uploaded123.");
  });

  req.pipe(bb);
};

export default nfe_upload;

export const config = {
  api: {
    bodyParser: false,
  },
};

function streamToString(stream: Readable) {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
