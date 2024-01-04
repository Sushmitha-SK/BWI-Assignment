import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Chip, Stack } from '@mui/material';
import { addToCart } from '../redux/store/slice/cartSlice';
import Rating from '@mui/material/Rating';
import '../styles/HomePage.css';

const ProductCard = ({ title, description, price, thumbnail, productData }) => {

    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className='product__card'>
            <div className="image-container">
                <img src={thumbnail} alt={`${title} photo`} className="product__image" />
            </div>
            <div className="text">
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Price: ${price}</p>
                <Stack direction="row" spacing={1} justifyContent={'center'}>
                    <Chip label={capitalizeFirstLetter(productData.category)} />
                </Stack>
                <Stack direction="row" spacing={1} justifyContent={'center'} marginTop={'2%'}>
                    <Rating name="read-only" value={productData.rating} readOnly precision={0.1} />
                </Stack>
                <Button
                    type="submit"
                    onClick={() => handleAddToCart(productData)}
                    sx={{
                        borderRadius: 3,
                        marginTop: 3,
                        backgroundColor: '#9854CB',
                        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
                        width: '150px',
                        '&:hover': {
                            backgroundColor: '#784FB1',
                        },
                        cursor: 'pointer'
                    }}
                    variant="contained">
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
