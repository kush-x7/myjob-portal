import { DefaultSeo, NextSeo } from "next-seo";

const myDefaultSeo = {
  title: "Home Page",
  defaultTitle: "Job portal - find the job",
  description: " Post your job and find the job",

  // when we share something in whatsapp tab short sa pic
  openGraph: {
    type: "website",
    title: "Job Portal",
    description: "Job Portal! Recruiters can create and candidates can apply",
    url: "https://kushagra-jp.squareboat.info/",
    images: [
      {
        url: "https://user-images.githubusercontent.com/46968256/156498053-a5347b74-9c00-48cd-940c-4bf24b39e173.png",
        width: 800,
        height: 600,
        alt: "Job Portal"
      }
    ]
  }
};

const HeadManager = (seoProps) => {
  return (
    <>
      <DefaultSeo {...myDefaultSeo} />
      <NextSeo {...seoProps} />
    </>
  );
};

export default HeadManager;
