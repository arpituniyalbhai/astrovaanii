import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/pooja/")({
  component: PoojaRedirect,
});

function PoojaRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/puja", replace: true });
  }, [navigate]);

  return null;
}
