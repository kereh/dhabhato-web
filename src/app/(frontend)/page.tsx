import { getPosts } from "@/lib/blog-server";
import {
  HomeAbout,
  HomeAchievements,
  HomeBlogPreview,
  HomeCTA,
  HomeFacilities,
  HomeHero,
  HomePrograms,
  HomeStats,
  HomeTestimonials,
} from "./_components";

export const revalidate = 60;

export default async function Home() {
  const latestPosts = await getPosts(3);

  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-20">
      <HomeHero />
      <HomeStats />
      <HomeAbout />
      <HomePrograms />
      <HomeFacilities />
      <HomeAchievements />
      <HomeTestimonials />
      <HomeBlogPreview latestPosts={latestPosts} />
      <HomeCTA />
    </div>
  );
}
