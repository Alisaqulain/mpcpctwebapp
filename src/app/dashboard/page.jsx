
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [session, status, router]);

  if (status === "loading" || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
      <p>Phone: {user.phoneNumber}</p>
      <p>Email: {user.email}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Log Out
      </button>
    </div>
  );
}
