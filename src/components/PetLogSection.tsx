import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { PetTimer } from "./PetTimer";
import { PetLogForm } from "./PetLogForm";
import { PetLogTable } from "./PetLogTable";
import { PetReminders } from "./PetReminders";
import { ExpandableSection } from "./ExpandableSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface PetLogSectionProps {
  animalId: string;
  animalName: string;
}

export function PetLogSection({ animalId, animalName }: PetLogSectionProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [savedTime, setSavedTime] = useState<{ seconds: number; label: string } | null>(null);

  const handleSaveTime = (seconds: number, label: string) => {
    setSavedTime({ seconds, label });
  };

  const handleTimerSaved = () => {
    setSavedTime(null);
  };

  if (!user) {
    return (
      <ExpandableSection title={t("petlog.title")} emoji="📓">
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground mb-4">
            {t("petlog.loginPrompt")}
          </p>
          <Link to="/auth">
            <Button size="sm" className="gap-2">
              <LogIn className="w-4 h-4" />
              {t("petlog.login")}
            </Button>
          </Link>
        </div>
      </ExpandableSection>
    );
  }

  return (
    <div className="space-y-4">
      {/* Timer & Reminders Row */}
      <ExpandableSection title={t("petlog.timerAndReminders")} emoji="⏱️" defaultOpen>
        <div className="grid gap-4 md:grid-cols-2">
          <PetTimer onSaveTime={handleSaveTime} />
          <PetReminders animalId={animalId} animalName={animalName} />
        </div>
      </ExpandableSection>

      {/* Pet Log */}
      <ExpandableSection title={t("petlog.title")} emoji="📓" defaultOpen>
        <div className="space-y-4">
          <PetLogForm
            animalId={animalId}
            timerSeconds={savedTime?.seconds}
            timerLabel={savedTime?.label}
            onTimerSaved={handleTimerSaved}
          />
          <PetLogTable animalId={animalId} />
        </div>
      </ExpandableSection>
    </div>
  );
}
