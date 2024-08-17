import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  const handleContactClick = () => {
    navigate('/contact'); // Điều hướng đến trang "Contact"
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Giới thiệu về chúng tôi</h1>
        <p className="text-gray-600 leading-relaxed text-lg mb-4">
        Chào mừng đến với trang web của chúng tôi! Chúng tôi đam mê cung cấp các dịch vụ tốt nhất cho khách hàng của chúng tôi
        . Nhóm của chúng tôi luôn tận tâm cung cấp các sản phẩm hàng đầu đáp ứng nhu cầu và sở thích của bạn.
        </p>
        <p className="text-gray-600 leading-relaxed text-lg mb-4">
        Sứ mệnh của chúng tôi là cung cấp các dịch vụ chất lượng cao giúp cuộc sống của bạn dễ dàng hơn. Chúng tôi đánh giá cao khách hàng
        trên hết là sự hài lòng và cố gắng vượt quá sự mong đợi của bạn sau mỗi lần tương tác.
        </p>
        <p className="text-gray-600 leading-relaxed text-lg mb-4">
        Cảm ơn bạn đã lựa chọn chúng tôi. Chúng tôi mong muốn được phục vụ bạn và xây dựng mối quan hệ lâu dài.
        </p>
        <div className="flex justify-center mt-8">
          <button 
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700"
            onClick={handleContactClick}
          >
            Liên hệ với chúng tôi
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
