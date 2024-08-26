import React from 'react';
import { Helmet } from 'react-helmet-async';
interface Props {
  title: string;
}
const HelmetMetadata: React.FC<Props> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default HelmetMetadata;
