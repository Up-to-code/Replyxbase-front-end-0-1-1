"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Trash2, Mail, Loader2, Edit2, X } from 'lucide-react';
import { Modal, ModalContent, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { inviteMember, removeMember, updateMember, getOrganizationMembers, getPendingInvitations } from '@/app/actions/settings/team';
import { Member, User as PrismaUser } from '@prisma/client';

type MemberWithUser = Member & { user: PrismaUser };

interface TeamSettingsProps {
  organizationId: string;
}

export const TeamSettings: React.FC<TeamSettingsProps> = ({ organizationId }) => {
  const t = useTranslations("Dashboard.Settings.Team");
  const tModals = useTranslations("Dashboard.Settings.Team.Modals");
  
  const [members, setMembers] = useState<MemberWithUser[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [memberToRemove, setMemberToRemove] = useState<MemberWithUser | null>(null);
  const [memberToEdit, setMemberToEdit] = useState<MemberWithUser | null>(null);
  const [isInviteMode, setIsInviteMode] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [editRole, setEditRole] = useState<string>("member");

  // Load members and invitations
  useEffect(() => {
    loadData();
  }, [organizationId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [membersResult, invitationsResult] = await Promise.all([
        getOrganizationMembers(organizationId),
        getPendingInvitations(organizationId),
      ]);

      if (membersResult.success) {
        setMembers(membersResult.data || []);
      }
      if (invitationsResult.success) {
        setInvitations(invitationsResult.data || []);
      }
    } catch (error) {
      console.error("Failed to load team data:", error);
      toast.error("Failed to load team data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    setIsInviting(true);
    try {
      const result = await inviteMember({
        organizationId,
        email: inviteEmail.trim(),
      });

      if (result.success) {
        toast.success("Invitation sent successfully!");
        setInviteEmail("");
        setIsInviteMode(false);
        loadData(); // Reload data to show new invitation
      } else {
        toast.error(result.error || "Failed to send invitation");
      }
    } catch (error) {
      console.error("Invite error:", error);
      toast.error("Failed to send invitation");
    } finally {
      setIsInviting(false);
    }
  };

  const handleEditMember = async () => {
    if (!memberToEdit) return;

    setIsUpdating(true);
    try {
      const result = await updateMember({
        organizationId,
        memberId: memberToEdit.id,
        role: editRole,
      });

      if (result.success) {
        toast.success("Member updated successfully!");
        setMemberToEdit(null);
        loadData(); // Reload data
      } else {
        toast.error(result.error || "Failed to update member");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update member");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveMember = async () => {
    if (!memberToRemove) return;

    setIsRemoving(true);
    try {
      const result = await removeMember({
        organizationId,
        memberId: memberToRemove.id,
      });

      if (result.success) {
        toast.success("Member removed successfully!");
      setMemberToRemove(null);
        loadData(); // Reload data
      } else {
        toast.error(result.error || "Failed to remove member");
      }
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Failed to remove member");
    } finally {
      setIsRemoving(false);
    }
  };

  if (isInviteMode) {
    return (
      <div className="animate-fade-in">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900">{tModals("AddMember.title")}</h2>
          <p className="text-base text-slate-500 mt-2">{t("description")}</p>
        </div>

        <div className="max-w-2xl space-y-8">
          <div className="grid gap-4">
            <label className="text-base font-semibold text-slate-900">{tModals("AddMember.email")}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rtl:left-auto rtl:right-4" />
              <input 
                type="email" 
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#005bbc] focus:ring-0 rounded-xl pl-12 pr-5 py-4 text-base text-slate-900 transition-all duration-200 rtl:pl-5 rtl:pr-12"
              />
            </div>
          </div>


          <div className="flex items-center gap-4 pt-8 border-t-2 border-slate-200">
            <button
              onClick={handleInvite}
              disabled={isInviting}
              className="px-8 py-3.5 bg-[#005bbc] hover:bg-[#004a9f] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border-2 border-[#005bbc]"
            >
              {isInviting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                tModals("AddMember.submit")
              )}
            </button>
            <button 
              onClick={() => {
                setIsInviteMode(false);
                setInviteEmail("");
              }}
              disabled={isInviting}
              className="px-6 py-3.5 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-medium transition-colors border-2 border-slate-200 disabled:opacity-50"
            >
              {tModals("AddMember.cancel")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{t("title")}</h2>
          <p className="text-base text-slate-500 mt-2">{t("description")}</p>
        </div>
        <Button 
          onClick={() => setIsInviteMode(true)}
          variant="primary"
          className="flex items-center gap-3 px-6 py-3 h-auto rounded-lg text-sm font-semibold"
        >
          <Plus className="w-5 h-5" />
          {t("invite")}
        </Button>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50/50 border-b-2 border-slate-200">
            <tr>
              <th className="text-left py-6 px-8 text-xs font-bold text-slate-500 uppercase tracking-wider rtl:text-right">{t("table.member")}</th>
              <th className="text-left py-6 px-8 text-xs font-bold text-slate-500 uppercase tracking-wider rtl:text-right">{t("table.status")}</th>
              <th className="text-right py-6 px-8 text-xs font-bold text-slate-500 uppercase tracking-wider rtl:text-left">{t("table.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="py-12 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400 mx-auto" />
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-slate-500">
                  No members found
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-6 px-8">
                  <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 font-medium border-2 border-white">
                        {member.user.image ? (
                          <img src={member.user.image} alt={member.user.name || ""} className="w-full h-full rounded-full object-cover" />
                      ) : (
                          member.user.name?.charAt(0).toUpperCase() || "U"
                      )}
                    </div>
                    <div>
                        <p className="text-base font-bold text-slate-900">{member.user.name || member.user.email}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{member.user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-8">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold capitalize border-2 bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20">
                      Active
                    </span>
                </td>
                <td className="py-6 px-8">
                    <div className="flex items-center justify-end gap-2 rtl:flex-row-reverse">
                      <button 
                        onClick={() => {
                          setMemberToEdit(member);
                          setEditRole(member.role || "member");
                        }}
                        disabled={isUpdating || isRemoving}
                        className="text-slate-400 hover:text-[#005bbc] p-2.5 rounded-lg hover:bg-[#005bbc]/10 transition-colors opacity-0 group-hover:opacity-100 border-2 border-transparent hover:border-[#005bbc]/20 disabled:opacity-50"
                        title="Edit Member"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                  <button 
                    onClick={() => setMemberToRemove(member)}
                        disabled={isRemoving || isUpdating}
                        className="text-slate-400 hover:text-[#EF4444] p-2.5 rounded-lg hover:bg-[#EF4444]/10 transition-colors opacity-0 group-hover:opacity-100 border-2 border-transparent hover:border-[#EF4444]/20 disabled:opacity-50"
                    title="Remove Member"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                    </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Member Modal */}
      <Modal
        open={!!memberToEdit}
        onClose={() => setMemberToEdit(null)}
        title={tModals("EditMember.title") || "Edit Member"}
      >
        <ModalContent>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Member Information</p>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="text-base font-bold text-slate-900">{memberToEdit?.user.name || "No name"}</p>
                <p className="text-sm text-slate-500 mt-1">{memberToEdit?.user.email}</p>
              </div>
            </div>

            <div className="grid gap-3">
              <label className="text-sm font-semibold text-slate-700">{tModals("EditMember.role") || "Role"}</label>
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#005bbc] focus:ring-0 rounded-xl px-5 py-4 text-base text-slate-900 transition-all duration-200"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <button 
            onClick={() => setMemberToEdit(null)}
            disabled={isUpdating}
            className="px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors border-2 border-slate-200 disabled:opacity-50"
          >
            {tModals("EditMember.cancel") || "Cancel"}
          </button>
          <button 
            onClick={handleEditMember}
            disabled={isUpdating}
            className="px-6 py-3 text-sm font-semibold text-white bg-[#005bbc] hover:bg-[#004a9f] rounded-lg transition-colors border-2 border-[#005bbc] disabled:opacity-50 flex items-center gap-2"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              tModals("EditMember.save") || "Save Changes"
            )}
          </button>
        </ModalFooter>
      </Modal>

      {/* Remove Member Modal */}
      <Modal
        open={!!memberToRemove}
        onClose={() => setMemberToRemove(null)}
        title={tModals("RemoveMember.title")}
      >
        <ModalContent>
          <div className="space-y-4">
            <p className="text-slate-600 text-base leading-relaxed">
              {tModals("RemoveMember.confirmation", { name: memberToRemove?.user.name || memberToRemove?.user.email || '' })}
            </p>
            <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
              <p className="text-sm font-semibold text-slate-700 mb-1">Member Details</p>
              <p className="text-base font-bold text-slate-900">{memberToRemove?.user.name || "No name"}</p>
              <p className="text-sm text-slate-500 mt-1">{memberToRemove?.user.email}</p>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
            <button 
              onClick={() => setMemberToRemove(null)}
            disabled={isRemoving}
            className="px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors border-2 border-slate-200 disabled:opacity-50"
            >
              {tModals("RemoveMember.cancel")}
            </button>
            <button 
              onClick={handleRemoveMember}
            disabled={isRemoving}
            className="px-6 py-3 text-sm font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-lg transition-colors border-2 border-[#EF4444] disabled:opacity-50 flex items-center gap-2"
            >
            {isRemoving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Removing...
              </>
            ) : (
              tModals("RemoveMember.confirm")
            )}
            </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
