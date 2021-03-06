import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import ContentPageTemplate from '../../templates/content';

import image from '../../../static/img/cuddlepups.jpg';

const PoliciesPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query policiesQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/general/policies.md/" }
      ) {
        html
      }
    }
  `);
  return (
    <Layout location={location}>
      <SEO title="Policies and Pricing" />
      <ContentPageTemplate
        location={location}
        title="Policies and Pricing"
        section="puppies"
        content={data.content.html}
        image={image}
      />
    </Layout>
  );
};

export default PoliciesPage;
