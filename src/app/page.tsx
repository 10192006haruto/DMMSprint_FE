import { Timeline } from "@/components/Timeline";
import { YweetCard } from "../components/YweetCard";

// src/app/page.tsx

type Yweet = {
  id: number;
  content: string;
  user: {
    username: string;
    avator: string;
  };
};

// レスポンスは配列そのもの
type TimelineResponse = Yweet[];

/**
 * タイムライン（ホーム）
 * docs/02_timeline.md を見ながら、ここで API から Yweet を取得して表示する
 */
export default async function Home() {
  // 投稿の取得
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/timelines/public",
  ); // http://localhost:8080

  // console.log(response);

  // bodyの中身をみる
  const yweets = (await response.json()) as TimelineResponse;

  console.log(yweets);

  return (
    <Timeline>
      {yweets.map((yweet) => (
        <YweetCard
          key={yweet.id}
          username={yweet.user.username}
          content={yweet.content}
          avatarUrl={yweet.user.avatar}
        />
      ))}
    </Timeline>
  );
}
