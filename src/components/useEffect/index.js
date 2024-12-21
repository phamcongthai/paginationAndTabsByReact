import { useEffect, useState } from "react";
import './style.scss';
function UseEffect(){
    const [data, setData] = useState([]);//Tạo data rỗng
    const limit = 20;//Giới hạn 1 trang là 20 sản phẩm
    const [pageQuantity, setPageQuantity] = useState(0);//Tạo số trang gốc là 0;
    const [pageNumber, setPageNumber] = useState(0);//Tạo số thứ tự trang gốc là 0;
    const handleClick = (e) => {
        console.log(e.target.innerText);
        setPageNumber(e.target.innerText - 1);
    }
    useEffect(() => {
        const fetchAPI = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data.products);//Lấy dữ liệu từ API
            console.log(data.products);//In ra dữ liệu lấy được
            setPageQuantity(Math.ceil(data.total / limit));//Tính ra số trang = tổng số / giới hạn 1 trang
        }
        fetchAPI(`https://dummyjson.com/products/?limit=${limit}&skip=${pageNumber * limit}`);
    }, [pageNumber])
    return(
        <>
        <div className="product">
            {data.map((item, index) => {

                return (
                <div className="product__item">
                    <div className="product__img">
                        <img src={item.images[0]} alt={item.title}/>
                    </div>
                    <div className="product__title">
                        <p>{item.title}</p>
                    </div>
                    <div className="product__price">
                        <p>{item.price}$</p>

                    </div>
                </div>
                ); 

            })}
        </div>
        <ul className="pagination">
           {[...Array(pageQuantity)].map((item, index) => {
            return (
                <li onClick={handleClick} className="pagination__item">{index+1}</li>
            )
           })}
        </ul>
        </>
    )
}
export default UseEffect;