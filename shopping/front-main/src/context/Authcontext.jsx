import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 초기 로그인 상태 확인
        fetch("http://localhost:8080/mainpage", {
            credentials: "include",
        })
        .then(res => {
            if (!res.ok) {
                // 401 등 오류 발생 시 그냥 false 처리 (로그인 직후 덮어쓰지 않음)
                setIsLogin(false);
                setUser(null);
                return null;
            }
            return res.json();
        })
        .then(data => {
            if (data?.user) {
                setIsLogin(true);
                setUser(data.user);
            }
        })
        .catch(err => console.log("로그인 상태 확인 실패", err));
    }, []);

    // 기존 로그인 함수 대체 ( 주석 처리 )
    // // 로그인 성공 시 호출
    // const login = (userData) => {
    //     setIsLogin(true);
    //     setUser(userData);
    // };

    // 로그인 시 서버에 로그인 요청 + 유저 정보 가져오기
    const login = async (id, pw) => {
        try {
            const res = await fetch ("http://localhost:8080/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                credentials: 'include',
                body: JSON.stringify({ id, pw }), // 서버에 로그인
            });
            const data = await res.json();

            if (data.result) {
                const userRes = await fetch ("http://localhost:8080/mainpage", {
                 credentials: 'include',   
                });
                const userData = await userRes.json();

                if (userData?.user) {
                    setIsLogin(true);
                    setUser(userData.user); // 이 유저가 삭제하는 곳 등에서 즉시 사용 가능하게 해줌
                }
            }
            return data.result;
        } catch (err) {
            console.log ("로그인 실패 , err");
            return false;
        }
    } ;





    const logout = async () => {
        const res = await fetch("http://localhost:8080/logout", {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (data.result) {
            alert("로그아웃 되었습니다");
            setIsLogin(false);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ isLogin, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
export { AuthContext };
