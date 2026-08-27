"use client";
import { Item } from "@/lib/types";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type Filter = "all" | "lost" | "found";

const Dashboard = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = items.filter((item) => {
    if (filter === "lost") return !item.isclaim;
    if (filter === "found") return item.isclaim;
    return true;
  });

  const counts = {
    all: items.length,
    lost: items.filter((i) => !i.isclaim).length,
    found: items.filter((i) => i.isclaim).length,
  };

  const logout = () => {
    sessionStorage.removeItem("users");
    redirect("/login");
  };

  return (
    <main className="min-h-dvh bg-zinc-50 dark:bg-zinc-950">
      <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Lost & Found
            </h1>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {counts.all} items
            </span>
            <button className="cursor-pointer" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="flex gap-2 px-5 pb-3 sm:px-6">
          {(["all", "lost", "found"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="ml-1.5 text-xs opacity-60">{counts[f]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
              <svg
                className="h-8 w-8 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              No items found
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {filter === "all"
                ? "No items have been reported yet"
                : `No ${filter} items reported`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-medium text-zinc-900 dark:text-zinc-50">
                      {item.name}
                    </h3>
                    {item.zone && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
                        <svg
                          className="h-3.5 w-3.5 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        {item.zone}
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.isclaim
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                    }`}
                  >
                    {item.isclaim ? "Found" : "Lost"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
