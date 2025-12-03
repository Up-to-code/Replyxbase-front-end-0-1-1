import React from "react";
import { Loader2 } from "lucide-react";

export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="px-12 py-10 border-b-2 border-slate-200">
        <div className="h-9 w-64 bg-slate-200 rounded-lg animate-pulse mb-3" />
        <div className="h-6 w-96 bg-slate-100 rounded-lg animate-pulse" />
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-[1600px] mx-auto px-12 py-12">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Sidebar Skeleton */}
          <div className="shrink-0 w-72">
            <div className="w-full space-y-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-14 bg-slate-100 rounded-lg animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          {/* Content Area Skeleton */}
          <div className="flex-1 max-w-4xl">
            <div className="animate-fade-in space-y-8">
              {/* Title Skeleton */}
              <div className="mb-10">
                <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse mb-3" />
                <div className="h-5 w-96 bg-slate-100 rounded-lg animate-pulse" />
              </div>

              {/* Form Skeleton */}
              <div className="bg-white border-2 border-slate-200 rounded-xl p-8 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-5 w-32 bg-slate-100 rounded animate-pulse" />
                    <div className="h-14 bg-slate-50 border-2 border-slate-200 rounded-xl animate-pulse" />
                  </div>
                ))}
              </div>

              {/* Action Button Skeleton */}
              <div className="pt-8 border-t-2 border-slate-200">
                <div className="h-12 w-40 bg-slate-200 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

