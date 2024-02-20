import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Link, NavLink } from "react-router-dom";

interface NavProps {
  //   isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    to: string;
    variant: "default" | "ghost";
  }[];
  onOpenChange?: () => void;
}

export function Nav({ links, onOpenChange }: NavProps) {
  return (
    <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            onClick={() => onOpenChange?.()}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                "justify-start",
                isActive
                  ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white bg-gray-300"
                  : ""
              )
            }
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
            {link.label && (
              <span
                className={cn(
                  "ml-auto"
                )}
              >
                {link.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
