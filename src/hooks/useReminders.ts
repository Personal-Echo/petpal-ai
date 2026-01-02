import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface Reminder {
  id: string;
  user_id: string;
  animal_id: string;
  reminder_text: string;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export function useReminders(animalId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["reminders", animalId, user?.id],
    enabled: !!animalId && !!user,
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await (supabase as any)
        .from("user_reminders")
        .select("*")
        .eq("animal_id", animalId)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Reminder[];
    },
  });
}

export function useAddReminder() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ animalId, text }: { animalId: string; text: string }) => {
      if (!user) throw new Error("Du måste vara inloggad");

      const { data, error } = await (supabase as any)
        .from("user_reminders")
        .insert({
          animal_id: animalId,
          user_id: user.id,
          reminder_text: text,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reminders", variables.animalId] });
      toast.success("Påminnelse tillagd!");
    },
    onError: (error: Error) => {
      toast.error("Kunde inte lägga till påminnelse: " + error.message);
    },
  });
}

export function useToggleReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, animalId, completed }: { id: string; animalId: string; completed: boolean }) => {
      const { data, error } = await (supabase as any)
        .from("user_reminders")
        .update({
          is_completed: completed,
          completed_at: completed ? new Date().toISOString() : null,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reminders", variables.animalId] });
    },
    onError: (error: Error) => {
      toast.error("Kunde inte uppdatera påminnelse: " + error.message);
    },
  });
}

export function useDeleteReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, animalId }: { id: string; animalId: string }) => {
      const { error } = await (supabase as any)
        .from("user_reminders")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reminders", variables.animalId] });
      toast.success("Påminnelse raderad!");
    },
    onError: (error: Error) => {
      toast.error("Kunde inte radera påminnelse: " + error.message);
    },
  });
}
