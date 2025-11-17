import { Room } from "@/types/tableType";
import { Plus, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AddRoomForm from "./AddRoomForm";
import SubmitButton from "./SubmitButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const RoomCardHotelView = ({
  room,
  handleDeleteRoom,
}: {
  room: Room;
  handleDeleteRoom: (formData: FormData) => void;
}) => {
  const t = useTranslations("RoomCard");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className="flex w-full justify-between">
      <form action={handleDeleteRoom}>
        <input type="hidden" name="id" value={room.id} />
        <SubmitButton
          type="submit"
          variant="ghost"
          className="bg-secondary"
          text={t("deleteRoom")}
          loadingText={t("deletingRoom")}
        >
          <Trash className="h-4 w-4 mr-2" />
        </SubmitButton>
      </form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="px-2 bg-secondary rounded-md flex items-center">
          <Plus className="w-4 h-4 mr-3" />
          {t("editRoom")}
        </DialogTrigger>
        <DialogContent className="max-w-[900px] w-[90%]">
          <DialogHeader className="px-2">
            <DialogTitle>{t("updateRoom")}</DialogTitle>
            <DialogDescription>{t("updateRoomDescription")}</DialogDescription>
          </DialogHeader>
          <AddRoomForm room={room} setFormOpen={setIsDialogOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
