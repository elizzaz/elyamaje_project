'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, ButtonProps } from "@/components/ui/button"

interface ConfirmDialogProps {
  title: string
  description: string
  cancelText?: string
  confirmText?: string
  onConfirm: () => void
  variant?: ButtonProps["variant"]
  children: React.ReactNode
}

/**
 * Dialogue de confirmation personnalisable
 * @component
 * @param {Object} props - Props du composant
 * @param {string} props.title - Titre du dialogue
 * @param {string} props.description - Description de l'action
 * @param {string} [props.cancelText="Annuler"] - Texte du bouton d'annulation
 * @param {string} [props.confirmText="Confirmer"] - Texte du bouton de confirmation
 * @param {() => void} props.onConfirm - Fonction appelée lors de la confirmation
 * @param {ButtonProps["variant"]} [props.variant="default"] - Variante du bouton de confirmation
 * @param {ReactNode} props.children - Élément déclencheur du dialogue
 * @returns {JSX.Element} Dialogue de confirmation
 */
export function ConfirmDialog({
  title,
  description,
  cancelText = "Annuler",
  confirmText = "Confirmer",
  onConfirm,
  variant = "default",
  children
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={variant === "destructive" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}