import { appScreens, type AppScreen } from "@/lib/site";
import { PhoneMockup } from "./phone-mockup";

const order: AppScreen[] = ["home", "plan", "health", "services"];

/** All app screenshots; swipeable row on mobile, 4-up grid on desktop. */
export function AppScreensGallery() {
  return (
    <ul className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-0">
      {order.map((key, i) => {
        const s = appScreens[key];
        return (
          <li key={key} className="flex snap-center flex-col items-center text-center">
            <PhoneMockup
              screen={key}
              width="w-56 lg:w-full lg:max-w-64"
              className={`transition-transform duration-300 hover:-translate-y-1.5 ${i % 2 ? "lg:mt-10" : ""}`}
            />
            <h3 className="mt-6 text-title-md text-forest">{s.title}</h3>
            <p className="mt-1 max-w-60 text-body-sm text-muted">{s.caption}</p>
          </li>
        );
      })}
    </ul>
  );
}
