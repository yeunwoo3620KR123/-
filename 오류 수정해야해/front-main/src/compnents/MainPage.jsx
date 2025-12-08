import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


// 여기는 로그인하고 나서 쓸 메인 페이지


function MainPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/mainpage", { credentials: 'include'}) // 쿠키 전송 허용
        .then(res => {
            if (!res.ok) throw new Error("로그인이 필요합니다");
            return res.json();
        })
        .then(data => setUser(data.user))
        .catch(err => {
                alert(err.message);
                navigate('/login'); // 로그인 페이지로 이동
            });
        }, [navigate]);
   
    function settingsClick () {
        navigate('/mypage');
    }

    if (!user) return <div>Loading...</div>

    return (
        <div>
            <h1>로그인 이후 페이지</h1>
            <h2>{user.name}님이 로그인하셨습니다</h2>
        <button onClick={settingsClick}>회원정보 수정</button>


        </div>
    )
}

export default MainPage