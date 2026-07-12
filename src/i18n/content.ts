import {
  badges,
  getBadge,
  getLesson,
  getMission,
  lessons,
  missions,
} from "@/data/content";
import type { Locale } from "@/i18n/locales";
import type { Badge, Lesson, Mission } from "@/lib/types";

type LessonText = Pick<
  Lesson,
  "title" | "summary" | "story" | "tryThis" | "reflectionPrompt"
>;
type MissionText = Pick<Mission, "title" | "description" | "proofHint">;
type BadgeText = Pick<Badge, "name" | "description">;

const lessonZh: Record<string, LessonText> = {
  "greeting-friends": {
    title: "友善的问候",
    summary: "学习新加坡各族友善打招呼的方式。",
    story:
      "在我们的甘榜，每一句你好都能让人感到受欢迎。华族朋友可能说“你好”，马来朋友可能温柔地说“Assalamualaikum”或“Apa khabar”，印度朋友可能说“Namaste”或“Vanakkam”，许多孩子也会微笑说“Hi！”最重要的是声音和眼神里的善意。",
    tryThis: "在家练习三种问候：微笑挥手、礼貌地说早上好，以及一种来自其他文化的尊重问候。",
    reflectionPrompt: "今天哪一句问候让别人笑了？",
  },
  "queue-kampung": {
    title: "像甘榜英雄一样排队",
    summary: "轮流等待让每个人都安全、公平。",
    story:
      "在组屋底层、食堂或巴士站，新加坡孩子有一项超能力：耐心等待。插队也许更快，却伤害公平。甘榜英雄站在最后一位后面，管好双手，若有人不确定就用平静的话说明。",
    tryThis: "下次排队时慢慢数到 10，感受平静等待的感觉。",
    reflectionPrompt: "你今天在哪里轮流等待了？",
  },
  "cny-respect": {
    title: "农历新年的尊重",
    summary: "温暖地向长辈问好，怀着感恩庆祝。",
    story:
      "农历新年，家人团聚、打扫屋子，孩子恭敬地向长辈拜年。微笑说“恭喜发财”表示关心。收到红包很开心——说谢谢更能体现好品格。我们也记得，节日更关乎家人，不只是礼物。",
    tryThis: "练习对家里长辈恭敬问好，并清楚地说一声谢谢。",
    reflectionPrompt: "这周你如何向长辈表达尊重？",
  },
  "hari-raya-sharing": {
    title: "开斋节的分享",
    summary: "用宽恕、拜访和慷慨的心庆祝。",
    story:
      "开斋节是宽恕、走访亲友和美食的欢乐日子。甘榜美好的价值是分享——端上糕点、让客人感到欢迎、说温柔的话。即使不是你的节日，你也可以热情问候朋友，学习这一天为何重要。",
    tryThis: "今天和家人或朋友分享零食或一句温暖的话。",
    reflectionPrompt: "你让谁感到受欢迎？",
  },
  "deepavali-light": {
    title: "屠妖节的光与善意",
    summary: "光象征希望——善意也能照亮别人。",
    story:
      "屠妖节（排灯节）庆祝光明战胜黑暗。家里点灯、画兰戈利，家人分享甜食。对甘榜孩子来说，更重要的是用帮助、温柔说话、欢迎各族朋友，把光带到别人心里。",
    tryThis: "做一件“明亮”的事：帮忙收拾、说一句赞美，或邀请别人一起玩。",
    reflectionPrompt: "什么善意照亮了别人的一天？",
  },
  "eurasian-welcome": {
    title: "敞开大门的欢迎",
    summary: "欧亚裔好客精神教我们欢迎每一个人。",
    story:
      "许多新加坡欧亚裔家庭以热情好客闻名——美食、音乐，让客人像在自己家。甘榜精神也一样：你的家、教室和游乐场都可以成为人人有归属的地方。欢迎别人是强大的新加坡价值。",
    tryThis: "邀请同学或邻居孩子加入游戏，并温柔地解释规则。",
    reflectionPrompt: "你如何帮助别人感到被接纳？",
  },
  "please-thank-you": {
    title: "神奇的礼貌用语",
    summary: "请、谢谢和对不起让心柔软。",
    story:
      "神奇用语之所以神奇，不是因为华丽，而是因为表达关心。“请”是尊重地请求，“谢谢”看见别人的帮助，“对不起”修补错误。在新加坡的家与学校，这些话帮助我们好好相处。",
    tryThis: "今天真心各用一次请、谢谢和对不起。",
    reflectionPrompt: "你用了哪句神奇用语？为什么？",
  },
  "honest-heart": {
    title: "诚实的心",
    summary: "诚实建立甘榜里的信任。",
    story:
      "有时说真话很害怕——也许打翻了饮料，或忘了功课。但诚实能让大人帮助你，朋友也更信任你。有诚实心的甘榜孩子会早点承认错误、道歉，再试一次。",
    tryThis: "如果今天有小错，温柔地告诉信任的大人真相。",
    reflectionPrompt: "什么时候诚实需要勇气？",
  },
  "racial-harmony": {
    title: "日常的种族和谐",
    summary: "跨种族友谊让新加坡更强大。",
    story:
      "种族和谐日提醒我们：华族、马来族、印度族、欧亚裔和许多新加坡人共有一个家。和谐不只在特别的日子——而是选择好奇而非取笑，学习节日，若有人因外表、语言或庆典被冷落，就温和地站出来。",
    tryThis: "礼貌地问朋友一个关于他们传统的问题。",
    reflectionPrompt: "你学到了朋友文化的什么？",
  },
  "tidy-space": {
    title: "整洁的甘榜骄傲",
    summary: "收拾干净表示尊重共用空间。",
    story:
      "无论是玩具、食堂托盘区还是公园长椅，让地方比你来时更好，就是甘榜骄傲。这是一种安静地照顾邻里——甚至是你从未见过的人——的方式。",
    tryThis: "在一个共用空间主动收拾，不必等人提醒。",
    reflectionPrompt: "你让哪个地方更整齐了？",
  },
  "shoes-off": {
    title: "门口脱鞋",
    summary: "在许多家庭，脱鞋表示尊重。",
    story:
      "在许多印度家庭——以及各族新加坡家庭——进屋前要脱鞋。干净的脚帮助保持家干净，也表示尊重这家人的空间。拜访时留意别人怎么做，或礼貌地问：“我要脱鞋吗？”",
    tryThis: "在家或拜访时礼貌脱鞋，并把鞋子摆整齐。",
    reflectionPrompt: "整齐的鞋子如何表达尊重？",
  },
  "salam-respect": {
    title: "色兰与柔软的手",
    summary: "尊重的问候可以温柔而真诚。",
    story:
      "在马来穆斯林中，色兰是和平的问候。孩子常以谦逊与关爱问候长辈。即使你家没有色兰的习俗，仍可尊重地问候马来朋友，对长辈轻声说话，绝不取笑别人的问候方式。",
    tryThis: "用轻柔的声音、眼神接触和温暖的微笑问候家里的长辈。",
    reflectionPrompt: "你的问候如何表达和平？",
  },
};

