import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, searchProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';
import { clearProductList, productList } from '../redux/store/slice/productSlice';
import { clearCart } from '../redux/store/slice/cartSlice';
import { clearLoginDetails } from '../redux/store/slice/userAuthSlice';
import { IconButton } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartModal from '../components/ShoppingCartModal';
import '../styles/HomePage.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../assets/logo.jpg'
import noDataImage from '../assets/Nodata.gif'

const HomePage = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const [search, setSearch] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [productsList, setProductsList] = useState([])
    const [filterName, setFilterName] = useState('All Products');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getProductsList = async () => {
        const getProductsData = await getProducts();
        if (getProductsData.status === 200) {
            setProductsList(getProductsData.data.products);
            dispatch(productList(getProductsData.data.products));
        }
    };


    const getSearchedProduct = async () => {
        try {
            if (search.trim() !== '') {
                const getSearchedData = await searchProducts(search);
                if (getSearchedData.status === 200) {
                    setProductsList(getSearchedData.data.products);
                    dispatch(productList(getSearchedData.data.products));
                }
            } else {
                setProductsList([])
            }
        } catch (error) {
            console.error('Error fetching searched products:', error);
        }
    };

    useEffect(() => {
        if (priceFilter === '50') {
            setFilterName('Products Below $50');
        } else if (priceFilter === '100') {
            setFilterName('Products Below $100');
        } else if (priceFilter === '200') {
            setFilterName('Products Below $200');
        } else if (search !== '') {
            setFilterName(`Search results for '${search}'`);
        } else {
            setFilterName('All Products');
        }
    }, [priceFilter, search]);

    useEffect(() => {
        if (search) {
            getSearchedProduct(search)
        }
        else {
            getProductsList()
        }
    }, [search])

    const filteredProducts = productsList
        .filter((product) => {
            const matchesPriceFilter =
                priceFilter === '' || (priceFilter !== '' && parseFloat(product.price) <= parseFloat(priceFilter));
            return matchesPriceFilter;
        });

    const handleShowCart = () => {
        setIsModalOpen(true)
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSignout = () => {
        localStorage.removeItem('userData')
        dispatch(clearProductList())
        dispatch(clearCart())
        dispatch(clearLoginDetails())
        navigate('/')
        toast.success('Logged out in successfully');
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div class="container__navbar">
                <div class="navbar">
                    <div class="logo">
                        <Link to="/home"><a><img src={logo} alt="Cart Ease" width="125px" /></a></Link>
                    </div>
                    <nav>
                        <input
                            type="text"
                            placeholder="Search Products"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <ul id="MenuItems">
                            <li>Cart Count: {cartItems.length} </li>
                            <li>Total Amount: ${cartItems.reduce((total, item) => total + item.price, 0)}</li>
                            <li>  <IconButton
                                onClick={handleShowCart}
                                edge="end"
                                className='shoppincartIcon'
                            >
                                <ShoppingCartOutlinedIcon />
                            </IconButton></li>
                            <li><p style={{ cursor: 'pointer' }} onClick={handleSignout}>Sign Out</p></li>
                        </ul>

                    </nav>

                </div>
            </div>

            <div className="small-container">
                <div className="row row-2">
                    <h2>{filterName}</h2>
                    <select onChange={(e) => setPriceFilter(e.target.value)}>
                        <option value="">Filter by Price</option>
                        <option value="50">Below $50</option>
                        <option value="100">Below $100</option>
                        <option value="200">Below $200</option>
                    </select>
                </div>

                <div className="container">
                    {currentProducts.length === 0 ? (
                        <div style={{ textAlign: 'center', margin: '0px' }}>
                            <img src={noDataImage} style={{ width: '280px', height: '280px' }} />
                            <p>We didn't find any results matching your search</p>
                        </div>
                    ) : (
                        <main className="grid">
                            {currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                    thumbnail={product.thumbnail}
                                    productData={product}
                                />
                            ))}
                        </main>
                    )}
                </div>
                <ShoppingCartModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    cartItems={cartItems} />

                <div className="page-btn">
                    {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
                        <span
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </span>
                    ))}
                </div>
            </div >
        </>
    )
}

export default HomePage