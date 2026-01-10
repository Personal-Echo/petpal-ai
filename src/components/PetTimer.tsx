import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Save, Timer } from "lucide-react";

interface PetTimerProps {
  onSaveTime?: (seconds: number, label: string) => void;
  disabled?: boolean;
}

export function PetTimer({ onSaveTime, disabled = false }: PetTimerProps) {
  const { t } = useLanguage();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [label, setLabel] = useState(t("petlog.labelActivity"));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const handleSave = () => {
    if (onSaveTime && seconds > 0) {
      onSaveTime(seconds, label);
      handleReset();
    }
  };

  const labels = [
    { key: "petlog.labelActivity", value: t("petlog.labelActivity") },
    { key: "petlog.labelFeeding", value: t("petlog.labelFeeding") },
    { key: "petlog.labelHandling", value: t("petlog.labelHandling") },
    { key: "petlog.labelCleaning", value: t("petlog.labelCleaning") },
    { key: "petlog.labelObservation", value: t("petlog.labelObservation") },
  ];

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Timer className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">{t("petlog.timer")}</span>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-4">
          <div className="text-4xl font-mono font-bold text-foreground">
            {formatTime(seconds)}
          </div>
        </div>

        {/* Label Selector */}
        <div className="flex flex-wrap gap-1 mb-4">
          {labels.map((l) => (
            <button
              key={l.key}
              onClick={() => setLabel(l.value)}
              disabled={disabled}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                label === l.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              } disabled:opacity-50`}
            >
              {l.value}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              disabled={disabled}
              size="sm"
              className="flex-1 gap-2"
            >
              <Play className="w-4 h-4" />
              {t("petlog.start")}
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              disabled={disabled}
              size="sm"
              variant="secondary"
              className="flex-1 gap-2"
            >
              <Pause className="w-4 h-4" />
              {t("petlog.pause")}
            </Button>
          )}

          <Button
            onClick={handleReset}
            disabled={disabled || seconds === 0}
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          {onSaveTime && (
            <Button
              onClick={handleSave}
              disabled={disabled || seconds === 0}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {t("petlog.save")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
