const express = require('express');
const cors = require('cors');
const pool = require('./db');
const multer = require('multer');
const path = require('path');
const app = express();
app.use(cors({
    origin: "http://localhost:5173", // 프론트 주소 제대로
    credentials: true // 쿠키 허용
}));  
app.use(express.json());


//----------------------------------------------상품등록--------------------------------------------------------------


// 파일 저장 경로 설정

const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); //uploads 폴더가 프로젝트 루트에 있어야 됨
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // 파일명 중복 방지
    }
});

const upload = multer({ storage });


//리뷰db
app.get('/dbrew',async(req,res) => {
    const pr = await pool.query('SELECT * FROM `review`')
    res.send(pr);
})
//상품db
app.get('/dbprod',async(req,res) => {
    
    const pp = await pool.query('SELECT * FROM `products`')
    res.send(pp);
})

//----------------------------상품등록--------------------------------------


//상품등록창 db 불러오게 함
app.post('/dbprod', upload.single('image'), async(req,res)=> {
    const pId = 'p' + Date.now();
    const { pName, pPrice, description, stock } = req.body; // req.body 내용들 선언 및 등록

    // 필수 값 체크

    if (!pName || !pPrice) {
        return res.status(400).json({ message: "상품명과 가격을 적어주세요" });

    }

    try{
        // pPrice와 stock을 숫자로 변환

        const price = parseInt(pPrice);
        const stockNum = parseInt(stock) || 0;

        // 이미지 파일 경로 처리
        let imgPath = null;
        if (req.file) {
            imgPath = '/uploads' + req.file.filename; // DB에 저장할 경로
        }

    await pool.query(
        'INSERT INTO products(pId, pName,pPrice,description,stock,img) VALUES(?,?,?,?,?,?)',
        [pId, pName, price, description || '', stockNum, imgPath]
    );

    res.json({message: "상품등록 완료", pId});
} catch (err) {
    console.error("상품 등록 에러:", err);
    res.status(500).json({message:"서버 에러", error: err.message});
}
});

// //새상품db
// app.get('/pnew',async(req,res) => {
//     const pn = await pool.query('SELECT * FROM `pnew`')
//     res.send(pn);
// })


// 나중에 만든 것들 합칠 거라서
// app.post('/', async (req, res) 이거 스킵 하고 
// app.post('/regist', async (req, res)
// app.post('/login', async (req,res) 
//  바로 얘네로 가는 걸로 만듦 

//--------------------------------------------- 이 밑으로 내가 맡은 로그인 --------------------------------------------------------------------

// 여기 회원가입창
app.post('/member', async (req, res) => {
    const { id, pw, nickname, dob, name, gender, phone } = req.body;

    try {
        // 아이디 중복 있는지 확인
        const rows = await pool.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );
        if (rows.length > 0) {
            return res.json({ result : false}); // 아이디 중복됨
        }

        // 회원 추가
        await pool.query(
            'INSERT INTO users(id, pw, nickname, dob, name, gender, phone) VALUES(?,?,?,?,?,?,?)',
            [id,pw,nickname,dob,name,gender,phone]
        );

        res.json({ result : true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ result : false, error: '서버 오류' });
    }
});

// // 여기 로그인창
// app.post('/login', async (req,res) => {
//     const {id, pw} = req.body;
// try{
//     const rows = await pool.query(
//         'SELECT * FROM users WHERE id = ? AND pw = ?',
//         [id, pw]
//     );

//     if (rows.length > 0) {
//         const users = rows[0];
//         res.json({ result : true, name: users.name });
//     }
//     else {
//         res.json({ result : false });
//     }
// } 
//     catch (err) {
//         console.error(err);
//         res.status(500).json({ result : false, error: '서버 오류' });
//     }

// });


//-----(여기 로그인 세션 방식으로 바꿈)----

//여기는 세션 설정
const session = require('express-session');
const { error } = require('console');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // 지금 개발 환경에서는 false 나중에 정식적으로 배포할 (https) 때는 true로 바꿔줘야 함
}));

// 여기부터 로그인
app.post('/login', async (req,res) => {
    const { id, pw } = req.body;
    try {
        const rows = await pool.query (
            'SELECT * FROM users WHERE id = ? AND pw = ?',
            [id, pw]
        );
        
        if (rows. length > 0) {
            const user = rows[0];
            req.session.user = {
                id: user.id,
                nickname: user.nickname,
                name: user.name,
                gender: user.gender,
                phone: user.phone
            };
            res.json({ result: true });
        } else {
            res.json({ result: false, message: "아이디 또는 비밀번호가 일치하지 않습니다" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: false, error: "서버 오류" });
    }
});


// 여기부터 인증 필요 알림 페이지
app.get('/mainpage', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ result: false, message: "로그인이 필요합니다" });
    }
    res.json({ result: true, user: req.session.user });
});


// 여기부터 로그아웃 
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ result: false, message: "로그아웃에 실패했습니다"  });
        }
        res.clearCookie('connect.sid');
        res.json({ result: true, messag: "로그아웃 완료" });
    });
});


// 수정하는 거
app.put('/edit',async (req,res) => {
    const {
        old_user_id, // 기존에 있던 id
        new_user_id, // 새로 바꿀 id
        user_pw,
        user_nickname,
        user_name,
        user_gender,
        user_dob,
        user_phone
    } = req.body

    // 새 id와 기존 id의 중복 체크

    if (old_user_id !== new_user_id) {
        const rows = await pool.query(
            'SELECT * FROM users WHERE id = ?',
            [new_user_id]
        );
        if (rows.length > 0) {
            return res.json({ result: false, message: "새 ID가 이미 존재합니다."});

        }
    }

    // 정보 업데이트

    await pool.query('UPDATE users SET id=?, pw=?, nickname=?, dob=?, name=?, gender=?, phone=? WHERE id=?',
        [new_user_id, user_pw, user_nickname, user_dob, user_name, user_gender, user_phone , old_user_id]
    );
    res.send({"result":true});
});

// 삭제하는 거
app.delete('/delete', async (req, res) => {
    const user_id = req.body.user_id;

    await pool.query(
        'DELETE FROM users WHERE id = ?',
        [user_id]
    );

    res.send({ "result": true });
});





app.listen(8080, () => {
    console.log("start 8080!");
});