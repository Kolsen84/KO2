import React from 'react';
import styled from 'styled-components';

import fallbackImage from '../images/saratogaspringsdoodles.webp';

const CardContainer = styled.div`
  border-radius: ${props => props.theme.borderRadius};
  margin: 2rem 1rem;
  text-align: center;
  box-shadow: 0px 2px 10px rgba(0, 64, 64, 0.25);

  &:nth-child(odd) {
    img.productImage {
      order: 1;
    }
  }

  a {
    color: white;
    text-decoration: none;
  }

  @media only screen and (max-width: 499px) {
    &:nth-child(odd) {
      img.productImage {
        order: 0;
      }
    }
  }
`;

const CardInnards = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 1em;
`;

const CardImage = styled.img`
  border-radius: ${props => props.theme.borderRadius} 0 0
    ${props => props.theme.borderRadius};
  width: 40%;
  object-fit: cover;

  @media only screen and (max-width: 499px) {
    border-radius: ${props => props.theme.borderRadius}
      ${props => props.theme.borderRadius} 0 0;
    width: 100%;
    max-height: 35vh;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  color: ${props => props.theme.offBlack};
  width: 60%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;

  @media only screen and (max-width: 499px) {
    width: 100%;
  }
`;

const CardHeader = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const CardCopy = styled.div`
  font-weight: 500;

  @media only screen and (max-width: 499px) {
    margin: 1rem 0;
  }
`;

const CardButton = styled.span`
  background: #f8f8f8;
  color: orange;
  border: 3px solid orange;
  border-radius: 5px;
  font-weight: 700;
  font-size: 1.2em;
  padding: 0.5em 1em;

  transition: all 0.3s ease-in-out;

  :hover {
    background: orange;
    color: white;
  }
`;

const ProductCard = ({
  image,
  title = '',
  copy = '',
  button = 'Buy Now',
  to = 'https://pawtree.com/andreasaunders/',
}) => {
  const img = image ? image : fallbackImage;

  return (
    <CardContainer>
      <a href={to} target="_blank" rel="noopener noreferrer">
        <CardInnards>
          <CardImage src={img} className="productImage" />
          <CardContent>
            <CardHeader>{title}</CardHeader>
            <CardCopy dangerouslySetInnerHTML={{ __html: copy }} />
            <CardButton>{button}</CardButton>
          </CardContent>
        </CardInnards>
      </a>
    </CardContainer>
  );
};

export default ProductCard;
