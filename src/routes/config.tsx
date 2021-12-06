import { FC, ReactElement } from 'react';
import { RouteProps } from 'react-router';

export interface WrapperRouteProps extends RouteProps {
  /** document title locale id */
  titleId: string;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ ...props }) => {
  return props.element as ReactElement;
};

export default WrapperRouteComponent;
