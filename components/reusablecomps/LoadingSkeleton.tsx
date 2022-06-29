import React from "react";
import styled, { keyframes } from "styled-components";

const Shimmer = keyframes`
0% {
    opacity:0.6;
}
50%{
    opacity:1;
}
100%{
    opacity:0.6;
}`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 5px;
  align-items: center;
  height: 18rem;
`;

const Content = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const VertBar = styled.div`
  height: ${(props: any) => props["data-height"]};
  margin: 0.5rem 0;
  width: 100%;
  background-color: #eee;
  animation: ${Shimmer} 1.5s ease-in-out infinite;
  border-radius: 5px;
`;
type Props = {
  numVertBars: number;
};

const LoadingSkeleton = ({ numVertBars }: Props) => {
  return (
    <Container>
      <Content>
        {Array.from({ length: numVertBars }).map((_, i) => (
          <VertBar key={i} data-height={`${100 / numVertBars}%`} />
        ))}
      </Content>
    </Container>
  );
};

export default LoadingSkeleton;
