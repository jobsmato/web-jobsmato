import MDXContent from "app/helper/MDXContent";
import Banner from "./components/Banner";

const Default = ({ data }) => {
  const { frontmatter, content } = data;
  const { title } = frontmatter;

  return (
    <section className="section pt-[10rem]">
      <Banner title={title} />
      <div className="container mt-10">
        <div className="content">
          <MDXContent content={content} />
        </div>
      </div>
    </section>
  );
};

export default Default;
