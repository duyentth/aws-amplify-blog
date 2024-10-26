"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { Hub, Auth } from "aws-amplify/utils";
import { getCurrentUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const NavBar = () => {
  const [signedUser, setSignedUser] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const authListener = () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          setSignedUser(true);
          startTransition(() => router.refresh());
          break;
        case "signedOut":
          setSignedUser(false);
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
      }
    });
    getCurrentUser().then((user) => setSignedUser(true));
  };

  useEffect(() => {
    authListener();
  }, [router]);
  return (
    <>
      <nav className="flex justify-center pt-3 pb-3 space-x-4 border-b bg-cyan-500 border-gray-300">
        {[
          ["Home", "/"],
          ["Create Post", "/createPost"],
          ["Profile", "/profile"],
        ].map(([title, url], index) => (
          <Link
            href={url}
            key={index}
            className=" rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
          >
            {title}
          </Link>
        ))}
        {signedUser && (
          <Link
            href={"/my-posts"}
            className=" rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
          >
            My Posts
          </Link>
        )}
      </nav>
    </>
  );
};

export default NavBar;
