import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Context에서 login 가져오기
    const [id,setId] = useState("");
    const [pw,setPw] = useState("");

    // async function handleLogin() {
    //     const res = await fetch("http://localhost:8080/login",{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({
    //             id:id,
    //             pw:pw
    //         }),
    //         credentials: 'include', // 이거 추가해줌 (필수임)
    //     });
    //     const data = await res.json()
    //     if(data.result){
    //         login(data.user); // 여기서 로그인 상태 즉시 반영
    //         navigate('/mainpage',{state:{id:id}})
    //     }
    //     else{
    //         alert ("아이디 또는 비밀번호가 일치하지 않습니다")
    //     }
    // }

    async function handleLogin() {
    // Context의 login 함수에 id, pw만 넘김
    const success = await login(id, pw);

    if (success) {
        navigate('/mainpage'); // 로그인 성공 시 메인페이지로 이동
    } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다");
    }
}

    return (
        <div>
            <h1>로그인 페이지</h1>
            아이디<input placeholder="아이디를 입력해주세요" onChange={(e)=>setId(e.target.value)}/><br />
            비밀번호<input placeholder="비밀번호를 입력해주세요" onChange={(e)=>setPw(e.target.value)}/>
            <button onClick={handleLogin}>로그인</button>
            <button onClick={()=>navigate('/member')}>회원가입</button>
        </div>
    )
}

export default Login