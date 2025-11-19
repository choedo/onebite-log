import type { ReactNode } from "react";
import React from "react";
import supabase from "@/lib/supabase";
import { useIsSessionLoaded, useSetSession } from "@/store/session";
import GlobalLoader from "@/components/global-loader";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;

  return children;
}
