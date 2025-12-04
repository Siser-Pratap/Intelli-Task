"use client"

import { useAuth } from "./use-auth"

export interface Permission {
  canCreateWorkspace: boolean
  canDeleteWorkspace: boolean
  canInviteUsers: boolean
  canManageUsers: boolean
  canViewAnalytics: boolean
  canExportData: boolean
  canManageIntegrations: boolean
  canDeleteTasks: boolean
  canAssignTasks: boolean
  canViewAllTasks: boolean
}

export function usePermissions(): Permission {
  const { user } = useAuth()

  if (!user) {
    return {
      canCreateWorkspace: false,
      canDeleteWorkspace: false,
      canInviteUsers: false,
      canManageUsers: false,
      canViewAnalytics: false,
      canExportData: false,
      canManageIntegrations: false,
      canDeleteTasks: false,
      canAssignTasks: false,
      canViewAllTasks: false,
    }
  }

  switch (user.role) {
    case "admin":
      return {
        canCreateWorkspace: true,
        canDeleteWorkspace: true,
        canInviteUsers: true,
        canManageUsers: true,
        canViewAnalytics: true,
        canExportData: true,
        canManageIntegrations: true,
        canDeleteTasks: true,
        canAssignTasks: true,
        canViewAllTasks: true,
      }

    case "manager":
      return {
        canCreateWorkspace: true,
        canDeleteWorkspace: false,
        canInviteUsers: true,
        canManageUsers: false,
        canViewAnalytics: true,
        canExportData: true,
        canManageIntegrations: false,
        canDeleteTasks: true,
        canAssignTasks: true,
        canViewAllTasks: true,
      }

    case "member":
      return {
        canCreateWorkspace: false,
        canDeleteWorkspace: false,
        canInviteUsers: false,
        canManageUsers: false,
        canViewAnalytics: false,
        canExportData: false,
        canManageIntegrations: false,
        canDeleteTasks: false,
        canAssignTasks: false,
        canViewAllTasks: false,
      }

    default:
      return {
        canCreateWorkspace: false,
        canDeleteWorkspace: false,
        canInviteUsers: false,
        canManageUsers: false,
        canViewAnalytics: false,
        canExportData: false,
        canManageIntegrations: false,
        canDeleteTasks: false,
        canAssignTasks: false,
        canViewAllTasks: false,
      }
  }
}
