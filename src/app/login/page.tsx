"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/AuthProvider";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter(); // Linkコンポーネントと似て、画面遷移系をいじるときに使用する
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ページリロードを防ぐ

    // 空チェックなどはここで
    /*
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      },
    );

    if (!res.ok) {
      // エラー表示など
      const message = await res.text();
      alert("ログイン失敗！", res.status, message);
      return;
    }
    const data = (await res.json()) as { username: string };
    alert(ログイン成功);
    */

    // Cookie 保存・遷移は次のステップ以降
    try {
      await login(username, password);
      router.push("/");
    } catch {
      // エラー表示
      // alert("ログイン失敗！", res.status, message);
      console.error("ログイン失敗！");
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        ログイン
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          ユーザー名
          <Input
            type="text"
            name="username"
            placeholder="john"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          パスワード
          <Input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <Button type="submit" className="w-full">
          ログイン
        </Button>
      </form>
    </div>
  );
}
