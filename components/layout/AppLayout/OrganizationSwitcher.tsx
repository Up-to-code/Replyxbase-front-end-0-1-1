"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Check, Plus, Building2, Loader2 } from "lucide-react";
import { useRouter } from "@/navigation";
import { Translator, Organization } from "./types";
import { authClient } from "@/lib/auth-client";

/**
 * Hook to detect clicks outside of a component
 */
function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClick, true);
    return () => document.removeEventListener("mousedown", handleClick, true);
  }, [callback]);

  return ref;
}

export function OrganizationSwitcher({ t }: { t: Translator }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  
  // Use useCallback for the click outside handler to prevent unnecessary re-renders of the hook
  const closeDropdown = useCallback(() => setIsOpen(false), []);
  const ref = useClickOutside(closeDropdown);

  // Fetch user organizations using Better Auth
  const { data: session } = authClient.useSession();
  const { data: organizations, isPending: isLoadingOrgs } = authClient.useListOrganizations();
  const { data: activeOrganization, isPending: isLoadingActive } = authClient.useActiveOrganization();

  const handleSwitchOrganization = async (orgId: string) => {
    try {
      await authClient.organization.setActive({
        organizationId: orgId,
      });
      setIsOpen(false);
      // Refresh the page to reload layout and page data with new organization
      router.refresh();
    } catch (error) {
      console.error("Failed to switch organization:", error);
    }
  };

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName.trim()) return;

    setIsCreating(true);
    try {
      const newOrg = await authClient.organization.create({
        name: newOrgName,
        slug: newOrgName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      });
      
      // Set the newly created organization as active
      if (newOrg?.organization?.id) {
        await authClient.organization.setActive({
          organizationId: newOrg.organization.id,
        });
      }
      
      setNewOrgName("");
      setShowCreateDialog(false);
      setIsOpen(false); // Close the main dropdown after creating an organization
      // Refresh the page to reload layout and page data with new organization
      router.refresh();
    } catch (error) {
      console.error("Failed to create organization:", error);
    } finally {
      setIsCreating(false);
    }
  };

  // Default avatar for organizations
  const getOrgAvatar = (org: Organization) => {
    return org.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(org.name)}&background=005bbc&color=fff`;
  };

  return (
    <>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-slate-200 active:scale-95"
          aria-label={t("Header.organizations")}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden border-2 border-slate-200 flex-shrink-0">
            {activeOrganization && (
              <img 
                src={getOrgAvatar(activeOrganization)} 
                alt={activeOrganization.name}
                className="w-full h-full object-cover"
              />
            )}
            {!activeOrganization && <Building2 className="w-4 h-4 text-slate-400" />}
          </div>
          <div className="hidden md:block text-start min-w-0 max-w-[120px] lg:max-w-[150px]">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {activeOrganization?.name || "No Organization"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {activeOrganization?.metadata?.plan || "Free"}
            </p>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`} />
        </button>

        {isOpen && (
          <div 
            className="absolute end-0 top-full mt-2 w-72 sm:w-80 bg-white border-2 border-slate-200 rounded-2xl z-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 shadow-lg"
            role="menu"
            aria-label="Organizations menu"
          >
            {/* Header */}
            <div className="p-4 border-b-2 border-slate-200 bg-gradient-to-b from-slate-50/50 to-white">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                {t("Header.organizations")}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {organizations?.length || 0} {t("Header.available")}
              </p>
            </div>

            {/* Organizations List */}
            <div className="max-h-[20rem] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {isLoadingOrgs && (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                </div>
              )}
              {!isLoadingOrgs && organizations && organizations.length === 0 && (
                <div className="text-center p-8 text-slate-500 text-sm">
                  No organizations yet. Create one to get started!
                </div>
              )}
              {!isLoadingOrgs && organizations && organizations.map((org) => (
                <button
                  key={org.id}
                  onClick={() => handleSwitchOrganization(org.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border-2 ${
                    activeOrganization?.id === org.id
                      ? "bg-[#005bbc]/10 text-[#005bbc] border-[#005bbc]/20"
                      : "hover:bg-slate-50 text-slate-700 border-transparent hover:border-slate-200"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden border-2 border-slate-200">
                    <img 
                      src={getOrgAvatar(org)} 
                      alt={org.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-start">
                    <p className="font-semibold truncate text-sm">{org.name}</p>
                    <p className="text-xs text-slate-500 truncate">{org.slug}</p>
                  </div>
                  {activeOrganization?.id === org.id && (
                    <Check className="w-4 h-4 text-[#005bbc] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Create New Organization Button */}
            <div className="p-2 border-t-2 border-slate-200 bg-slate-50/50">
              <button
                onClick={() => setShowCreateDialog(true)}
                className="w-full flex items-center gap-3 p-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-white rounded-xl transition-all border-2 border-dashed border-slate-200 hover:border-[#005bbc] hover:bg-[#005bbc]/10"
              >
                <div className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <span>{t("Header.createOrganization")}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Organization Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border-2 border-slate-200 max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#005bbc]/10 flex items-center justify-center border-2 border-[#005bbc]/20">
                <Building2 className="w-6 h-6 text-[#005bbc]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {t("Header.createOrganization")}
                </h3>
                <p className="text-sm text-slate-500">
                  Create a new organization to get started
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateOrganization} className="space-y-4">
              <div>
                <label htmlFor="organization-name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Organization Name
                </label>
                <input
                  id="organization-name"
                  type="text"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  placeholder="e.g., Acme Corp"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005bbc]/20 focus:border-[#005bbc] transition-all"
                  autoFocus
                  disabled={isCreating}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateDialog(false);
                    setNewOrgName("");
                  }}
                  disabled={isCreating}
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || !newOrgName.trim()}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#005bbc] text-white font-medium hover:bg-[#004a9f] transition-colors border border-[#005bbc] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
