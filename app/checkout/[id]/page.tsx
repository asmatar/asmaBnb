/* "use client"; */
import RoomCard from "@/components/RoomCard";
import { getOneRoomInBooking } from "@/services/roomService";
import StripePayment from "./StripePayment";

/* const stripePromise = loadStripe(
  "pk_test_51JmxBgFkr8gEJezM0gPQ7Ugs9M4PPDdHk54S4Rs9JQjJfr8GJbXe1r0LFafzlupFGTfZKhMNdTLf6kRBMCJTWsiP00gaYhPXQd",
); */

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const room = await getOneRoomInBooking(id);
  return (
    <section className="max-w-[700px] mx-auto mb-10">
      <h3 className="text-2xl font-semibold mb-6">
        Complete payment to reserve this room !
      </h3>
      <div className="mb-6">
        <RoomCard room={room[0]} />
      </div>
      <StripePayment
        id={id}
        startDate={room[0].startDate}
        endDate={room[0].endDate}
        totalPrice={room[0].totalPrice}
        breakfastPrice={room[0].breakfastPrice}
        breakfastIncluded={room[0].breakfastIncluded}
      />
    </section>
  );
};

export default Page;
