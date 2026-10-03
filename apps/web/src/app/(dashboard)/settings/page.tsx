"use client";

import PageHeader from "@/components/shared/PageHeader";
import { User, Bell, Shield, Blocks, Github, Code2 } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-8 pb-12">
      <PageHeader title="Settings" subtitle="Manage your account settings and preferences." />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-1 shrink-0">
          {[
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'notifications', icon: Bell, label: 'Notifications' },
            { id: 'security', icon: Shield, label: 'Security' },
            { id: 'integrations', icon: Blocks, label: 'Integrations' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 max-w-3xl">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
                <h3 className="text-lg font-bold">Profile Details</h3>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold">
                    AM
                  </div>
                  <button className="px-4 py-2 border rounded-md font-medium text-sm hover:bg-muted">Change Avatar</button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input type="text" defaultValue="Ajay Maida" className="w-full px-3 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input type="email" defaultValue="ajay@example.com" className="w-full px-3 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
                <h3 className="text-lg font-bold">Connected Accounts</h3>
                <p className="text-sm text-muted-foreground">Connect your accounts to sync projects and problem-solving stats.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center">
                        <Github className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">GitHub</h4>
                        <p className="text-xs text-muted-foreground">ajaymaida</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-muted text-red-500 border-red-500/20 bg-red-500/5">Disconnect</button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">LeetCode</h4>
                        <p className="text-xs text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90">Connect</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
