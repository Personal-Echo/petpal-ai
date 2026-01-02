import { usePetLogs, useDeletePetLog } from "@/hooks/usePetLogs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Loader2, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

interface PetLogTableProps {
  animalId: string;
}

export function PetLogTable({ animalId }: PetLogTableProps) {
  const { data: logs = [], isLoading } = usePetLogs(animalId);
  const deleteLog = useDeletePetLog();

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "d MMM", { locale: sv });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (isLoading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="py-8 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (logs.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Inga loggposter ännu</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Logghistorik ({logs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[300px]">
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-muted/50 rounded-lg p-3 text-sm relative group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">
                    📅 {formatDate(log.log_date)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      deleteLog.mutate({ id: log.id, animalId })
                    }
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  {log.food && (
                    <div className="flex gap-1">
                      <span className="text-muted-foreground">🍽️</span>
                      <span className="text-foreground truncate">{log.food}</span>
                    </div>
                  )}
                  {log.water && (
                    <div className="flex gap-1">
                      <span className="text-muted-foreground">💧</span>
                      <span className="text-foreground truncate">{log.water}</span>
                    </div>
                  )}
                  {log.activity && (
                    <div className="flex gap-1">
                      <span className="text-muted-foreground">🏃</span>
                      <span className="text-foreground truncate">{log.activity}</span>
                    </div>
                  )}
                  {log.sleep && (
                    <div className="flex gap-1">
                      <span className="text-muted-foreground">😴</span>
                      <span className="text-foreground truncate">{log.sleep}</span>
                    </div>
                  )}
                  {log.feces && (
                    <div className="flex gap-1">
                      <span className="text-muted-foreground">💩</span>
                      <span className="text-foreground truncate">{log.feces}</span>
                    </div>
                  )}
                  {log.timer_seconds && (
                    <div className="flex gap-1">
                      <span className="text-muted-foreground">⏱️</span>
                      <span className="text-foreground">
                        {formatTime(log.timer_seconds)} ({log.timer_label})
                      </span>
                    </div>
                  )}
                </div>

                {log.notes && (
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">📝 {log.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