const lessonMs: Record<string, LessonText> = {
  "greeting-friends": {
    title: "Salam Mesra",
    summary: "Belajar cara mesra orang Singapura memberi salam merentas budaya.",
    story:
      "Di kampung kita, setiap salam boleh membuat seseorang rasa dialu-alukan. Rakan Cina mungkin berkata 'Ni hao', rakan Melayu mungkin memberi 'Assalamualaikum' atau 'Apa khabar', rakan India mungkin berkata 'Namaste' atau 'Vanakkam', dan ramai hanya tersenyum dan berkata 'Hi!' Yang paling penting ialah kebaikan dalam suara dan mata anda.",
    tryThis:
      "Latih tiga salam di rumah: senyum + lambai, 'Selamat pagi' yang sopan, dan satu salam dari budaya lain dengan hormat.",
    reflectionPrompt: "Salam mana yang membuat seseorang tersenyum hari ini?",
  },
  "queue-kampung": {
    title: "Beratur Seperti Wira Kampung",
    summary: "Menunggu giliran menjadikan semua orang selamat dan adil.",
    story:
      "Di void deck, kantin, atau perhentian bas, kanak-kanak Singapura tahu kuasa rahsia: menunggu dengan sabar. Memotong barisan mungkin terasa lebih pantas, tetapi ia mencederakan keadilan. Wira kampung berdiri di belakang orang terakhir, jaga tangan sendiri, dan guna kata tenang jika seseorang kurang pasti.",
    tryThis: "Lain kali beratur, kira perlahan hingga 10 dan perasan betapa tenang menunggu.",
    reflectionPrompt: "Di mana anda menunggu giliran hari ini?",
  },
  "cny-respect": {
    title: "Hormat Tahun Baru Cina",
    summary: "Sambut warga tua dengan mesra dan bersyukur.",
    story:
      "Semasa Tahun Baru Cina, keluarga berkumpul, rumah dibersihkan, dan kanak-kanak memberi salam hormat kepada warga tua. Mengucapkan 'Gong Xi Fa Cai' dengan senyuman menunjukkan keprihatinan. Menerima angpau memang mengujakan — dan mengucapkan terima kasih menunjukkan perwatakan baik. Kita juga ingat perayaan tentang keluarga, bukan hanya hadiah.",
    tryThis: "Latih salam hormat dan 'Terima kasih' yang jelas kepada warga tua di rumah.",
    reflectionPrompt: "Bagaimana anda tunjukkan hormat kepada warga tua minggu ini?",
  },
  "hari-raya-sharing": {
    title: "Perkongsian Hari Raya",
    summary: "Raikan dengan kemaafan, lawatan, dan hati yang murah.",
    story:
      "Hari Raya Aidilfitri ialah masa gembira untuk kemaafan, lawatan keluarga, dan makanan lazat. Nilai kampung yang indah ialah berkongsi — menawarkan kuih, membuat tetamu rasa dialu-alukan, dan berkata baik. Walaupun bukan perayaan anda, anda boleh tunjuk hormat dengan menyambut rakan mesra dan belajar mengapa hari itu penting.",
    tryThis: "Kongsi snek atau kata baik dengan ahli keluarga atau rakan hari ini.",
    reflectionPrompt: "Siapa yang anda buat rasa dialu-alukan?",
  },
  "deepavali-light": {
    title: "Cahaya & Kebaikan Deepavali",
    summary: "Cahaya bermaksud harapan — dan kebaikan mencerahkan orang lain.",
    story:
      "Deepavali, Perayaan Cahaya, meraikan kebaikan mengatasi kegelapan. Rumah bersinar dengan lampu dan rangoli, keluarga berkongsi manisan. Di luar cahaya cantik, pelajaran untuk anak kampung ialah membawa kecerahan melalui tindakan baik: membantu, bercakap lembut, dan menyambut rakan semua bangsa.",
    tryThis: "Lakukan satu perbuatan 'cerah': bantu kemas, puji seseorang, atau jemput bermain.",
    reflectionPrompt: "Perbuatan baik apa yang mencerahkan hari seseorang?",
  },
  "eurasian-welcome": {
    title: "Sambutan Pintu Terbuka",
    summary: "Keramahan Eurasia mengajar kita menyambut semua orang.",
    story:
      "Ramai keluarga Eurasia di Singapura dikenali kerana keramahan — makanan baik, muzik, dan membuat tetamu rasa di rumah. Semangat kampung sama: rumah, bilik darjah, dan taman permainan anda boleh jadi tempat semua orang rasa milik. Menyambut orang lain ialah nilai Singapura yang kuat.",
    tryThis: "Jemput rakan sekelas atau jiran masuk permainan dan terangkan peraturan dengan baik.",
    reflectionPrompt: "Bagaimana anda bantu seseorang rasa disertakan?",
  },
  "please-thank-you": {
    title: "Kata Ajaib",
    summary: "Tolong, terima kasih, dan maaf mengekalkan hati yang lembut.",
    story:
      "Kata ajaib bukan ajaib kerana mewah — ia ajaib kerana menunjukkan keprihatinan. 'Tolong' meminta dengan hormat. 'Terima kasih' menyedari bantuan seseorang. 'Maaf' membaiki kesilapan. Di rumah dan sekolah Singapura, kata-kata ini membantu kita hidup bersama dengan baik.",
    tryThis: "Guna tolong, terima kasih, dan maaf sekurang-kurangnya sekali setiap satu hari ini — dan maksudkannya.",
    reflectionPrompt: "Kata ajaib mana yang anda guna, dan mengapa?",
  },
  "honest-heart": {
    title: "Hati Jujur",
    summary: "Kebenaran membina kepercayaan di kampung kita.",
    story:
      "Kadang-kadang berkata benar terasa menakutkan — mungkin anda tumpahkan minuman atau lupa kerja rumah. Tetapi kejujuran membantu orang dewasa membantu anda, dan rakan lebih percaya kepada anda. Anak kampung berhati jujur mengakui kesilapan awal, meminta maaf, dan cuba lagi.",
    tryThis: "Jika anda buat kesilapan kecil hari ini, beritahu orang dewasa yang dipercayai dengan lembut.",
    reflectionPrompt: "Bila berani untuk jujur?",
  },
  "racial-harmony": {
    title: "Keharmonian Kaum Setiap Hari",
    summary: "Persahabatan merentas kaum menguatkan Singapura.",
    story:
      "Hari Keharmonian Kaum mengingatkan kita bahawa Cina, Melayu, India, Eurasia, dan ramai warga Singapura lain berkongsi satu rumah. Keharmonian bukan hanya hari istimewa — ia memilih rasa ingin tahu berbanding ejekan, belajar tentang perayaan, dan berdiri dengan baik jika seseorang diketepikan kerana rupa, bahasa, atau cara mereka meraikan.",
    tryThis: "Tanya rakan satu soalan hormat tentang tradisi yang mereka raikan.",
    reflectionPrompt: "Apa yang anda pelajari tentang budaya rakan?",
  },
  "tidy-space": {
    title: "Kebanggaan Kampung yang Kemas",
    summary: "Membersih menunjukkan hormat kepada ruang bersama.",
    story:
      "Sama ada mainan anda, kawasan dulang kantin, atau bangku taman, meninggalkan tempat lebih baik daripada anda jumpa ialah kebanggaan kampung. Ia cara senyap menjaga jiran yang mungkin tidak pernah anda jumpa.",
    tryThis: "Kutip selepas diri anda di satu ruang bersama tanpa diminta.",
    reflectionPrompt: "Ruang mana yang anda tinggalkan lebih kemas?",
  },
  "shoes-off": {
    title: "Kasut di Pintu",
    summary: "Menanggalkan kasut menunjukkan hormat di banyak rumah.",
    story:
      "Di banyak rumah India — dan banyak rumah Singapura semua kaum — kita tanggalkan kasut sebelum masuk. Kaki bersih membantu rumah kekal bersih dan tunjuk kita hormati ruang keluarga. Bila melawat, perhati apa orang lain buat, atau tanya dengan sopan, 'Perlukah saya tanggalkan kasut?'",
    tryThis: "Di rumah atau semasa melawat, tanggalkan kasut dengan sopan dan letakkannya kemas.",
    reflectionPrompt: "Bagaimana kasut yang kemas tunjukkan hormat?",
  },
  "salam-respect": {
    title: "Salam & Tangan Lembut",
    summary: "Salam yang hormat boleh lembut dan ikhlas.",
    story:
      "Dalam kalangan Muslim Melayu, salam ialah ucapan keamanan. Kanak-kanak sering menyambut warga tua dengan penuh jaga dan rendah hati. Walaupun salam bukan amalan keluarga anda, anda masih boleh menyambut rakan Melayu dengan hormat, bercakap lembut kepada warga tua, dan jangan pernah mengejek cara seseorang memberi salam.",
    tryThis: "Sambut warga tua di rumah dengan suara lembut, kontak mata, dan senyuman mesra.",
    reflectionPrompt: "Bagaimana salam anda tunjukkan keamanan?",
  },
};

