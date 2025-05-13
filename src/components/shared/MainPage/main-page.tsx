import { cn } from "@/src/lib/utils";
import styles from "./main-page.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import Footer from "../Footer/footer";

export default function Content() {
  return (
    <div>
      <div className={styles.template}>
        <div className="relative">
          <h1 className="absolute inset-0 flex items-center justify-center text-white text-[clamp(1.3rem,_4vw,_3rem)] font-bold text-center z-10">
            Your key to fintech licenses <br /> Fast, Accurate, Convenient
          </h1>
          <Image
            className="h-[400px] sm:h-[500px] w-full bg-cover bg-no-repeat brightness-[0.5]"
            src="/images/hero.png"
            alt="hero"
            width={1000}
            height={600}
            priority
          />
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden mt-8 flex-col justify-center items-center">
          <div
            className={cn(
              styles.text_bet,
              "text-center sm:text-left w-[clamp(15rem,_70vw,_25rem)]"
            )}
          >
            <Image
              className="w-full"
              src="/images/fintech.png"
              alt="fintech"
              width={500}
              height={300}
              priority
            />
            <h1 className="text-[clamp(0.8rem,_4vw,_3rem)]">
              What exactly does our service do?
            </h1>

            <h2 className="text-[clamp(0.8rem,_2vw,_2rem)]">
              Our service enables users to efficiently access accurate and
              up-to-date information about fintech company licenses.
            </h2>
          </div>

          <button className={cn(styles.button, "w-[80%] my-8 !h-12 !text-lg")}>
            Find Licenses
          </button>
        </div>

        {/* Desktop */}
        <div className={cn("hidden sm:flex justify-center py-16 gap-8")}>
          <div className={cn(styles.template_between)}>
            <div className={styles.text_bet}>
              <h1 className="text-[clamp(1rem,_2vw,_2rem)]">
                What exactly does our service do?
              </h1>

              <h2 className="text-[clamp(1rem,_1.5vw,_1.5rem)]">
                Our service enables users to efficiently
                <br />
                access accurate and up-to-date information
                <br />
                about fintech company licenses.
              </h2>
            </div>
            <Dialog>
              <DialogTrigger className={styles.button}>
                Find Licenses
              </DialogTrigger>
              <DialogContent className="bg-white rounded-lg p-6 w-[90%] max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-[24px] font-semibold mb-4">
                    Choose a country
                  </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3">
                  <Link href="/hong-kong" className="block w-full">
                    <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 w-full">
                      <Image
                        className="max-w-16 max-h-16"
                        src="/images/flag-for-hong-kong.svg"
                        alt="HK"
                        width={50}
                        height={50}
                        priority
                      />
                      <span className="text-[28px] font-bold">Hong Kong</span>
                    </div>
                  </Link>

                  <Link href="/uk" className="block w-full">
                    <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 w-full">
                      <Image
                        className="max-w-16 max-h-16"
                        src="/images/flag-for-united-kingdom.svg"
                        alt="UK"
                        width={50}
                        height={50}
                        priority
                      />
                      <span className="text-[28px] font-bold">
                        United Kingdom
                      </span>
                    </div>
                  </Link>

                  <Link href="/lithuania" className="block w-full">
                    <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 w-full">
                      <Image
                        className="max-w-16 max-h-16"
                        src="/images/flag-lithuania.svg"
                        alt="LT"
                        width={50}
                        height={50}
                        priority
                      />
                      <span className="text-[28px] font-bold">Lithuania</span>
                    </div>
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className={styles.containerImage}>
            <Image
              className="w-[clamp(15rem,_40vw,_25rem)] items-center"
              src="/images/fintech.png"
              alt="fintech"
              width={500}
              height={300}
            />
          </div>
        </div>

        <div className="relative">
          <h1 className="absolute inset-0 flex items-center justify-center text-white text-[clamp(1.2rem,_3vw,_2rem)] font-bold text-center mx-5 z-10">
            We are a team of enthusiasts who strive to make financial
            information <br />
            more accessible, transparent and user-friendly.
          </h1>
          <Image
            className="w-full h-[500px] brightness-[0.5]"
            src="/images/city.png"
            alt="city"
            width={1600}
            height={500}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
