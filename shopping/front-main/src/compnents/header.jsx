import { useState,useEffect, useContext} from "react"; // useContext 추가
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext"; // AuthContext 추가

function Header() {
    const navigate = useNavigate(); //여기 Navigate 추가
    // 검색 관련 state
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    // // 로그인 상태 저장할 state 추가
    // const [isLogin, setIsLogin] = useState(false);
    // // 로그인한 유저 정보 저장
    // const [user, setUser] = useState(null);

    // Context에서 로그인 상태, 유저 정보, 로그아웃 함수 가져오기
    const { isLogin, user, logout } = useContext(AuthContext);


    // // Navigate 기능 추가
    // function loginClick () {
    //     navigate('/login')
    // }
    // function memberClick () {
    //     navigate('/member')
    // }

    
    useEffect(() => {

        // // 여기에 로그인 상태 확인 API 호출하는거 추가함
        // fetch("http://localhost:8080/mainpage", {
        //     credentials: 'include'
        // })
        // .then(res => {
        //     if (!res.ok) {
        //         setIsLogin(false);
        //         return null;
        //     }
        //     return res.json();
        // })
        // .then(data => {
        //     if (data && data.user) {
        //         setIsLogin(true);
        //         setUser(data.user);
        //     }
        // });

        // 여기는 상품 불러오는 거
        async function fetchProducts() {
            const response = await fetch('http://localhost:8080/dbprod');
            const data = await response.json();
            setData(data);
        }
       
        fetchProducts();
     }, []
    );

        // // 여기에 로그아웃 함수 추가함
        // async function logout() {
        //     const res = await fetch("http://localhost:8080/logout", {
        //         method: "POST",
        //         credentials: "include",
        //     });

        //     const data = await res.json();

        //     if (data.result) {
        //         alert ("로그아웃 되었습니다");
        //         setIsLogin(false);
        //         setUser(null);
        //         navigate("/"); // 로그인 전 메인으로 이동
        //     }
            
        // }



    //검색 필터링부분
    //검색할때 해당 상품들만 골라주는 역할
    const filterData = data.filter(item =>
        (item.pName || "").toLowerCase().includes((search || "").toLowerCase())
    );
    //검색창 테스트 완료! ex)로션을 "로"만 쳐도 로션관련된거 나오게 출력
    function onClick() {
        console.log("검색",filterData)
    }
    return (
        <>
            <header id="Header">
                <div className="main">
                    <ul>
                        {!isLogin ? (

                            <>
                            
                            <li><Link to = {'/member'}>회원가입</Link></li>
                        <li><Link to = {'/login'}>로그인</Link></li>
                            </>
                        ): (
                            <>
                            <li>{user?.nickname}님 환영합니다</li>
                            {/* 여기서 로그아웃 버튼 눌렀을 때 UI가 바로 적용 되도록 Context에서 받아오도록 수정함*/}
                            <li><button onClick={async () => {
                                await logout ();
                                navigate ('/');
                            }}>로그아웃</button></li>
                            </>
                        )}
                       
                        <li><Link to = {"/cart"}>장바구니</Link></li>
                        <li><Link to = {"/mypage"}>마이페이지</Link></li>
                    </ul>
                </div>
                <div className="logo">
                    <h1><a href="http://localhost:5173/">로고</a></h1>
                    <input type="text" value={search}
                        onChange={(e) => setSearch(e.target.value)} placeholder="상품 검색하세요" />
                        <button value={search} onClick={onClick}>🔍</button>
                </div>
                
                <div className="menubox">
                    <ul>
                        <li><a href="#">전체메뉴</a></li>
                    </ul>
                    <ul>
                        <li><a href="#">베스트</a></li>
                    </ul>
                    <ul>
                        <li><a href="#">신제품</a></li>
                    </ul>
                    <ul>
                        <li><a href="#">고객지원</a></li>
                    </ul>
                </div>
            </header>
        </>
    )
}
export default Header;