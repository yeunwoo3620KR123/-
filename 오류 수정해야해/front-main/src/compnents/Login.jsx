import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [id,setId] = useState("");
    const [pw,setPw] = useState("");

    async function login() {
        const res = await fetch("http://localhost:8080/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:id,
                pw:pw
            })
        })
        const data = await res.json()
        if(data.result){
            navigate('/mainpage',{state:{id:id}})
        }
        else{
            alert ("아이디 또는 비밀번호가 일치하지 않습니다")
        }
    }
    return (
        <div>
            <h1>로그인 페이지</h1>
            아이디<input placeholder="아이디를 입력해주세요" onChange={(e)=>setId(e.target.value)}/><br />
            비밀번호<input placeholder="비밀번호를 입력해주세요" onChange={(e)=>setPw(e.target.value)}/>
            <button onClick={login}>로그인</button>
            <button onClick={()=>navigate('/member')}>회원가입</button>
        </div>
    )
}

export default Login