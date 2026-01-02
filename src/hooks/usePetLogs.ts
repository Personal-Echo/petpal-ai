import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface PetLog {
  id: string;
  user_id: string;
  animal_id: string;
  log_date: string;
  food: string | null;
  water: string | null;
  activity: string | null;
  sleep: string | null;
  feces: string | null;
  notes: string | null;
  timer_seconds: number | null;
  timer_label: string | null;
  created_at: string;
  updated_at: string;
}

export interface PetLogInsert {
  animal_id: string;
  log_date?: string;
  food?: string | null;
  water?: string | null;
  activity?: string | null;
  sleep?: string | null;
  feces?: string | null;
  notes?: string | null;
  timer_seconds?: number | null;
  timer_label?: string | null;
}

export function usePetLogs(animalId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["pet-logs", animalId, user?.id],
    enabled: !!animalId && !!user,
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await (supabase as any)
        .from("pet_logs")
        .select("*")
        .eq("animal_id", animalId)
        .eq("user_id", user.id)
        .order("log_date", { ascending: false });

      if (error) throw error;
      return data as PetLog[];
    },
  });
}

export function useAddPetLog() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (log: PetLogInsert) => {
      if (!user) throw new Error("Du måste vara inloggad");

      const { data, error } = await (supabase as any)
        .from("pet_logs")
        .insert({
          ...log,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["pet-logs", variables.animal_id] });
      toast.success("Logg sparad!");
    },
    onError: (error: Error) => {
      toast.error("Kunde inte spara logg: " + error.message);
    },
  });
}

export function useUpdatePetLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, animalId, ...updates }: Partial<PetLog> & { id: string; animalId: string }) => {
      const { data, error } = await (supabase as any)
        .from("pet_logs")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["pet-logs", variables.animalId] });
      toast.success("Logg uppdaterad!");
    },
    onError: (error: Error) => {
      toast.error("Kunde inte uppdatera logg: " + error.message);
    },
  });
}

export function useDeletePetLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, animalId }: { id: string; animalId: string }) => {
      const { error } = await (supabase as any)
        .from("pet_logs")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["pet-logs", variables.animalId] });
      toast.success("Logg raderad!");
    },
    onError: (error: Error) => {
      toast.error("Kunde inte radera logg: " + error.message);
    },
  });
}
