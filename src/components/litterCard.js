import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import logo from '../images/saratogaspringsdoodles.webp';

const LitterContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: stretch;

  margin: 0 auto 2rem;
  box-shadow: 0px 2px 10px rgba(0, 64, 64, 0.15);
  border-radius: 5px;
  box-sizing: border-box;
  background: #fff;

  h2 {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: teal;
    transition: all 0.3s ease-in-out;
    position: relative;
  }
  a:hover {
    color: orange;
  }
  a::before {
    content: '';
    position: absolute;
    bottom: -3px;
    width: 0px;
    height: 3px;
    margin: 3px 0 0;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    background-color: orange;
  }
  a:hover::before {
    width: 100%;
    opacity: 1;
    left: 0;
  }
`;

const ParentContainer = styled.div`
  width: 35%;
  min-width: 280px;

  @media only screen and (max-width: 855px) {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
`;

const ParentImg = styled.img`
  display: block;
  width: 100%;
  height: ${props => (props.hasSire ? '50%' : '100%')};
  object-fit: cover;

  /* Border for 2nd image */
  border-radius: 0 0 0 5px;

  &:first-child {
    border-radius: ${props => (props.hasSire ? '5px 0 0 0' : '5px 0 0 5px')};
    border-bottom: 1px solid #888;
  }

  @media only screen and (max-width: 855px) {
    width: 50%;
    height: 100%;
    /* 2nd image */
    border-radius: 0 5px 5px 0;
    &:first-child {
      border-radius: 5px 0 0 5px;
      border-bottom: 0;
    }
  }
`;

const LitterInfo = styled.div`
  box-size: border-box;
  margin: auto;
  padding: 1rem;
  width: 65%;

  p:last-child {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 855px) {
    width: 95%;
  }
`;

const LitterFrontmatter = styled.ul`
  list-style: none;
  margin: 0 0 1em;

  li {
    margin: 0;
  }
`;

const ReservationList = styled.div`
  h3 {
    margin: 1rem 0 0.5rem;
  }

  ol {
    margin: 0 0 1em 1em;
  }

  li {
    margin: 0;
  }
`;

const CallToAction = styled.p`
  margin-top: 0.5rem;
`;

const LitterCard = ({ litter, dogImagePaths }) => {
  console.log('littercard:', litter);
  // Get link to sire / dam profile, if in-house
  // First construct the ids used in dogCard
  const sireId = litter.frontmatter.sire.sire_name.includes(' ')
    ? litter.frontmatter.sire.sire_name.split(' ')[0]
    : litter.frontmatter.sire.sire_name;
  const damId = litter.frontmatter.dam.dam_name.includes(' ')
    ? litter.frontmatter.dam.dam_name.split(' ')[0]
    : litter.frontmatter.dam.dam_name;

  const sire = litter.frontmatter.sire.sire_in_house ? (
    <Link to={`/meet-the-dogs#${sireId}`}>
      {litter.frontmatter.sire.sire_name}
    </Link>
  ) : (
    litter.frontmatter.sire.sire_name
  );
  const dam = litter.frontmatter.dam.dam_in_house ? (
    <Link to={`/meet-the-dogs#${damId}`}>
      {litter.frontmatter.dam.dam_name}
    </Link>
  ) : (
    litter.frontmatter.dam.dam_name
  );

  // Get path to sire / dam image: attached to litter, attached to in-house dog, or default img
  // Check if there's a sire! Will impact image styling
  const hasSire = !(
    litter.frontmatter.sire['sire_image'] === null &&
    litter.frontmatter.sire['sire_name'] === 'TBD'
  );
  const damImage = litter.frontmatter.dam.dam_image ? (
    <ParentImg
      hasSire={hasSire}
      src={litter.frontmatter.dam.dam_image}
      alt={litter.frontmatter.dam.dam_name}
    />
  ) : litter.frontmatter.dam.dam_in_house ? (
    <ParentImg
      hasSire={hasSire}
      src={dogImagePaths[litter.frontmatter.dam.dam_name]}
      alt={litter.frontmatter.dam.dam_name}
    />
  ) : (
    <ParentImg hasSire={hasSire} src={logo} alt="dog face" />
  );
  const sireImage = !hasSire ? null : litter.frontmatter.sire.sire_image ? (
    <ParentImg
      hasSire={hasSire}
      src={litter.frontmatter.sire.sire_image}
      alt={litter.frontmatter.dam.dam_name}
    />
  ) : litter.frontmatter.sire.sire_in_house ? (
    <ParentImg
      hasSire={hasSire}
      src={dogImagePaths[litter.frontmatter.sire.sire_name]}
      alt={litter.frontmatter.sire.sire_name}
    />
  ) : (
    <ParentImg hasSire={hasSire} src={logo} alt="dog face" />
  );

  // Format reservations
  const reservations = litter.frontmatter['reservation_list']
    ? litter.frontmatter['reservation_list'].map((item, index) => (
        <li key={`${dam}-${sire}-${index}`}>{item}</li>
      ))
    : [];

  // Handle dual-sired litters
  const isDual =
    litter.frontmatter.dub_sire && litter.frontmatter.dub_sire.dub_sire_name
      ? true
      : false;
  // If litter is dual-sired, create the (linked) name, just like sire and dam above
  let dubSire = '';
  if (isDual) {
    const dubSireId = litter.frontmatter.dub_sire.dub_sire_name.includes(' ')
      ? litter.frontmatter.dub_sire.dub_sire_name.split(' ')[0]
      : litter.frontmatter.dub_sire.dub_sire_name;
    dubSire = litter.frontmatter.dub_sire.dub_sire_in_house ? (
      <Link to={`/meet-the-dogs#${dubSireId}`}>
        {litter.frontmatter.dub_sire.dub_sire_name}
      </Link>
    ) : (
      litter.frontmatter.dub_sire.dub_sire_name
    );
  }
  console.log(dubSire);

  const title = isDual ? (
    <h2>
      {dam} with {sire} and {dubSire}
    </h2>
  ) : (
    <h2>
      {dam} and {sire}
    </h2>
  );

  return (
    <LitterContainer>
      <ParentContainer>
        {damImage}
        {sireImage}
      </ParentContainer>
      <LitterInfo>
        {title}
        <LitterFrontmatter>
          {litter.frontmatter.date.length > 1 && (
            <li>
              <b>Expected:</b> {litter.frontmatter.date}
            </li>
          )}
          {litter.frontmatter.count > 0 && (
            <li>
              <b>Puppy count:</b> {litter.frontmatter.count}
            </li>
          )}
          {litter.frontmatter.size.min < litter.frontmatter.size.max && (
            <li>
              <b>Full-grown size:</b> {litter.frontmatter.size.min} to{' '}
              {litter.frontmatter.size.max} pounds
            </li>
          )}
          {litter.frontmatter.colors.length > 1 && (
            <li>
              <b>Possible colors: </b>
              {litter.frontmatter.colors}
            </li>
          )}
        </LitterFrontmatter>
        <div dangerouslySetInnerHTML={{ __html: litter.html }} />
        {litter.frontmatter['reservation_list'] && (
          <ReservationList>
            <h3>Reservation List</h3>
            <ol>{reservations}</ol>
          </ReservationList>
        )}
        <CallToAction>
          Interested in a puppy from this litter? Fill out our{' '}
          <Link to="/puppies/application">application</Link>.
        </CallToAction>
      </LitterInfo>
    </LitterContainer>
  );
};

export default LitterCard;
