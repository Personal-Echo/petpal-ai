import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useReminders, useAddReminder, useToggleReminder, useDeleteReminder } from "@/hooks/useReminders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2, Loader2, Bell, BellOff } from "lucide-react";

interface PetRemindersProps {
  animalId: string;
  animalName: string;
}

export function PetReminders({ animalId, animalName }: PetRemindersProps) {
  const { t } = useLanguage();
  const [newReminder, setNewReminder] = useState("");
  const { data: reminders = [], isLoading } = useReminders(animalId);
  const addReminder = useAddReminder();
  const toggleReminder = useToggleReminder();
  const deleteReminder = useDeleteReminder();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const text = newReminder.trim();
    if (text && text.length <= 200) {
      addReminder.mutate({ animalId, text });
      setNewReminder("");
    }
  };

  const pendingReminders = reminders.filter((r) => !r.is_completed);
  const completedReminders = reminders.filter((r) => r.is_completed);

  // Default reminders for common pets
  const defaultReminders = [
    t("petlog.defaultReminder1").replace("{name}", animalName),
    t("petlog.defaultReminder2").replace("{name}", animalName),
    t("petlog.defaultReminder3").replace("{name}", animalName),
    t("petlog.defaultReminder4"),
    t("petlog.defaultReminder5").replace("{name}", animalName),
  ];

  const addDefaultReminder = (text: string) => {
    addReminder.mutate({ animalId, text });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          {t("petlog.reminders")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Form */}
        <form onSubmit={handleAdd} className="flex gap-2">
          <Input
            placeholder={t("petlog.newReminder")}
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            className="text-sm"
            maxLength={200}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!newReminder.trim() || addReminder.isPending}
          >
            {addReminder.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        </form>

        {/* Quick Add Defaults */}
        {pendingReminders.length === 0 && completedReminders.length === 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{t("petlog.quickSuggestions")}</p>
            <div className="flex flex-wrap gap-1">
              {defaultReminders.slice(0, 3).map((text) => (
                <Button
                  key={text}
                  variant="outline"
                  size="sm"
                  onClick={() => addDefaultReminder(text)}
                  className="text-xs h-7"
                >
                  + {text.length > 25 ? text.slice(0, 25) + "..." : text}
                </Button>
              ))}
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="py-4 text-center">
            <Loader2 className="w-5 h-5 animate-spin mx-auto text-muted-foreground" />
          </div>
        ) : (
          <ScrollArea className="max-h-[250px]">
            <div className="space-y-2">
              {/* Pending Reminders */}
              {pendingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg group"
                >
                  <Checkbox
                    checked={false}
                    onCheckedChange={() =>
                      toggleReminder.mutate({
                        id: reminder.id,
                        animalId,
                        completed: true,
                      })
                    }
                  />
                  <span className="flex-1 text-sm text-foreground">
                    {reminder.reminder_text}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      deleteReminder.mutate({ id: reminder.id, animalId })
                    }
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}

              {/* Completed Reminders */}
              {completedReminders.length > 0 && (
                <>
                  <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                    <BellOff className="w-3 h-3" />
                    <span>Avklarade ({completedReminders.length})</span>
                  </div>
                  {completedReminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg group opacity-60"
                    >
                      <Checkbox
                        checked={true}
                        onCheckedChange={() =>
                          toggleReminder.mutate({
                            id: reminder.id,
                            animalId,
                            completed: false,
                          })
                        }
                      />
                      <span className="flex-1 text-sm text-muted-foreground line-through">
                        {reminder.reminder_text}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          deleteReminder.mutate({ id: reminder.id, animalId })
                        }
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </>
              )}

              {pendingReminders.length === 0 && completedReminders.length === 0 && (
                <p className="text-center text-xs text-muted-foreground py-2">
                  {t("petlog.noReminders")}
                </p>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
