import { NavLinks } from "./nav-links";

export function Sidebar() {
  return (
    <aside className="hidden w-56 flex-shrink-0 border-r border-outline-variant bg-white lg:flex lg:flex-col">
      <div className="p-6">
        <h1 className="font-serif text-headline-md text-[var(--cinnabar)]">
          LitMatch
        </h1>
        <p className="text-label-md text-ink-muted">Vietnamese Classics</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        <NavLinks />
      </nav>
    </aside>
  );
}
