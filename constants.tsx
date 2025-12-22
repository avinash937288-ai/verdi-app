
import React from 'react';
import { 
  Beaker, 
  History, 
  BookOpen, 
  TrendingUp, 
  Map, 
  Music, 
  Leaf, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Search 
} from 'lucide-react';
import { Pillar, Language, Question } from './types';

export const PILLARS_CONFIG = [
  { id: Pillar.SCIENCE, icon: <Beaker className="w-6 h-6" />, color: "bg-blue-500", desc: "Physics, Chemistry, Biology (10th Level)" },
  { id: Pillar.HISTORY, icon: <History className="w-6 h-6" />, color: "bg-amber-600", desc: "Independence Struggle & UP History" },
  { id: Pillar.CONSTITUTION, icon: <BookOpen className="w-6 h-6" />, color: "bg-indigo-600", desc: "Indian Constitution & Legal Articles" },
  { id: Pillar.ECONOMY, icon: <TrendingUp className="w-6 h-6" />, color: "bg-green-600", desc: "GST, Demonetization, Agriculture" },
  { id: Pillar.GEOGRAPHY, icon: <Map className="w-6 h-6" />, color: "bg-emerald-600", desc: "Rivers, Mountains, Minerals" },
  { id: Pillar.CULTURE, icon: <Music className="w-6 h-6" />, color: "bg-purple-600", desc: "UP Fairs, Dance (Kathak, Nautanki)" },
  { id: Pillar.ENVIRONMENT, icon: <Leaf className="w-6 h-6" />, color: "bg-lime-600", desc: "Population, Urbanization, Ecology" },
  { id: Pillar.UP_SPECIAL, icon: <MapPin className="w-6 h-6" />, color: "bg-red-600", desc: "Revenue, Administration, Education" },
  { id: Pillar.CURRENT_AFFAIRS, icon: <Globe className="w-6 h-6" />, color: "bg-sky-600", desc: "Awards, Books, Authors, News" },
  { id: Pillar.POLICE_SECURITY, icon: <ShieldCheck className="w-6 h-6" />, color: "bg-slate-700", desc: "Human Rights, Security, Terrorism" },
  { id: Pillar.STATIC_GK, icon: <Search className="w-6 h-6" />, color: "bg-orange-500", desc: "Countries, Capitals, Currency, Days" },
];

export const BHOJPURI_SHAYARIS = [
  "हार के डर से जो रुके ना, ऊहे जिनगी में आगे बढ़े ला।",
  "मेहनत अगर सच्चा होखे, त किस्मत खुद रास्ता छोड़े ला।",
  "गलती से ना घबराई हो दोस्त, टॉपर भी पहिले ‘Try Again’ दबवले रहे।",
  "जेकरा मेहनत पर भरोसा होला, ओकरा किस्मत के सहारा ना चाहीं।",
  "मंजिल त मिलीहे, बस थोड़ा अउरी पसीना बहावे के बा।",
  "दुनिया के परवाह मत करऽ, रउआ बस आपन वर्दी के सपना पूरा करीं।",
  "कठिन रस्ता ही खूबसूरत मंजिल तक ले जाला।",
  "सपना देखीं ना, सपना के जियें के आदत डालीं।",
  "रउआ के कोशिश ही रउआ के जीत के असली कहानी लिखी।",
  "जब वर्दी के नशा चढ़ जाला, त दुनिया के हर सुख फीका लागे ला।"
];

