import Courses from "./sections/courses";
import Hero from "./sections/hero";
import Qualities from "./sections/qualities";
import Questions from "./sections/questions";
import Road from "./sections/road";
import Team from "./sections/team";

export default async function Home() {
  return (
    <>
      <Hero />
      <Courses />
      <Qualities />
      <Road />
      <Team />
      <Questions />
    </>
  );
}
