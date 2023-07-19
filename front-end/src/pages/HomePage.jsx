import React from 'react';
import { useRef } from 'react';
import styled from 'styled-components'

const HomePage = () => {
  const ref = useRef(null);



  const responsive = [
    { breakPoint: 1280, cardsToShow: 4 },
    { breakPoint: 760, cardsToShow: 2 },
  ];
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
  
  <HomeComponent>
    <Title>
      <P>Find your <span>[ Dream Job ]</span>, Find your Passion.</P>
    </Title>
    <Sides>
      <LeftSide>
        <Image>
          
        </Image>
      </LeftSide>
      <RightSide>
        <Subhead>
          <p>Helping you Prepare,</p>
          <p>For the World of Work.</p>
          <h2></h2>
        </Subhead>

        <Explore>
            <button onClick={handleClick} >Explore More</button>
        </Explore>
        <BP> <p>Student Support, Carrer / Co-Op and Employment, Resume Builder, Job-Fairs, Market Research</p> 
        <h2></h2>
        </BP>
        <Contect>
          <h4>Let the right people know you’re open to work</h4>
          <h2>Share you resume and let the world know a new talent is in the hunt. </h2>
          <h3>All at one place with simple clicks. </h3>
        </Contect>

      </RightSide>
    </Sides>
    <Cards ref={ref}>
      <Cleft>
        <H>
          <h2>Find the right Job or</h2>
          <h2>Internship for you</h2>
        </H>
      </Cleft>
      <Cright>
          <CRTitle>
            <p>Suggested Searches</p> 
          </CRTitle>
          <Line1>
              <Tile1>
                <button>Engineering</button>
              </Tile1>
              <Tile2>
                <button>Business Development</button>
              </Tile2>
              <Tile3>
                <button>Marketing</button>
              </Tile3>
              <Tile4>
                <button>Finance</button>
              </Tile4>
          </Line1>
          <Line2>
              <Tile1>
                <button>Software Development</button>
              </Tile1>
              <Tile2>
                <button>Customer Service</button>
              </Tile2>
              <Tile3>
                <button>Industrial Design</button>
              </Tile3>
              <Tile4>
                <button>Customer Service</button>
              </Tile4>
          </Line2>
          <Line2>
              <Tile1>
                  <button>Retail Associate</button>
              </Tile1>
              <Tile2>
                <button>Arts & Design</button>
              </Tile2>
              <Tile3>
                <button>Product Management</button>
              </Tile3>
              <Tile4>
                <button>Media & Communications</button>
              </Tile4>
          </Line2>
          <Line2>
              <Tile1>
                  <button>Support</button>
              </Tile1>
              <Tile2>
                <button>HealthCare Service</button>
              </Tile2>
              <Tile3>
                <button>Consulting</button>
              </Tile3>
              <Tile4>
                <button>Purchasing</button>
              </Tile4>
          </Line2>
      </Cright>
    </Cards>
    <Footer>

    </Footer>
  </HomeComponent>
  );
};

export default HomePage;

const HomeComponent = styled.div`
  display: flex;
  flex-direction:column ;
  background:#f2f2f2 ;
  border-top: 2px solid #5B0101;
`;

const Title = styled.div`
  /* flex: 0.4; */
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.div`
  
  font-weight: 900;
  font-size: 4rem;
  font-family: 'Oswald', sans-serif;
  color: #5B0101;
  /* font-family: Montserrat; */
  /* font-size: 64px; */
  font-style: normal;
  /* font-weight: 800; */
  /* line-height: 70.9%; 45.376px */
  letter-spacing: -4.64px;

  >span{
    color: #073f07;
    font-size: 4rem;
    font-family: 'Dancing Script', cursive;
    letter-spacing: -5.64px;
  }
`;

const Sides = styled.div`
  /* flex: 0.6; */
  display: flex;
  flex-direction:row;
  height: 70vh;
  justify-content:space-around ;
`;

const LeftSide = styled.div`
  flex: 0.4;
  border:4px solid #5B0101 ;
  border-radius: 30px;
  height: 70vh;
  display: flex;
  justify-content:center ;
  align-items:center ;