const lessonTa: Record<string, LessonText> = {
  "greeting-friends": {
    title: "நட்பான வணக்கங்கள்",
    summary: "சிங்கப்பூர் பண்பாடுகளில் அன்புடன் வணங்கும் வழிகளைக் கற்றுக்கொள்ளுங்கள்.",
    story:
      "நம் கம்போங்கில் ஒவ்வொரு வணக்கமும் ஒருவரை வரவேற்கும். சீன நண்பர்கள் 'Ni hao' எனலாம், மலாய் நண்பர்கள் 'Assalamualaikum' அல்லது 'Apa khabar' எனலாம், இந்திய நண்பர்கள் 'Namaste' அல்லது 'Vanakkam' எனலாம், பலர் புன்னகையுடன் 'Hi!' என்பார்கள். முக்கியம் குரலிலும் கண்ணிலும் உள்ள அன்பு.",
    tryThis:
      "வீட்டில் மூன்று வணக்கங்களைப் பழகுங்கள்: புன்னகை + கை அசைப்பு, மரியாதையான 'காலை வணக்கம்', மற்றொரு பண்பாட்டின் மரியாதை வணக்கம்.",
    reflectionPrompt: "இன்று எந்த வணக்கம் ஒருவரைச் சிரிக்க வைத்தது?",
  },
  "queue-kampung": {
    title: "கம்போங் வீரனைப் போல் வரிசையில் நில்லுங்கள்",
    summary: "முறைக்காக காத்திருப்பது அனைவருக்கும் பாதுகாப்பும் நியாயமும் தரும்.",
    story:
      "வெற்றிடம், கேண்டீன் அல்லது பேருந்து நிறுத்தத்தில் சிங்கப்பூர் குழந்தைகளுக்கு ஒரு ரகசிய சக்தி உண்டு: பொறுமையாக காத்திருத்தல். வரிசையை முந்தினால் வேகம் தோன்றலாம், ஆனால் நியாயம் காயப்படும். கம்போங் வீரன் கடைசி நபருக்குப் பின்னால் நின்று, கைகளைக் கட்டுப்படுத்தி, தெளிவின்மை இருந்தால் அமைதியாகப் பேசுவார்.",
    tryThis: "அடுத்த முறை வரிசையில் நின்று மெதுவாக 10 வரை எண்ணி, அமைதியை உணருங்கள்.",
    reflectionPrompt: "இன்று எங்கே உங்கள் முறைக்காக காத்திருந்தீர்கள்?",
  },
  "cny-respect": {
    title: "சீனப் புத்தாண்டு மரியாதை",
    summary: "மூத்தோரை அன்புடன் வணங்கி நன்றியுடன் கொண்டாடுங்கள்.",
    story:
      "சீனப் புத்தாண்டில் குடும்பம் கூடும், வீடு சுத்தமாகும், குழந்தைகள் மூத்தோரை மரியாதையுடன் வணங்குவர். புன்னகையுடன் 'Gong Xi Fa Cai' சொல்வது அக்கறையைக் காட்டும். சிவப்பு உறை பெறுவது மகிழ்ச்சி — நன்றி சொல்வது நல்ல குணம். பண்டிகை குடும்பத்தைப் பற்றியது, பரிசுகளை மட்டும் அல்ல.",
    tryThis: "வீட்டில் ஒரு மூத்தவருக்கு மரியாதை வணக்கமும் தெளிவான நன்றியும் பழகுங்கள்.",
    reflectionPrompt: "இந்த வாரம் மூத்தவருக்கு எப்படி மரியாதை காட்டினீர்கள்?",
  },
  "hari-raya-sharing": {
    title: "ஹரி ராயா பகிர்வு",
    summary: "மன்னிப்பு, வருகை, தாராள இதயத்துடன் கொண்டாடுங்கள்.",
    story:
      "ஹரி ராயா அய்தில்ஃபித்ரி மன்னிப்பு, குடும்ப வருகை, சுவையான உணவின் மகிழ்ச்சியான நேரம். அழகான கம்போங் மதிப்பு பகிர்தல் — குய் வழங்குதல், விருந்தினரை வரவேற்றல், அன்பான சொற்கள். உங்கள் பண்டிகை இல்லாவிட்டாலும் நண்பர்களை அன்புடன் வணங்கி, அந்த நாள் ஏன் முக்கியம் என்பதைக் கற்றுக்கொள்ளலாம்.",
    tryThis: "இன்று குடும்ப உறுப்பினர் அல்லது நண்பருடன் சிற்றுண்டி அல்லது அன்பான சொல்லைப் பகிருங்கள்.",
    reflectionPrompt: "யாரை வரவேற்ற உணர்வைத் தந்தீர்கள்?",
  },
  "deepavali-light": {
    title: "தீபாவளி ஒளி & அன்பு",
    summary: "ஒளி நம்பிக்கை — அன்பும் பிறரை ஒளிரச் செய்யும்.",
    story:
      "தீபாவளி, ஒளித் திருவிழா, இருளை வெல்லும் நன்மையைக் கொண்டாடும். வீடுகள் விளக்குகளாலும் ரங்கோலியாலும் ஒளிரும், குடும்பம் இனிப்பு பகிரும். அழகான ஒளிக்கு அப்பால், கம்போங் குழந்தைகளுக்கான பாடம்: உதவி, மென்மையான பேச்சு, அனைத்து இன நண்பர்களையும் வரவேற்பதன் மூலம் ஒளி கொண்டு வாருங்கள்.",
    tryThis: "ஒரு 'ஒளி' செயல் செய்யுங்கள்: சுத்தம் உதவு, பாராட்டு சொல், அல்லது விளையாட அழை.",
    reflectionPrompt: "எந்த அன்பான செயல் பிறரின் நாளை ஒளிரச் செய்தது?",
  },
  "eurasian-welcome": {
    title: "திறந்த கதவு வரவேற்பு",
    summary: "யூரேசிய விருந்தோம்பல் அனைவரையும் வரவேற்கக் கற்பிக்கும்.",
    story:
      "சிங்கப்பூரில் பல யூரேசிய குடும்பங்கள் விருந்தோம்பலுக்காக அறியப்படுவர் — நல்ல உணவு, இசை, விருந்தினரை வீட்டில் உணரச் செய்தல். கம்போங் உணர்வும் அதே: உங்கள் வீடு, வகுப்பறை, விளையாட்டு மைதானம் அனைவருக்கும் உரிய இடமாக இருக்கலாம். பிறரை வரவேற்பது வலுவான சிங்கப்பூர் மதிப்பு.",
    tryThis: "வகுப்புத் தோழர் அல்லது அண்டை குழந்தையை விளையாட்டிற்கு அழைத்து விதிகளை அன்பாக விளக்குங்கள்.",
    reflectionPrompt: "ஒருவர் சேர்ந்த உணர்வை எப்படி உருவாக்கினீர்கள்?",
  },
  "please-thank-you": {
    title: "மந்திரச் சொற்கள்",
    summary: "தயவுசெய்து, நன்றி, மன்னிக்கவும் இதயத்தை மென்மையாக்கும்.",
    story:
      "மந்திரச் சொற்கள் அழகாக இருப்பதால் அல்ல — அக்கறை காட்டுவதால் மந்திரம். 'தயவுசெய்து' மரியாதையுடன் கேட்கும். 'நன்றி' உதவியைக் கவனிக்கும். 'மன்னிக்கவும்' தவறைச் சரிசெய்யும். சிங்கப்பூர் வீடுகளிலும் பள்ளிகளிலும் இந்தச் சொற்கள் நம்மை நன்றாக வாழ உதவும்.",
    tryThis: "இன்று தயவுசெய்து, நன்றி, மன்னிக்கவும் ஆகியவற்றை உண்மையாக ஒவ்வொன்றும் ஒருமுறை பயன்படுத்துங்கள்.",
    reflectionPrompt: "எந்த மந்திரச் சொல்லைப் பயன்படுத்தினீர்கள், ஏன்?",
  },
  "honest-heart": {
    title: "நேர்மையான இதயம்",
    summary: "உண்மை நம் கம்போங்கில் நம்பிக்கையைக் கட்டும்.",
    story:
      "சிலநேரம் உண்மை சொல்வது பயமாக இருக்கலாம் — பானம் கொட்டிவிட்டதோ, வீட்டுப்பாடம் மறந்ததோ. ஆனால் நேர்மை பெரியவர்கள் உதவ உதவும், நண்பர்கள் அதிகம் நம்புவர். நேர்மையான இதயமுள்ள கம்போங் குழந்தை தவறை விரைவில் ஒப்புக்கொண்டு, மன்னிப்பு கேட்டு, மீண்டும் முயலும்.",
    tryThis: "இன்று சிறிய தவறு செய்தால், நம்பகமான பெரியவரிடம் மென்மையாக உண்மை சொல்லுங்கள்.",
    reflectionPrompt: "நேர்மையாக இருப்பது எப்போது தைரியமாக இருந்தது?",
  },
  "racial-harmony": {
    title: "தினசரி இன நல்லிணக்கம்",
    summary: "இனங்களைக் கடந்த நட்பு சிங்கப்பூரை வலுப்படுத்தும்.",
    story:
      "இன நல்லிணக்க நாள் நினைவூட்டுவது: சீனம், மலாய், இந்தியர், யூரேசியன் மற்றும் பல சிங்கப்பூரர்கள் ஒரே வீட்டைப் பகிர்கிறோம். நல்லிணக்கம் ஒரு சிறப்பு நாள் மட்டும் அல்ல — கேலியை விட்டு ஆர்வத்தைத் தேர்ந்தெடுப்பது, பண்டிகைகளைக் கற்றல், தோற்றம், பேச்சு அல்லது கொண்டாட்டத்தால் ஒருவர் ஒதுக்கப்பட்டால் அன்பாக நிற்றல்.",
    tryThis: "நண்பரின் பாரம்பரியம் பற்றி ஒரு மரியாதையான கேள்வி கேளுங்கள்.",
    reflectionPrompt: "நண்பரின் பண்பாட்டைப் பற்றி என்ன கற்றுக்கொண்டீர்கள்?",
  },
  "tidy-space": {
    title: "சுத்தமான கம்போங் பெருமை",
    summary: "சுத்தம் செய்வது பகிர்ந்த இடங்களுக்கு மரியாதை.",
    story:
      "பொம்மைகள், கேண்டீன் தட்டுப் பகுதி, பூங்கா பெஞ்ச் எதுவாயினும், நீங்கள் கண்டதை விட இடத்தைச் சிறப்பாக விடுவது கம்போங் பெருமை. நீங்கள் சந்திக்காத அண்டை வீட்டாரை அமைதியாகக் கவனிக்கும் வழி இது.",
    tryThis: "கேட்காமலே ஒரு பகிர்ந்த இடத்தில் உங்கள் பிறகு சுத்தம் செய்யுங்கள்.",
    reflectionPrompt: "எந்த இடத்தை அழகாக விட்டீர்கள்?",
  },
  "shoes-off": {
    title: "வாசலில் காலணிகள்",
    summary: "பல வீடுகளில் காலணிகளைக் கழற்றுவது மரியாதை.",
    story:
      "பல இந்திய வீடுகளிலும் — அனைத்து இன சிங்கப்பூர் வீடுகளிலும் — உள்ளே நுழைவதற்கு முன் காலணிகளைக் கழற்றுவோம். சுத்தமான பாதங்கள் வீட்டைச் சுத்தமாக வைத்து, குடும்ப இடத்திற்கு மரியாதை காட்டும். வரும்போது மற்றவர் என்ன செய்கிறார் என்று பாருங்கள், அல்லது மரியாதையாகக் கேளுங்கள்: 'காலணிகளைக் கழற்ற வேண்டுமா?'",
    tryThis: "வீட்டில் அல்லது வருகையில் மரியாதையாகக் கழற்றி காலணிகளை ஒழுங்காக வையுங்கள்.",
    reflectionPrompt: "ஒழுங்கான காலணிகள் எப்படி மரியாதை காட்டும்?",
  },
  "salam-respect": {
    title: "சலாம் & மென்மையான கைகள்",
    summary: "மரியாதையான வணக்கம் மென்மையாகவும் உண்மையாகவும் இருக்கலாம்.",
    story:
      "மலாய் முஸ்லிம்களிடம் சலாம் அமைதியின் வணக்கம். குழந்தைகள் அடிக்கடி மூத்தோரை அக்கறையுடனும் பணிவுடனும் வணங்குவர். சலாம் உங்கள் குடும்ப வழக்கமில்லாவிட்டாலும், மலாய் நண்பர்களை மரியாதையுடன் வணங்கி, மூத்தோரிடம் மென்மையாகப் பேசி, ஒருவர் வணங்கும் விதத்தை ஒருபோதும் கேலி செய்யாதீர்கள்.",
    tryThis: "வீட்டில் மூத்தவரை மென்மையான குரல், கண் தொடர்பு, அன்பான புன்னகையுடன் வணங்குங்கள்.",
    reflectionPrompt: "உங்கள் வணக்கம் எப்படி அமைதியைக் காட்டியது?",
  },
};

