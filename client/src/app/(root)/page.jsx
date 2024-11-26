import Bar from "@/components/Bar";
import { Schibsted_Grotesk, Gloock } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weights: [400, 500, 600, 700, 900],
});
const gloock = Gloock({ subsets: ["latin"], weight: "400" });

const Home = () => {
  return (
    <section className="h-screen bg-white-1">
      <h1
        className={
          gloock.className +
          " fit-text leading-[1.1] text-center text-purple-1 select-none -z-10"
        }
      >
        INKBLOG
      </h1>

      <div className="flex">
        <Link
          href={"/create"}
          className="flex justify-center items-center w-1/2"
        >
          <Image
            src="/images/create.png"
            alt="Inkspot logo"
            width={300}
            height={300}
            className="object-cover w-full"
          />
        </Link>
        <Link
          href={"/explore"}
          className="flex justify-center items-center w-1/2"
        >
          <Image
            src="/images/share.png"
            alt="Inkspot logo"
            width={500}
            height={500}
            className="object-cover w-full"
          />
        </Link>
      </div>

      <div className="bg-black-1 min-h-screen px-4 py-20">
        <div className="flex gap-[7rem] w-full">
          <p
            className={
              schibstedGrotesk.className + " font-bold text-7xl max-w-[65%]"
            }
          >
            Dive deep into the Inkspot, where creativity knows no bounds.
            Inspiration is free-flowing here so let’s ignite the words.
          </p>
          <div className="flex flex-col min-w-72">
            <Link
              href={"/create"}
              className={
                "text-white-1 py-2 text-5xl border-b border-b-black-5 hover:border-b-purple-1 transition-all duration-500 " +
                schibstedGrotesk.className
              }
            >
              Create
            </Link>
            <Link
              href={"/explore"}
              className={
                "text-white-1 py-2 text-5xl border-b border-b-black-5 mt-4 hover:border-b-purple-1 transition-all duration-500 " +
                schibstedGrotesk.className
              }
            >
              Explore
            </Link>
            <Link
              href={"https://github.com/Raderne/blog-GraphQL-Nextjs-project"}
              className={
                "text-white-1 py-2 text-5xl border-b border-b-black-5 mt-4 hover:border-b-purple-1 transition-all duration-500 " +
                schibstedGrotesk.className
              }
            >
              Github
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          <Image
            src="/images/1000.png"
            alt="1000 logo"
            width={500}
            height={500}
            className="object-cover w-full"
          />
          <p
            className={
              schibstedGrotesk.className +
              "  text-yellow-1 text-6xl max-w-[51rem]"
            }
          >
            users have already found their voice.
          </p>

          <p
            className={
              schibstedGrotesk.className +
              " text-7xl mt-10 text-white-1 font-bold"
            }
          >
            Ready to take your writing to the stratosphere? Leap on board and
            join the community!
          </p>

          <Bar
            text="Popular Blogs"
            icon="/images/favorite.png"
            font={schibstedGrotesk.className + " text-black-1"}
            extraStyles="bg-white-1"
            href="/explore?sort=popular"
          />
          <Bar
            text="New Blogs"
            icon="/images/new_releases.png"
            font={schibstedGrotesk.className + " text-black-1"}
            extraStyles="bg-white-1"
            href="/explore?sort=new"
          />
          <Bar
            text="Trending Authors"
            icon="/images/trending_up.png"
            font={schibstedGrotesk.className + " text-black-1"}
            extraStyles="bg-white-1"
            href="/explore?sort=author"
          />
        </div>
      </div>

      <footer className="bg-black-1 h-40 flex justify-center items-center">
        <p
          className={
            schibstedGrotesk.className +
            " text-white-5 text-xl text-center py-10"
          }
        >
          © {new Date().getFullYear()} Inkspot. All rights reserved.
        </p>
      </footer>
    </section>
  );
};

export default Home;
