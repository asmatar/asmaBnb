import { MapPin } from "lucide-react";
import Image from "next/image";

type HeroProps = {
  image: string;
  title: string;
  country: string;
  state: string | null;
  city: string | null;
};
const Hero = ({ image, title, country, state, city }: HeroProps) => {
  return (
    <div className="relative h-[60vh] w-full">
      <Image fill src={image} alt={title} className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">{title}</span>
        </h1>
        {country || state || city ? (
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">
              {country} {state && `${state},`} {city}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Hero;
