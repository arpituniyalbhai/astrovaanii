import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/pooja/akhanda-ramayana")({
  component: PoojaAkhandaRedirect,
});

function PoojaAkhandaRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/puja/akhanda-ramayana", replace: true });
  }, [navigate]);

  return null;
}
