import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-xl font-semibold">Page non trouvée</h2>
        <p className="text-muted-foreground">
          Désolé, la page que vous recherchez n&apos;existe pas.
        </p>
      </div>
      <Link href="/dashboard">
        <Button>Retour au dashboard</Button>
      </Link>
    </div>
  );
}