`;
const Image = styled.div`
  background: url("./public/img.png");
  background-size: 70vh 70vh;
  padding: 20px;
  display:flex ;
  height: 100%;
  width: 100%;
  background-repeat:no-repeat ;
  justify-content:center ;
  align-items:center ;
`;

const RightSide = styled.div`
  flex: 0.5;
  /* border: 2px solid green; */
  height: 70vh;
  display: flex;
  flex-direction:column ;
  /* justify-content:center ; */
  /* align-items:center ; */
  
`;
const BP = styled.div`
display: flex;
justify-content: center;
flex-direction:column ;
padding:10px ;
  p{
    font-weight:900 ;
    font-size:1rem ;
  }
  h2{
    height: 2px;
    width: 45vw;
    background: black;
  }
`;

const Contect = styled.div`
h4{
  font-size: 2.1rem;
}
  h2{
    font-family: 'Caveat', cursive;
    font-size: 2rem;
  }
  h3{
    font-family: 'Caveat', cursive;
    font-size: 2.5rem;
    text-decoration:  underline solid  black 2px;
  }
`;

const Explore = styled.div`
padding-top: 10px;
  >button{
    
    color: #5B0101;
    padding: 15px;
    font-family: 'Oswald', sans-serif;
    font-weight:500 ;
    font-size: 2rem;
    border-radius: 20px;
  }
`;

const Subhead = styled.div`
    padding-top: 2rem;
    font-size: 3rem;
    font-weight: 800;
    font-family: 'Oswald', sans-serif;
    h2{
      border-bottom: 6px solid black;
      width: 35vw;
    }
`;

const Cards = styled.div`
  height: 50vh;
  /* border:2px solid red ; */
  display: flex;
  justify-content:space-around ;
  align-items:center ;
`;

const H = styled.div`
  display: flex;
  justify-content:center ;
  align-items: center;
  padding: 20px;
  flex-direction:column ;
  h2{
    font-size:2.5rem ;
    font-weight: 900;
    font-family: 'Oswald', sans-serif;
    color: #000000;

  }
`;


const Cleft = styled.div`
  flex: 0.25;
  display: flex; 
  /* border:2px solid black ; */
`
const Cright = styled.div`
  flex: 0.5;
  display: flex;
  /* border:2px solid green ; */
  flex-direction: column;
  align-items:center ;
  justify-content: center;
`;

const CRTitle = styled.div`
padding-bottom:20px ;
  p{
    font-size: 1.5rem;
    font-weight: bolder;
    color: black;

  }
`;



const Line1 = styled.div`
  display: flex;
  justify-content:center ;

  align-items: center;
  padding-bottom:5px;
`;

const Line2 = styled.div`
  display: flex;
  justify-content:center ;
  align-items: center;
  padding-bottom:5px;
`;

const Tile1 = styled.div`
  /* border: 2px solid #ffffff; */
  border-radius: 10px;
  padding-right:5px;
  height: 3rem;
  cursor: pointer;
  >button{
    background: #5B0101;
  }
  
  color: #ffffff;
  :hover{
    color: #ffffff;
    background: #014a1e;
  }
`;
const Tile2 = styled.div`
   /* border: 2px solid #ffffff; */
  border-radius: 10px;
  padding-right:5px;
  height: 3rem;
  cursor: pointer;
  >button{
    background: #5B0101;
  }
  
  color: #ffffff;
  :hover{
    color: #ffffff;
    background: #014a1e;
  }
`;
const Tile3 = styled.div`
   /* border: 2px solid #ffffff; */
  border-radius: 10px;
  padding-right:5px;
  height: 3rem;
  cursor: pointer;
  >button{
    background: #5B0101;
  }
  
  color: #ffffff;
  :hover{
    color: #ffffff;
    background: #014a1e;
  }
`;
const Tile4 = styled.div`
   /* border: 2px solid #ffffff; */
  border-radius: 10px;
  padding-right:5px;
  height: 3rem;
  cursor: pointer;
  >button{
    background: #5B0101;
  }
  
  color: #ffffff;
  :hover{
    color: #ffffff;
    background: #014a1e;
  }
`;


const Footer = styled.div`
  height: 15vh;
  background: white;
  border-top: 2px solid #5B0101;
`;