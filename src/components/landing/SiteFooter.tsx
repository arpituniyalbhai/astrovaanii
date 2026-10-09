import brandIcon from "@/assets/astrovaanii-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <img src={brandIcon} alt="" width={24} height={24} className="h-6 w-6" />
          <span className="font-display text-lg text-foreground">AstroVaanii</span>
        </div>
        <p>Vedic astrology tools designed for clarity, reflection, and responsible use.</p>
        <p>© {new Date().getFullYear()} AstroVaanii. All rights reserved.</p>
      </div>
    </footer>
  );
}
