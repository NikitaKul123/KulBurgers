import React,{useState} from 'react'
import { auth,fs } from '../Config/Config'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import '../Signup.css'



export const Signup = () => {
    

    const history = useHistory();

    const [fullName, setFullname]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handleSignup=(e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                FullName: fullName,
                Email: email,
                Password: password,
            }).then(()=>{
                setSuccessMsg('Вы успешно зарегестрировались.Теперь вы будете автоматически перенаправлены на страницу входа');
                setFullname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    history.push('/login');
                },1000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }

   

    return (
        <div className='Containerr'>
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Регистрация</h1>
            <hr></hr>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
                <label>Ваше имя</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setFullname(e.target.value)} value={fullName}></input>
                <br></br>
                <label>Email</label>
                <input type="email" className='form-control' required
                 onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Пароль</label>
                <input type="password" className='form-control' required
                 onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Если у вас уже есть аккаунт
                    <Link to="login" className='link'> Сюда</Link></span>
                    <button type="submit" className='btn btn-dark btn-md'>Зарегестрироваться</button>
                </div>
            </form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>Пользователь  с такой почтой уже существует</div>                
            </>}
        </div>
        </div>
        
    )
}