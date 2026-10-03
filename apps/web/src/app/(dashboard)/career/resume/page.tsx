"use client";

import { useState } from "react";
import { Plus, Download, Upload } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

export default function ResumePage() {
  const [sections, setSections] = useState({
    experience: [{ id: 1, company: "Tech Corp", role: "Frontend Developer", date: "2022 - Present", desc: "Built React applications." }],
    education: [{ id: 1, school: "University", degree: "B.S. Computer Science", date: "2018 - 2022" }],
    projects: [{ id: 1, title: "E-commerce Platform", desc: "Built with Next.js and Stripe" }],
  });

  return (
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="Resume Builder" 
        subtitle="Create an ATS-friendly software engineering resume."
        action={
          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded-lg font-medium hover:bg-muted flex items-center gap-2">
              <Upload className="w-4 h-4" /> Import LinkedIn
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        }
      />

      <div className="flex gap-8">
        {/* Editor Form */}
        <div className="w-1/2 space-y-8">
          <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Full Name</label>
                <input type="text" defaultValue="Ajay Maida" className="w-full px-3 py-2 border rounded-md bg-background" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <input type="email" defaultValue="ajay@example.com" className="w-full px-3 py-2 border rounded-md bg-background" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Phone</label>
                <input type="text" placeholder="(555) 555-5555" className="w-full px-3 py-2 border rounded-md bg-background" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">LinkedIn URL</label>
                <input type="url" placeholder="linkedin.com/in/ajay" className="w-full px-3 py-2 border rounded-md bg-background" />
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg">Experience</h3>
              <button className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            {sections.experience.map((exp, i) => (
              <div key={exp.id} className="space-y-4 pt-4 first:pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Company</label>
                    <input type="text" defaultValue={exp.company} className="w-full px-3 py-2 border rounded-md bg-background" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Role</label>
                    <input type="text" defaultValue={exp.role} className="w-full px-3 py-2 border rounded-md bg-background" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Description (Bullet points)</label>
                  <textarea rows={3} defaultValue={exp.desc} className="w-full px-3 py-2 border rounded-md bg-background resize-none" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Education and Projects sections would follow similarly */}
        </div>

        {/* Live Preview */}
        <div className="w-1/2">
          <div className="sticky top-20 bg-white text-black p-8 shadow-lg aspect-[1/1.4] w-full max-w-[800px] rounded border mx-auto font-serif overflow-hidden">
            {/* Mock PDF View */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold uppercase mb-1">Ajay Maida</h1>
              <div className="text-sm flex justify-center gap-4 text-gray-600">
                <span>ajay@example.com</span>
                <span>(555) 555-5555</span>
                <span>linkedin.com/in/ajay</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">Experience</h2>
              {sections.experience.map(exp => (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between font-bold text-sm">
                    <span>{exp.company} | {exp.role}</span>
                    <span>{exp.date}</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm mt-1 text-gray-800">
                    <li>{exp.desc}</li>
                    <li>Collaborated with cross-functional teams to deliver product features.</li>
                  </ul>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">Education</h2>
              {sections.education.map(edu => (
                <div key={edu.id} className="mb-2">
                  <div className="flex justify-between font-bold text-sm">
                    <span>{edu.school}</span>
                    <span>{edu.date}</span>
                  </div>
                  <div className="text-sm text-gray-800">{edu.degree}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
