import { useState } from 'react';

export default function Home() {

  //1.GETリクエストを送信
  const [getResponse, setGetResponse] = useState('');

  const handleGetRequest = async () => {
    //const res = await fetch('http://localhost:8000/', {
    const res = await fetch('https://tech0-gen8-step4-pos-app-46.azurewebsites.net/', {
      method: 'GET',
    });
    const data = await res.json();

    // GETリクエストの結果をコンソールに表示
    console.log("GETリクエストの結果:", data.message);

    setGetResponse(data.message);
  };

  //2.GETリクエストを送信してデータを受信
  const [getResponse2, setGetResponse2] = useState('');

  const handleGetRequest2 = async () => {
    //const res = await fetch('http://localhost:8000/data', {
    const res = await fetch('https://tech0-gen8-step4-pos-app-46.azurewebsites.net/data', {
        method: 'GET',
    });
    const data = await res.json();

    // GETリクエストの結果をコンソールに表示
    console.log("GETリクエストの結果:", data);

    setGetResponse2(data);
  };

  //3. IDを指定してGETリクエストを送信
  const [id, setId] = useState('');
  const [idResponse, setIdResponse] = useState('');

  const handleIdRequest = async (e) => {
    e.preventDefault();

    //const res = await fetch(`http://localhost:8000/api/multiply/${id}`, {
    const res = await fetch(`https://tech0-gen8-step4-pos-app-46.azurewebsites.net/api/multiply/${id}`, {
        //const res = await fetch(`http://localhost:8000/product/${id}`, {
      method: 'GET',
    });
    const data = await res.json();

    // IDリクエストの結果をコンソールに表示
    console.log("IDリクエストの結果:", data.doubled_value);

    setIdResponse(data.doubled_value);
  };

  //4. CODEを指定してGETリクエストを送信
  const [code, setCode] = useState('');
  const [codeResponse, setCodeResponse] = useState('');

  const handleCodeRequest = async (e) => {
    e.preventDefault();

    //const res = await fetch(`http://localhost:8000/product/${code}`, {
    const res = await fetch(`https://tech0-gen8-step4-pos-app-46.azurewebsites.net/product/${code}`, {
      method: 'GET',
    });
    const data = await res.json();

    // IDリクエストの結果をコンソールに表示
    console.log("IDリクエストの結果:", data);

    setCodeResponse(data);
  };


  //POSTリクエストを送信
  const [input, setInput] = useState('');
  const [postResponse, setPostResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    //入力されたデータをコンソールに表示
    console.log("入力情報:", input);

    //const res = await fetch('http://localhost:8000/api/echo', {
    const res = await fetch('https://tech0-gen8-step4-pos-app-46.azurewebsites.net/api/echo', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "message":input }),

    });
    console.log(JSON.stringify({ "message":input }));
    const data = await res.json();

    //バックエンドからのレスポンスをコンソールに表示
    console.log("Backendからのお返事:", data.message);

    setPostResponse(data.message);
  };


  return (
    <div>

      <h1>POSアプリ(Test)</h1>

      <h2>1. GETリクエストを送信</h2>
      <button onClick={handleGetRequest}>
        GETリクエストを送信
      </button>
      {getResponse && <p>サーバーからのGET応答: {getResponse}</p>}

      <h2>2. GETリクエストを送信</h2>
      <button onClick={handleGetRequest2}>GETリクエストを送信</button>

      {/* データが存在する場合に表示 */}
      {getResponse2 && (
        <div>
          <h3>サーバーからのGET応答:</h3>
          <p>ID: {getResponse2.id}</p>
          <p>名前: {getResponse2.name}</p>
          <p>年齢: {getResponse2.age}</p>
        </div>
      )}

      <h2>3. IDを指定してGETリクエストを送信</h2>
      <form onSubmit={handleIdRequest}>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="IDを入力してください"
        />
        <button type="submit">送信</button>
      </form>
      {idResponse && <p>Flaskからの応答: {idResponse}</p>}

      <h2>4. CODEを指定してGETリクエストを送信</h2>
      <form onSubmit={handleCodeRequest}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="商品コードを入力してください"
        />
        <button type="submit">送信</button>
      </form>
      {/*codeResponse && <p>Flaskからの応答: {codeResponse}</p>*/}

      {/* レスポンスデータを表示 */}
      {codeResponse && (
        <div>
          <p>コード: {codeResponse.code}</p>
          <p>名前: {codeResponse.name}</p>
        </div>
      )}


      <h2>POSTリクエストを送信</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="テキストを入力してください"
        />

        <button type="submit">送信</button>
      </form>
      {postResponse && <p>FlaskからのPOST応答: {postResponse}</p>}

    </div>
  );
}
