"use client";
import React, { useState, useEffect } from "react";

// Content for both languages
const content = {
  hindi: {
    title: "कृपया परीक्षा के निर्देशों को ध्यान से पढ़ें",
    generalInstructions: "सामान्य निर्देश:",
    instructions: [
      "आपने अभी तक यह प्रश्न नहीं देखा है।",
      "आपने इस प्रश्न के लिए कोई उत्तर नहीं चुना है।",
      "आपने इस प्रश्न के लिए उत्तर चुन लिया है।",
      "आपने इस प्रश्न का उत्तर नहीं दिया है, पर इसे समीक्षा के लिए रखा है।",
      '"उत्तर दिया गया और समीक्षा के लिए चिह्नित" प्रश्नों पर मूल्यांकन हेतु विचार किया जाएगा।',
    ],
    languageChangeInstruction:
      "परीक्षा प्रश्नों की भाषा बदलने के लिए, अपने सेक्शन बार के ऊपरी दाएं कोने में 'View in' ढूंढें और पूरी प्रश्न-पत्रिका की भाषा बदलने के लिए उस पर क्लिक करें।",
    navigateQuestions: "प्रश्न पर नेविगेट करना:", 
    navigateInstructions: [
      "किसी विशेष प्रश्न पर तुरंत पहुंचने के लिए, स्क्रीन के दाईं ओर प्रश्न पैलेट में उस प्रश्न की संख्या पर क्लिक करें। कृपया ध्यान दें कि ऐसा करने से आपके वर्तमान प्रश्न का उत्तर सुरक्षित नहीं होगा।",
      'यदि आप अपना वर्तमान उत्तर सहेजना और अगले प्रश्न पर जाना चाहते हैं, तो "Save & Next" पर क्लिक करें।',
      'यदि आप अपना वर्तमान उत्तर सहेजना चाहते हैं, इसे समीक्षा के लिए चिह्नित करना चाहते हैं, और अगले प्रश्न पर जाना चाहते हैं, तो "Mark for Review & Next" पर क्लिक करें।',
    ],
    answerQuestions: "प्रश्न का उत्तर देना:",
    answerInstructions: [
      "उत्तर चुनने के लिए, एक विकल्प का बटन दबाएं।",
      'यदि आप चुना हुआ उत्तर हटाना चाहते हैं, तो उसी बटन को फिर से दबाएं या "Clear Response" पर क्लिक करें।',
      "दूसरा उत्तर चुनने के लिए, किसी और विकल्प का बटन दबाएं।",
      'उत्तर सहेजने के लिए, "Save & Next" बटन पर क्लिक करना ज़रूरी है।',
      'प्रश्न को समीक्षा के लिए चिह्नित करने के लिए, "Mark for Review & Next" बटन दबाएं।',
    ],
    changeAnswer: "यदि आप पहले से दिए गए किसी उत्तर को बदलना चाहते हैं, तो पहले उस प्रश्न पर वापस जाएं और फिर सामान्य तरीके से उसका उत्तर दें।",
    navigateSections: "अनुभागों के माध्यम से नेविगेट करना:",
    sectionInstructions: [
      "स्क्रीन के शीर्ष बार पर इस प्रश्न पत्र के अनुभाग देखें। किसी अनुभाग के प्रश्न देखने के लिए उसके नाम पर क्लिक करें। आप जिस अनुभाग में हैं, वह हाइलाइट होगा।",
      'जब आप किसी अनुभाग के अंतिम प्रश्न पर "सहेजें और अगला" क्लिक करते हैं, तो आप अपने आप अगले अनुभाग के पहले प्रश्न पर चले जाएंगे।',
      "परीक्षा के समय में, आप अपनी इच्छानुसार अनुभागों और प्रश्नों के बीच घूम सकते हैं।",
    ],
    termsTitle: "कृपया आगे बढ़ने से पहले नीचे दी गई नियम और शर्तें अवश्य पढ़ें।",
    terms: {
      disclaimer: "परीक्षा की प्रामाणिकता का अस्वीकरण",
      disclaimerText:
        "cpctmaster.com द्वारा प्रदान किए गए मॉक टेस्ट केवल सामान्य शैक्षिक उद्देश्यों के लिए डिज़ाइन किए गए हैं। हम यह दावा नहीं करते कि ये मॉक टेस्ट वास्तविक परीक्षाओं या आधिकारिक मॉक टेस्ट के समान हैं। वास्तविक परीक्षा की सामग्री या संरचना से कोई भी समानता केवल संयोग है।",
      responsibility: "जिम्मेदारी की सीमा",
      responsibilityText:
        "cpctmaster.com प्रदान किए गए प्रश्नों या उत्तरों में किसी भी अशुद्धता या त्रुटि के लिए जिम्मेदार नहीं है। उपयोगकर्ताओं को सलाह दी जाती है कि वे अपनी विवेकाधिकार का उपयोग करें और सटीक जानकारी के लिए आधिकारिक संसाधनों से परामर्श करें। हम हमारे मॉक टेस्ट के उपयोग से उत्पन्न किसी भी हानि या क्षति के लिए जिम्मेदार नहीं हैं।",
      noGuarantee: "परिणामों की कोई गारंटी नहीं",
      noGuaranteeText:
        "हमारे मॉक टेस्ट पर प्रदर्शन वास्तविक परीक्षाओं में समान परिणामों की गारंटी नहीं देता है। ये टेस्ट उपयोगकर्ताओं को सामान्य कंप्यूटर परीक्षा पैटर्न से परिचित कराने के लिए हैं और केवल परीक्षा की तैयारी के लिए उन पर निर्भर नहीं किया जाना चाहिए।",
      userResponsibility: "उपयोगकर्ता की जिम्मेदारी",
      userResponsibilityText:
        "उपयोगकर्ता हमारे मॉक टेस्ट से प्राप्त जानकारी की सटीकता और प्रासंगिकता सुनिश्चित करने के लिए जिम्मेदार हैं। cpctmaster.com प्रदान की गई सामग्री की गलतफहमी या गलत व्याख्या के लिए कोई जिम्मेदारी नहीं लेता है।",
      termsAcceptance: "नियमों और शर्तों की स्वीकृति",
      termsAcceptanceText:
        "हमारे मॉक टेस्ट का उपयोग करके, आप इन नियमों और शर्तों से सहमत होते हैं। यदि आप सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।",
      moreInfo: "अधिक जानकारी के लिए",
      moreInfoText: "अधिक विस्तृत नियमों और शर्तों के लिए, कृपया हमारी आधिकारिक वेबसाइट देखें।",
    },
    declaration: "घोषणा - mpcpctmaster.com",
    declarationText:
      "mpcpctmaster.com केवल सामान्य शैक्षिक उद्देश्यों के लिए मॉक टेस्ट प्रदान करता है और यह दावा नहीं करता कि ये वास्तविक परीक्षाओं की सामग्री या प्रारूप के समान हैं; कोई भी समानता केवल संयोग है। हम प्रश्नों या उत्तरों में अशुद्धताओं के लिए जिम्मेदार नहीं हैं, और इन परीक्षणों में प्रदर्शन वास्तविक परीक्षाओं में समान परिणामों की गारंटी नहीं देता है। इन्हें अपनी विवेकाधिकार पर उपयोग करें। हमारे मॉक टेस्ट का उपयोग करके, आप इन नियमों और शर्तों से सहमत होते हैं। यदि आप सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें। अधिक जानकारी के लिए, कृपया हमारी विस्तृत <span class='text-blue-600'>नियम और शर्तें</span> देखें।",
  },
  english: {
    title: "Please read the exam instructions carefully",
    generalInstructions: "General Instructions:",
    instructions: [
      "You have not yet viewed this question.",
      "You have not selected any answer for this question.",
      "You have selected an answer for this question.",
      "You have not answered this question but marked it for review.",
      '"Answered and marked for review" questions will be considered for evaluation.',
    ],
    languageChangeInstruction:
      "To change the language of the exam questions, find 'View in' at the top right corner of your section bar and click it to change the language of the entire question paper.",
    navigateQuestions: "Navigating Questions:",
    navigateInstructions: [
      "To directly access a specific question, click on the question number in the question palette on the right side of the screen. Please note that doing so will not save the answer to your current question.",
      'To save your current answer and proceed to the next question, click "Save & Next".',
      'To save your current answer, mark it for review, and proceed to the next question, click "Mark for Review & Next".',
    ],
    answerQuestions: "Answering Questions:",
    answerInstructions: [
      "To select an answer, click the button of one of the options.",
      'To deselect your chosen answer, click the same button again or click "Clear Response".',
      "To select a different answer, click the button of another option.",
      'To save your answer, you must click the "Save & Next" button.',
      'To mark a question for review, click the "Mark for Review & Next" button.',
    ],
    changeAnswer: "If you wish to change a previously answered question, go back to that question and answer it normally.",
    navigateSections: "Navigating Through Sections:",
    sectionInstructions: [
      "View the sections of this question paper on the top bar of the screen. Click on a section name to view its questions. The section you are currently in will be highlighted.",
      'When you click "Save & Next" on the last question of a section, you will automatically move to the first question of the next section.',
      "During the exam time, you can move between sections and questions as per your preference.",
    ],
    termsTitle: "Please read the Terms and Conditions below before proceeding.",
    terms: {
      disclaimer: "Exam Authenticity Disclaimer",
      disclaimerText:
        "Mock tests provided by cpctmaster.com are designed for general educational purposes only. We do not claim that these mock tests are identical to actual exams or official mock tests. Any similarity to the content or structure of actual exams is purely coincidental.",
      responsibility: "Limitation of Liability",
      responsibilityText:
        "cpctmaster.com is not responsible for any inaccuracies or errors in the questions or answers provided. Users are advised to use their discretion and consult official resources for accurate information. We are not liable for any loss or damage arising from the use of our mock tests.",
      noGuarantee: "No Guarantee of Results",
      noGuaranteeText:
        "Performance on our mock tests does not guarantee similar results in actual exams. These tests are intended to familiarize users with general computer exam patterns and should not be solely relied upon for exam preparation.",
      userResponsibility: "User Responsibility",
      userResponsibilityText:
        "Users are responsible for ensuring the accuracy and relevance of information obtained from our mock tests. cpctmaster.com takes no responsibility for misinterpretation or misunderstanding of the provided content.",
      termsAcceptance: "Acceptance of Terms and Conditions",
      termsAcceptanceText:
        "By using our mock tests, you agree to these terms and conditions. If you do not agree, please do not use our services.",
      moreInfo: "For More Information",
      moreInfoText: "For detailed terms and conditions, please visit our official website.",
    },
    declaration: "Declaration - mpcpctmaster.com",
    declarationText:
      "mpcpctmaster.com provides mock tests for general educational purposes only and does not claim that these are identical to the content or format of actual exams; any similarity is coincidental. We are not responsible for inaccuracies in questions or answers, and performance on these tests does not guarantee similar results in actual exams. Use them at your discretion. By using our mock tests, you agree to these terms and conditions. If you do not agree, please do not use our services. For more information, please see our detailed <span class='text-blue-600'>Terms and Conditions</span>.",
  },
};

