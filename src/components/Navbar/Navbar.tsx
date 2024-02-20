import { Link,  useLocation} from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../Theme/mode-toggle";

const examples = [
  {
    name: "Задачі",
    href: "/tasks/all",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/tasks",
  },

  {
    name: "Графік",
    href: "/examples/dashboard",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/dashboard",
  },
  {
    name: "Повідомлення",
    href: "/examples/mail",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/mail",
  },
  {
    name: "Вхід",
    href: "/examples/authentication",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/authentication",
  },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="flex gap-5">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {examples.map((example, idx) => (
            <Link
              key={example.name}
              to={example.href}
              className={cn(
                "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                location.pathname?.startsWith(example.href) ||
                  (idx === 0 && location.pathname === "/")
                  ? "bg-muted font-medium text-primary"
                  : "text-muted-foreground"
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