const missionZh: Record<string, MissionText> = {
  "mission-greet-someone": {
    title: "问候三个人",
    description: "今天用微笑和善意问候三个人。若可以，尊重地尝试一种其他文化的问候。",
    proofHint: "请家长/老师确认你问候了谁、怎么问候的。",
  },
  "mission-queue-turn": {
    title: "轮流等待",
    description: "在真实队伍中耐心等待——食堂、巴士、商店或游戏——不要插队。",
    proofHint: "家长确认你在哪里排队、是否公平等待。",
  },
  "mission-thank-elder": {
    title: "感谢长辈",
    description: "恭敬地向长辈问好或道谢。清楚的谢谢也算！",
    proofHint: "写下或说出你说了什么、长辈如何回应。",
  },
  "mission-share-kindness": {
    title: "分享善意",
    description: "与家人或同学分享食物、玩具轮流或一句温暖的话。",
    proofHint: "家长确认你分享了什么。",
  },
  "mission-bright-act": {
    title: "一件明亮的事",
    description: "做一件帮助或善意的事，照亮别人的一天。",
    proofHint: "描述你的明亮行动。家长确认。",
  },
  "mission-include-friend": {
    title: "接纳朋友",
    description: "邀请别人加入游戏或活动，让他们感到受欢迎。",
    proofHint: "你接纳了谁？做了什么让对方感到欢迎？",
  },
  "mission-magic-words": {
    title: "使用神奇用语",
    description: "真心各用至少一次请、谢谢和对不起。",
    proofHint: "家长确认今天听到了你的礼貌用语。",
  },
  "mission-tell-truth": {
    title: "勇敢说真话",
    description: "即使很难，也说出一件小事的真相。",
    proofHint: "家长确认你诚实又勇敢。",
  },
  "mission-learn-culture": {
    title: "学习一个传统",
    description: "礼貌地问朋友或家人的一个传统问题，并认真倾听。",
    proofHint: "写下一件你学到的事，以及你如何表达尊重。",
  },
  "mission-tidy-up": {
    title: "让它更整齐",
    description: "主动整理一个共用空间，不必等人提醒。",
    proofHint: "描述你整理了什么。家长确认。",
  },
  "mission-neat-shoes": {
    title: "整齐鞋子任务",
    description: "礼貌脱鞋，并在门口摆整齐。",
    proofHint: "家长确认你的鞋子摆放整齐。",
  },
  "mission-gentle-greeting": {
    title: "温柔的问候",
    description: "用轻柔的声音、眼神接触和温暖问候长辈。",
    proofHint: "家长或长辈确认你的温柔问候。",
  },
};

