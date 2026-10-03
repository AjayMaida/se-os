"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const title = pathname.split('/').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' / ') || 'Dashboard';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6">
      <div className="flex-1 font-medium text-sm text-muted-foreground">
        {title}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-2.5 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 pl-9 pr-4 py-1.5 bg-muted/50 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        
        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
        </button>
        
        <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm cursor-pointer border border-primary/20">
          AM
        </div>
      </div>
    </header>
  );
}
