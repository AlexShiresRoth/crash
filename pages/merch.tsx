import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import { useRouter } from "next/dist/client/router";
import LoadingSkeleton from "../components/reusablecomps/LoadingSkeleton";

import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  min-height: 80vh;
  margin: 15vh 0;
`;
const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4;

  width: 90%;
`;

const Merch = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === "/merch") {
      router.push("/shop");
    }
  }, [router.asPath]);

  return (
    <>
      <Layout>
        <Section>
          <h1 style={{ fontSize: "4rem" }}>Loading Store...</h1>
          <Columns>
            {Array.from({ length: 8 }).map((_, i) => (
              <LoadingSkeleton numVertBars={4} key={i} />
            ))}
          </Columns>
        </Section>
      </Layout>
    </>
  );
};

export default Merch;