export default function ExamInstructions() {
  const [language, setLanguage] = useState("हिन्दी");
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    // Retrieve exam login data from localStorage
    const storedData = localStorage.getItem("examLoginData");
    if (storedData) {
      try {
        setExamData(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing exam data:", error);
      }
    }
  }, []);

  // Map language to content key
  const contentKey = language === "हिन्दी" ? "hindi" : "english";
  const langContent = content[contentKey];

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
              <p className="text-center text-[20px]">{langContent.title}</p>
              <p className="mt-5 text-[15px] font-semibold">{langContent.generalInstructions}</p>
              <p className="mt-8">
                <span className="text-white bg-gray-500 border py-1 md:py-2 px-3 md:px-4">1</span>{" "}
                {langContent.instructions[0]}
              </p>
              <p className="mt-8">
                <span className="text-white bg-orange-600 border py-1 md:py-2 px-3 md:px-4">2</span>{" "}
                {langContent.instructions[1]}
              </p>
              <p className="mt-8">
                <span className="text-white bg-green-500 border py-1 md:py-2 px-3 md:px-4">3</span>{" "}
                {langContent.instructions[2]}
              </p>
              <p className="mt-8">
                <span className="text-white bg-[#4c2483] border py-1 md:py-2 px-3 md:px-4">4</span>{" "}
                {langContent.instructions[3]}
              </p>
              <p className="mt-8">
                <span className="text-white bg-[#4c2483] border py-1 md:py-2 px-3 md:px-4">5</span>{" "}
                {langContent.instructions[4]}
              </p>
            </div>
            <p className="mt-8 text-[12px] font-semibold">{langContent.languageChangeInstruction}</p>
            <h2 className="font-bold mt-6 text-base md:text-lg">{langContent.navigateQuestions}</h2>
            <p className="mt-4 text-[12px]">
              {langContent.navigateInstructions[0].split("<br/>").map((line, index) => (
                <span key={index}>
                  {index === 0 ? "a. " : index === 1 ? "b. " : "c. "}
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <h2 className="font-bold mt-6 text-base md:text-lg">{langContent.answerQuestions}</h2>
            <p className="text-[12px] mt-4">
              {langContent.answerInstructions.map((instruction, index) => (
                <span key={index}>
                  {String.fromCharCode(97 + index)}. {instruction}
                  <br />
                </span>
              ))}
            </p>
            <p className="text-[12px] mt-3">{langContent.changeAnswer}</p>
            <h2 className="font-bold mt-6 text-base md:text-lg">{langContent.navigateSections}</h2>
            <p className="text-[12px] mt-4">
              {langContent.sectionInstructions.map((instruction, index) => (
                <span key={index}>
                  {index + 5}. {instruction}
                  <br />
                </span>
              ))}
            </p>
            <h2 className="font-bold mt-6 text-center md:text-lg">{langContent.termsTitle}</h2>
            <p className="text-[12px] mt-3">
              <span className="font-semibold">{langContent.terms.disclaimer}</span>
              <br />
              {langContent.terms.disclaimerText}
              <br />
              <span className="font-semibold mt-3">{langContent.terms.responsibility}</span>
              <br />
              {langContent.terms.responsibilityText}
              <br />
              <span className="font-semibold mt-3">{langContent.terms.noGuarantee}</span>
              <br />
              {langContent.terms.noGuaranteeText}
              <br />
              <span className="font-semibold mt-3">{langContent.terms.userResponsibility}</span>
              <br />
              {langContent.terms.userResponsibilityText}
              <br />
              <span className="font-semibold mt-3">{langContent.terms.termsAcceptance}</span>
              <br />
              {langContent.terms.termsAcceptanceText}
              <br />
              <span className="font-semibold mt-3">{langContent.terms.moreInfo}</span>
              <br />
              {langContent.terms.moreInfoText}
            </p>
          </div>

          {/* Language Selection */}
          <div className="mt-4 mb-2 border-t border-gray-300 pt-4">
            <label className="block mb-1 font-semibold text-sm">
              {language === "हिन्दी" ? "प्रश्नों की भाषा चुनें :-" : "Choose Questions Language :-"}
            </label>
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
              <span className="text-[13px]" dangerouslySetInnerHTML={{ __html: langContent.declarationText }} />
            </label>
          </div>

          {/* Start Test Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                try {
                  localStorage.setItem("examLanguage", language);
                } catch (e) {
                  console.error("Failed to store language", e);
                }
                window.location.href = "/exam_mode";
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow cursor-pointer"
            >
              {language === "हिन्दी" ? "परीक्षा शुरू करें" : "Start Test"}
            </button>
          </div>
        </div>

        {/* Right Side Profile */}
        <div className="hidden lg:flex lg:w-[15%] border-l border-gray-300 flex-col items-center justify-start py-6 bg-white-100">
          <img src="/lo.jpg" alt="User" className="w-24 h-24 rounded-full border-2 border-gray-400" />
          <p className="mt-2 font-semibold text-blue-800">{examData?.name || "Anas"}</p>
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