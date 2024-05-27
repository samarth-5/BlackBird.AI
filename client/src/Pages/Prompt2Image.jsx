import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaDownload } from 'react-icons/fa';

export default function Prompt2Image() {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState('');
  const [hover, setHover] = useState(false);
  const [downloadHover, setDownloadHover] = useState(false); // New state to track download button hover

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.prompt) {
      return toast.error('Enter the prompt!');
    }
    const req = { prompt: formData.prompt, aspect_ratio: '1:1' };
    setFormData({prompt:''});
    const res = await sendImageRequest(req);        
    if (res.status === 403) 
    return toast.error('Credit limit exceeded!');
    setImage(res.data[0].asset_url);
  };

  const sendImageRequest = async (req) => {
    try {
      const res = await fetch('/api/image/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (!res.ok) return toast.error('Try some custom input!');
      const data = await res.json();
      return data;
    } catch (err) {
      return toast.error(err);
    }
  };

  const handleDownload = () => {
    console.log(image);
    fetch(image, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'image.jpeg';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error('Image download error:', error));
  };

  return (
    <section className="flex flex-col items-center">
      <div>
        <h3 className="p-5 text-[40px] hover:text-[#00ff31] text-bold mt-2">MODEL - PREDATOR.ai v-4.2</h3>
      </div>
      <div className="w-2/4 rounded-3xl outline outline-slate-600 hover:outline-[#00ff31] m-3">
        <form className="flex" onSubmit={handleSubmit}>
          <input
            placeholder="Enter the prompt..."
            type="text"
            className="text-[#00ff31] w-full p-3 rounded-xl outline-none"
            id="prompt"
            required
            value={formData.prompt}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
          />
          <button type="submit" className="w-30 text-[#00ff31] text-lg outline rounded-full px-3 py-1 m-2 hover:text-black hover:bg-[#00ff31]">
            Generate
          </button>
        </form>
      </div>
      <div
        className="flex justify-center items-center w-[500px] h-[500px] rounded-3xl outline outline-slate-600 hover:outline-[#00ff31] m-3"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {image ? (
          <>
            <img src={image} className={`rounded-3xl ${downloadHover ? 'opacity-50' : 'hover:opacity-50'}`} />
            {hover && (
              <button
                onMouseEnter={() => setDownloadHover(true)}
                onMouseLeave={() => setDownloadHover(false)}
                onClick={handleDownload}
                className="flex items-center absolute text-[#00ff31] text-lg outline rounded-full p-2 px-5 pb-1 hover:text-black hover:bg-[#00ff31] opacity-100"
              >
                Download <FaDownload className="mb-1 ml-2" />
              </button>
            )}
          </>
        ) : (
          <div className="w-[200px] h-[200px]">
            <h3 className="text-xl text-slate-400 text-center">"Every image starts as an idea. With the right prompt, we can paint the canvas of our imagination."</h3>
          </div>
        )}
      </div>
    </section>
  );
}
