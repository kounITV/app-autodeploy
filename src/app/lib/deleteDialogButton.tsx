"use client"

import { Button } from '@/components/ui';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { WarningMessage } from '@/components/containers/warning-message';
import { useState } from 'react';
import { useQueryClient } from "@tanstack/react-query";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { cn } from '@/lib/utils';

export function DeleteDialog({ id, resources, className }: { id: number, resources: string, className?: string }) {
  const { onSubmit, loading, dialogOpen, setDialogOpen } = useDelete({ id, resources });
  const handleConfirm = async () => {
    if (!loading) {
      await onSubmit();
    }
  };
  return (
    <div className={cn(" w-full", className)}>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen} >
        <AlertDialogTrigger asChild >
          <Button className={cn(className)} variant="destructive" >ລຶບ</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ທ່ານແນ່ໃຈບໍ?</AlertDialogTitle>
            <AlertDialogDescription>
              <WarningMessage />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ຍົກເລີກ</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={`bg-red-600 hover:bg-red-700 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              ສືບຕໍ່ {loading && "..."}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

  );
}

export const useDelete = ({ id, resources, invalidateQueryKey }: { id: number, resources: string, invalidateQueryKey?: string }) => {
  const queryKey = invalidateQueryKey ?? resources;
  const resourcesWithId = `${resources}/${id}`;
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    setLoading(true);
    try {
      await apiClient.delete(resourcesWithId);
      showToast({ type: "success", title: "ລົບຂໍ້ມູນສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: [resources] });
      setDialogOpen(false);
    } catch {
      showToast({ type: "error", title: "ລົບສາມາດແກ້ໄຂຂໍ້ມູນ" });
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading, setDialogOpen, dialogOpen };
};
