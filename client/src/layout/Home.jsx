import LogoutButton from "@/components/auth/LogoutButton";
import { useSession } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending, error } = useSession();

  console.log({ session, isPending, error });

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton />
    </div>
  );
}
