import { useState } from "react";
function Product() {
    const [pName, setpName] = useState("")
    const [pPrice, setpPrice] = useState("")
    const [description, setdescription] = useState("")
    const [stock, setStock] = useState("")
    const [image, setImage] = useState(null);  // 이미지 파일 상태 추가

    function saveProduct() {

        // 필수값 체크
        if (!pName.trim() || !pPrice.trim()) {
            alert("상품명, 가격은 필수 입력입니다")
            return;
        }

        // 숫자 체크
        if (isNaN(pPrice.trim())) {
            alert ("가격은 숫자로 입력해주세요");
            return;
        }

        if (stock && isNaN(stock.trim())) { // 재고값은 비워도 되니까 stock을 빈값 허용 해줌
            alert ("재고는 숫자로 입력해주세요")
            return;
        }

        // FomData 준비
         const formData = new FormData();
        formData.append("pName", pName.trim());
        formData.append("pPrice", pPrice.trim());
        formData.append("description", description.trim() || "");
        formData.append("stock", stock.trim() || 0);
        if(image){formData.append("image", image); // 이미지 파일 추가
        }


        // 서버로 전송
        fetch("http://localhost:8080/dbprod", {
            method: "POST",
            
            body: formData, // body를 formData로 설정
        })
            .then(res => res.json())
            .then(data => {
                console.log("상품등록", data);
                setpName("");
                setpPrice("");
                setdescription("");
                setStock("");
                setImage(null);
            })
            .catch(err => console.error("상품등록 에러:", err));
    }


    return (
        <>
            <p>상품등록창</p>
            <div className="pimg">
                {/* 선택한 이미지 미리보기 */}
                {image && (
                 <img src={URL.createObjectURL(image)} alt="상품 이미지" width={200} />
                )}
               
                <div>

                    <p>이미지 없로드:
                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    </p>


                    <p>이름: <input value={pName} onChange={(e) => setpName(e.target.value)} /></p>
                    <p>가격: <input value={pPrice} onChange={(e) => setpPrice(e.target.value)} /></p>
                    <p>설명:<input value={description} onChange={(e) => setdescription(e.target.value)} /></p>
                    <p>재고:<input value={stock} onChange={(e) => setStock(e.target.value)} /></p>
                </div>
                <button onClick={saveProduct}>상품저장</button>
            </div>
        </>
    )
}

export default Product;