import { NavLinks } from "./nav-links";

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-outline-variant bg-white lg:hidden">
      <NavLinks mobile />
    </nav>
  );
}
