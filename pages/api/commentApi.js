// import { nanoid } from "nanoid";

// export default function handler(res, req) {
//   if (req.method === "POST") {
//     const { text, url, name, picture } = req.body;
//     if (text === "")
//       return res.status(400).json({ message: "Something went wrong" });

//     const comment = {
//       id: nanoid(),
//       createdAt: Date.now(),
//       text,
//       url,
//       user: {
//         name,
//         picture,
//       },
//     };
//     res.json(comment);
//   }
// }

export default function handler(req, res) {
  //Create a new comment
  if (req.method === "POST") {
    const { text, url, token } = req.body;
    res.status(200).json({ text: "kommend eklendı" });
  }

  //Fetch all comments
  if (req.method === "GET") {
    res.status(200).json({ text: "yotumlar" });
  }
}
