import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../Images/logo.png'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {auth} from '../Config/Config'
import {useHistory} from 'react-router-dom'



export const Navbar = ({user, totalProducts, isAdmin}) => {

    const history = useHistory();

    const handleLogout=()=>{
        auth.signOut().then(()=>{
            history.push('/login');
        })
    }
    
    return (
        <div id='begin' className='navbar'>
            <div className='leftside'>
                <div className='logo'>
                    <img src={logo} alt="logo"/>
                </div> 
            </div>
            <div className='rightside'>

                {!user&&<>
                    <div><Link className='navlink' to="signup">Регистрация</Link></div>
                    <div><Link className='navlink' to="login">Войти</Link></div>
                </>} 

                {user&&<>
                    <div><Link className='navlink' to="/">{user}</Link></div>
                    {!isAdmin &&(<div><Link className='navlink' to="/order-list">Список заказов</Link></div>)}
                    {isAdmin && (<div><Link className='navlink' to="/ufghasjfasfsudgalfasjfhsjdg">Дэшборд</Link></div>)}
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="cart"><Icon icon={shoppingCart} size={20}/></Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div>
                    <div className='settings-button btn-md'
                    onClick={handleLogout}>Выйти</div>
                    
                  
                </>}     
                                
                                
            </div>
        </div>

    )
}