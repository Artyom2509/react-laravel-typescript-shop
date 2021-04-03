import React from 'react';
import { Media } from 'reactstrap';
import { TagTypes } from '../types';
import Typography from './Typography';


interface ProductMediaProps {
  image: string,
  title: string,
  description: string,
  right: string,
};

const ProductMedia: React.FC<ProductMediaProps> = ({ image, title, description, right, ...restProps }) => {
  return (
    <Media {...restProps}>
      <Media left>
        <Media
          object
          src={image}
          className="rounded mr-2 mb-2"
          style={{ width: 100, height: 'auto' }}
        />
      </Media>
      <Media body className="overflow-hidden">
        <Media heading tag="h5" className="text-truncate">
          {title}
        </Media>
        <p className="text-muted text-truncate">{description}</p>
      </Media>
      <Media right className="align-self-center">
        {right && typeof right === 'string' ? (
          <Typography type={TagTypes.h4}>{right}</Typography>
        ) : (
          right
        )}
      </Media>
    </Media>
  );
};


export default ProductMedia;