export const LOCAL_QUESTION_POOL: Question[] = [
  {
    id: "up-gk-1",
    pillar: Pillar.UP_SPECIAL,
    text: { [Language.HINDI]: "उत्तर प्रदेश का राजकीय पशु कौन सा है?", [Language.ENGLISH]: "Which is the state animal of Uttar Pradesh?", [Language.BHOJPURI]: "उत्तर प्रदेश के राजकीय पशु कौन हऽ?" },
    options: { [Language.HINDI]: ["शेर", "बारहसिंगा", "बाघ", "हाथी"], [Language.ENGLISH]: ["Lion", "Swamp Deer", "Tiger", "Elephant"], [Language.BHOJPURI]: ["शेर", "बारहसिंगा", "बाघ", "हाथी"] },
    correctOptionIndex: 1,
    difficulty: "EASY",
    explanation: { [Language.HINDI]: "उत्तर प्रदेश का राजकीय पशु बारहसिंगा है।", [Language.ENGLISH]: "The state animal of Uttar Pradesh is the Swamp Deer.", [Language.BHOJPURI]: "उत्तर प्रदेश के राजकीय पशु बारहसिंगा हऽ।" }
  },
  {
    id: "const-1",
    pillar: Pillar.CONSTITUTION,
    text: { [Language.HINDI]: "भारतीय संविधान कब लागू हुआ था?", [Language.ENGLISH]: "When did the Indian Constitution come into effect?", [Language.BHOJPURI]: "भारतीय संविधान कब लागू भइल रहे?" },
    options: { [Language.HINDI]: ["15 अगस्त 1947", "26 जनवरी 1950", "15 अगस्त 1950", "26 जनवरी 1947"], [Language.ENGLISH]: ["15 Aug 1947", "26 Jan 1950", "15 Aug 1950", "26 Jan 1947"], [Language.BHOJPURI]: ["15 अगस्त 1947", "26 जनवरी 1950", "15 अगस्त 1950", "26 जनवरी 1947"] },
    correctOptionIndex: 1,
    difficulty: "EASY",
    explanation: { [Language.HINDI]: "26 जनवरी 1950 को भारत एक गणतंत्र बना।", [Language.ENGLISH]: "India became a republic on 26th January 1950.", [Language.BHOJPURI]: "26 जनवरी 1950 के भारत गणतंत्र बनल।" }
  },
  {
    id: "hist-1",
    pillar: Pillar.HISTORY,
    text: { [Language.HINDI]: "चौरी-चौरा कांड किस वर्ष हुआ था?", [Language.ENGLISH]: "In which year did the Chauri Chaura incident happen?", [Language.BHOJPURI]: "चौरी-चौरा कांड कवना साल में भइल रहे?" },
    options: { [Language.HINDI]: ["1920", "1921", "1922", "1923"], [Language.ENGLISH]: ["1920", "1921", "1922", "1923"], [Language.BHOJPURI]: ["1920", "1921", "1922", "1923"] },
    correctOptionIndex: 2,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "यह घटना 4 फरवरी 1922 को गोरखपुर में हुई थी।", [Language.ENGLISH]: "This incident occurred on 4th Feb 1922 in Gorakhpur.", [Language.BHOJPURI]: "ई घटना 4 फरवरी 1922 के गोरखपुर में भइल रहे।" }
  },
  {
    id: "geo-1",
    pillar: Pillar.GEOGRAPHY,
    text: { [Language.HINDI]: "गंगा नदी उत्तर प्रदेश के किस जिले से प्रवेश करती है?", [Language.ENGLISH]: "From which district does the Ganga river enter Uttar Pradesh?", [Language.BHOJPURI]: "गंगा माई उत्तर प्रदेश के कवना जिला से प्रवेश करेली?" },
    options: { [Language.HINDI]: ["सहारनपुर", "बिजनौर", "मेरठ", "गाजीपुर"], [Language.ENGLISH]: ["Saharanpur", "Bijnor", "Meerut", "Ghazipur"], [Language.BHOJPURI]: ["सहारनपुर", "बिजनौर", "मेरठ", "गाजीपुर"] },
    correctOptionIndex: 1,
    difficulty: "HARD",
    explanation: { [Language.HINDI]: "गंगा नदी बिजनौर जिले से उत्तर प्रदेश में प्रवेश करती है।", [Language.ENGLISH]: "Ganga enters UP through the Bijnor district.", [Language.BHOJPURI]: "गंगा माई बिजनौर जिला से यूपी में आवेली।" }
  },
  {
    id: "sci-1",
    pillar: Pillar.SCIENCE,
    text: { [Language.HINDI]: "विटामिन C का रासायनिक नाम क्या है?", [Language.ENGLISH]: "What is the chemical name of Vitamin C?", [Language.BHOJPURI]: "विटामिन C के रासायनिक नाम का हऽ?" },
    options: { [Language.HINDI]: ["रेटिनॉल", "एस्कॉर्बिक एसिड", "थायमिन", "कैल्सीफेरोल"], [Language.ENGLISH]: ["Retinol", "Ascorbic Acid", "Thiamine", "Calciferol"], [Language.BHOJPURI]: ["रेटिनॉल", "एस्कॉर्बिक एसिड", "थायमिन", "कैल्सीफेरोल"] },
    correctOptionIndex: 1,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "विटामिन C को एस्कॉर्बिक एसिड कहा जाता है।", [Language.ENGLISH]: "Vitamin C is scientifically known as Ascorbic Acid.", [Language.BHOJPURI]: "विटामिन C के एस्कॉर्बिक एसिड कहल जाला।" }
  },
  {
    id: "pol-1",
    pillar: Pillar.POLICE_SECURITY,
    text: { [Language.HINDI]: "उत्तर प्रदेश पुलिस का आदर्श वाक्य क्या है?", [Language.ENGLISH]: "What is the motto of Uttar Pradesh Police?", [Language.BHOJPURI]: "यूपी पुलिस के आदर्श वाक्य का हऽ?" },
    options: { [Language.HINDI]: ["सेवा ही धर्म", "सुरक्षा आपकी, संकल्प हमारा", "सत्यमेव जयते", "परित्राणाय साधुनाम"], [Language.ENGLISH]: ["Service is Religion", "Your Safety, Our Resolution", "Truth Prevails", "To Protect the Good"], [Language.BHOJPURI]: ["सेवा ही धर्म", "रउआ सुरक्षा, हमनी के संकल्प", "सत्यमेव जयते", "परित्राणाय साधुनाम"] },
    correctOptionIndex: 1,
    difficulty: "EASY",
    explanation: { [Language.HINDI]: "'सुरक्षा आपकी, संकल्प हमारा' यूपी पुलिस का ध्येय वाक्य है।", [Language.ENGLISH]: "'Suraksha Aapki, Sankalp Hamara' is the motto.", [Language.BHOJPURI]: "'सुरक्षा आपकी, संकल्प हमारा' यूपी पुलिस के वाक्य हऽ।" }
  },
  {
    id: "env-1",
    pillar: Pillar.ENVIRONMENT,
    text: { [Language.HINDI]: "दुधवा राष्ट्रीय उद्यान उत्तर प्रदेश के किस जिले में स्थित है?", [Language.ENGLISH]: "In which district is Dudhwa National Park located?", [Language.BHOJPURI]: "दुधवा नेशनल पार्क यूपी के कवना जिला में बा?" },
    options: { [Language.HINDI]: ["लखीमपुर खीरी", "बहराइच", "पीलीभीत", "श्रावस्ती"], [Language.ENGLISH]: ["Lakhimpur Kheri", "Bahraich", "Pilibhit", "Shravasti"], [Language.BHOJPURI]: ["लखीमपुर खीरी", "बहराइच", "पीलीभीत", "श्रावस्ती"] },
    correctOptionIndex: 0,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "दुधवा National Park लखीमपुर खीरी में स्थित है।", [Language.ENGLISH]: "Dudhwa National Park is in Lakhimpur Kheri district.", [Language.BHOJPURI]: "दुधवा नेशनल पार्क लखीमपुर खीरी में बा।" }
  },
  {
    id: "econ-1",
    pillar: Pillar.ECONOMY,
    text: { [Language.HINDI]: "भारत में जीएसटी (GST) कब लागू किया गया था?", [Language.ENGLISH]: "When was GST implemented in India?", [Language.BHOJPURI]: "भारत में GST कब लागू भइल रहे?" },
    options: { [Language.HINDI]: ["1 जुलाई 2017", "1 अप्रैल 2017", "1 जनवरी 2018", "15 अगस्त 2016"], [Language.ENGLISH]: ["1 July 2017", "1 April 2017", "1 Jan 2018", "15 Aug 2016"], [Language.BHOJPURI]: ["1 जुलाई 2017", "1 अप्रैल 2017", "1 जनवरी 2018", "15 अगस्त 2016"] },
    correctOptionIndex: 0,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "1 जुलाई 2017 को पूरे देश में जीएसटी लागू हुआ।", [Language.ENGLISH]: "GST was rolled out on July 1, 2017.", [Language.BHOJPURI]: "1 जुलाई 2017 के पूरा देश में GST लागू भइल।" }
  },
  {
    id: "cult-1",
    pillar: Pillar.CULTURE,
    text: { [Language.HINDI]: "कथक नृत्य का संबंध किस राज्य से है?", [Language.ENGLISH]: "Which state is Kathak dance associated with?", [Language.BHOJPURI]: "कथक नाच के संबंध कवना राज्य से बा?" },
    options: { [Language.HINDI]: ["केरल", "उत्तर प्रदेश", "तमिलनाडु", "उड़ीसा"], [Language.ENGLISH]: ["Kerala", "Uttar Pradesh", "Tamil Nadu", "Odisha"], [Language.BHOJPURI]: ["केरल", "उत्तर प्रदेश", "तमिलनाडु", "उड़ीसा"] },
    correctOptionIndex: 1,
    difficulty: "EASY",
    explanation: { [Language.HINDI]: "कथक उत्तर प्रदेश का प्रसिद्ध शास्त्रीय नृत्य है।", [Language.ENGLISH]: "Kathak is a famous classical dance of UP.", [Language.BHOJPURI]: "कथक यूपी के मशहूर शास्त्रीय नाच हऽ।" }
  },
  {
    id: "static-1",
    pillar: Pillar.STATIC_GK,
    text: { [Language.HINDI]: "संयुक्त राष्ट्र संघ (UN) का मुख्यालय कहाँ स्थित है?", [Language.ENGLISH]: "Where is the UN headquarters located?", [Language.BHOJPURI]: "संयुक्त राष्ट्र संघ (UN) के मुख्यालय कहाँ बा?" },
    options: { [Language.HINDI]: ["पेरिस", "जिनेवा", "न्यूयॉर्क", "वाशिंगटन डीसी"], [Language.ENGLISH]: ["Paris", "Geneva", "New York", "Washington DC"], [Language.BHOJPURI]: ["पेरिस", "जिनेवा", "न्यूयॉर्क", "वाशिंगटन डीसी"] },
    correctOptionIndex: 2,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "UN का मुख्यालय न्यूयॉर्क में है।", [Language.ENGLISH]: "UN is headquartered in New York.", [Language.BHOJPURI]: "UN के मुख्यालय न्यूयॉर्क में बा।" }
  },
  {
    id: "up-gk-2",
    pillar: Pillar.UP_SPECIAL,
    text: { [Language.HINDI]: "इलाहाबाद उच्च न्यायालय की स्थापना कब हुई थी?", [Language.ENGLISH]: "When was the Allahabad High Court established?", [Language.BHOJPURI]: "इलाहाबाद हाईकोर्ट के स्थापना कब भइल रहे?" },
    options: { [Language.HINDI]: ["1866", "1872", "1890", "1901"], [Language.ENGLISH]: ["1866", "1872", "1890", "1901"], [Language.BHOJPURI]: ["1866", "1872", "1890", "1901"] },
    correctOptionIndex: 0,
    difficulty: "HARD",
    explanation: { [Language.HINDI]: "इसकी स्थापना 1866 में आगरा में हुई थी, बाद में इलाहाबाद स्थानांतरित कर दिया गया।", [Language.ENGLISH]: "It was established in 1866 in Agra, later shifted to Allahabad.", [Language.BHOJPURI]: "1866 में आगरा में बनल रहे, बाद में इलाहाबाद आ गइल।" }
  },
  {
    id: "hist-2",
    pillar: Pillar.HISTORY,
    text: { [Language.HINDI]: "1857 के विद्रोह का नेतृत्व लखनऊ में किसने किया था?", [Language.ENGLISH]: "Who led the 1857 revolt in Lucknow?", [Language.BHOJPURI]: "1857 के लड़ाई के नेतृत्व लखनऊ में के कइले रहे?" },
    options: { [Language.HINDI]: ["रानी लक्ष्मीबाई", "बेगम हजरत महल", "नाना साहब", "तात्या टोपे"], [Language.ENGLISH]: ["Rani Lakshmibai", "Begum Hazrat Mahal", "Nana Saheb", "Tatya Tope"], [Language.BHOJPURI]: ["रानी लक्ष्मीबाई", "बेगम हजरत महल", "नाना साहब", "तात्या टोपे"] },
    correctOptionIndex: 1,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "बेगम हजरत महल ने लखनऊ में विद्रोह का नेतृत्व किया था।", [Language.ENGLISH]: "Begum Hazrat Mahal led the revolt in Lucknow.", [Language.BHOJPURI]: "बेगम हजरत महल लखनऊ में नेतृत्व कइली।" }
  },
  {
    id: "static-2",
    pillar: Pillar.STATIC_GK,
    text: { [Language.HINDI]: "विश्व स्वास्थ्य संगठन (WHO) का मुख्यालय कहाँ है?", [Language.ENGLISH]: "Where is the headquarters of WHO?", [Language.BHOJPURI]: "WHO के मुख्यालय कहाँ बा?" },
    options: { [Language.HINDI]: ["वियना", "रोम", "जिनेवा", "लंदन"], [Language.ENGLISH]: ["Vienna", "Rome", "Geneva", "London"], [Language.BHOJPURI]: ["वियना", "रोम", "जिनेवा", "लंदन"] },
    correctOptionIndex: 2,
    difficulty: "EASY",
    explanation: { [Language.HINDI]: "WHO का मुख्यालय जिनेवा, स्विट्जरलैंड में है।", [Language.ENGLISH]: "WHO is headquartered in Geneva, Switzerland.", [Language.BHOJPURI]: "WHO के मुख्यालय जिनेवा में बा।" }
  },
  {
    id: "pol-2",
    pillar: Pillar.POLICE_SECURITY,
    text: { [Language.HINDI]: "भारत में 'पुलिस स्मृति दिवस' कब मनाया जाता है?", [Language.ENGLISH]: "When is 'Police Commemoration Day' observed in India?", [Language.BHOJPURI]: "भारत में 'पुलिस स्मृति दिवस' कब मनावल जाला?" },
    options: { [Language.HINDI]: ["15 अगस्त", "26 जनवरी", "21 अक्टूबर", "5 सितंबर"], [Language.ENGLISH]: ["15 Aug", "26 Jan", "21 Oct", "5 Sept"], [Language.BHOJPURI]: ["15 अगस्त", "26 जनवरी", "21 अक्टूबर", "5 सितंबर"] },
    correctOptionIndex: 2,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "21 अक्टूबर को लद्दाख में शहीद हुए जवानों की याद में मनाया जाता है।", [Language.ENGLISH]: "Observed on Oct 21 in memory of martyrs in Ladakh.", [Language.BHOJPURI]: "21 अक्टूबर के शहीद जवानन के याद में मनावल जाला।" }
  },
  {
    id: "cult-2",
    pillar: Pillar.CULTURE,
    text: { [Language.HINDI]: "नौटंकी किस राज्य का प्रसिद्ध लोक नृत्य है?", [Language.ENGLISH]: "Nautanki is a famous folk dance of which state?", [Language.BHOJPURI]: "नौटंकी कवना राज्य के मशहूर लोक नाच हऽ?" },
    options: { [Language.HINDI]: ["बिहार", "उत्तर प्रदेश", "हरियाणा", "पंजाब"], [Language.ENGLISH]: ["Bihar", "Uttar Pradesh", "Haryana", "Punjab"], [Language.BHOJPURI]: ["बिहार", "उत्तर प्रदेश", "हरियाणा", "पंजाब"] },
    correctOptionIndex: 1,
    difficulty: "EASY",
    explanation: { [Language.HINDI]: "नौटंकी उत्तर प्रदेश का एक प्रमुख लोक नाट्य और नृत्य है।", [Language.ENGLISH]: "Nautanki is a major folk art form of UP.", [Language.BHOJPURI]: "नौटंकी यूपी के मशहूर नाच हऽ।" }
  },
  {
    id: "sci-2",
    pillar: Pillar.SCIENCE,
    text: { [Language.HINDI]: "रक्त का थक्का जमने में कौन सा विटामिन सहायक होता है?", [Language.ENGLISH]: "Which vitamin helps in blood clotting?", [Language.BHOJPURI]: "खून जमे में कवना विटामिन के हाथ होला?" },
    options: { [Language.HINDI]: ["विटामिन A", "विटामिन D", "विटामिन E", "विटामिन K"], [Language.ENGLISH]: ["Vitamin A", "Vitamin D", "Vitamin E", "Vitamin K"], [Language.BHOJPURI]: ["विटामिन A", "विटामिन D", "विटामिन E", "विटामिन K"] },
    correctOptionIndex: 3,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "विटामिन K रक्त का थक्का बनाने में महत्वपूर्ण भूमिका निभाता है।", [Language.ENGLISH]: "Vitamin K is essential for blood coagulation.", [Language.BHOJPURI]: "विटामिन K खून जमावे में मदद करेला।" }
  },
  {
    id: "const-2",
    pillar: Pillar.CONSTITUTION,
    text: { [Language.HINDI]: "संविधान सभा के स्थायी अध्यक्ष कौन थे?", [Language.ENGLISH]: "Who was the permanent President of the Constituent Assembly?", [Language.BHOJPURI]: "संविधान सभा के परमानेंट अध्यक्ष के रहे?" },
    options: { [Language.HINDI]: ["बी.आर. अंबेडकर", "सच्चिदानंद सिन्हा", "डॉ. राजेंद्र प्रसाद", "जवाहरलाल नेहरू"], [Language.ENGLISH]: ["B.R. Ambedkar", "Sachchidananda Sinha", "Dr. Rajendra Prasad", "J.L. Nehru"], [Language.BHOJPURI]: ["बी.आर. अंबेडकर", "सच्चिदानंद सिन्हा", "डॉ. राजेंद्र प्रसाद", "जवाहरलाल नेहरू"] },
    correctOptionIndex: 2,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "डॉ. राजेंद्र प्रसाद 11 दिसंबर 1946 को स्थायी अध्यक्ष चुने गए थे।", [Language.ENGLISH]: "Dr. Rajendra Prasad was elected as the permanent president in 1946.", [Language.BHOJPURI]: "डॉ. राजेंद्र प्रसाद के अध्यक्ष चुनल गइल रहे।" }
  },
  {
    id: "geo-2",
    pillar: Pillar.GEOGRAPHY,
    text: { [Language.HINDI]: "हीराकुंड बांध किस नदी पर बनाया गया है?", [Language.ENGLISH]: "Hirakud Dam is built on which river?", [Language.BHOJPURI]: "हीराकुंड बांध कवना नदी पर बनल बा?" },
    options: { [Language.HINDI]: ["महानदी", "गोदावरी", "कृष्णा", "कावेरी"], [Language.ENGLISH]: ["Mahanadi", "Godavari", "Krishna", "Kaveri"], [Language.BHOJPURI]: ["महानदी", "गोदावरी", "कृष्णा", "कावेरी"] },
    correctOptionIndex: 0,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "हीराकुंड बांध ओडिशा में महानदी पर स्थित है।", [Language.ENGLISH]: "Hirakud is on the Mahanadi river in Odisha.", [Language.BHOJPURI]: "हीराकुंड बांध ओडिशा के महानदी पर बा।" }
  },
  {
    id: "up-gk-3",
    pillar: Pillar.UP_SPECIAL,
    text: { [Language.HINDI]: "उत्तर प्रदेश का सबसे बड़ा जिला (क्षेत्रफल में) कौन सा है?", [Language.ENGLISH]: "Which is the largest district of UP by area?", [Language.BHOJPURI]: "यूपी के सबसे बड़ा जिला (क्षेत्रफल में) कौन बा?" },
    options: { [Language.HINDI]: ["सोनभद्र", "लखीमपुर खीरी", "हरदोई", "सीतापुर"], [Language.ENGLISH]: ["Sonbhadra", "Lakhimpur Kheri", "Hardoi", "Sitapur"], [Language.BHOJPURI]: ["सोनभद्र", "लखीमपुर खीरी", "हरदोई", "सीतापुर"] },
    correctOptionIndex: 1,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "लखीमपुर खीरी उत्तर प्रदेश का क्षेत्रफल की दृष्टि से सबसे बड़ा जिला है।", [Language.ENGLISH]: "Lakhimpur Kheri is the largest district of UP.", [Language.BHOJPURI]: "लखीमपुर खीरी यूपी के सबसे बड़ा जिला हऽ।" }
  },
  {
    id: "econ-2",
    pillar: Pillar.ECONOMY,
    text: { [Language.HINDI]: "भारत की पहली पंचवर्षीय योजना कब शुरू हुई थी?", [Language.ENGLISH]: "When did India's first Five-Year Plan start?", [Language.BHOJPURI]: "भारत के पहिला पंचवर्षीय योजना कब शुरू भइल रहे?" },
    options: { [Language.HINDI]: ["1947", "1950", "1951", "1955"], [Language.ENGLISH]: ["1947", "1950", "1951", "1955"], [Language.BHOJPURI]: ["1947", "1950", "1951", "1955"] },
    correctOptionIndex: 2,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "पहली पंचवर्षीय योजना 1951 में कृषि पर ध्यान केंद्रित करते हुए शुरू की गई थी।", [Language.ENGLISH]: "The first plan started in 1951 focusing on agriculture.", [Language.BHOJPURI]: "1951 में पहिला योजना शुरू भइल रहे।" }
  },
  {
    id: "sci-3",
    pillar: Pillar.SCIENCE,
    text: { [Language.HINDI]: "मनुष्य के शरीर में कुल कितनी हड्डियाँ होती हैं?", [Language.ENGLISH]: "How many bones are there in the human body?", [Language.BHOJPURI]: "इंसान के शरीर में कुल केतने हड्डी होला?" },
    options: { [Language.HINDI]: ["206", "208", "210", "200"], [Language.ENGLISH]: ["206", "208", "210", "200"], [Language.BHOJPURI]: ["206", "208", "210", "200"] },
    correctOptionIndex: 0,
    difficulty: "EASY",
    explanation: { [Language.HINDI]: "एक वयस्क मनुष्य के शरीर में 206 हड्डियाँ होती हैं।", [Language.ENGLISH]: "An adult human has 206 bones.", [Language.BHOJPURI]: "एक जवान आदमी के शरीर में 206 गो हड्डी होला।" }
  },
  {
    id: "hist-3",
    pillar: Pillar.HISTORY,
    text: { [Language.HINDI]: "आजाद हिंद फौज की स्थापना किसने की थी?", [Language.ENGLISH]: "Who founded the Azad Hind Fauj?", [Language.BHOJPURI]: "आजाद हिंद फौज के स्थापना के कइले रहे?" },
    options: { [Language.HINDI]: ["भगत सिंह", "सुभाष चंद्र बोस", "चंद्रशेखर आजाद", "लाला लाजपत राय"], [Language.ENGLISH]: ["Bhagat Singh", "Subhas Chandra Bose", "Chandrashekhar Azad", "Lala Lajpat Rai"], [Language.BHOJPURI]: ["भगत सिंह", "सुभाष चंद्र बोस", "चंद्रशेखर आजाद", "लाला लाजपत राय"] },
    correctOptionIndex: 1,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "सुभाष चंद्र बोस ने 1943 में आजाद हिंद फौज की कमान संभाली थी।", [Language.ENGLISH]: "Subhas Chandra Bose revitalized and led the INA.", [Language.BHOJPURI]: "सुभाष चंद्र बोस आजाद हिंद फौज के कमान सम्भलले रहलन।" }
  },
  {
    id: "up-gk-4",
    pillar: Pillar.UP_SPECIAL,
    text: { [Language.HINDI]: "उत्तर प्रदेश का राजकीय फूल क्या है?", [Language.ENGLISH]: "What is the state flower of Uttar Pradesh?", [Language.BHOJPURI]: "यूपी के राजकीय फूल कौन हऽ?" },
    options: { [Language.HINDI]: ["कमल", "पलाश", "गुलाब", "चमेली"], [Language.ENGLISH]: ["Lotus", "Palash", "Rose", "Jasmine"], [Language.BHOJPURI]: ["कमल", "पलाश", "गुलाब", "चमेली"] },
    correctOptionIndex: 1,
    difficulty: "EASY",
    explanation: { [Language.HINDI]: "पलाश उत्तर प्रदेश का राजकीय पुष्प है।", [Language.ENGLISH]: "Palash (Flame of the Forest) is the state flower.", [Language.BHOJPURI]: "पलाश यूपी के राजकीय फूल हऽ।" }
  },
  {
    id: "const-3",
    pillar: Pillar.CONSTITUTION,
    text: { [Language.HINDI]: "भारतीय संविधान का जनक किसे कहा जाता है?", [Language.ENGLISH]: "Who is called the Father of the Indian Constitution?", [Language.BHOJPURI]: "भारतीय संविधान के जनक केकरा के कहल जाला?" },
    options: { [Language.HINDI]: ["महात्मा गांधी", "डॉ. बी.आर. अंबेडकर", "सरदार पटेल", "नेहरू"], [Language.ENGLISH]: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Sardar Patel", "Nehru"], [Language.BHOJPURI]: ["महात्मा गांधी", "डॉ. बी.आर. अंबेडकर", "सरदार पटेल", "नेहरू"] },
    correctOptionIndex: 1,
    difficulty: "EASY",
    explanation: { [Language.HINDI]: "डॉ. अंबेडकर संविधान मसौदा समिति के अध्यक्ष थे।", [Language.ENGLISH]: "Dr. Ambedkar chaired the drafting committee.", [Language.BHOJPURI]: "डॉ. अंबेडकर के संविधान के जनक कहल जाला।" }
  },
  {
    id: "econ-3",
    pillar: Pillar.ECONOMY,
    text: { [Language.HINDI]: "आरबीआई (RBI) का मुख्यालय कहाँ स्थित है?", [Language.ENGLISH]: "Where is the headquarters of RBI located?", [Language.BHOJPURI]: "RBI के मुख्यालय कहाँ बा?" },
    options: { [Language.HINDI]: ["दिल्ली", "मुंबई", "कोलकाता", "चेन्नई"], [Language.ENGLISH]: ["Delhi", "Mumbai", "Kolkata", "Chennai"], [Language.BHOJPURI]: ["दिल्ली", "मुंबई", "कोलकाता", "चेन्नई"] },
    correctOptionIndex: 1,
    difficulty: "MEDIUM",
    explanation: { [Language.HINDI]: "भारतीय रिजर्व बैंक का मुख्यालय मुंबई में है।", [Language.ENGLISH]: "The RBI is headquartered in Mumbai.", [Language.BHOJPURI]: "RBI के मुख्यालय मुंबई में बा।" }
  }
] as Question[];
