import './style.scss';
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

function Tabs() {
    const [data, setData] = useState([]); // Dữ liệu
    const [tab, setTab] = useState('products'); // Tab hiện tại
    const [isLoading, setIsLoading] = useState(true); // Trạng thái chờ dữ liệu
    //Phân trang :
    const [pageQuantity, setPageQuantity] = useState(0);
    const limit = 20;
    const [pageNumber, setPageNumber] = useState(0);

    const handleClick = (e) => {
        setIsLoading(true); // Đặt lại trạng thái chờ khi đổi tab
        setTab(e.target.innerText.toLowerCase());
    };
    const handlePagination = (e) => {
        setIsLoading(true); // Đặt lại trạng thái chờ khi đổi trang
        setPageNumber(parseInt(e.target.innerText) - 1);
    }
    useEffect(() => {
        const fetchAPI = async (url) => {
            const response = await fetch(url);
            const result = await response.json();
            setData(result[tab]); // Lưu dữ liệu hoặc mảng rỗng nếu không có
            setPageQuantity(Math.ceil(result.total / limit));
            setIsLoading(false); // Dữ liệu đã tải xong
        };
        fetchAPI(`https://dummyjson.com/${tab}/?limit=${limit}&skip=${limit * pageNumber}`);    
    }, [tab, isLoading, pageNumber]);

    if (isLoading) {
        return <p>Loading...</p>; // Chờ dữ liệu
    }

    return (
        <>
            <div className="tabs">
                <button className="tabs__item" onClick={handleClick}>
                    products
                </button>
                <button className="tabs__item" onClick={handleClick}>
                    posts
                </button>
                <button className="tabs__item" onClick={handleClick}>
                    users
                </button>
            </div>
            <div className="all">
                {data.map((item, index) => {
                    if (tab === 'products') {
                        return (
                            <div key={index} className="product">
                                <div className="product__item">
                                    <div className="product__img">
                                        <img src={item.images[0]} alt={item.title || 'No Title'} />
                                    </div>
                                    <div className="product__title">
                                        <p>{item.title}</p>
                                    </div>
                                    <div className="product__price">
                                        <p>{item.price}$</p>
                                    </div>
                                </div>
                            </div>
                        );
                    } else if (tab === 'posts') {
                        return (
                            <div key={index} className="Post">
                                <div className="Post__title">
                                    {item.title}
                                </div>
                                <div className="Post__body">
                                    {item.body}
                                </div>
                                <ul className="Post__view">
                                    <FaEye className="Post__view-icon" /> {item.views}
                                </ul>
                            </div>
                        );
                    } else if (tab === 'users') {
                        return (
                            <div key={index} className="User">
                                <img src={item.image} alt={item.firstName} className="User__img" />
                                <p className="User__name">
                                    Name : {item.firstName} {item.lastName} Age : {item.age}
                                </p>
                                <p className="User__email">Email : {item.email}</p>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <ul className='Pagination'>
                {[...Array(pageQuantity)].map((_, index) => {
                    return (
                        <li className='Pagination__item' onClick={handlePagination} key={index}>{index+1}</li>
                    )
                })};
            </ul>
        </>
    );
}

export default Tabs;
