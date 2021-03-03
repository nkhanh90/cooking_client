import React, { FC } from 'react';

type NoAuthTemplateProps = {
  children?: FC;
};

const NoAuthTemplate: FC<NoAuthTemplateProps> = ({ children }) => <div className="main">{children}</div>;

export default NoAuthTemplate;
