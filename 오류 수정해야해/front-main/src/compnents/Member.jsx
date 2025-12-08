import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Regist() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [dob, setDob] = useState("");
    const [name, setName] = useState("");
    const [gender,setGender] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [phone, setPhone] = useState("");
    const [nickname, setNickname] = useState("");

    //생년월일 핸들러
    const handleYearChange = (e) => setYear(e.target.value);
    const handleMonthChange = (e) => setMonth(e.target.value);
    const handleDayChange = (e) => setDay(e.target.value);
    
    


    function regist() {
        
        // 회원가입 기입란 공백 유효성 검사

    if (!nickname) return alert("닉네임을 기입해주세요");
    if (!id) return alert("아이디를 기입해주세요");
    if (!pw) return alert("비밀번호를 기입해주세요");

    if (!year)
    return alert("태어난 연도를 기입해주세요");

    if (!month)
    return alert("태어난 월을 기입해주세요");

    if (!day)
    return alert("태어난 날을 기입해주세요");

    if (!name) return alert("성함을 기입해주세요");
    if (!gender) return alert("성별을 선택해주세요");
    if (!phone) return alert("전화번호를 기입해주세요");



        // YYYY-MM-DD 형식으로 합치기
    const dob = `${year.padStart(4,'0')}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`; 

        fetch("http://localhost:8080/member",{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:id,
                pw:pw,
                dob:dob,
                name:name,
                gender:gender,
                phone:phone,
                nickname:nickname
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.result) {
                alert("회원가입 완료")
                navigate('/')
            }
            else {
                alert("이미 존재하는 아이디입니다")
            }
        })
    }

    return (
        <div>
            <h1>회원가입 페이지</h1>

            닉네임 : <input placeholder="닉네임을 입력하세요" onChange={(e)=>setNickname(e.target.value)} />
            <br /> 

             아이디 : <input placeholder="아이디를 입력하세요" onChange={(e)=>setId(e.target.value)} />
            <br />

             비밀번호 : <input placeholder='password를 입력하세요' onChange={(e)=>setPw(e.target.value)} />
            <br />

             생년월일 :   <input type="text" placeholder="YYYY" maxLength="4" value={year} onChange={handleYearChange}/> 
                         <input type="text" placeholder="MM" maxLength="2" value={month} onChange={handleMonthChange}/>
                         <input type="text" placeholder="DD" maxLength="2" value={day} onChange={handleDayChange}/>
                       
            <br />

             이름 : <input placeholder="성함을 입력하세요"onChange={(e)=>setName(e.target.value)} />
                
            <br />

             성별 : 남성 <input type="radio" name="gender" value="M" onChange={(e)=>setGender(e.target.value)} />
                    여성 <input type="radio" name="gender" value="F" onChange={(e)=>setGender(e.target.value)} />
           
            <br />
             전화번호 : <input type="tel" pattern="010-[0-9]{4}-[0-9]{4}" placeholder="010-1234-5678" onChange={(e) => setPhone(e.target.value)} />

             <br />

            <button onClick={regist}>회원가입</button>


        </div>
    )
}

export default Regist