import styled from "styled-components";

export const FixedDOM = () => {
  return (
    <FixedDOMWrapper id="fixed">
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto qui
        repudiandae laborum distinctio reprehenderit corporis voluptatibus
        labore blanditiis, accusantium ut nulla commodi repellendus atque ea
        neque et ipsam vel minima.
      </span>
    </FixedDOMWrapper>
  );
};

const FixedDOMWrapper = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  position: fixed;
  font-size: 8px;
  top:50%;
  right: 0;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 0;
  pointer-events: none;
  img {width:100%}
`;
