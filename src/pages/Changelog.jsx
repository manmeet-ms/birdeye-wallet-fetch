import React from "react";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const versions = [
  {
    title: "Version 1.0",
    description: `Abhi immediate nahi soche hain, par sochenge`,
    datePushed: "2025-03-16",
    url:"/v1",
    version: "1.0.0",
  },
  {
    title: "Version 2",
    description: `Abhi immediate nahi soche hain, par sochenge`,
    datePushed: "2025-03-19",
    url:"/v2",
    version: "2.0.0",
  },
];
const Changelog = () => {
  return (
    <>
      <body className=" p-4 bg-gray-900 text-gray-500">
        




        <section className={`monoType px-4`}>
          <section className="container py-2 ">
            <h1 className="scroll-m-20 text-4xl  font-extrabold tracking-tight lg:text-5xl">
              Changelog
            </h1>
            <p className="text-muted-foreground [&:not(:first-child)]:mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              in unde itaque quam eum officia harum. Quis voluptatibus enim
              possimus beatae aliquam impedit obcaecati odio.
            </p>


            <ol className="mt-12 py-12 relative border-s border-gray-200 dark:border-gray-700">                  

{versions.map((item)=>(
      <Link to={item.url} >
        <li className="ms-4">
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{item.datePushed}</time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">{item.description}</p>
  </li>
      </Link>
))}
</ol>


            <section className="text-muted-foreground overflow-hidden">
              <div className="container mx-auto  py-2">
                <div className="divide-muted divide-y-2">
                  {versions.map((points) => (

                   <Link to={points.url} >
                    <div className="flex flex-col  py-8 md:flex-nowrap">
                      <div className="mb-2 flex flex-shrink-0 items-center gap-2 text-xs md:mb-0 md:w-64">
                        <span className="monoType bg-muted border-primary-foreground w-min rounded-full border px-2 py-1 text-xs">
                          {points.version ? points.version : null}
                        </span>
                      </div>
                      <div className="md:flex-grow ">
                        <h2 className="text-gray-300 mb-2 text-2xl font-extrabold tracking-tight">
                          {points.title}
                        </h2>
                        {/* <span className="text-xs   font-semibold text-muted-foreground">{moment( points.datePushed).format('DD MMMM, YYYY')}</span> */}

                        <div className="flex flex-col">
                          <p>{points.description}</p>
                          <span className="text-muted-foreground/40 pt-2 text-xs font-semibold">
                            {moment(points.datePushed).fromNow()}
                          </span>
                        </div>
                        {/* <a className="text-primary inline-flex items-center mt-4">Learn More
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a> */}
                      </div>
                    </div></Link>
                  ))}
                </div>
              </div>
            </section>
          </section>
        </section>
      </body>
    </>
  );
};

export default Changelog;
