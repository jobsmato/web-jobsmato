"use client";

import Circle from "@layouts/components/Circle";
import VideoPopup from "@layouts/components/VideoPopup";
import { markdownify } from "@lib/utils/textConverter";

const ShortIntro = ({ intro }) => {
  return (
    <section className="section pt-0">
      <div className="container-xl">
        <div className="relative px-4 py-[70px]">
          <div className="text-center">
            <div className="animate">
              <p>{intro.subtitle}</p>
              {markdownify(intro.title, "h2", "mt-4 section-title")}
              {markdownify(intro.description, "p", "mt-10")}
            </div>
            <div class="p-4 mb-4 text-lg text-center leading-tight first-letter:capitalize font-medium dark:text-gray-100">
  </div>
  <div class="mx-auto w-fit grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-6">
  <div class="relative group bg-white h-[400px] shadow-lg rounded-2xl overflow-hidden">
    <img class="w-full h-full group-hover:h-64 object-cover rounded-2xl transition-all delay-150 duration-300 ease" src="images/vectors/rb_2967.png" />
    <div class="bg-gray-100 w-full h-40 absolute left-0 bottom-0 -mb-44 group-hover:mb-0 rounded-b-2xl transition-all delay-150 duration-300 ease dark:bg-gray-700">
      <div class="p-6">
        <div class="capitalize flex items-center justify-between gap-4">
          <div>
            <h2 class="text-blue-600 text-lg font-bold">Identify Potential Candidates</h2>
            <p class="dark:text-gray-100">We meticulously search for Candidates within smaller cities to find hidden talent</p>
          </div>
        </div>
        <div class="block mt-4">
        </div>
      </div>
    </div>
  </div>

  <div class="relative group bg-white h-[400px] shadow-lg rounded-2xl overflow-hidden">
    <img class="w-full h-full group-hover:h-64 object-cover rounded-2xl transition-all delay-150 duration-300 ease" src="images/vectors/rb_3016.png" />
    <div class="bg-gray-100 dark:bg-gray-700 w-full h-40 absolute left-0 bottom-0 -mb-44 group-hover:mb-0 rounded-b-2xl transition-all delay-150 duration-300 ease">
      <div class="p-6">
        <div class="capitalize flex items-center justify-between gap-4">
          <div>
            <h2 class="text-blue-600 text-lg font-bold">Providing Necessary Training</h2>
            <p class="dark:text-gray-100">Candidates get targeted training to ensure that they possesd requried skills</p>
          </div>
        </div>
        <div class="block mt-4">
        </div>
      </div>
    </div>
  </div>
  <div class="relative group bg-white h-[400px] shadow-lg rounded-2xl overflow-hidden">
    <img class="w-full h-full group-hover:h-64 object-cover rounded-2xl transition-all delay-150 duration-300 ease" src="images/vectors/rb_3017.png" />
    <div class="bg-gray-100 dark:bg-gray-700 w-full h-40 absolute left-0 bottom-0 -mb-44 group-hover:mb-0 rounded-b-2xl transition-all delay-150 duration-300 ease">
      <div class="p-6">
        <div class="capitalize flex items-center justify-between gap-4">
          <div>
            <h2 class="text-blue-600 text-lg font-bold">Ensuing Candidates match job criteria</h2>
            <p class="dark:text-gray-100">We rigrously assess candidates to match specific need of employers</p>
          </div>
        </div>
        <div class="block mt-4">
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="block mt-8">
  </div>
  <div class="mx-auto w-fit grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 gap-6">
  <div class="relative group bg-white h-[400px] shadow-lg rounded-2xl overflow-hidden">
    <img class="w-full h-full group-hover:h-64 object-cover rounded-2xl transition-all delay-150 duration-300 ease" src="images/vectors/rb_1854.png" />
    <div class="bg-gray-100 w-full h-40 absolute left-0 bottom-0 -mb-44 group-hover:mb-0 rounded-b-2xl transition-all delay-150 duration-300 ease dark:bg-gray-700">
      <div class="p-6">
        <div class="capitalize flex items-center justify-between gap-4">
          <div>
            <h2 class="text-blue-600 text-lg font-bold">Using Advance Algorithms for candidate matching</h2>
            <p class="dark:text-gray-100">Our Technology utilizes Algorithms to align candidates with sutiable job openings </p>
          </div>
        </div>
        <div class="block mt-4">
        </div>
      </div>
    </div>
  </div>
  <div class="relative group bg-white h-[400px] shadow-lg rounded-2xl overflow-hidden">
    <img class="w-full h-full group-hover:h-64 object-cover rounded-2xl transition-all delay-150 duration-300 ease" src="images/vectors/rb_2040.png" />
    <div class="bg-gray-100 dark:bg-gray-700 w-full h-40 absolute left-0 bottom-0 -mb-44 group-hover:mb-0 rounded-b-2xl transition-all delay-150 duration-300 ease">
      <div class="p-6">
        <div class="capitalize flex items-center justify-between gap-4">
          <div>
            <h2 class="text-blue-600 text-lg font-bold">Ensuring seamless and efficient hiring process</h2>
            <p class="dark:text-gray-100">We streamine the process to facilate quicker and more effective recuritment</p>
          </div>
        </div>
        <div class="block mt-4">
        </div>
      </div>
    </div>
  </div>
  </div>
          </div>
          <div className="bg-theme absolute left-0 top-0 w-full">
            <Circle
              className="left-[10%] top-12"
              width={32}
              height={32}
              fill={false}
            />
            <Circle className="left-[3%] top-[30%]" width={85} height={85} />
            <Circle
              className="bottom-[52%] left-[22%]"
              width={20}
              height={20}
            />
            <Circle
              className="bottom-[35%] left-[15%]"
              width={47}
              height={47}
              fill={false}
            />
            <Circle
              className="bottom-[6%] left-[6%]"
              width={62}
              height={62}
              fill={false}
            />
            <Circle className="right-[12%] top-[12%]" width={20} height={20} />
            <Circle
              className="right-[2%] top-[30%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="right-[19%] top-[50%]"
              width={37}
              height={37}
              fill={false}
            />
            <Circle className="right-[33%] top-[52%]" width={20} height={20} />
            <Circle
              className="bottom-[18%] right-[5%]"
              width={65}
              height={65}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortIntro;
