import React,{useState} from 'react'
import {auth,fs} from '../Config/Config'
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const Modal = ({products, TotalPrice,totalQty,hideModal}) => {

    const history = useHistory();

    // form states
    const [cell, setCell]=useState(null);
    const [residentialAddress, setResidentialAddress]=useState('');
    const [cartPrice]=useState(TotalPrice);
    const [cartQty]=useState(totalQty);

    // close modal
    const handleCloseModal=()=>{
        hideModal();
    }

    // cash on delivery
    const handleCashOnDelivery=async(e)=>{
        e.preventDefault();
        // console.log(cell, residentialAddress, cartPrice, cartQty);
        const uid = auth.currentUser.uid;
        const userData = await fs.collection('users').doc(uid).get();
        await fs.collection('Buyer-Personal-Info').add({
            UserId: uid,
            Name: userData.data().FullName,
            Email: userData.data().Email,
            CellNo: cell,
            Products: products,
            ResidentialAddress: residentialAddress,
            CartPrice: cartPrice,
            CartQty: cartQty
        })
        const cartData = await fs.collection('Cart ' + uid).get();
        for(var snap of cartData.docs){
            var data = snap.data();
            data.ID = snap.id;
            await fs.collection('Buyer-Cart ' + uid).add(data);
            await fs.collection('Cart ' + uid).doc(snap.id).delete();
        }
        hideModal();
        history.push('/');
        toast.success('Ваш заказ успешно сформирован', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
    }

    return (
        <div className='shade-area'>
        <div className='modal-container'>
            <form className='form-group' onSubmit={handleCashOnDelivery}>                   
                <input type="number" className='form-control' placeholder='Номер Телефона'
                    required onChange={(e)=>setCell(e.target.value)} value={cell}                        
                />
                <br></br>
                <input type="text" className='form-control' placeholder='Адресс доставки'
                    required onChange={(e)=>setResidentialAddress(e.target.value)}
                    value={residentialAddress}
                />
                <br></br>
                <label>Общее количество:</label>
                <input type="text" className='form-control' readOnly
                    required value={cartQty}
                />
                <br></br>
                <label>Общая сумма ₽:</label>
                <input type="text" className='form-control' readOnly
                    required value={cartPrice} 
                />
                <br></br>
                <button type='submit' className='btn btn-success btn-md'>Заказать</button>
            </form>
            <div className='delete-icon' onClick={handleCloseModal}>x</div>
        </div>
    </div>
    )
}