import { useState } from "react";



function EditUser() {
    

    // 상태 선언
    const [userId, setUserId] = useState(""); // 기존 아이디
    const [newUserId, setNewUserId] = useState(""); // 새로 변경할 아이디
    const [pw, setPw] = useState("");
    const [nickname, setNickname] = useState(""); 
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
   
    
    // 회원정보 수정
    async function updateUsers() {
        if (!userId) {
            alert("아이디를 입력하세요.")
            return;
        }
        
        // fetch 요청
        const res = await fetch("http://localhost:8080/edit", {
            method: "PUT",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({
                // old_user_id: userId, // fetch 보내는 데이터에서 old_user_id 삭제
                new_user_id: newUserId || userId, // 새 아이디 혹은 새 아이디가 없으면 기존 아이디 사용
                user_pw: pw,
                user_nickname:nickname,
                user_name: name,
                user_gender: gender,
                user_dob: dob,  // 이제 YYYY-MM-DD 그대로 전송
                user_phone: phone

            })
        });

        const data = await res.json();
        
            alert (data.result ? "회원 정보 수정 완료":"수정 실패");
         
    }        


// 여기에서  생년월일 :   <input type="date" value={dob} placeholder="YYYY-MM-DD" onChange={(e)=>setDob(e.target.value)}/> <br />
// 이거 지움 placeholder="YYYY-MM-DD"
return (
 
            // 수정 div 
            <div>
                <h1>회원설정 페이지</h1>
            <h2>회원정보 수정</h2>
            {/* 아이디 : <input value={userId} placeholder="아이디를 입력하세요" onChange={(e)=>setUserId(e.target.value)} /> <br /> // 기존아이디를 입력으로 받고 있어서 보안에 취약함 (그래서 삭제) */}

            닉네임 : <input value={nickname} placeholder="변경할 닉네임을 입력하세요" onChange={(e)=>setNickname(e.target.value)} /> <br />

            {/* 새아이디 : <input value={newUserId} placeholder="새아이디를 입력하세요" onChange={(e)=>setNewUserId(e.target.value)} /> <br /> // 요즘은 보안 및 계정 도용 방지 또는 시스템 안정성 및 데이터 무결성 등등의 목적으로 아이디 변경을 막아둠 */} 
            
            
             비밀번호 : <input type="password" value={pw} placeholder="변경할 password를 입력하세요" onChange={(e)=>setPw(e.target.value)} /> <br />
            
             생년월일 :   <input type="date" value={dob} onChange={(e)=>setDob(e.target.value)}/> <br />
                                                           
             이름 : <input value={name} placeholder="성함을 입력하세요"onChange={(e)=>setName(e.target.value)} /> <br />
                
             성별 : 남성 <input type="radio" name="gender" value="M" onChange={(e)=>setGender(e.target.value)} /> <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 여성 <input type="radio" name="gender" value="F" onChange={(e)=>setGender(e.target.value)} /> <br />
                      
             전화번호 : <input type="tel" value={phone} pattern="010-[0-9]{4}-[0-9]{4}" placeholder="010-1234-5678" onChange={(e) => setPhone(e.target.value)} /> <br />

             <button onClick={updateUsers}>회원정보 수정</button>


            </div>



);


    
    

}
    export default EditUser