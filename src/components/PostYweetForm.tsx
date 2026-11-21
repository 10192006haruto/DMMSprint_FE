// src/components/PostYweetForm.tsx

"use client";

import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import type { Yweet } from "@/types/yweet";
import { useState } from "react";
import { useAuth } from "@/auth/AuthProvider";

type PostYweetFormProps = {
  /** 投稿に成功したとき、作成された Yweet を親に渡す */
  onPosted: (yweet: Yweet) => void;
};

export function PostYweetForm({ onPosted }: PostYweetFormProps) {
  // 入力値は次のステップで useState で持つ

  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getAuthenticationHeader } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページリロードを防ぐ

    if (content.trim() === "") {
      setError("本文を入力してください");
      return;
    }

    const authentication = getAuthenticationHeader();
    if (!authentication) {
      setError("投稿するにはログインが必要です");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/yweets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authentication: authentication,
          },
          body: JSON.stringify({
            yweet: content,
          }),
        },
      );

      if (!res.ok) {
        setError("投稿に失敗しました");
        return;
      }

      const created = (await res.json()) as Yweet;
      // created を一覧に足す（次のステップ）
      onPosted(created);
      setContent("");
    } finally {
      // 成功・失敗どちらでも送信中フラグを戻す
      setIsSubmitting(false);
    }
  };

  // onPosted は送信成功後（手順 6）で呼ぶ

  return (
    <form
      className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3"
      onSubmit={handleSubmit}
    >
      <Textarea name="yweet" placeholder="いまどうしてる？" />
      <div className="flex justify-end">
        <Button type="submit">投稿する</Button>
      </div>
    </form>
  );
}
