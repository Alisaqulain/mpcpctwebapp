"use client";
import React, { useState, useEffect } from "react";

export default function ExamInstructions() {
  const [language, setLanguage] = useState("हिन्दी");
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    // Retrieve exam login data from localStorage
    const storedData = localStorage.getItem('examLoginData');
    if (storedData) {
      try {
        setExamData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing exam data:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white-100 text-black flex flex-col">
      {/* Header */}
      <div className="bg-[#290c52] text-white flex justify-between items-center px-6 py-4 w-full">
        <h1 className="text-lg md:text-xl font-semibold">
          T&C and Exam Instruction - Mpcpctmaster.com
        </h1>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block">View in :</span>
          <select
            className="bg-white text-black px-2 py-1 rounded text-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>हिन्दी</option>
            <option>English</option>
          </select>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col lg:flex-row h-full">
        {/* Main Content */}
        <div className="w-full lg:w-[85%] px-6 py-4 overflow-y-auto h-[50%]">
          <div className="max-h-[45vh] overflow-y-auto pr-2">
            <div className="space-y-2 text-sm md:text-[13px] leading-relaxed">
              <p className="text-center text-[20px]"> कृपया परीक्षा के निर्देशों को ध्यान से पढ़ें
              </p>
              <p className="mt-5 text-[15px] font-semibold"> सामान्य निर्देश:

              </p>
              <p className="mt-8"><span className="text-white bg-gray-500 border py-1 md:py-2 px-3 md:px-4">1</span>  आपने अभी तक यह प्रश्न नहीं देखा है।
 </p>
             
              <p className="mt-8"><span className="text-white bg-orange-600 border py-1 md:py-2 px-3 md:px-4">2</span>      आपने इस प्रश्न के लिए कोई उत्तर नहीं चुना है।

 </p>
             
              <p className="mt-8"><span className="text-white bg-green-500 border py-1 md:py-2 px-3 md:px-4">3</span>  आपने इस प्रश्न के लिए उत्तर चुन लिया है।

 </p>
             
              <p className="mt-8"><span className="text-white bg-[#4c2483] border py-1 md:py-2 px-3 md:px-4">4</span>      आपने इस प्रश्न का उत्तर नहीं दिया है, पर इसे समीक्षा के लिए रखा है।

 </p>
             
              <p className="mt-8"><span className="text-white bg-[#4c2483] border py-1 md:py-2 px-3 md:px-4">5
                {/* <span className="absolute text-green-500">✔️</span> */}
</span>    "उत्तर दिया गया और समीक्षा के लिए चिह्नित" प्रश्नों पर मूल्यांकन हेतु विचार किया जाएगा।

 </p>
             
            </div>
<p className="mt-8 text-[12px] font-semibold">
   1. परीक्षा प्रश्नों की भाषा बदलने के लिए, अपने सेक्शन बार के ऊपरी दाएं कोने में "View in" ढूंढें और पूरी प्रश्न-पत्रिका की भाषा बदलने के लिए उस पर क्लिक करें।
</p>
            <h2 className="font-bold mt-6 text-base md:text-lg">प्रश्न पर नेविगेट करना:</h2>
            <p className="mt-4 text-[12px]">2.  किसी प्रश्न का उत्तर देने के लिए, निम्न कार्य करें:</p>
<p className="mt-4 text-[12px]">

      a.  किसी विशेष प्रश्न पर तुरंत पहुंचने के लिए, स्क्रीन के दाईं ओर प्रश्न पैलेट में उस प्रश्न की संख्या पर क्लिक करें। कृपया ध्यान दें कि ऐसा करने से आपके वर्तमान प्रश्न का उत्तर सुरक्षित नहीं होगा। <br/>
      b.  यदि आप अपना वर्तमान उत्तर सहेजना और अगले प्रश्न पर जाना चाहते हैं, तो "Save & Next" पर क्लिक करें। <br/>
       c.  यदि आप अपना वर्तमान उत्तर सहेजना चाहते हैं, इसे समीक्षा के लिए चिह्नित करना चाहते हैं, और अगले प्रश्न पर जाना चाहते हैं, तो "Mark for Review & Next" पर क्लिक करें।
</p>

            <h2 className="font-bold mt-6 text-base md:text-lg">प्रश्न का उत्तर देना:
</h2>
<p className="text-[12px] mt-4">  3. बहुविकल्पीय प्रश्न का उत्तर देने की प्रक्रिया:<br/></p>

       <p className="mt-4 text-[12px]">a. उत्तर चुनने के लिए, एक विकल्प का बटन दबाएं।<br/>
       b. यदि आप चुना हुआ उत्तर हटाना चाहते हैं, तो उसी बटन को फिर से दबाएं या "Clear Response" पर क्लिक करें।<br/>
      c.  दूसरा उत्तर चुनने के लिए, किसी और विकल्प का बटन दबाएं।<br/>
        d.उत्तर सहेजने के लिए, "Save & Next" बटन पर क्लिक करना ज़रूरी है।<br/>
       e. प्रश्न को समीक्षा के लिए चिह्नित करने के लिए, "Mark for Review & Next" बटन दबाएं।<br/>
</p>
   <p className="text-[12px] mt-3">4. यदि आप पहले से दिए गए किसी उत्तर को बदलना चाहते हैं, तो पहले उस प्रश्न पर वापस जाएं और फिर सामान्य तरीके से उसका उत्तर दें।</p>


            <h2 className="font-bold mt-6 text-base md:text-lg">अनुभागों के माध्यम से नेविगेट करना:
</h2>
<p className="text-[12px] mt-4">    5. स्क्रीन के शीर्ष बार पर इस प्रश्न पत्र के अनुभाग देखें। किसी अनुभाग के प्रश्न देखने के लिए उसके नाम पर क्लिक करें। आप जिस अनुभाग में हैं, वह हाइलाइट होगा।<br/>
    6. जब आप किसी अनुभाग के अंतिम प्रश्न पर "सहेजें और अगला" क्लिक करते हैं, तो आप अपने आप अगले अनुभाग के पहले प्रश्न पर चले जाएंगे।<br/>
    7. परीक्षा के समय में, आप अपनी इच्छानुसार अनुभागों और प्रश्नों के बीच घूम सकते हैं।
</p>

            <h2 className="font-bold mt-6 text-center md:text-lg">
कृपया आगे बढ़ने से पहले नीचे दी गई नियम और शर्तें अवश्य पढ़ें।
</h2>
<p className="text-[12px] mt-3"><span className="font-semibold"> परीक्षा की प्रामाणिकता का अस्वीकरण</span><br/>
    cpctmaster.com द्वारा प्रदान किए गए मॉक टेस्ट केवल सामान्य शैक्षिक उद्देश्यों के लिए डिज़ाइन किए गए हैं। हम यह दावा नहीं करते कि ये मॉक टेस्ट वास्तविक परीक्षाओं या आधिकारिक मॉक टेस्ट के समान हैं। वास्तविक परीक्षा की सामग्री या संरचना से कोई भी समानता केवल संयोग है।<br/>
<p className="font-semibold mt-3">जिम्मेदारी की सीमा</p><br/>
    cpctmaster.com प्रदान किए गए प्रश्नों या उत्तरों में किसी भी अशुद्धता या त्रुटि के लिए जिम्मेदार नहीं है। उपयोगकर्ताओं को सलाह दी जाती है कि वे अपनी विवेकाधिकार का उपयोग करें और सटीक जानकारी के लिए आधिकारिक संसाधनों से परामर्श करें। हम हमारे मॉक टेस्ट के उपयोग से उत्पन्न किसी भी हानि या क्षति के लिए जिम्मेदार नहीं हैं।<br/>
<p className="font-semibold mt-3">परिणामों की कोई गारंटी नहीं</p><br/>
    हमारे मॉक टेस्ट पर प्रदर्शन वास्तविक परीक्षाओं में समान परिणामों की गारंटी नहीं देता है। ये टेस्ट उपयोगकर्ताओं को सामान्य कंप्यूटर परीक्षा पैटर्न से परिचित कराने के लिए हैं और केवल परीक्षा की तैयारी के लिए उन पर निर्भर नहीं किया जाना चाहिए।<br/>
<p className="font-semibold mt-3">उपयोगकर्ता की जिम्मेदारी</p><br/>
    उपयोगकर्ता हमारे मॉक टेस्ट से प्राप्त जानकारी की सटीकता और प्रासंगिकता सुनिश्चित करने के लिए जिम्मेदार हैं। cpctmaster.com प्रदान की गई सामग्री की गलतफहमी या गलत व्याख्या के लिए कोई जिम्मेदारी नहीं लेता है।<br/>
<p className="font-semibold mt-3 ">नियमों और शर्तों की स्वीकृति</p><br/>
    हमारे मॉक टेस्ट का उपयोग करके, आप इन नियमों और शर्तों से सहमत होते हैं। यदि आप सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।
    <br/>
<p className="font-semibold mt-3">अधिक जानकारी के लिए</p><br/>
    अधिक विस्तृत नियमों और शर्तों के लिए, कृपया हमारी आधिकारिक वेबसाइट देखें।
</p>
          </div>

          {/* Language Selection */}
          <div className="mt-4 mb-2 border-t border-gray-300 pt-4 ">
            <label className="block mb-1 font-semibold text-sm">Choose Questions Language :-</label>
            <select 
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>हिन्दी</option>
              <option>English</option>
            </select>
          </div>

          {/* Checkbox Disclaimer */}
          <div className="text-xs md:text-sm mt-4">
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" defaultChecked />

              <span className="text-[13px]">
                <strong>घोषणा - mpcpctmaster.com :</strong> mpcpctmaster.com केवल सामान्य शैक्षिक उद्देश्यों के लिए मॉक टेस्ट प्रदान करता है और यह दावा नहीं करता कि ये वास्तविक परीक्षाओं की सामग्री या प्रारूप के समान हैं; कोई भी समानता केवल संयोग है। हम प्रश्नों या उत्तरों में अशुद्धताओं के लिए जिम्मेदार नहीं हैं, और इन परीक्षणों में प्रदर्शन वास्तविक परीक्षाओं में समान परिणामों की गारंटी नहीं देता है। इन्हें अपनी विवेकाधिकार पर उपयोग करें। हमारे मॉक टेस्ट का उपयोग करके, आप इन नियमों और शर्तों से सहमत होते हैं। यदि आप सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें। हमारे मॉक टेस्ट का उपयोग करके, आप हमारे नियमों और शर्तों से सहमत होते हैं। यदि आप सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें। अधिक जानकारी के लिए, कृपया हमारी विस्तृत <span className="text-blue-600">नियम और शर्तें </span>देखें।
              </span>
            </label>
          </div>

          {/* Start Test Button */}
          <div className="mt-6 text-center">
            <button 
              onClick={() => window.location.href = '/exam_mode'}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow cursor-pointer"
            >
              Start Test
            </button>
          </div>
        </div>

        {/* Right Side Profile */}
<div className="hidden lg:flex lg:w-[15%] border-l border-gray-300 flex-col items-center justify-start py-6 bg-white-100">
          <img
            src="/lo.jpg"
            alt="User"
            className="w-24 h-24 rounded-full border-2 border-gray-400"
          />
          <p className="mt-2 font-semibold text-blue-800">
            {examData?.name || "Anas"}
          </p>
          {examData && (
            <div className="text-xs text-center mt-1 text-gray-600">
              <p>{examData.mobile}</p>
              <p>{examData.city}</p>
            </div>
          )}
          <span className="border w-full border-black mt-2"></span>
        </div>
      </div>
    </div>
  );
}
