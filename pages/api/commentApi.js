import { nanoid } from "nanoid";
import Redis from "ioredis";

export default async function handler(req, res) {
  const { text, url, token } = req.body;
  //Create a new comment
  if (req.method === "POST") {
    if (text === "" || !url || !token) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    const userResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const user = await userResponse.json();

    const comment = {
      id: nanoid(),
      createdAt: Date.now(),
      text,
      url,
      user: {
        name: user.name,
        picture: user.picture,
      },
    };
    //redis connection
    let redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL);
    //redis write
    redis.lpush(url, JSON.stringify(comment));
    //redis quit
    redis.quit();
    //response
    res.status(200).json(comment);
  }

  //Fetch all comments
  if (req.method === "GET") {
    const { url } = req.query;

    let redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL);
    const comments = await redis.lrange(url, 0, -1);
    redis.quit();
    const data = comments.map((comment) => JSON.parse(comment));
    res.status(200).json(data);
  }
}
