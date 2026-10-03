"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Map, 
  Calendar, 
  MessageSquare, 
  Video, 
  Code, 
  Briefcase, 
  FolderOpen, 
  Settings 
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Roadmap", href: "/roadmap", icon: Map },
  { name: "Daily Planner", href: "/planner", icon: Calendar },
  { name: "AI Mentor", href: "/mentor", icon: MessageSquare },
  { name: "Interview Studio", href: "/studio", icon: Video },
  { name: "Practice", href: "/practice", icon: Code },
  { name: "Career", href: "/career", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-20 flex w-[240px] flex-col border-r bg-card text-card-foreground">
      <div className="flex h-16 shrink-0 items-center px-6 border-b">
        <Link href="/" className="font-bold text-xl text-primary flex items-center gap-2">
          <span className="bg-primary text-primary-foreground p-1 rounded">SE</span>
          OS
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Ajay Maida</span>
            <span className="text-xs text-muted-foreground">Pro Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
