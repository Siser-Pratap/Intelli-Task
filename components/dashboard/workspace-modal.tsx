"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWorkspaces } from "@/hooks/use-workspaces"
import { Building2, Users, Briefcase, Zap } from "lucide-react"

interface WorkspaceModalProps {
  isOpen: boolean
  onClose: () => void
}

const workspaceTemplates = [
  {
    id: "project-management",
    name: "Project Management",
    description: "Manage projects, tasks, and team collaboration",
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    id: "team-collaboration",
    name: "Team Collaboration",
    description: "Coordinate team work and communication",
    icon: Users,
    color: "bg-green-500",
  },
  {
    id: "product-development",
    name: "Product Development",
    description: "Track product features and development cycles",
    icon: Zap,
    color: "bg-purple-500",
  },
  {
    id: "custom",
    name: "Custom Workspace",
    description: "Start with a blank workspace",
    icon: Building2,
    color: "bg-slate-500",
  },
]

export function WorkspaceModal({ isOpen, onClose }: WorkspaceModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "",
    visibility: "private",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { createWorkspace } = useWorkspaces()

  const handleSubmit = async () => {
    if (!formData.name || !formData.template) return

    setIsLoading(true)
    try {
      await createWorkspace({
        name: formData.name,
        description: formData.description,
        template: formData.template,
        visibility: formData.visibility as "private" | "public",
      })
      onClose()
      resetForm()
    } catch (error) {
      console.error("Failed to create workspace:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setFormData({
      name: "",
      description: "",
      template: "",
      visibility: "private",
    })
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Workspace</DialogTitle>
          <DialogDescription className="text-slate-400">
            {step === 1 ? "Choose a template to get started" : "Configure your workspace"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {workspaceTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, template: template.id }))
                    setStep(2)
                  }}
                  className="p-4 border border-slate-600 rounded-lg hover:border-slate-500 hover:bg-slate-700 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 ${template.color} rounded-lg flex items-center justify-center`}>
                      <template.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-medium">{template.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400">{template.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <Input
                id="workspace-name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter workspace name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workspace-description">Description (Optional)</Label>
              <Textarea
                id="workspace-description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Describe your workspace"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workspace-visibility">Visibility</Label>
              <Select
                value={formData.visibility}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, visibility: value }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="private">Private - Only invited members</SelectItem>
                  <SelectItem value="public">Public - Anyone in company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.name || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
              >
                {isLoading ? "Creating..." : "Create Workspace"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
