import { ModeToggle } from "./mode-toggle";
import { Badge } from "./ui/badge";

export function Header() {
  return (
    <header className="fixed top-0 z-40 w-full border-b bg-background">
      <div className="container flex gap-4 h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <span className="hidden font-bold sm:inline-block">
          .xml გენერატორი
        </span>
        <Badge variant="secondary">ვერსია v1.9</Badge>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