const missionMs: Record<string, MissionText> = {
  "mission-greet-someone": {
    title: "Sambut Tiga Orang",
    description:
      "Sambut tiga orang hari ini dengan senyuman dan kata baik. Cuba sekurang-kurangnya satu salam dari budaya lain jika boleh dengan hormat.",
    proofHint: "Minta ibu bapa/guru sahkan siapa yang anda sambut dan bagaimana.",
  },
  "mission-queue-turn": {
    title: "Tunggu Giliran Anda",
    description: "Tunggu dengan sabar dalam barisan nyata — kantin, bas, kedai, atau permainan — tanpa memotong.",
    proofHint: "Ibu bapa sahkan di mana anda beratur dan bahawa anda tunggu dengan adil.",
  },
  "mission-thank-elder": {
    title: "Ucap Terima Kasih kepada Warga Tua",
    description: "Sambut atau ucapkan terima kasih kepada warga tua dengan hormat. Terima kasih yang jelas dikira!",
    proofHint: "Tulis atau ceritakan apa yang anda kata dan bagaimana warga tua membalas.",
  },
  "mission-share-kindness": {
    title: "Kongsi Sesuatu yang Baik",
    description: "Kongsi makanan, giliran mainan, atau mesej baik dengan seseorang di rumah atau sekolah.",
    proofHint: "Ibu bapa sahkan apa yang anda kongsi.",
  },
  "mission-bright-act": {
    title: "Satu Perbuatan Cerah",
    description: "Lakukan satu perbuatan membantu atau baik yang mencerahkan hari seseorang.",
    proofHint: "Terangkan perbuatan cerah anda. Ibu bapa sahkan.",
  },
  "mission-include-friend": {
    title: "Sertakan Rakan",
    description: "Jemput seseorang ke permainan atau aktiviti dan bantu mereka rasa dialu-alukan.",
    proofHint: "Siapa yang anda sertakan, dan apa yang anda buat untuk menyambut mereka?",
  },
  "mission-magic-words": {
    title: "Guna Kata Ajaib",
    description: "Guna tolong, terima kasih, dan maaf dengan ikhlas sekurang-kurangnya sekali setiap satu.",
    proofHint: "Ibu bapa sahkan mereka dengar kata ajaib anda hari ini.",
  },
  "mission-tell-truth": {
    title: "Kebenaran Berani",
    description: "Beritahu kebenaran tentang sesuatu yang kecil, walaupun sukar.",
    proofHint: "Ibu bapa sahkan anda jujur dan berani.",
  },
  "mission-learn-culture": {
    title: "Pelajari Satu Tradisi",
    description: "Tanya soalan hormat tentang tradisi rakan atau keluarga dan dengar dengan teliti.",
    proofHint: "Tulis satu perkara yang anda pelajari dan bagaimana anda tunjukkan hormat.",
  },
  "mission-tidy-up": {
    title: "Tinggalkan Lebih Kemas",
    description: "Kemas satu ruang bersama tanpa diminta.",
    proofHint: "Terangkan apa yang anda kemaskan. Ibu bapa sahkan.",
  },
  "mission-neat-shoes": {
    title: "Misi Kasut Kemas",
    description: "Tanggalkan kasut dengan sopan dan letakkannya kemas di pintu.",
    proofHint: "Ibu bapa sahkan kasut anda kemas.",
  },
  "mission-gentle-greeting": {
    title: "Salam Lembut",
    description: "Sambut warga tua dengan suara lembut, kontak mata, dan kehangatan.",
    proofHint: "Ibu bapa atau warga tua sahkan salam lembut anda.",
  },
};

