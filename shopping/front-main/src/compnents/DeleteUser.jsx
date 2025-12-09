// import { useState } from "react"; // useContext로 바꿀거임
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";


 function DeleteUser() {
    // const [userId, setUserId] = useState("");

    const navigate = useNavigate();
    const { user, logout } =  useContext(AuthContext); // 로그인 상태 그리고 로그아웃 함수 가져오게 하기
 
 
 // 회원 삭제
    async function deleteUsers() {
        if (!user?.id) {
            alert("로그인된 사용자가 없습니다");
            return;
        }

        // 삭제 확인

        if ( !window.confirm(" 회원정보 삭제 시 계정이 말소되어 복구 할 수 없습니다. 정말로 회원정보를 삭제하시겠습니까?"))
            return;
        
        const res = await fetch ("http://localhost:8080/delete", {
            method: "DELETE",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({user_id: user.id}),  // 프론트에서 직접 입력하지 않고 로그인된 아이디 사용
            credentials: 'include'
        });

        const data = await res.json();
        // alert(data.result ? "회원 삭제 완료" : "삭제 실패");
        if (data.result) {
            alert ("회원정보 삭제 완료");
            logout(); // 삭제 후 바로 로그아웃
            navigate("/"); // 메인페이지로 자동 이동
        } else {
            alert ("삭제 실패");
        }
        
    }

console.log("DeleteUser에서 로그인된 user:", user);


    return (
     // 삭제 div 
    <div>
            <h1>회원정보 삭제</h1>

            {/* 아이디: <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder= "삭제할 아이디를 입력하세요" /> <br /> // 사용자가 삭제할 아이디를 직접 입력하는거 자체가 보안 문제임 (그래서 지움) */}

            
            {/* 기존에 input으로 쓰는거에서 버튼 하나만 남김 간단함 + user_id는 절대로 프론트에서 보내지 않음 */}
            <button onClick={deleteUsers}>회원정보 삭제</button> 


    </div>
    )

}

export default DeleteUser