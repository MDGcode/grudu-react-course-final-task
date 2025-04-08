import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface Tweet {
  id: string;
  text: string;
  author_id: string;
}

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/tweets")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>home</div>
      {tweets &&
        tweets.map((tweet) => (
          <div>
            <div>{tweet.author_id}</div>
            <div
              key={tweet.id}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(tweet.text),
              }}
            ></div>
          </div>
        ))}
    </>
  );
}
