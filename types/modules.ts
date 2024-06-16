import { IProduct } from "./common";

export interface IAccordionProps {
  children: React.ReactNode;
  title: string | JSX.Element;
  titleClass: string;
  rotateIconClass?: string;
}

export interface IMenuLinkItemProps {
  item: {
    id: number;
    text: string;
    href: string;
  };
  handleRedirectToCatalog: (arg0: string) => void;
}

export interface ICatalogMMenuButtonProps {
  name: string;
  isActive: boolean;
  handel: VoidFunction;
}

export interface IProductListItemProps{
  item: IProduct
  title?: string
}

export interface IProductInfoLabelProps {
  color: string
  className?: string
}

export interface IEmptyPageContentProps {
  subtitle: string
  description: string
  btnText: string
  bgClassName: string
  emptyWord?: string
  bgWordClassName?: string
  oopsWord?: string
  title?: string
}