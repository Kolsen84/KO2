import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: auto auto;
  grid-gutter: 2rem;

  input,
  textarea {
    border-radius: 5px;
    padding: 0.5rem;
  }

  .senderInfo input {
    width: 90%;
    margin-bottom: 0.5rem;
  }
  .senderInfo input:last-of-type {
    margin-bottom: 0;
  }

  .message textarea {
    width: 100%;
    height: 100%;
  }

  .submitContainer {
    padding-top: 1rem;
    grid-column-start: 1;
    grid-column-end: 3;
    text-align: center;
  }

  input[type='submit'] {
    font-weight: 700;
    font-size: 1.1em;
    background-color: ${props => props.theme.headFootSolid};
    color: white;
    padding: 0.5rem 3rem;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: ${props => props.theme.linkColorHover};
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 650px) {
    display: block;

    .senderInfo input {
      width: 100%;
    }
    .senderInfo input:last-of-type {
      margin-bottom: 0.5rem;
    }

    .message textarea {
      min-height: 33vh;
    }
  }
`;

const ContactPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query contactQuery {
      pageIntro: markdownRemark(
        fileAbsolutePath: { regex: "//cms/general/welcome.md/" }
      ) {
        frontmatter {
          welcome_contact
        }
      }
    }
  `);

  return (
    <Layout location={location}>
      <SEO title="Contact Us" />
      <h1>Get In Touch</h1>
      <p>{data.pageIntro.frontmatter.welcome_contact}</p>
      <FormContainer
        name="contact"
        method="POST"
        data-netlify="true"
        action="/message-sent"
      >
        <input type="hidden" name="form-name" value="contact" />
        <div className="senderInfo">
          <input type="text" name="name" placeholder="Your Name *" required />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            required
          />
          <input type="tel" name="phone" placeholder="Your Phone" />
        </div>
        <div className="message">
          <textarea name="message" placeholder="Your Message *" required />
        </div>
        <div className="submitContainer">
          <input type="submit" value="Send" />
        </div>
      </FormContainer>
    </Layout>
  );
};

export default ContactPage;
