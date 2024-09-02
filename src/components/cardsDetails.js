import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/actions/action';

export const CardsDetails = () => {
  const [data, setData] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false); // Force re-render

  const { id } = useParams();

  const history = useNavigate();

  const getdata = useSelector((state) => state.cartreducer.carts);

  const dispatch = useDispatch();

  const compare = () => {
    let comparedata = getdata.filter((e) => e.id === Number(id));
    setData(comparedata);
  };

  const send = (e) => {
    dispatch(ADD(e));
    setRenderTrigger(!renderTrigger); // Toggle the render trigger
  }

  const dlt = (id) => {
    dispatch(DLT(id))
    history("/")
  }

  const remove = (item) =>{
    dispatch(REMOVE(item))
    setRenderTrigger(!renderTrigger);
  }

  useEffect(() => {
    compare();
  }, [id, getdata, renderTrigger]); // Depend on renderTrigger to re-render when updated

  return (
    <div className='container mt-2'>
      <h2 className='text-center'>Order Summary</h2>

      <section className='container mt-3'>
        <div className='itemsdetails'>
          {data.map((ele) => {
            return (
              <div key={ele.id} className='d-flex'>
                <div className='items_img'>
                  <img src={ele.imgdata} alt="item" style={{ width: "200px", height: "200px" }} />
                </div>

                <div className='details'>
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <p><strong>Restaurant: </strong>{ele.rname}</p>
                          <p><strong>Price: </strong>{ele.price} ₹</p>
                          <p><strong>Dishes: </strong>{ele.address}</p>
                          <p><strong>Total: </strong>{ele.price * ele.qnty} ₹</p>
                          <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:70, cursor:"pointer", background:"#ddd", color:"#111"}} >
                            <span style={{fontSize:24, cursor: "pointer" }} onClick={() => remove(ele)}>-</span>
                            <span style={{fontSize:22}}>{ele.qnty}</span>
                            <span style={{fontSize:24, cursor: "pointer" }} onClick={() => send(ele)}>+</span>
                          </div>
                        </td>
                        <td>
                          <p><strong>Rating: </strong><span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{ele.rating} ★</span></p>
                          <p><strong>Order Review: </strong><span>{ele.somedata}</span></p>
                          <p><strong>Remove: </strong><span><i className='fas fa-trash' onClick={() => dlt(ele.id)} style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i></span></p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            );
          })}
        </div>
      </section>  
    </div>
  );
};

export default CardsDetails;
