import { Navigate, useNavigate } from "react-router-dom"; 

function Settings() {
    const navigate = useNavigate();


    return (

     <div>

        <h1>회원설정 선택</h1>

        <button onClick={() => navigate("/mypage/edit")}>회원정보 수정</button> <br /> <br />
         <button onClick={() => navigate("/mypage/delete")}>회원정보 삭제</button>
            {/* 결과 메세지 div
            <div>

            {resultMessage}

            </div> */}

        </div>
    );

}

export default Settings