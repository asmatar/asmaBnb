import { Dumbbell, MapPin, Waves } from "lucide-react";
import Image from "next/image";
/* import FramerDiv from "@/components/framer/div"; */
export default async function Home() {
  return (
    <>
      {/*  <FramerDiv></FramerDiv> */}

      {/* hotel ul */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
        {/* //hotel card */}
        <div className="col-span-1 cursor-pointer transition hover:scale-105">
          <div className=" flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
            <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
              <Image
                fill
                src="/hotel-placeholder.jpg"
                alt="Logo"
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
              <h3 className="font-semibold text-xl">hotel title</h3>
              <div className="text-primary/90">
                hotel description description description
              </div>
              <div className="text-primary/90">
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> country, city
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  Pool
                </div>
                {/* amanity item */}
                {/* amanity item */}
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Gym
                </div>
                {/* amanity item */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-base">price</div>
                  <div className="text-xs">/24hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end hotel card */}
      </div>
    </>
  );
}