const missionTa: Record<string, MissionText> = {
  "mission-greet-someone": {
    title: "மூவரை வணங்குங்கள்",
    description:
      "இன்று புன்னகையும் அன்பான சொற்களுடன் மூவரை வணங்குங்கள். முடிந்தால் மற்றொரு பண்பாட்டின் வணக்கத்தை மரியாதையுடன் முயற்சிக்கவும்.",
    proofHint: "யாரை எப்படி வணங்கினீர்கள் என்பதைப் பெற்றோர்/ஆசிரியர் உறுதிப்படுத்தட்டும்.",
  },
  "mission-queue-turn": {
    title: "உங்கள் முறைக்காக காத்திருங்கள்",
    description: "உண்மை வரிசையில் பொறுமையாக காத்திருங்கள் — கேண்டீன், பேருந்து, கடை அல்லது விளையாட்டு — முந்தாதீர்கள்.",
    proofHint: "எங்கே வரிசையில் நின்றீர்கள், நியாயமாக காத்திருந்தீர்களா என்பதைப் பெற்றோர் உறுதிப்படுத்தட்டும்.",
  },
  "mission-thank-elder": {
    title: "மூத்தவருக்கு நன்றி",
    description: "மூத்தவரை மரியாதையுடன் வணங்குங்கள் அல்லது நன்றி சொல்லுங்கள். தெளிவான நன்றியும் கணக்கில்!",
    proofHint: "என்ன சொன்னீர்கள், மூத்தவர் எப்படி பதிலளித்தார் என்பதை எழுதுங்கள் அல்லது சொல்லுங்கள்.",
  },
  "mission-share-kindness": {
    title: "அன்பைப் பகிருங்கள்",
    description: "வீடு அல்லது பள்ளியில் உணவு, பொம்மை முறை அல்லது அன்பான செய்தியைப் பகிருங்கள்.",
    proofHint: "என்ன பகிர்ந்தீர்கள் என்பதைப் பெற்றோர் உறுதிப்படுத்தட்டும்.",
  },
  "mission-bright-act": {
    title: "ஒரு ஒளிச் செயல்",
    description: "ஒருவரின் நாளை ஒளிரச் செய்யும் உதவி அல்லது அன்பான செயல் ஒன்று செய்யுங்கள்.",
    proofHint: "உங்கள் ஒளிச் செயலை விவரிக்கவும். பெற்றோர் உறுதிப்படுத்தட்டும்.",
  },
  "mission-include-friend": {
    title: "நண்பரைச் சேர்த்துக் கொள்ளுங்கள்",
    description: "ஒருவரை விளையாட்டு அல்லது செயலில் அழைத்து வரவேற்ற உணர்வைத் தருங்கள்.",
    proofHint: "யாரைச் சேர்த்தீர்கள், எப்படி வரவேற்றீர்கள்?",
  },
  "mission-magic-words": {
    title: "மந்திரச் சொற்களைப் பயன்படுத்துங்கள்",
    description: "தயவுசெய்து, நன்றி, மன்னிக்கவும் ஆகியவற்றை உண்மையாக ஒவ்வொன்றும் ஒருமுறை பயன்படுத்துங்கள்.",
    proofHint: "இன்று உங்கள் மந்திரச் சொற்களைக் கேட்டதாகப் பெற்றோர் உறுதிப்படுத்தட்டும்.",
  },
  "mission-tell-truth": {
    title: "தைரியமான உண்மை",
    description: "கடினமாக இருந்தாலும் ஒரு சிறிய விஷயத்தின் உண்மையைச் சொல்லுங்கள்.",
    proofHint: "நீங்கள் நேர்மையாகவும் தைரியமாகவும் இருந்தீர்கள் என்பதைப் பெற்றோர் உறுதிப்படுத்தட்டும்.",
  },
  "mission-learn-culture": {
    title: "ஒரு பாரம்பரியத்தைக் கற்றுக்கொள்ளுங்கள்",
    description: "நண்பர் அல்லது குடும்ப பாரம்பரியம் பற்றி மரியாதையான கேள்வி கேட்டு கவனமாகக் கேளுங்கள்.",
    proofHint: "கற்ற ஒன்றையும் மரியாதை எப்படி காட்டினீர்கள் என்பதையும் எழுதுங்கள்.",
  },
  "mission-tidy-up": {
    title: "மேலும் அழகாக விடுங்கள்",
    description: "கேட்காமலே ஒரு பகிர்ந்த இடத்தைச் சுத்தம் செய்யுங்கள்.",
    proofHint: "என்ன சுத்தம் செய்தீர்கள் என்பதை விவரிக்கவும். பெற்றோர் உறுதிப்படுத்தட்டும்.",
  },
  "mission-neat-shoes": {
    title: "ஒழுங்கான காலணிப் பணி",
    description: "மரியாதையாகக் கழற்றி வாசலில் காலணிகளை ஒழுங்காக வையுங்கள்.",
    proofHint: "காலணிகள் ஒழுங்காக இருந்தன என்பதைப் பெற்றோர் உறுதிப்படுத்தட்டும்.",
  },
  "mission-gentle-greeting": {
    title: "மென்மையான வணக்கம்",
    description: "மென்மையான குரல், கண் தொடர்பு, அன்புடன் மூத்தவரை வணங்குங்கள்.",
    proofHint: "பெற்றோர் அல்லது மூத்தவர் உங்கள் மென்மையான வணக்கத்தை உறுதிப்படுத்தட்டும்.",
  },
};

