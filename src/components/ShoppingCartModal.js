import React from 'react';
import { Button, Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/store/slice/cartSlice';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Empty from '../assets/Empty.gif'
import '../styles/Modal.css';

const ShoppingCartModal = ({ isOpen, onClose, cartItems }) => {
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleClose = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    return (
        <Modal open={isOpen} onClose={handleClose} className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Shopping Cart</h2>
                    <button className="close-button" onClick={handleClose}>
                        X
                    </button>
                </div>

                <div className="cart-grid">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart-message">
                            <img src={Empty} alt='' style={{ width: '250px', height: '250px' }} />
                            <p>No items in the cart</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.thumbnail} alt='' style={{ width: '75px', height: '75px' }} />
                                <div className="item-details">
                                    <p>{item.title}</p>
                                    <p>${item.price}</p>
                                </div>
                                <Button
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    type="submit"
                                    sx={{
                                        borderRadius: 3, marginTop: 3,
                                        backgroundColor: '#9854CB',
                                        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',

                                        '&:hover': {
                                            backgroundColor: 'red',
                                        },
                                    }}
                                    variant="contained">
                                    <RemoveCircleOutlineIcon sx={{ width: '18px', height: '18px' }} />
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-summary">
                    <p>Cart Count: {cartItems.length}</p>
                    <p>Total Amount: ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
                </div>
            </div>
        </Modal >
    );
};

export default ShoppingCartModal;
