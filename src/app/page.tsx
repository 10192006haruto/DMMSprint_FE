import { Timeline } from "@/components/Timeline";
// import { YweetCard } from "../components/YweetCard";
import { TimelineFeed } from "@/components/TimelineFeed";
import type { Yweet } from "@/types/yweet";

// src/app/page.tsx

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
  // const yweets = (await response.json()) as TimelineResponse;
  const yweets = (await response.json()) as Yweet[]:

  console.log(yweets);

  return (
    <Timeline>
      <TimelineFeed initialYweets={yweets} />
    </Timeline>
  );
}