const badgeZh: Record<string, BadgeText> = {
  "badge-hello-hero": { name: "问候英雄", description: "跨文化温暖地问候他人。" },
  "badge-fair-friend": { name: "公平朋友", description: "耐心公平地排队等待。" },
  "badge-filial-star": { name: "孝亲之星", description: "向长辈表达尊重与感谢。" },
  "badge-generous-heart": { name: "慷慨之心", description: "像开斋节好客一样分享善意。" },
  "badge-light-bringer": { name: "光明使者", description: "用善意照亮别人的一天。" },
  "badge-welcome-host": { name: "欢迎主人", description: "让别人感到被接纳。" },
  "badge-polite-parrot": { name: "礼貌小鹦", description: "真心使用请、谢谢和对不起。" },
  "badge-truth-keeper": { name: "守真者", description: "即使很难也选择诚实。" },
  "badge-harmony-helper": { name: "和谐小助手", description: "尊重地学习另一种文化。" },
  "badge-kampung-keeper": { name: "甘榜守护者", description: "爱护共用空间。" },
  "badge-neat-feet": { name: "整齐小脚", description: "整齐摆放鞋子以尊重家庭。" },
  "badge-peace-greeter": { name: "和平问候者", description: "献上温柔尊重的问候。" },
};

const badgeMs: Record<string, BadgeText> = {
  "badge-hello-hero": { name: "Wira Salam", description: "Menyambut orang lain dengan mesra merentas budaya." },
  "badge-fair-friend": { name: "Rakan Adil", description: "Menunggu dalam barisan dengan sabar dan adil." },
  "badge-filial-star": { name: "Bintang Berbakti", description: "Menunjukkan hormat dan terima kasih kepada warga tua." },
  "badge-generous-heart": { name: "Hati Murah", description: "Berkongsi kebaikan seperti keramahan Hari Raya." },
  "badge-light-bringer": { name: "Pembawa Cahaya", description: "Mencerahkan hari seseorang dengan kebaikan." },
  "badge-welcome-host": { name: "Tuan Rumah Mesra", description: "Membuat seseorang rasa disertakan." },
  "badge-polite-parrot": { name: "Nuri Sopan", description: "Menggunakan tolong, terima kasih, dan maaf dengan makna." },
  "badge-truth-keeper": { name: "Penjaga Kebenaran", description: "Memilih kejujuran walaupun sukar." },
  "badge-harmony-helper": { name: "Pembantu Harmoni", description: "Belajar tentang budaya lain dengan hormat." },
  "badge-kampung-keeper": { name: "Penjaga Kampung", description: "Menjaga ruang bersama." },
  "badge-neat-feet": { name: "Kaki Kemas", description: "Menghormati rumah dengan meletakkan kasut kemas." },
  "badge-peace-greeter": { name: "Penyambut Damai", description: "Memberi salam lembut yang hormat." },
};

