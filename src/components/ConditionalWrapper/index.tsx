import type { FC, ReactElement } from 'react';

type ConditonalWrapperProps = {
  children: ReactElement;
  condition: boolean;
  wrapper: (children: ReactElement) => ReactElement;
};

const ConditionalWrapper: FC<ConditonalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children);

export default ConditionalWrapper;
