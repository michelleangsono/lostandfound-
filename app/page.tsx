import { db } from "@/lib/supabase";

export default async function Home() {
  const { data: items } = await db.from("items").select("*");
  const { data: users } = await db.from("users").select("*");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black py-16 px-8">
      <h1 className="text-3xl font-bold mb-8">Lost And Found</h1>

      <section className="w-full max-w-2xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <ul className="space-y-2">
          {items?.map((item) => (
            <li
              key={item.id}
              className="p-3 bg-white rounded shadow dark:bg-zinc-900"
            >
              <span className="font-medium">{item.name}</span>
              <span className="ml-2 text-sm text-zinc-500">
                {item.zone} — {item.isclaim ? "Claimed" : "Not claimed"}
              </span>
            </li>
          ))}
          {(!items || items.length === 0) && <li>No items found</li>}
        </ul>
      </section>

      <section className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <ul className="space-y-2">
          {users?.map((user) => (
            <li
              key={user.id}
              className="p-3 bg-white rounded shadow dark:bg-zinc-900"
            >
              <span className="font-medium">{user.fullname ?? "No name"}</span>
              <span className="ml-2 text-sm text-zinc-500">{user.email}</span>
            </li>
          ))}
          {(!users || users.length === 0) && <li>No users found</li>}
        </ul>
      </section>
    </div>
  );
}
