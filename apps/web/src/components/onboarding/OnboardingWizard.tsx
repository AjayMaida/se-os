"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const goals = ["Backend", "Frontend", "Full Stack", "AI/ML", "DevOps", "Cloud", "Security", "Data"];
const timelines = ["3 months", "6 months", "12 months", "24 months"];
const levels = ["Student", "Fresher", "0-1yr", "1-3yr", "3+yr"];

export default function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: "",
    timeline: "",
    level: "",
    skills: [] as string[],
    studyHours: 2,
  });

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(c => c + 1);
    else {
      toast.success("Profile created! Generating your roadmap...");
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(c => c - 1);
  };

  return (
    <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-muted-foreground text-right">
          Step {currentStep} of 5
        </div>
      </div>

      <div className="min-h-[300px]">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">What is your primary career goal?</h2>
              <p className="text-muted-foreground">Select the role you are aiming for.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {goals.map(goal => (
                <button
                  key={goal}
                  onClick={() => updateFormData("goal", goal)}
                  className={cn(
                    "p-4 rounded-lg border text-center font-medium transition-colors hover:border-primary hover:bg-primary/5",
                    formData.goal === goal ? "border-primary bg-primary/10 text-primary" : "border-border"
                  )}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">What is your target timeline?</h2>
              <p className="text-muted-foreground">When do you want to be job-ready?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {timelines.map(tl => (
                <button
                  key={tl}
                  onClick={() => updateFormData("timeline", tl)}
                  className={cn(
                    "p-4 rounded-lg border text-center font-medium transition-colors hover:border-primary hover:bg-primary/5",
                    formData.timeline === tl ? "border-primary bg-primary/10 text-primary" : "border-border"
                  )}
                >
                  {tl}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">What is your current experience level?</h2>
              <p className="text-muted-foreground">Help us tailor the starting point for you.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => updateFormData("level", level)}
                  className={cn(
                    "p-4 rounded-lg border text-center font-medium transition-colors hover:border-primary hover:bg-primary/5",
                    formData.level === level ? "border-primary bg-primary/10 text-primary" : "border-border"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Select skills you already know</h2>
              <p className="text-muted-foreground">We will skip these in your roadmap.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["JavaScript", "Python", "Java", "C++", "React", "Node.js", "SQL", "Git", "Docker", "AWS"].map(skill => {
                const isSelected = formData.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => {
                      if (isSelected) {
                        updateFormData("skills", formData.skills.filter(s => s !== skill));
                      } else {
                        updateFormData("skills", [...formData.skills, skill]);
                      }
                    }}
                    className={cn(
                      "px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                      isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"
                    )}
                  >
                    {skill}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">How much time can you commit daily?</h2>
              <p className="text-muted-foreground">We will schedule your tasks accordingly.</p>
            </div>
            <div className="space-y-8 py-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>{formData.studyHours} hours/day</span>
                <span>{formData.studyHours * 7} hours/week</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={formData.studyHours} 
                onChange={(e) => updateFormData("studyHours", parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1h (Casual)</span>
                <span>8h (Intense)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-4 py-2 rounded-md border border-input bg-background font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90"
        >
          {currentStep === 5 ? "Complete Setup" : "Next"}
        </button>
      </div>
    </div>
  );
}
