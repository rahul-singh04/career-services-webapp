import React from 'react';
import { useRef } from 'react';
import styled from 'styled-components'

const HomePage = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (

    <Container>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src="/images/login-hero.svg" alt="" />
        </Hero>
        <Form>
          <Google onClick={handleClick} >
            <img src="/images/google.svg" alt="" />
            Explore More
          </Google>
          <Subtext>
          <p>Helping you Prepare, For the World of Work.</p>
          </Subtext>
        </Form>
      </Section>
      <Sectiontwo>
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
      </Sectiontwo>
      <Sectionthree>
      <Carrer>
      <About>
          <p>The Career Hub provides career and employment (permanent/summer/ part-time) support services for undergraduate, graduate students and alumni from all disciplines. The Hub helps students develop lifelong career management skills through a comprehensive range of accessible services to support and empower students in making informed decisions about their career and employment goals. The Hub also assists employers in recruiting students from the university.</p>
      </About>
      <Services>
        <h3>Services Include</h3>
        <S>
          <button>Job Postings</button>
          <button>On-Campus Jobs</button>
          <button>Internship Opportunities</button>
          <button>Career Fairs</button>
          <button>Career Coaching</button>
          <button>Resume, Cover Letter, and Interview Advising</button>
          <button>Employment and Career Workshops</button>
        </S>
      </Services>
     
    </Carrer>
    <Footer>

    </Footer>
      </Sectionthree>
    </Container>

  );
};

export default HomePage;
const Container = styled.div`
  padding:0px;
  /* font-family: sans-serif; */

`;
const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;


const Sectiontwo = styled.section`
  display: flex;
  align-content: start;
  min-height: 300px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Sectionthree = styled.section`
  display: flex;
  align-content: start;
  min-height: 300px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;
const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }

  img {
    /* z-index: -1; */
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  /* border: 2px solid red; */
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  font-family: sans-serif;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);

  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

const Subtext = styled.div`
  padding-top: 80px;
  font-size: 24px;
  display: flex;
`;















const Carrer = styled.div`
    display: flex;
    /* border: 2px solid black; */
    height: 90vh;
    flex-direction:column ;
    width: 100%;
`;

const About = styled.div`
display: flex;
justify-content: center;
align-items: center;
  p{
    font-size: 1.2rem;
    font-weight: bolder;
    padding:0px 50px 20px ;

  }
`;
const Services = styled.div`
  display: flex;
  flex-direction: column;
  h3{
    text-align: center;
    padding-bottom: 10px;
    font-size: 2rem;
    font-family: 'Oswald', sans-serif;
  }
  justify-content:center;
  align-items: center;
`;
const S = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center ;
  align-items: center;

  button{
    width: 25rem;
    padding: 15px;
    border: 2px solid #5B0101;
    background: white;
    color: #5B0101;
  }
  button:hover{
    color: white;
    background: #5B0101;
    border: 2px solid black;
  }
  
`;





const Cards = styled.div`
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
    font-size:2rem ;
    font-weight: 900;
    
    color: #2977c9;

  }
`;

const Cleft = styled.div`
  /* flex: 0.45; */
  display: flex; 
  /* border:2px solid black ; */
`
const Cright = styled.div`
  /* flex: 0.7; */
  display: flex;
  /* border:2px solid green ; */
  flex-direction: column;
  align-items:center ;
  justify-content: center;
`;

const CRTitle = styled.div`
padding-bottom:20px ;
  p{
    font-size: 1.8rem;
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
  border-radius: 10px;
  padding-right:5px;
  height: 3rem;
  cursor: pointer;
  background: #ffffff;
  /* box-shadow: black .5px .5px; */
  color: #2977c9;
  :hover{
    color: #ffffff; 
    background: #2977c9;
  }
`;
const Tile2 = styled.div`
   border-radius: 10px;
  padding-right:5px;
  height: 3rem;
  cursor: pointer;
  background: #ffffff;
  /* box-shadow: black .5px .5px; */
  color: #2977c9;
  :hover{
    color: #ffffff; 
    background: #2977c9;
  }
`;
const Tile3 = styled.div`
   border-radius: 10px;
  padding-right:5px;
  height: 3rem;
  cursor: pointer;
  background: #ffffff;
  /* box-shadow: black .5px .5px; */
  color: #2977c9;
  :hover{
    color: #ffffff; 
    background: #2977c9;
  }
`;
const Tile4 = styled.div`
   border-radius: 10px;
  padding-right:5px;
  height: 3rem;
  cursor: pointer;
  background: #ffffff;
  /* box-shadow: black .5px .5px; */
  color: #2977c9;
  :hover{
    color: #ffffff; 
    background: #2977c9;
  }
`;

const Footer = styled.div`
  height: 15vh;
  background: white;
  border-top: 2px solid #5B0101;
`;