import { capitalize } from '@/lib/utils';
import React from 'react';
import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

interface Props {
  pathnames: string[];
}
const generatePath = (pathnames: string[], index: number) => {
  return '/' + pathnames.slice(0, index + 1).join('/');
};
const CustomBreadcrumbItem = ({ el, index, pathnames }: { el: string; index: number; pathnames: string[] }) => {
  const path = generatePath(pathnames, index - 1);
  return (
    <>
      <BreadcrumbItem>
        {index === pathnames.length ? (
          <BreadcrumbPage>{capitalize(el)}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink href={path}>{capitalize(el)}</BreadcrumbLink>
        )}
      </BreadcrumbItem>
      {index < pathnames.length && <BreadcrumbSeparator />}
    </>
  );
};

const Breadcrumb: React.FC<Props> = ({ pathnames }) => {
  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={'/'}>All</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathnames.map((el, index) => (
          <CustomBreadcrumbItem key={el} pathnames={pathnames} index={index + 1} el={el} />
        ))}
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
};

export default Breadcrumb;
