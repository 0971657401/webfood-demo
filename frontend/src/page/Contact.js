import React from 'react';
import phone from "../assest/phone.png";
import location from "../assest/location.png";
import email from "../assest/email.jpg";
import pic01 from "../assest/p1.png";
import pic02 from "../assest/food.png";
import pic03 from "../assest/p2.png";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Liên hệ với chúng tôi</h1>
        <p className="text-gray-600 leading-relaxed text-lg mb-6 text-center">
        Chúng tôi rất muốn nghe ý kiến ​​từ bạn! Vui lòng liên hệ với bất kỳ câu hỏi, nhận xét hoặc phản hồi nào.
        </p>
        <div className="flex flex-col md:flex-row justify-around items-center mb-6">
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <img src= {phone} alt="Phone" className="w-24 h-24 mb-2"/>
            <p className="text-lg font-semibold text-gray-700">Số điện thoại</p>
            <p className="text-gray-600">0971657401</p>
          </div>
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <img src= {email} alt="Email" className="w-24 h-24 mb-2"/>
            <p className="text-lg font-semibold text-gray-700">Email</p>
            <p className="text-gray-600">phannguyenthevinh0301@gmail.com</p>
          </div>
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <img src= {location} alt="Location" className="w-24 h-24 mb-2"/>
            <p className="text-lg font-semibold text-gray-700">Địa chỉ</p>
            <p className="text-gray-600">82/36, Thủ Đức, Hồ Chí Minh</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <img src={pic01} alt="Scenic View" className="w-full h-48 object-cover rounded-lg shadow-md"/>
          <img src={pic02} alt="Office" className="w-full h-48 object-cover rounded-lg shadow-md"/>
          <img src={pic03} alt="Team" className="w-full h-48 object-cover rounded-lg shadow-md"/>
        </div>
      </div>
    </div>
  );
};

export default Contact;
