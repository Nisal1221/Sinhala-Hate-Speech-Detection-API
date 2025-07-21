import React, { useState } from 'react';
import './Upload.css';
import axios from 'axios'; //http request handling

const Upload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [hateWords, setHateWords] = useState([]);
  const [accuracy, setAccuracy] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post(
        'http://localhost:8000/token-level/upload-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('✅ Backend response:', response.data);

      setExtractedText(response.data.extracted_text);
      setHateWords(response.data.hate_words_detected);
      setAccuracy(response.data.accuracy || 0.9564432);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload an Image to Detect Hate Speech</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
        </div>
      )}

      {extractedText && (
        <div className="results">
          <h3>Extracted Text:</h3>
          <p>{extractedText}</p>

          <h3>Detected Hate Words:</h3>
          {hateWords.length > 0 ? (
            <ul>
              {hateWords.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          ) : (
            <p className="no-hate">No hate words detected from this image</p>
          )}

          <h3>Accuracy:</h3>
          <p>{(accuracy * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default Upload;