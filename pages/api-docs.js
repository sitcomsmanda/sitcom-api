import Head from "next/head";

import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }) {
  return (
    <div>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="./favicon/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="./favicon/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="./favicon/site.webmanifest"></link>
      </Head>
      <SwaggerUI spec={spec} />
    </div>
  );
}

export async function getStaticProps() {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "SITCOM API",
        version: "0.0.1",
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
}

export default ApiDoc;
