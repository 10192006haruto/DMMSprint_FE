// src/components/TimelineFeed.tsx

"use client";

import { useAuth } from "@/auth/AuthProvider";
import { PostYweetForm } from "@/components/PostYweetForm";
import { YweetCard } from "@/components/YweetCard";
import { useState } from "react";

export function TimelineFeed({ initialYweets }: TimelineFeedProps) {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const [yweets, setYweets] = useState<Yweet[]>(initialYweets);

  function handlePosted(created: Yweet) {
    setYweets((prev) => [created, ...prev]);
    // state への追加は手順 6 で実装する
  }

  return (
    <>
      {/* ログイン中だけ、一覧の上に投稿フォームを表示する */}
      {isLoggedIn && <PostYweetForm onPosted={handlePosted} />}

      {yweets.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-gray-500">
          まだ Yweet がありません
        </p>
      ) : (
        yweets.map((yweet) => (
          <YweetCard
            key={yweet.id}
            username={yweet.user.username}
            content={yweet.content}
            avatarUrl={yweet.user.avatar}
          />
        ))
      )}
    </>
  );
}