const badgeTa: Record<string, BadgeText> = {
  "badge-hello-hero": { name: "வணக்க வீரன்", description: "பண்பாடுகளைக் கடந்து அன்புடன் வணங்கினார்." },
  "badge-fair-friend": { name: "நியாய நண்பன்", description: "பொறுமையாகவும் நியாயமாகவும் வரிசையில் காத்திருந்தார்." },
  "badge-filial-star": { name: "பக்தி நட்சத்திரம்", description: "மூத்தவருக்கு மரியாதையும் நன்றியும் காட்டினார்." },
  "badge-generous-heart": { name: "தாராள இதயம்", description: "ஹரி ராயா விருந்தோம்பல் போல் அன்பு பகிர்ந்தார்." },
  "badge-light-bringer": { name: "ஒளி கொணர்வோன்", description: "அன்பால் ஒருவரின் நாளை ஒளிரச் செய்தார்." },
  "badge-welcome-host": { name: "வரவேற்பு விருந்தோம்பி", description: "ஒருவர் சேர்ந்த உணர்வை உருவாக்கினார்." },
  "badge-polite-parrot": { name: "மரியாதை கிளி", description: "தயவுசெய்து, நன்றி, மன்னிக்கவும் உண்மையாகப் பயன்படுத்தினார்." },
  "badge-truth-keeper": { name: "உண்மை காப்போன்", description: "கடினமாக இருந்தாலும் நேர்மையைத் தேர்ந்தெடுத்தார்." },
  "badge-harmony-helper": { name: "நல்லிணக்க உதவியாளர்", description: "மற்றொரு பண்பாட்டை மரியாதையுடன் கற்றார்." },
  "badge-kampung-keeper": { name: "கம்போங் காப்போன்", description: "பகிர்ந்த இடத்தைப் பேணினார்." },
  "badge-neat-feet": { name: "ஒழுங்கான பாதங்கள்", description: "காலணிகளை ஒழுங்காக வைத்து வீட்டிற்கு மரியாதை." },
  "badge-peace-greeter": { name: "அமைதி வணங்குவோன்", description: "மென்மையான மரியாதை வணக்கம் அளித்தார்." },
};

function lessonOverlay(locale: Locale) {
  if (locale === "zh") return lessonZh;
  if (locale === "ms") return lessonMs;
  if (locale === "ta") return lessonTa;
  return null;
}

function missionOverlay(locale: Locale) {
  if (locale === "zh") return missionZh;
  if (locale === "ms") return missionMs;
  if (locale === "ta") return missionTa;
  return null;
}

function badgeOverlay(locale: Locale) {
  if (locale === "zh") return badgeZh;
  if (locale === "ms") return badgeMs;
  if (locale === "ta") return badgeTa;
  return null;
}

export function localizeLesson(lesson: Lesson, locale: Locale): Lesson {
  const overlay = lessonOverlay(locale)?.[lesson.id];
  return overlay ? { ...lesson, ...overlay } : lesson;
}

export function localizeMission(mission: Mission, locale: Locale): Mission {
  const overlay = missionOverlay(locale)?.[mission.id];
  return overlay ? { ...mission, ...overlay } : mission;
}

export function localizeBadge(badge: Badge, locale: Locale): Badge {
  const overlay = badgeOverlay(locale)?.[badge.id];
  return overlay ? { ...badge, ...overlay } : badge;
}

export function getLocalizedLesson(id: string, locale: Locale) {
  const lesson = getLesson(id);
  return lesson ? localizeLesson(lesson, locale) : undefined;
}

export function getLocalizedMission(id: string, locale: Locale) {
  const mission = getMission(id);
  return mission ? localizeMission(mission, locale) : undefined;
}

export function getLocalizedBadge(id: string, locale: Locale) {
  const badge = getBadge(id);
  return badge ? localizeBadge(badge, locale) : undefined;
}

export function localizedLessonsForAge(ageBand: string, locale: Locale) {
  return lessons
    .filter((l) => l.ageBands.includes(ageBand as never))
    .map((l) => localizeLesson(l, locale));
}

export function localizedMissions(locale: Locale) {
  return missions.map((m) => localizeMission(m, locale));
}

export function localizedBadges(locale: Locale) {
  return badges.map((b) => localizeBadge(b, locale));
}
