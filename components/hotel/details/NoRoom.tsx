"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Hotel, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
const NoRoom = ({ id, userId }: { id: string; userId: string }) => {
  const t = useTranslations("NoRoom");
  const router = useRouter();
  const { user } = useUser();
  const locale = useLocale();
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-card shadow-sm">
      <Alert className="w-full max-w-md bg-background/50">
        <Hotel className="w-6 h-6 text-gray-600" />
        <AlertTitle>{t("title")}</AlertTitle>
        <AlertDescription>
          {t("description")}
          {user && user.id === userId && <span>{t("addRoom")}</span>}
        </AlertDescription>
      </Alert>
      {user && user.id === userId && (
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push(`/${locale}/hotel/${id}`)}
        >
          <Plus className="w-4 h-4 mr-2" /> {t("addRoomButton")}
        </Button>
      )}
    </div>
  );
};

export default NoRoom;
