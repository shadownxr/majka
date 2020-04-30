import styled from 'styled-components';

export const Car = styled.div`
  display: inline-block;
  background: pink;
  display: flex;
  transition: transform 300ms ease-in-out;
  width: 200px;
  height: 50px;
  transform: translate(-150px,0px);
 
  &:hover {
    transform: translate(0px, 0px)
  }
`
 
export default Car;