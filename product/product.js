import { useState } from 'react';

export default function ProductSearch() {
  const [code, setCode] = useState(''); // 入力された商品コード
  const [productName, setProductName] = useState(''); // 結果の商品名
  const [error, setError] = useState(''); // エラーメッセージ

  // 商品検索関数
  const fetchProduct = async () => {
    try {
      setError(''); // エラー状態をリセット
      setProductName(''); // 結果をリセット

      const response = await fetch(`http://localhost:8000/product/${code}`); // FastAPIのURL
      if (!response.ok) {
        throw new Error('商品が見つかりませんでした。');
      }

      const data = await response.json();
      setProductName(data.name); // 商品名を設定
    } catch (err) {
      setError(err.message); // エラーメッセージを設定
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>商品検索</h1>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="code">商品コード:</label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="商品コードを入力"
          style={{
            marginLeft: '10px',
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <button
        onClick={fetchProduct}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        検索
      </button>

      {/* 結果表示 */}
      {productName && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h3>商品名:</h3>
          <p>{productName}</p>
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h3>エラー:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
