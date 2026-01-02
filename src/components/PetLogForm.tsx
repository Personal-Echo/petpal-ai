import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { useAddPetLog } from "@/hooks/usePetLogs";

interface PetLogFormProps {
  animalId: string;
  timerSeconds?: number;
  timerLabel?: string;
  onTimerSaved?: () => void;
}

export function PetLogForm({ animalId, timerSeconds, timerLabel, onTimerSaved }: PetLogFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    log_date: new Date().toISOString().split("T")[0],
    food: "",
    water: "",
    activity: "",
    sleep: "",
    feces: "",
    notes: "",
  });

  const addLog = useAddPetLog();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addLog.mutate(
      {
        animal_id: animalId,
        log_date: formData.log_date,
        food: formData.food || null,
        water: formData.water || null,
        activity: formData.activity || null,
        sleep: formData.sleep || null,
        feces: formData.feces || null,
        notes: formData.notes || null,
        timer_seconds: timerSeconds || null,
        timer_label: timerLabel || null,
      },
      {
        onSuccess: () => {
          setFormData({
            log_date: new Date().toISOString().split("T")[0],
            food: "",
            water: "",
            activity: "",
            sleep: "",
            feces: "",
            notes: "",
          });
          setIsOpen(false);
          if (onTimerSaved) onTimerSaved();
        },
      }
    );
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full gap-2"
      >
        <Plus className="w-4 h-4" />
        Ny loggpost
      </Button>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Ny loggpost</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="log_date" className="text-xs">
                Datum
              </Label>
              <Input
                id="log_date"
                type="date"
                value={formData.log_date}
                onChange={(e) =>
                  setFormData({ ...formData, log_date: e.target.value })
                }
                className="text-sm"
              />
            </div>
            <div>
              <Label htmlFor="food" className="text-xs">
                🍽️ Mat
              </Label>
              <Input
                id="food"
                placeholder="Vad + mängd"
                value={formData.food}
                onChange={(e) =>
                  setFormData({ ...formData, food: e.target.value })
                }
                className="text-sm"
                maxLength={200}
              />
            </div>
            <div>
              <Label htmlFor="water" className="text-xs">
                💧 Vatten
              </Label>
              <Input
                id="water"
                placeholder="Druckit / bytt"
                value={formData.water}
                onChange={(e) =>
                  setFormData({ ...formData, water: e.target.value })
                }
                className="text-sm"
                maxLength={200}
              />
            </div>
            <div>
              <Label htmlFor="activity" className="text-xs">
                🏃 Aktivitet
              </Label>
              <Input
                id="activity"
                placeholder="Beteende"
                value={formData.activity}
                onChange={(e) =>
                  setFormData({ ...formData, activity: e.target.value })
                }
                className="text-sm"
                maxLength={200}
              />
            </div>
            <div>
              <Label htmlFor="sleep" className="text-xs">
                😴 Sömn/vila
              </Label>
              <Input
                id="sleep"
                placeholder="Sovvanor"
                value={formData.sleep}
                onChange={(e) =>
                  setFormData({ ...formData, sleep: e.target.value })
                }
                className="text-sm"
                maxLength={200}
              />
            </div>
            <div>
              <Label htmlFor="feces" className="text-xs">
                💩 Avföring
              </Label>
              <Input
                id="feces"
                placeholder="Status"
                value={formData.feces}
                onChange={(e) =>
                  setFormData({ ...formData, feces: e.target.value })
                }
                className="text-sm"
                maxLength={200}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="text-xs">
              📝 Anteckningar
            </Label>
            <Textarea
              id="notes"
              placeholder="Övriga observationer..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="text-sm min-h-[60px]"
              maxLength={500}
            />
          </div>

          {timerSeconds && timerSeconds > 0 && (
            <div className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm">
              ⏱️ Timer: {Math.floor(timerSeconds / 60)}m {timerSeconds % 60}s ({timerLabel})
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={addLog.isPending} className="flex-1 gap-2">
              {addLog.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Spara
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Avbryt
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
