import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// CSS-in-JS styled components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
  padding: 20px;
  
  flex-direction: column;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 0 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const HomeLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  &:hover {
    color: #ffd700;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin:  auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 60px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  color: #333;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 30px;
  text-align: center;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin: 30px 0 20px 0;
  color: #ff7e5f;
  border-bottom: 2px solid rgba(255, 126, 95, 0.2);
  padding-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: justify;
  color: #555;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const FeatureItem = styled.li`
  background: rgba(255, 126, 95, 0.1);
  margin: 10px 0;
  padding: 15px;
  border-radius: 10px;
  border-left: 4px solid #ff7e5f;
  font-size: 1rem;
  
  &:before {
    content: "🎬";
    margin-right: 10px;
  }
`;


function About() {
  return (
    <Container>
      <Navigation>
        <NavLink to="/">← Back to Movies</NavLink>
        <HomeLink to="/">🎬 MovieScope</HomeLink>
        <div></div> {/* Spacer for flexbox */}
      </Navigation>

      <Content>
        <Title>About MovieScope</Title>
        
        <Paragraph>
          Welcome to MovieScope, your ultimate destination for discovering amazing films 
          and exploring the world of cinema. We're passionate about connecting movie 
          lovers with the stories that inspire, entertain, and move us.
        </Paragraph>

        <Subtitle>Our Mission</Subtitle>
        <Paragraph>
          MovieScope aims to make film discovery effortless and enjoyable. Whether you're 
          looking for the latest blockbuster or a hidden gem from decades past, we provide 
          the tools and information you need to find your next favorite movie.
        </Paragraph>

        <Subtitle>What We Offer</Subtitle>
        <FeatureList>
          <FeatureItem>
            Curated collection of movies across all genres and eras
          </FeatureItem>
          <FeatureItem>
            Detailed information including cast, director, and plot summaries
          </FeatureItem>
          <FeatureItem>
            User-friendly interface optimized for all devices
          </FeatureItem>
          <FeatureItem>
            Ratings and reviews to help guide your viewing choices
          </FeatureItem>
        </FeatureList>

      </Content>
    </Container>
  );
}

export default About;