import shortcodes from "@layouts/shortcodes/all";
import "highlight.js/styles/solarized-light.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import Link from "next/link";

const MDXContent = ({ content }) => {
  const mdxOptions = {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  };

  return (
    <>
      {/* @ts-ignore */}
      <MDXRemote
        source={content}
        components={shortcodes}
        options={{ mdxOptions }}
      />
      <div className="flex items-center justify-end pr-16 lg:pr-0">
        <button
          onClick={() => {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
              select.value = 'hi';
              select.dispatchEvent(new Event('change'));
            }
          }}
          className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
        >
          हिंदी में देखें
        </button>
        <Link
          href="/login-user"
          className="hidden px-5 py-2 text-base font-medium text-indigo-600 border border-indigo-600 rounded mr-2 md:block hover:bg-indigo-50 transition"
        >
          Login
        </Link>
        <Link
          href="/login-user"
          className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
        >
          Get Enrolled
        </Link>
      </div>
    </>
  );
};

export default MDXContent;
