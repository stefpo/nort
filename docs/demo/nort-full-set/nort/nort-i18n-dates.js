/*!
 * NORT web UI component library
 * Copyright(c) 2016-2020 Stephane Potelle 
 * MIT Licensed
*/

const localeDefs= {
    "def" : {
       "name" : "Invariant Language (Invariant Country)",
       "dateFormat" : "/MDY",
       "dateFormatFixed" : "True",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["Su","Mo","Tu","We","Th","Fr","Sa"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
       "fixed" : true
       // 02/01/2013
    },
    "ar" : {
       "name" : "Arabic",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 21/03/34
    },
    "bg" : {
       "name" : "Bulgarian",
       "dateFormat" : ".YMD",
       "dateFormatFixed" : "False",
       "months" : ["януари","февруари","март","април","май","юни","юли","август","септември","октомври","ноември","декември"],
       "daysShort" : ["н","п","в","с","ч","п","с"],
       "days" : ["неделя","понеделник","вторник","сряда","четвъртък","петък","събота"]
       // 1.2.2013 г.
    },
    "ca" : {
       "name" : "Catalan",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"],
       "daysShort" : ["g","l","t","c","j","v","s"],
       "days" : ["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"],
       "fixed" : true
       // 01/02/2013
    },
    "zh-CHS" : {
       "name" : "Chinese (Simplified) Legacy",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
       "daysShort" : ["日","一","二","三","四","五","六"],
       "days" : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
       // 2013/2/1
    },
    "zh-Hans" : {
       "name" : "Chinese (Simplified)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
       "daysShort" : ["日","一","二","三","四","五","六"],
       "days" : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
       // 2013/2/1
    },
    "cs" : {
       "name" : "Czech",
       "dateFormat" : ". YM",
       "dateFormatFixed" : "False",
       "months" : ["leden","únor","březen","duben","květen","červen","červenec","srpen","září","říjen","listopad","prosinec"],
       "daysShort" : ["N","P","Ú","S","Č","P","S"],
       "days" : ["neděle","pondělí","úterý","středa","čtvrtek","pátek","sobota"]
       // 1. 2. 2013
    },
    "da" : {
       "name" : "Danish",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december"],
       "daysShort" : ["S","M","T","O","T","F","L"],
       "days" : ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
       "fixed" : true
       // 01-02-2013
    },
    "de" : {
       "name" : "German",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
       "daysShort" : ["S","M","D","M","D","F","S"],
       "days" : ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
       "fixed" : true
       // 01.02.2013
    },
    "el" : {
       "name" : "Greek",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"],
       "daysShort" : ["Κ","Δ","Τ","Τ","Π","Π","Σ"],
       "days" : ["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"]
       // 1/2/2013
    },
    "en" : {
       "name" : "English",
       "dateFormat" : "/MDY",
       "dateFormatFixed" : "False",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
       // 2/1/2013
    },
    "es" : {
       "name" : "Spanish",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","X","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "fi" : {
       "name" : "Finnish",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],
       "daysShort" : ["S","M","T","K","T","P","L"],
       "days" : ["sunnuntaina","maanantaina","tiistaina","keskiviikkona","torstaina","perjantaina","lauantaina"]
       // 1.2.2013
    },
    "fr" : {
       "name" : "French",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
       "fixed" : true
       // 01/02/2013
    },
    "he" : {
       "name" : "Hebrew",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],
       "daysShort" : ["א","ב","ג","ד","ה","ו","ש"],
       "days" : ["יום ראשון","יום שני","יום שלישי","יום רביעי","יום חמישי","יום שישי","יום שבת"],
       "fixed" : true
       // 01/02/2013
    },
    "hu" : {
       "name" : "Hungarian",
       "dateFormat" : ".YMD",
       "dateFormatFixed" : "True",
       "months" : ["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"],
       "daysShort" : ["V","H","K","Sz","Cs","P","Sz"],
       "days" : ["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"],
       "fixed" : true
       // 2013.02.01.
    },
    "is" : {
       "name" : "Icelandic",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["janúar","febrúar","mars","apríl","maí","júní","júlí","ágúst","september","október","nóvember","desember"],
       "daysShort" : ["s","m","þ","m","f","f","l"],
       "days" : ["sunnudagur","mánudagur","þriðjudagur","miðvikudagur","fimmtudagur","föstudagur","laugardagur"]
       // 1.2.2013
    },
    "it" : {
       "name" : "Italian",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],
       "daysShort" : ["D","L","M","M","G","V","S"],
       "days" : ["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],
       "fixed" : true
       // 01/02/2013
    },
    "ja" : {
       "name" : "Japanese",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
       "daysShort" : ["日","月","火","水","木","金","土"],
       "days" : ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
       "fixed" : true
       // 2013/02/01
    },
    "ko" : {
       "name" : "Korean",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
       "daysShort" : ["일","월","화","수","목","금","토"],
       "days" : ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
       "fixed" : true
       // 2013-02-01
    },
    "nl" : {
       "name" : "Dutch",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "False",
       "months" : ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],
       "daysShort" : ["Z","M","D","W","D","V","Z"],
       "days" : ["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"]
       // 1-2-2013
    },
    "no" : {
       "name" : "Norwegian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"],
       "daysShort" : ["S","M","T","O","T","F","L"],
       "days" : ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
       "fixed" : true
       // 01.02.2013
    },
    "pl" : {
       "name" : "Polish",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"],
       "daysShort" : ["N","P","W","Ś","C","P","S"],
       "days" : ["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"],
       "fixed" : true
       // 2013-02-01
    },
    "pt" : {
       "name" : "Portuguese",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],
       "daysShort" : ["D","S","T","Q","Q","S","S"],
       "days" : ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "rm" : {
       "name" : "Romansh",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["schaner","favrer","mars","avrigl","matg","zercladur","fanadur","avust","settember","october","november","december"],
       "daysShort" : ["D","G","M","M","G","V","S"],
       "days" : ["dumengia","glindesdi","mardi","mesemna","gievgia","venderdi","sonda"],
       "fixed" : true
       // 01-02-2013
    },
    "ro" : {
       "name" : "Romanian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["duminică","luni","marți","miercuri","joi","vineri","sâmbătă"],
       "fixed" : true
       // 01.02.2013
    },
    "ru" : {
       "name" : "Russian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
       "daysShort" : ["В","П","В","С","Ч","П","С"],
       "days" : ["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],
       "fixed" : true
       // 01.02.2013
    },
    "hr" : {
       "name" : "Croatian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["siječanj","veljača","ožujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac"],
       "daysShort" : ["n","p","u","s","č","p","s"],
       "days" : ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"]
       // 1.2.2013.
    },
    "sk" : {
       "name" : "Slovak",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["január","február","marec","apríl","máj","jún","júl","august","september","október","november","december"],
       "daysShort" : ["N","P","U","S","Š","P","S"],
       "days" : ["nedeľa","pondelok","utorok","streda","štvrtok","piatok","sobota"]
       // 1.2.2013
    },
    "sq" : {
       "name" : "Albanian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["janar","shkurt","mars","prill","maj","qershor","korrik","gusht","shtator","tetor","nëntor","dhjetor"],
       "daysShort" : ["D","H","M","M","E","P","S"],
       "days" : ["e diel","e hënë","e martë","e mërkurë","e enjte","e premte","e shtunë"]
       // 1.2.2013
    },
    "sv" : {
       "name" : "Swedish",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"],
       "daysShort" : ["S","M","T","O","T","F","L"],
       "days" : ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],
       "fixed" : true
       // 2013-02-01
    },
    "th" : {
       "name" : "Thai",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["","","","","","","","","","","",""],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""]
       // 1/2/2556
    },
    "tr" : {
       "name" : "Turkish",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
       "daysShort" : ["P","P","S","Ç","P","C","C"],
       "days" : ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"]
       // 1.2.2013
    },
    "ur" : {
       "name" : "Urdu",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["جنوری","فروری","مارچ","اپريل","مئ","جون","جولائ","اگست","ستمبر","اکتوبر","نومبر","دسمبر"],
       "daysShort" : ["","","","","","",""],
       "days" : ["اتوار","پير","منگل","بده","جمعرات","جمعہ","ہفتہ"],
       "fixed" : true
       // 01/02/2013
    },
    "id" : {
       "name" : "Indonesian",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
       "daysShort" : ["M","S","S","R","K","J","S"],
       "days" : ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],
       "fixed" : true
       // 01/02/2013
    },
    "uk" : {
       "name" : "Ukrainian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],
       "daysShort" : ["Н","П","В","С","Ч","П","С"],
       "days" : ["Неділя","Понеділок","Вівторок","Середа","Четвер","Пʼятниця","Субота"],
       "fixed" : true
       // 01.02.2013
    },
    "be" : {
       "name" : "Belarusian",
       "dateFormat" : ".YMD",
       "dateFormatFixed" : "True",
       "months" : ["студзень","люты","сакавік","красавік","травень","чэрвень","ліпень","жнівень","верасень","кастрычнік","лістапад","снежань"],
       "daysShort" : ["н","п","а","с","ч","п","с"],
       "days" : ["нядзеля","панядзелак","аўторак","серада","чацвер","пятніца","субота"],
       "fixed" : true
       // 01.02.13
    },
    "sl" : {
       "name" : "Slovenian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december"],
       "daysShort" : ["n","p","t","s","č","p","s"],
       "days" : ["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"]
       // 1.2.2013
    },
    "et" : {
       "name" : "Estonian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["jaanuar","veebruar","märts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember"],
       "daysShort" : ["P","E","T","K","N","R","L"],
       "days" : ["pühapäev","esmaspäev","teisipäev","kolmapäev","neljapäev","reede","laupäev"]
       // 1.02.2013
    },
    "lv" : {
       "name" : "Latvian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["janvāris","februāris","marts","aprīlis","maijs","jūnijs","jūlijs","augusts","septembris","oktobris","novembris","decembris"],
       "daysShort" : ["S","P","O","T","C","P","S"],
       "days" : ["svētdiena","pirmdiena","otrdiena","trešdiena","ceturtdiena","piektdiena","sestdiena"],
       "fixed" : true
       // 01.02.2013.
    },
    "lt" : {
       "name" : "Lithuanian",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["Sausis","Vasaris","Kovas","Balandis","Gegužė","Birželis","Liepa","Rugpjūtis","Rugsėjis","Spalis","Lapkritis","Gruodis"],
       "daysShort" : ["S","P","A","T","K","P","Š"],
       "days" : ["sekmadienis","pirmadienis","antradienis","trečiadienis","ketvirtadienis","penktadienis","šeštadienis"],
       "fixed" : true
       // 2013-02-01
    },
    "tg" : {
       "name" : "Tajik",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Якшанбе","Душанбе","Сешанбе","Чоршанбе","Панҷшанбе","Ҷумъа","Шанбе"],
       "fixed" : true
       // 01.02.2013
    },
    "fa" : {
       "name" : "Persian",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["ژانویه","فوریه","مارس","آوریل","مه","ژوئن","ژوئیه","اوت","سپتامبر","اکتبر","نوامبر","دسامبر"],
       "daysShort" : ["ی","د","س","چ","پ","ج","ش"],
       "days" : ["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
       "fixed" : true
       // 01/02/2013
    },
    "vi" : {
       "name" : "Vietnamese",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["tháng một","tháng hai","tháng ba","tháng tư","tháng năm","tháng sáu","tháng bảy","tháng tám","tháng chín","tháng mười","tháng mười một","tháng mười hai"],
       "daysShort" : ["CN","T2","T3","T4","T5","T6","T7"],
       "days" : ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"],
       "fixed" : true
       // 01/02/2013
    },
    "hy" : {
       "name" : "Armenian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Հունվար","Փետրվար","Մարտ","Ապրիլ","Մայիս","Հունիս","Հուլիս","Օգոստոս","Սեպտեմբեր","Հոկտեմբեր","Նոյեմբեր","Դեկտեմբեր"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Կիրակի","Երկուշաբթի","Երեքշաբթի","Չորեքշաբթի","Հինգշաբթի","Ուրբաթ","Շաբաթ"],
       "fixed" : true
       // 01.02.2013
    },
    "az" : {
       "name" : "Azerbaijani",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Yanvar","Fevral","Mart","Aprel","May","İyun","İyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr"],
       "daysShort" : ["7","1","2","3","4","5","6"],
       "days" : ["bazar","bazar ertəsi","çərşənbə axşamı","çərşənbə","cümə axşamı","cümə","şənbə"],
       "fixed" : true
       // 01.02.2013
    },
    "eu" : {
       "name" : "Basque",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["urtarrila","otsaila","martxoa","apirila","maiatza","ekaina","uztaila","abuztua","iraila","urria","azaroa","abendua"],
       "daysShort" : ["I","M","A","L","A","O","I"],
       "days" : ["igandea","astelehena","asteartea","asteazkena","osteguna","ostirala","larunbata"],
       "fixed" : true
       // 2013/02/01
    },
    "mk" : {
       "name" : "Macedonian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември"],
       "daysShort" : ["н","п","в","с","ч","п","с"],
       "days" : ["недела","понеделник","вторник","среда","четврток","петок","сабота"],
       "fixed" : true
       // 01.02.2013
    },
    "tn" : {
       "name" : "Tswana",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["Ferikgong","Tlhakole","Mopitlo","Moranang","Motsheganang","Seetebosigo","Phukwi","Phatwe","Lwetse","Diphalane","Ngwanatsele","Sedimonthole"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Tshipi","Mosopulogo","Labobedi","Laboraro","Labone","Labotlhano","Matlhatso"],
       "fixed" : true
       // 01/02/13
    },
    "xh" : {
       "name" : "Xhosa",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["Janyuwari","Februwari","Matshi","Epreli","Meyi","Juni","Julayi","Agasti","Septemba","Okthoba","Novemba","Disemba"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Cawe","Mvulo","Lwesibini","Lwesithathu","Lwesine","Lwesihlanu","Mgqibelo"],
       "fixed" : true
       // 2013/02/01
    },
    "zu" : {
       "name" : "Zulu",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["uJanuwari","uFebruwari","uMashi","u-Apreli","uMeyi","uJuni","uJulayi","uAgasti","uSepthemba","u-Okthoba","uNovemba","uDisemba"],
       "daysShort" : ["S","M","B","T","S","H","M"],
       "days" : ["Sonto","Msombuluko","Lwesibili","Lwesithathu","uLwesine","Lwesihlanu","Mgqibelo"],
       "fixed" : true
       // 01-02-2013
    },
    "af" : {
       "name" : "Afrikaans",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["Januarie","Februarie","Maart","April","Mei","Junie","Julie","Augustus","September","Oktober","November","Desember"],
       "daysShort" : ["S","M","D","W","D","V","S"],
       "days" : ["Sondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrydag","Saterdag"],
       "fixed" : true
       // 2013/02/01
    },
    "ka" : {
       "name" : "Georgian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი","ივლის","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი"],
       "daysShort" : ["კ","ო","ს","ო","ხ","პ","შ"],
       "days" : ["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"],
       "fixed" : true
       // 01.02.2013
    },
    "fo" : {
       "name" : "Faroese",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["januar","februar","mars","apríl","mai","juni","juli","august","september","oktober","november","desember"],
       "daysShort" : ["S","M","T","M","H","F","L"],
       "days" : ["sunnudagur","mánadagur","týsdagur","mikudagur","hósdagur","fríggjadagur","leygardagur"],
       "fixed" : true
       // 01-02-2013
    },
    "hi" : {
       "name" : "Hindi",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर"],
       "daysShort" : ["र","सो","मं","बु","गु","शु","श"],
       "days" : ["रविवार","सोमवार","मंगलवार","बुधवार","बृहस्पतिवार","शुक्रवार","शनिवार"],
       "fixed" : true
       // 01-02-2013
    },
    "mt" : {
       "name" : "Maltese",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Jannar","Frar","Marzu","April","Mejju","Ġunju","Lulju","Awwissu","Settembru","Ottubru","Novembru","Diċembru"],
       "daysShort" : ["Ħ","T","T","E","Ħ","Ġ","S"],
       "days" : ["Il-Ħadd","It-Tnejn","It-Tlieta","L-Erbgħa","Il-Ħamis","Il-Ġimgħa","Is-Sibt"],
       "fixed" : true
       // 01/02/2013
    },
    "se" : {
       "name" : "Northern Sami",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["ođđajagemánnu","guovvamánnu","njukčamánnu","cuoŋománnu","miessemánnu","geassemánnu","suoidnemánnu","borgemánnu","čakčamánnu","golggotmánnu","skábmamánnu","juovlamánnu"],
       "daysShort" : ["S","V","M","G","D","B","L"],
       "days" : ["sotnabeaivi","vuossárga","maŋŋebárga","gaskavahkku","duorasdat","bearjadat","lávvardat"],
       "fixed" : true
       // 01.02.2013
    },
    "ga" : {
       "name" : "Irish",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Eanáir","Feabhra","Márta","Aibreán","Bealtaine","Meitheamh","Iúil","Lúnasa","Meán Fómhair","Deireadh Fómhair","Samhain","Nollaig"],
       "daysShort" : ["D","L","M","C","D","A","S"],
       "days" : ["Dé Domhnaigh","Dé Luain","Dé Máirt","Dé Céadaoin","Déardaoin","Dé hAoine","Dé Sathairn"],
       "fixed" : true
       // 01/02/2013
    },
    "ms" : {
       "name" : "Malay",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"],
       "daysShort" : ["A","I","S","R","K","J","S"],
       "days" : ["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"],
       "fixed" : true
       // 01/02/2013
    },
    "kk" : {
       "name" : "Kazakh",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "False",
       "months" : ["қаңтар","Ақпан","наурыз","сәуір","мамыр","маусым","шілде","тамыз","қыркүйек","қазан","қараша","желтоқсан"],
       "daysShort" : ["1","","","4","5","6","7"],
       "days" : ["жексені","дуйсенбі","сейсенбі","сәренбі","бейсенбі","жұма","сенбі"]
       // 1-ақп.-13
    },
    "ky" : {
       "name" : "Kirghiz",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "False",
       "months" : ["","","","","","","","","","","",""],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""]
       // 1-2 13
    },
    "sw" : {
       "name" : "Swahili",
       "dateFormat" : "/MDY",
       "dateFormatFixed" : "False",
       "months" : ["Januari","Februari","Machi","Aprili","Mei","Juni","Julai","Agosti","Septemba","Oktoba","Novemba","Desemba"],
       "daysShort" : ["2","3","4","5","A","I","1"],
       "days" : ["Jumapili","Jumatatu","Jumanne","Jumatano","Alhamisi","Ijumaa","Jumamosi"]
       // 2/1/2013
    },
    "uz" : {
       "name" : "Uzbek",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр"],
       "daysShort" : ["Я","Д","С","Ч","П","Ж","Ш"],
       "days" : ["якшанба","душанба","сешанба","чоршанба","пайшанба","жума","шанба"],
       "fixed" : true
       // 01.02.2013
    },
    "bn" : {
       "name" : "Bengali",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["জানুয়ারী","ফেব্রুয়ারী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],
       "daysShort" : ["র","সো","ম","বু","বৃ","শু","শ"],
       "days" : ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহষ্পতিবার","শুক্রবার","শনিবার"],
       "fixed" : true
       // 01-02-13
    },
    "pa" : {
       "name" : "Punjabi",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ"],
       "daysShort" : ["ਐ","ਸੋ","ਮੰ","ਬੁੱ","ਵੀ","ਸ਼ੁੱ","ਸ਼"],
       "days" : ["ਐਤਵਾਰ","ਸੋਮਵਾਰ","ਮੰਗਲਵਾਰ","ਬੁਧਵਾਰ","ਵੀਰਵਾਰ","ਸ਼ੁੱਕਰਵਾਰ","ਸ਼ਨੀਚਰਵਾਰ"],
       "fixed" : true
       // 01-02-13
    },
    "gu" : {
       "name" : "Gujarati",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["જાન્યુઆરી","ફેબ્રુઆરી","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટેમ્બર","ઑક્ટ્બર","નવેમ્બર","ડિસેમ્બર"],
       "daysShort" : ["ર","સો","મં","બુ","ગુ","શુ","શ"],
       "days" : ["રવિવાર","સોમવાર","મંગળવાર","બુધવાર","ગુરુવાર","શુક્રવાર","શનિવાર"],
       "fixed" : true
       // 01-02-13
    },
    "or" : {
       "name" : "Oriya",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["ଜାନୁଆରୀ","ଫେବ୍ରୁୟାରୀ","ମାର୍ଚ୍ଚ","ଅପ୍ରେଲ","ମେ","ଜୁନ","ଜୁଲାଇ","ଅଗଷ୍ଟ","ସେପ୍ଟେମ୍ବର","ଅକ୍ଟୋବର","ନଭେମ୍ବର","ଡିସେମ୍ବର"],
       "daysShort" : ["ର","ସୋ","ମ","ବୁ","ଗୁ","ଶୁ","ଶ"],
       "days" : ["ରବିବାର","ସୋମବାର","ମଙ୍ଗଳବାର","ବୁଧବାର","ଗୁରୁବାର","ଶୁକ୍ରବାର","ଶନିବାର"],
       "fixed" : true
       // 01-02-13
    },
    "ta" : {
       "name" : "Tamil",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்டு","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்"],
       "daysShort" : ["ஞா","தி","செ","பு","வி","வெ","ச"],
       "days" : ["ஞாயிறு","திங்கள்","செவ்வாய்","புதன்","வியாழன்","வெள்ளி","சனி"],
       "fixed" : true
       // 01-02-2013
    },
    "te" : {
       "name" : "Telugu",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["జనవరి","ఫిబ్రవరి","మార్చి","ఎప్రిల్","మే","జూన్","జూలై","ఆగస్టు","సెప్టెంబర్","అక్టోబర్","నవంబర్","డిసెంబర్"],
       "daysShort" : ["ఆ","సో","మ","బు","గు","శు","శ"],
       "days" : ["ఆదివారం","సోమవారం","మంగళవారం","బుధవారం","గురువారం","శుక్రవారం","శనివారం"],
       "fixed" : true
       // 01-02-13
    },
    "kn" : {
       "name" : "Kannada",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["ಜನವರೀ","ಫೆಬ್ರವರೀ","ಮಾರ್ಚ್","ಎಪ್ರಿಲ್","ಮೆ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸಪ್ಟೆಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್"],
       "daysShort" : ["ರ","ಸೋ","ಮಂ","ಬು","ಗು","ಶು","ಶ"],
       "days" : ["ರವಿವಾರ","ಸೋಮವಾರ","ಮಂಗಳವಾರ","ಬುಧವಾರ","ಗುರುವಾರ","ಶುಕ್ರವಾರ","ಶನಿವಾರ"],
       "fixed" : true
       // 01-02-13
    },
    "ml" : {
       "name" : "Malayalam",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["ജനുവരി","ഫെബ്രുവരി","മാര്‍ച്ച്","ഏപ്രില്‍","മേയ്","ജൂണ്‍","ജൂലൈ","ആഗസ്റ്റ്","സെപ്റ്റംബര്‍","ഒക്ടോബര്‍","നവംബര്‍","ഡിസംബര്‍"],
       "daysShort" : ["ഞാ","തി","ചൊ","ബു","വ്യാ","വെ","ശ"],
       "days" : ["ഞായറാഴ്ച","തിങ്കളാഴ്ച","ചൊവ്വാഴ്ച","ബുധനാഴ്ച","വ്യാഴാഴ്ച","വെള്ളിയാഴ്ച","ശനിയാഴ്ച"],
       "fixed" : true
       // 01-02-13
    },
    "as" : {
       "name" : "Assamese",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["জানুৱাৰী","ফেব্ৰুৱাৰী","মাৰ্চ","এপ্ৰিল","মে","জুন","জুলাই","আগষ্ট","ছেপ্তেম্বৰ","অক্টোবৰ","নৱেম্বৰ","ডিচেম্বৰ"],
       "daysShort" : ["","","","","","",""],
       "days" : ["দেওবাৰ","সোমবাৰ","মঙ্গলবাৰ","বুধবাৰ","বৃহষ্পতিবাৰ","শুক্ৰবাৰ","শনিবাৰ"],
       "fixed" : true
       // 01-02-2013
    },
    "mr" : {
       "name" : "Marathi",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोव्हेंबर","डिसेंबर"],
       "daysShort" : ["र","सो","मं","बु","गु","शु","श"],
       "days" : ["रविवार","सोमवार","मंगळवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
       "fixed" : true
       // 01-02-2013
    },
    "mn" : {
       "name" : "Mongolian",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["Хулгана","Үхэр","Бар","Туулай","Луу","Могой","Морь","Хонь","Бич","Тахиа","Нохой","Гахай"],
       "daysShort" : ["","","","","","",""],
       "days" : ["ням","даваа","мягмар","лхагва","пүрэв","баасан","бямба"],
       "fixed" : true
       // 2013-02-01
    },
    "bo" : {
       "name" : "Tibetan",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["ཟླ་བ་དང་པོ་","ཟླ་བ་གཉིས་པ་","ཟླ་བ་སུམ་པ་","ཟླ་བ་བཞི་པ་","ཟླ་བ་ལྔ་པ་","ཟླ་བ་དྲུག་པ་","ཟླ་བ་བདུན་པ་","ཟླ་བ་བརྒྱད་པ་","ཟླ་བ་དགུ་པ་","ཟླ་བ་བཅུ་པ་","ཟླ་བ་བཅུ་གཅིག་པ་","ཟླ་བ་བཅུ་གཉིས་པ་"],
       "daysShort" : ["ཉི","ཟླ","མི","ཧླ","ཕུ","ས","སྤེ"],
       "days" : ["གཟའ་ཉི་མ་","གཟའ་ཟླ་བ་","གཟའ་མིག་དམར་","གཟའ་ཧླག་པ་","གཟའ་ཕུར་བུ་","གཟའ་སངས་","གཟའ་སྤེན་པ་"]
       // 2013/2/1
    },
    "cy" : {
       "name" : "Welsh",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["Ionawr","Chwefror","Mawrth","Ebrill","Mai","Mehefin","Gorffennaf","Awst","Medi","Hydref","Tachwedd","Rhagfyr"],
       "daysShort" : ["S","L","M","M","I","G","S"],
       "days" : ["Dydd Sul","Dydd Llun","Dydd Mawrth","Dydd Mercher","Dydd Iau","Dydd Gwener","Dydd Sadwrn"],
       "fixed" : true
       // 01/02/13
    },
    "km" : {
       "name" : "Khmer",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["មករា","កុម្ភៈ","មិនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"],
       "daysShort" : ["","","","","","",""],
       "days" : ["ថ្ងៃអាទិត្យ","​ថ្ងៃច័ន្ទ","ថ្ងៃអង្គារ","ថ្ងៃពុធ","ថ្ងៃព្រហស្បតិ៍","ថ្ងៃសុក្រ","ថ្ងៃសៅរ៍"],
       "fixed" : true
       // 01/02/13
    },
    "lo" : {
       "name" : "Lao",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["ມັງກອນ","ກຸມພາ","ມີນາ","ເມສາ","ພຶດສະພາ","ມິຖຸນາ","ກໍລະກົດ","ສິງຫາ","ກັນຍາ","ຕຸລາ","ພະຈິກ","ທັນວາ"],
       "daysShort" : ["","","","","","",""],
       "days" : ["ວັນອາທິດ","ວັນຈັນ","ວັນອັງຄານ","ວັນພຸດ","ວັນພະຫັດ","ວັນສຸກ","ວັນເສົາ"],
       "fixed" : true
       // 01/02/2013
    },
    "gl" : {
       "name" : "Galician",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Xaneiro","Febreiro","Marzo","Abril","Maio","Xuño","Xullo","Agosto","Setembro","Outubro","Novembro","Decembro"],
       "daysShort" : ["D","L","M","M","X","V","S"],
       "days" : ["Domingo","Luns","Martes","Mércores","Xoves","Venres","Sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "kok" : {
       "name" : "Konkani",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ओगस्ट","सेप्टेंबर","ओक्टोबर","नोव्हेंबर","डिसेंबर"],
       "daysShort" : ["","","","","","",""],
       "days" : ["आदित्यवार","सोमवार","मंगळार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
       "fixed" : true
       // 01-02-2013
    },
    "si" : {
       "name" : "Sinhala",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["ජනවාරි","පෙබරවාරි","මාර්තු","අප්‍රේල්","මැයි","ජූනි","ජූලි","අගෝස්තු","සැප්තැම්බර්","ඔක්තෝබර්","නොවැම්බර්","දෙසැම්බර්"],
       "daysShort" : ["ඉ","ස","අ","බ","බ්‍ර","සි","සෙ"],
       "days" : ["ඉරිදා","සඳුදා","අඟහරුවාදා","බදාදා","බ්‍රහස්පතින්දා","සිකුරාදා","සෙනසුරාදා"],
       "fixed" : true
       // 2013-02-01
    },
    "am" : {
       "name" : "Amharic",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["ጃንዩወሪ","ፌብሩወሪ","ማርች","ኤፕረል","ሜይ","ጁን","ጁላይ","ኦገስት","ሴፕቴምበር","ኦክተውበር","ኖቬምበር","ዲሴምበር"],
       "daysShort" : ["እ","ሰ","ማ","ረ","ሐ","ዓ","ቅ"],
       "days" : ["እሑድ","ሰኞ","ማክሰኞ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"]
       // 1/2/2013
    },
    "tzm" : {
       "name" : "Central Morocco Tamazight",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["Yennayer","Yebrayer","Mars","Ibrir","Mayyu","Yunyu","Yulyuz","Ɣuct","Cutanbir","Kṭuber","Nwanbir","Dujanbir"],
       "daysShort" : ["A","A","A","A","A","A","A"],
       "days" : ["Asamas","Aynas","Asinas","Akras","Akwas","Asimwas","Asiḍyas"],
       "fixed" : true
       // 01-02-2013
    },
    "ne" : {
       "name" : "Nepali",
       "dateFormat" : "/MDY",
       "dateFormatFixed" : "False",
       "months" : ["जनवरी","फेब्रुअरी","मार्च","अप्रिल","मे","जुन","जुलाई","अगस्त","सेप्टेम्बर","अक्टोबर","नोभेम्बर","डिसेम्बर"],
       "daysShort" : ["१","२","३","४","५","६","७"],
       "days" : ["आइतबार","सोमबार","मङ्गलबार","बुधबार","बिहीबार","शुक्रबार","शनिबार"]
       // 2/1/2013
    },
    "ps" : {
       "name" : "Pashto",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["وری","غویی","غبرګولی","چنګاښ","زمری","وږی","تله","لړم","لیندۍ","مرغومی","سلواغه","کب"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""]
       // 1434/3/21
    },
    "fil" : {
       "name" : "Filipino",
       "dateFormat" : "/MDY",
       "dateFormatFixed" : "False",
       "months" : ["Enero","Pebrero","Marso","Abril","Mayo","Hunyo","Hulyo","Agosto","Setyembre","Oktubre","Nobyembre","Disyembre"],
       "daysShort" : ["L","L","M","M","H","B","S"],
       "days" : ["Linggo","Lunes","Martes","Miyerkules","Huwebes","Biyernes","Sabado"]
       // 2/1/2013
    },
    "ha" : {
       "name" : "Hausa",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["Janairu","Faburairu","Maris","Afirilu","Mayu","Yuni","Yuli","Agusta","Satumba","Oktoba","Nuwamba","Disamba"],
       "daysShort" : ["L","L","T","L","A","J","A"],
       "days" : ["Lahadi","Litinin","Talata","Laraba","Alhamis","Jumma'a","Asabar"]
       // 1/2/2013
    },
    "yo" : {
       "name" : "Yoruba",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["Oṣù Ṣẹ́rẹ́","Oṣù Èrèlè","Oṣù Ẹrẹ̀nà","Oṣù Ìgbé","Oṣù Ẹ̀bibi","Oṣù Òkúdu","Oṣù Agẹmọ","Oṣù Ògún","Oṣù Owewe","Oṣù Ọ̀wàrà","Oṣù Bélú","Oṣù Ọ̀pẹ̀"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Ọjọ́ Àìkú","Ọjọ́ Ajé","Ọjọ́ Ìsẹ́gun","Ọjọ́rú","Ọjọ́bọ","Ọjọ́ Ẹtì","Ọjọ́ Àbámẹ́ta"]
       // 1/2/2013
    },
    "nso" : {
       "name" : "Northern Sotho",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["Janaware","Feberware","Matšhe","Aporele","Mei","June","Julae","Agostose","Setemere","Oktobore","Nofemere","Disemere"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Sontaga","Mosupalogo","Labobedi","Laboraro","Labone","Labohlano","Mokibelo"],
       "fixed" : true
       // 01/02/13
    },
    "kl" : {
       "name" : "Kalaallisut",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["januari","februari","martsi","aprili","maji","juni","juli","augustusi","septemberi","oktoberi","novemberi","decemberi"],
       "daysShort" : ["S","A","M","P","S","T","A"],
       "days" : ["sabaat","ataasinngorneq","marlunngorneq","pingasunngorneq","sisamanngorneq","tallimanngorneq","arfininngorneq"],
       "fixed" : true
       // 01-02-2013
    },
    "ig" : {
       "name" : "Igbo",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["Jenụwarị","Febrụwarị","Maachị","Eprel","Mee","Juun","Julaị","Ọgọọst","Septemba","Ọktoba","Novemba","Disemba"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Mbọsị Ụka","Mọnde","Tiuzdee","Wenezdee","Tọọzdee","Fraịdee","Satọdee"]
       // 1/2/2013
    },
    "ii" : {
       "name" : "Sichuan Yi",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊰꊪꆪ","ꊰꑋꆪ"],
       "daysShort" : ["ꆏ","ꋍ","ꑍ","ꌕ","ꇖ","ꉬ","ꃘ"],
       "days" : ["ꑭꆏꑍ","ꆏꊂꋍ","ꆏꊂꑍ","ꆏꊂꌕ","ꆏꊂꇖ","ꆏꊂꉬ","ꆏꊂꃘ"]
       // 2013/2/1
    },
    "br" : {
       "name" : "Breton",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Genver","Cʼhwevrer","Meurzh","Ebrel","Mae","Mezheven","Gouere","Eost","Gwengolo","Here","Du","Kerzu"],
       "daysShort" : ["su","lu","mz","mc","ya","gw","sa"],
       "days" : ["Sul","Lun","Meurzh","Mercʼher","Yaou","Gwener","Sadorn"],
       "fixed" : true
       // 01/02/2013
    },
    "oc" : {
       "name" : "Occitan",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["genièr","febrièr","març","abril","mai","junh","julhet","agost","setembre","octòbre","novembre","dezembre"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Dimenge","diluns","dimarç","dimècres","dijòus","divèndres","dissabte"],
       "fixed" : true
       // 01/02/2013
    },
    "gsw" : {
       "name" : "Swiss German",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Januar","Februar","März","April","Mai","Juni","Juli","Auguscht","Septämber","Oktoober","Novämber","Dezämber"],
       "daysShort" : ["S","M","D","M","D","F","S"],
       "days" : ["Sunntig","Määntig","Ziischtig","Mittwuch","Dunschtig","Friitig","Samschtig"],
       "fixed" : true
       // 01/02/2013
    },
    "sah" : {
       "name" : "Sakha",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Тохсунньу","Олунньу","Кулун тутар","Муус устар","Ыам ыйын","Бэс ыйын","От ыйын","Атырдьых ыйын","Балаҕан ыйын","Алтынньы","Сэтинньи","Ахсынньы"],
       "daysShort" : ["Б","Б","О","С","Ч","Б","С"],
       "days" : ["Баскыһыанньа","Бэнидиэлинньик","Оптуорунньук","Сэрэдэ","Чэппиэр","Бээтиҥсэ","Субуота"],
       "fixed" : true
       // 01.02.2013
    },
    "rw" : {
       "name" : "Kinyarwanda",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["Mutarama","Gashyantare","Werurwe","Mata","Gicuransi","Kamena","Nyakanga","Kanama","Nzeli","Ukwakira","Ugushyingo","Ukuboza"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Ku cyumweru","Kuwa mbere","Kuwa kabiri","Kuwa gatatu","Kuwa kane","Kuwa gatanu","Kuwa gatandatu"],
       "fixed" : true
       // 1/02/2013
    },
    "gd" : {
       "name" : "Scottish Gaelic",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Am Faoilleach","An Gearran","Am Màrt","An Giblean","An Cèitean","An t-Ògmhios","An t-Iuchar","An Lùnastal","An t-Sultain","An Dàmhair","An t-Samhain","An Dùbhlachd"],
       "daysShort" : ["D","L","M","C","A","H","S"],
       "days" : ["DiDòmhnaich","DiLuain","DiMàirt","DiCiadain","Diardaoin","DihAoine","DiSathairne"],
       "fixed" : true
       // 01/02/2013
    },
    "ar-SA" : {
       "name" : "Arabic (Saudi Arabia)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 21/03/34
    },
    "bg-BG" : {
       "name" : "Bulgarian (Bulgaria)",
       "dateFormat" : ".YMD",
       "dateFormatFixed" : "False",
       "months" : ["януари","февруари","март","април","май","юни","юли","август","септември","октомври","ноември","декември"],
       "daysShort" : ["н","п","в","с","ч","п","с"],
       "days" : ["неделя","понеделник","вторник","сряда","четвъртък","петък","събота"]
       // 1.2.2013 г.
    },
    "ca-ES" : {
       "name" : "Catalan (Spain)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"],
       "daysShort" : ["g","l","t","c","j","v","s"],
       "days" : ["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"],
       "fixed" : true
       // 01/02/2013
    },
    "zh-TW" : {
       "name" : "Chinese (Traditional)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
       "daysShort" : ["日","一","二","三","四","五","六"],
       "days" : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
       // 2013/2/1
    },
    "cs-CZ" : {
       "name" : "Czech (Czech Republic)",
       "dateFormat" : ". YM",
       "dateFormatFixed" : "False",
       "months" : ["leden","únor","březen","duben","květen","červen","červenec","srpen","září","říjen","listopad","prosinec"],
       "daysShort" : ["N","P","Ú","S","Č","P","S"],
       "days" : ["neděle","pondělí","úterý","středa","čtvrtek","pátek","sobota"]
       // 1. 2. 2013
    },
    "da-DK" : {
       "name" : "Danish (Denmark)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december"],
       "daysShort" : ["S","M","T","O","T","F","L"],
       "days" : ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
       "fixed" : true
       // 01-02-2013
    },
    "de-DE" : {
       "name" : "German (Germany)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
       "daysShort" : ["S","M","D","M","D","F","S"],
       "days" : ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
       "fixed" : true
       // 01.02.2013
    },
    "el-GR" : {
       "name" : "Greek (Greece)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"],
       "daysShort" : ["Κ","Δ","Τ","Τ","Π","Π","Σ"],
       "days" : ["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"]
       // 1/2/2013
    },
    "en-US" : {
       "name" : "English (United States)",
       "dateFormat" : "/MDY",
       "dateFormatFixed" : "False",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
       // 2/1/2013
    },
    "fi-FI" : {
       "name" : "Finnish (Finland)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],
       "daysShort" : ["S","M","T","K","T","P","L"],
       "days" : ["sunnuntaina","maanantaina","tiistaina","keskiviikkona","torstaina","perjantaina","lauantaina"]
       // 1.2.2013
    },
    "fr-FR" : {
       "name" : "French (France)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
       "fixed" : true
       // 01/02/2013
    },
    "he-IL" : {
       "name" : "Hebrew (Israel)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],
       "daysShort" : ["א","ב","ג","ד","ה","ו","ש"],
       "days" : ["יום ראשון","יום שני","יום שלישי","יום רביעי","יום חמישי","יום שישי","יום שבת"],
       "fixed" : true
       // 01/02/2013
    },
    "hu-HU" : {
       "name" : "Hungarian (Hungary)",
       "dateFormat" : ".YMD",
       "dateFormatFixed" : "True",
       "months" : ["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"],
       "daysShort" : ["V","H","K","Sz","Cs","P","Sz"],
       "days" : ["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"],
       "fixed" : true
       // 2013.02.01.
    },
    "is-IS" : {
       "name" : "Icelandic (Iceland)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["janúar","febrúar","mars","apríl","maí","júní","júlí","ágúst","september","október","nóvember","desember"],
       "daysShort" : ["s","m","þ","m","f","f","l"],
       "days" : ["sunnudagur","mánudagur","þriðjudagur","miðvikudagur","fimmtudagur","föstudagur","laugardagur"]
       // 1.2.2013
    },
    "it-IT" : {
       "name" : "Italian (Italy)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],
       "daysShort" : ["D","L","M","M","G","V","S"],
       "days" : ["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],
       "fixed" : true
       // 01/02/2013
    },
    "ja-JP" : {
       "name" : "Japanese (Japan)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
       "daysShort" : ["日","月","火","水","木","金","土"],
       "days" : ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
       "fixed" : true
       // 2013/02/01
    },
    "ko-KR" : {
       "name" : "Korean (South Korea)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
       "daysShort" : ["일","월","화","수","목","금","토"],
       "days" : ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
       "fixed" : true
       // 2013-02-01
    },
    "nl-NL" : {
       "name" : "Dutch (Netherlands)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "False",
       "months" : ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],
       "daysShort" : ["Z","M","D","W","D","V","Z"],
       "days" : ["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"]
       // 1-2-2013
    },
    "nb-NO" : {
       "name" : "Norwegian Bokmål (Norway)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"],
       "daysShort" : ["S","M","T","O","T","F","L"],
       "days" : ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
       "fixed" : true
       // 01.02.2013
    },
    "pl-PL" : {
       "name" : "Polish (Poland)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"],
       "daysShort" : ["N","P","W","Ś","C","P","S"],
       "days" : ["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"],
       "fixed" : true
       // 2013-02-01
    },
    "pt-BR" : {
       "name" : "Portuguese (Brazil)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],
       "daysShort" : ["D","S","T","Q","Q","S","S"],
       "days" : ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "rm-CH" : {
       "name" : "Romansh (Switzerland)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["schaner","favrer","mars","avrigl","matg","zercladur","fanadur","avust","settember","october","november","december"],
       "daysShort" : ["D","G","M","M","G","V","S"],
       "days" : ["dumengia","glindesdi","mardi","mesemna","gievgia","venderdi","sonda"],
       "fixed" : true
       // 01-02-2013
    },
    "ro-RO" : {
       "name" : "Romanian (Romania)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["duminică","luni","marți","miercuri","joi","vineri","sâmbătă"],
       "fixed" : true
       // 01.02.2013
    },
    "ru-RU" : {
       "name" : "Russian (Russia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
       "daysShort" : ["В","П","В","С","Ч","П","С"],
       "days" : ["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],
       "fixed" : true
       // 01.02.2013
    },
    "hr-HR" : {
       "name" : "Croatian (Croatia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["siječanj","veljača","ožujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac"],
       "daysShort" : ["n","p","u","s","č","p","s"],
       "days" : ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"]
       // 1.2.2013.
    },
    "sk-SK" : {
       "name" : "Slovak (Slovakia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["január","február","marec","apríl","máj","jún","júl","august","september","október","november","december"],
       "daysShort" : ["N","P","U","S","Š","P","S"],
       "days" : ["nedeľa","pondelok","utorok","streda","štvrtok","piatok","sobota"]
       // 1.2.2013
    },
    "sq-AL" : {
       "name" : "Albanian (Albania)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["janar","shkurt","mars","prill","maj","qershor","korrik","gusht","shtator","tetor","nëntor","dhjetor"],
       "daysShort" : ["D","H","M","M","E","P","S"],
       "days" : ["e diel","e hënë","e martë","e mërkurë","e enjte","e premte","e shtunë"]
       // 1.2.2013
    },
    "sv-SE" : {
       "name" : "Swedish (Sweden)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"],
       "daysShort" : ["S","M","T","O","T","F","L"],
       "days" : ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],
       "fixed" : true
       // 2013-02-01
    },
    "th-TH" : {
       "name" : "Thai (Thailand)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["","","","","","","","","","","",""],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""]
       // 1/2/2556
    },
    "tr-TR" : {
       "name" : "Turkish (Turkey)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
       "daysShort" : ["P","P","S","Ç","P","C","C"],
       "days" : ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"]
       // 1.2.2013
    },
    "ur-PK" : {
       "name" : "Urdu (Pakistan)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["جنوری","فروری","مارچ","اپريل","مئ","جون","جولائ","اگست","ستمبر","اکتوبر","نومبر","دسمبر"],
       "daysShort" : ["","","","","","",""],
       "days" : ["اتوار","پير","منگل","بده","جمعرات","جمعہ","ہفتہ"],
       "fixed" : true
       // 01/02/2013
    },
    "id-ID" : {
       "name" : "Indonesian (Indonesia)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
       "daysShort" : ["M","S","S","R","K","J","S"],
       "days" : ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],
       "fixed" : true
       // 01/02/2013
    },
    "uk-UA" : {
       "name" : "Ukrainian (Ukraine)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],
       "daysShort" : ["Н","П","В","С","Ч","П","С"],
       "days" : ["Неділя","Понеділок","Вівторок","Середа","Четвер","Пʼятниця","Субота"],
       "fixed" : true
       // 01.02.2013
    },
    "be-BY" : {
       "name" : "Belarusian (Belarus)",
       "dateFormat" : ".YMD",
       "dateFormatFixed" : "True",
       "months" : ["студзень","люты","сакавік","красавік","травень","чэрвень","ліпень","жнівень","верасень","кастрычнік","лістапад","снежань"],
       "daysShort" : ["н","п","а","с","ч","п","с"],
       "days" : ["нядзеля","панядзелак","аўторак","серада","чацвер","пятніца","субота"]
       // 01.02.13
    },
    "sl-SI" : {
       "name" : "Slovenian (Slovenia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december"],
       "daysShort" : ["n","p","t","s","č","p","s"],
       "days" : ["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"]
       // 1.2.2013
    },
    "et-EE" : {
       "name" : "Estonian (Estonia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["jaanuar","veebruar","märts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember"],
       "daysShort" : ["P","E","T","K","N","R","L"],
       "days" : ["pühapäev","esmaspäev","teisipäev","kolmapäev","neljapäev","reede","laupäev"]
       // 1.02.2013
    },
    "lv-LV" : {
       "name" : "Latvian (Latvia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["janvāris","februāris","marts","aprīlis","maijs","jūnijs","jūlijs","augusts","septembris","oktobris","novembris","decembris"],
       "daysShort" : ["S","P","O","T","C","P","S"],
       "days" : ["svētdiena","pirmdiena","otrdiena","trešdiena","ceturtdiena","piektdiena","sestdiena"],
       "fixed" : true
       // 01.02.2013.
    },
    "lt-LT" : {
       "name" : "Lithuanian (Lithuania)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["Sausis","Vasaris","Kovas","Balandis","Gegužė","Birželis","Liepa","Rugpjūtis","Rugsėjis","Spalis","Lapkritis","Gruodis"],
       "daysShort" : ["S","P","A","T","K","P","Š"],
       "days" : ["sekmadienis","pirmadienis","antradienis","trečiadienis","ketvirtadienis","penktadienis","šeštadienis"],
       "fixed" : true
       // 2013-02-01
    },
    "tg-Cyrl-TJ" : {
       "name" : "Tajik (Cyrillic, Tajikistan)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Якшанбе","Душанбе","Сешанбе","Чоршанбе","Панҷшанбе","Ҷумъа","Шанбе"],
       "fixed" : true
       // 01.02.2013
    },
    "fa-IR" : {
       "name" : "Persian (Iran)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["ژانویه","فوریه","مارس","آوریل","مه","ژوئن","ژوئیه","اوت","سپتامبر","اکتبر","نوامبر","دسامبر"],
       "daysShort" : ["ی","د","س","چ","پ","ج","ش"],
       "days" : ["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
       "fixed" : true
       // 01/02/2013
    },
    "vi-VN" : {
       "name" : "Vietnamese (Vietnam)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["tháng một","tháng hai","tháng ba","tháng tư","tháng năm","tháng sáu","tháng bảy","tháng tám","tháng chín","tháng mười","tháng mười một","tháng mười hai"],
       "daysShort" : ["CN","T2","T3","T4","T5","T6","T7"],
       "days" : ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"],
       "fixed" : true
       // 01/02/2013
    },
    "hy-AM" : {
       "name" : "Armenian (Armenia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Հունվար","Փետրվար","Մարտ","Ապրիլ","Մայիս","Հունիս","Հուլիս","Օգոստոս","Սեպտեմբեր","Հոկտեմբեր","Նոյեմբեր","Դեկտեմբեր"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Կիրակի","Երկուշաբթի","Երեքշաբթի","Չորեքշաբթի","Հինգշաբթի","Ուրբաթ","Շաբաթ"],
       "fixed" : true
       // 01.02.2013
    },
    "az-Latn-AZ" : {
       "name" : "Azerbaijani (Latin, Azerbaijan)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Yanvar","Fevral","Mart","Aprel","May","İyun","İyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr"],
       "daysShort" : ["7","1","2","3","4","5","6"],
       "days" : ["bazar","bazar ertəsi","çərşənbə axşamı","çərşənbə","cümə axşamı","cümə","şənbə"],
       "fixed" : true
       // 01.02.2013
    },
    "eu-ES" : {
       "name" : "Basque (Spain)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["urtarrila","otsaila","martxoa","apirila","maiatza","ekaina","uztaila","abuztua","iraila","urria","azaroa","abendua"],
       "daysShort" : ["I","M","A","L","A","O","I"],
       "days" : ["igandea","astelehena","asteartea","asteazkena","osteguna","ostirala","larunbata"],
       "fixed" : true
       // 2013/02/01
    },
    "mk-MK" : {
       "name" : "Macedonian (Macedonia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември"],
       "daysShort" : ["н","п","в","с","ч","п","с"],
       "days" : ["недела","понеделник","вторник","среда","четврток","петок","сабота"],
       "fixed" : true
       // 01.02.2013
    },
    "tn-ZA" : {
       "name" : "Tswana (South Africa)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["Ferikgong","Tlhakole","Mopitlo","Moranang","Motsheganang","Seetebosigo","Phukwi","Phatwe","Lwetse","Diphalane","Ngwanatsele","Sedimonthole"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Tshipi","Mosopulogo","Labobedi","Laboraro","Labone","Labotlhano","Matlhatso"],
       "fixed" : true
       // 01/02/13
    },
    "xh-ZA" : {
       "name" : "Xhosa (South Africa)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["Janyuwari","Februwari","Matshi","Epreli","Meyi","Juni","Julayi","Agasti","Septemba","Okthoba","Novemba","Disemba"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Cawe","Mvulo","Lwesibini","Lwesithathu","Lwesine","Lwesihlanu","Mgqibelo"],
       "fixed" : true
       // 2013/02/01
    },
    "zu-ZA" : {
       "name" : "Zulu (South Africa)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["uJanuwari","uFebruwari","uMashi","u-Apreli","uMeyi","uJuni","uJulayi","uAgasti","uSepthemba","u-Okthoba","uNovemba","uDisemba"],
       "daysShort" : ["S","M","B","T","S","H","M"],
       "days" : ["Sonto","Msombuluko","Lwesibili","Lwesithathu","uLwesine","Lwesihlanu","Mgqibelo"],
       "fixed" : true
       // 01-02-2013
    },
    "af-ZA" : {
       "name" : "Afrikaans (South Africa)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["Januarie","Februarie","Maart","April","Mei","Junie","Julie","Augustus","September","Oktober","November","Desember"],
       "daysShort" : ["S","M","D","W","D","V","S"],
       "days" : ["Sondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrydag","Saterdag"],
       "fixed" : true
       // 2013/02/01
    },
    "ka-GE" : {
       "name" : "Georgian (Georgia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი","ივლის","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი"],
       "daysShort" : ["კ","ო","ს","ო","ხ","პ","შ"],
       "days" : ["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"],
       "fixed" : true
       // 01.02.2013
    },
    "fo-FO" : {
       "name" : "Faroese (Faroe Islands)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["januar","februar","mars","apríl","mai","juni","juli","august","september","oktober","november","desember"],
       "daysShort" : ["S","M","T","M","H","F","L"],
       "days" : ["sunnudagur","mánadagur","týsdagur","mikudagur","hósdagur","fríggjadagur","leygardagur"],
       "fixed" : true
       // 01-02-2013
    },
    "hi-IN" : {
       "name" : "Hindi (India)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर"],
       "daysShort" : ["र","सो","मं","बु","गु","शु","श"],
       "days" : ["रविवार","सोमवार","मंगलवार","बुधवार","बृहस्पतिवार","शुक्रवार","शनिवार"],
       "fixed" : true
       // 01-02-2013
    },
    "mt-MT" : {
       "name" : "Maltese (Malta)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Jannar","Frar","Marzu","April","Mejju","Ġunju","Lulju","Awwissu","Settembru","Ottubru","Novembru","Diċembru"],
       "daysShort" : ["Ħ","T","T","E","Ħ","Ġ","S"],
       "days" : ["Il-Ħadd","It-Tnejn","It-Tlieta","L-Erbgħa","Il-Ħamis","Il-Ġimgħa","Is-Sibt"],
       "fixed" : true
       // 01/02/2013
    },
    "se-NO" : {
       "name" : "Northern Sami (Norway)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["ođđajagemánnu","guovvamánnu","njukčamánnu","cuoŋománnu","miessemánnu","geassemánnu","suoidnemánnu","borgemánnu","čakčamánnu","golggotmánnu","skábmamánnu","juovlamánnu"],
       "daysShort" : ["S","V","M","G","D","B","L"],
       "days" : ["sotnabeaivi","vuossárga","maŋŋebárga","gaskavahkku","duorasdat","bearjadat","lávvardat"],
       "fixed" : true
       // 01.02.2013
    },
    "ms-MY" : {
       "name" : "Malay (Malaysia)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"],
       "daysShort" : ["A","I","S","R","K","J","S"],
       "days" : ["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"],
       "fixed" : true
       // 01/02/2013
    },
    "ky-KG" : {
       "name" : "Kirghiz (Kyrgyzstan)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "False",
       "months" : ["","","","","","","","","","","",""],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""]
       // 1-2 13
    },
    "sw-KE" : {
       "name" : "Swahili (Kenya)",
       "dateFormat" : "/MDY",
       "dateFormatFixed" : "False",
       "months" : ["Januari","Februari","Machi","Aprili","Mei","Juni","Julai","Agosti","Septemba","Oktoba","Novemba","Desemba"],
       "daysShort" : ["2","3","4","5","A","I","1"],
       "days" : ["Jumapili","Jumatatu","Jumanne","Jumatano","Alhamisi","Ijumaa","Jumamosi"]
       // 2/1/2013
    },
    "uz-Latn-UZ" : {
       "name" : "Uzbek (Latin, Uzbekistan)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentyabr","Oktyabr","Noyabr","Dekabr"],
       "daysShort" : ["Y","D","S","C","P","C","S"],
       "days" : ["yakshanba","dushanba","seshanba","chorshanba","payshanba","cuma","shanba"],
       "fixed" : true
       // 01.02.2013
    },
    "bn-IN" : {
       "name" : "Bengali (India)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["জানুয়ারী","ফেব্রুয়ারী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],
       "daysShort" : ["র","সো","ম","বু","বৃ","শু","শ"],
       "days" : ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহষ্পতিবার","শুক্রবার","শনিবার"],
       "fixed" : true
       // 01-02-13
    },
    "gu-IN" : {
       "name" : "Gujarati (India)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["જાન્યુઆરી","ફેબ્રુઆરી","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટેમ્બર","ઑક્ટ્બર","નવેમ્બર","ડિસેમ્બર"],
       "daysShort" : ["ર","સો","મં","બુ","ગુ","શુ","શ"],
       "days" : ["રવિવાર","સોમવાર","મંગળવાર","બુધવાર","ગુરુવાર","શુક્રવાર","શનિવાર"],
       "fixed" : true
       // 01-02-13
    },
    "or-IN" : {
       "name" : "Oriya (India)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["ଜାନୁଆରୀ","ଫେବ୍ରୁୟାରୀ","ମାର୍ଚ୍ଚ","ଅପ୍ରେଲ","ମେ","ଜୁନ","ଜୁଲାଇ","ଅଗଷ୍ଟ","ସେପ୍ଟେମ୍ବର","ଅକ୍ଟୋବର","ନଭେମ୍ବର","ଡିସେମ୍ବର"],
       "daysShort" : ["ର","ସୋ","ମ","ବୁ","ଗୁ","ଶୁ","ଶ"],
       "days" : ["ରବିବାର","ସୋମବାର","ମଙ୍ଗଳବାର","ବୁଧବାର","ଗୁରୁବାର","ଶୁକ୍ରବାର","ଶନିବାର"],
       "fixed" : true
       // 01-02-13
    },
    "ta-IN" : {
       "name" : "Tamil (India)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்டு","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்"],
       "daysShort" : ["ஞா","தி","செ","பு","வி","வெ","ச"],
       "days" : ["ஞாயிறு","திங்கள்","செவ்வாய்","புதன்","வியாழன்","வெள்ளி","சனி"],
       "fixed" : true
       // 01-02-2013
    },
    "te-IN" : {
       "name" : "Telugu (India)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["జనవరి","ఫిబ్రవరి","మార్చి","ఎప్రిల్","మే","జూన్","జూలై","ఆగస్టు","సెప్టెంబర్","అక్టోబర్","నవంబర్","డిసెంబర్"],
       "daysShort" : ["ఆ","సో","మ","బు","గు","శు","శ"],
       "days" : ["ఆదివారం","సోమవారం","మంగళవారం","బుధవారం","గురువారం","శుక్రవారం","శనివారం"],
       "fixed" : true
       // 01-02-13
    },
    "kn-IN" : {
       "name" : "Kannada (India)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["ಜನವರೀ","ಫೆಬ್ರವರೀ","ಮಾರ್ಚ್","ಎಪ್ರಿಲ್","ಮೆ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸಪ್ಟೆಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್"],
       "daysShort" : ["ರ","ಸೋ","ಮಂ","ಬು","ಗು","ಶು","ಶ"],
       "days" : ["ರವಿವಾರ","ಸೋಮವಾರ","ಮಂಗಳವಾರ","ಬುಧವಾರ","ಗುರುವಾರ","ಶುಕ್ರವಾರ","ಶನಿವಾರ"],
       "fixed" : true
       // 01-02-13
    },
    "ml-IN" : {
       "name" : "Malayalam (India)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["ജനുവരി","ഫെബ്രുവരി","മാര്‍ച്ച്","ഏപ്രില്‍","മേയ്","ജൂണ്‍","ജൂലൈ","ആഗസ്റ്റ്","സെപ്റ്റംബര്‍","ഒക്ടോബര്‍","നവംബര്‍","ഡിസംബര്‍"],
       "daysShort" : ["ഞാ","തി","ചൊ","ബു","വ്യാ","വെ","ശ"],
       "days" : ["ഞായറാഴ്ച","തിങ്കളാഴ്ച","ചൊവ്വാഴ്ച","ബുധനാഴ്ച","വ്യാഴാഴ്ച","വെള്ളിയാഴ്ച","ശനിയാഴ്ച"],
       "fixed" : true
       // 01-02-13
    },
    "as-IN" : {
       "name" : "Assamese (India)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["জানুৱাৰী","ফেব্ৰুৱাৰী","মাৰ্চ","এপ্ৰিল","মে","জুন","জুলাই","আগষ্ট","ছেপ্তেম্বৰ","অক্টোবৰ","নৱেম্বৰ","ডিচেম্বৰ"],
       "daysShort" : ["","","","","","",""],
       "days" : ["দেওবাৰ","সোমবাৰ","মঙ্গলবাৰ","বুধবাৰ","বৃহষ্পতিবাৰ","শুক্ৰবাৰ","শনিবাৰ"],
       "fixed" : true
       // 01-02-2013
    },
    "mr-IN" : {
       "name" : "Marathi (India)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोव्हेंबर","डिसेंबर"],
       "daysShort" : ["र","सो","मं","बु","गु","शु","श"],
       "days" : ["रविवार","सोमवार","मंगळवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
       "fixed" : true
       // 01-02-2013
    },
    "bo-CN" : {
       "name" : "Tibetan (China)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["ཟླ་བ་དང་པོ་","ཟླ་བ་གཉིས་པ་","ཟླ་བ་སུམ་པ་","ཟླ་བ་བཞི་པ་","ཟླ་བ་ལྔ་པ་","ཟླ་བ་དྲུག་པ་","ཟླ་བ་བདུན་པ་","ཟླ་བ་བརྒྱད་པ་","ཟླ་བ་དགུ་པ་","ཟླ་བ་བཅུ་པ་","ཟླ་བ་བཅུ་གཅིག་པ་","ཟླ་བ་བཅུ་གཉིས་པ་"],
       "daysShort" : ["ཉི","ཟླ","མི","ཧླ","ཕུ","ས","སྤེ"],
       "days" : ["གཟའ་ཉི་མ་","གཟའ་ཟླ་བ་","གཟའ་མིག་དམར་","གཟའ་ཧླག་པ་","གཟའ་ཕུར་བུ་","གཟའ་སངས་","གཟའ་སྤེན་པ་"]
       // 2013/2/1
    },
    "cy-GB" : {
       "name" : "Welsh (United Kingdom)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["Ionawr","Chwefror","Mawrth","Ebrill","Mai","Mehefin","Gorffennaf","Awst","Medi","Hydref","Tachwedd","Rhagfyr"],
       "daysShort" : ["S","L","M","M","I","G","S"],
       "days" : ["Dydd Sul","Dydd Llun","Dydd Mawrth","Dydd Mercher","Dydd Iau","Dydd Gwener","Dydd Sadwrn"],
       "fixed" : true
       // 01/02/13
    },
    "km-KH" : {
       "name" : "Khmer (Cambodia)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["មករា","កុម្ភៈ","មិនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"],
       "daysShort" : ["","","","","","",""],
       "days" : ["ថ្ងៃអាទិត្យ","​ថ្ងៃច័ន្ទ","ថ្ងៃអង្គារ","ថ្ងៃពុធ","ថ្ងៃព្រហស្បតិ៍","ថ្ងៃសុក្រ","ថ្ងៃសៅរ៍"],
       "fixed" : true
       // 01/02/13
    },
    "lo-LA" : {
       "name" : "Lao (Laos)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["ມັງກອນ","ກຸມພາ","ມີນາ","ເມສາ","ພຶດສະພາ","ມິຖຸນາ","ກໍລະກົດ","ສິງຫາ","ກັນຍາ","ຕຸລາ","ພະຈິກ","ທັນວາ"],
       "daysShort" : ["","","","","","",""],
       "days" : ["ວັນອາທິດ","ວັນຈັນ","ວັນອັງຄານ","ວັນພຸດ","ວັນພະຫັດ","ວັນສຸກ","ວັນເສົາ"],
       "fixed" : true
       // 01/02/2013
    },
    "gl-ES" : {
       "name" : "Galician (Spain)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Xaneiro","Febreiro","Marzo","Abril","Maio","Xuño","Xullo","Agosto","Setembro","Outubro","Novembro","Decembro"],
       "daysShort" : ["D","L","M","M","X","V","S"],
       "days" : ["Domingo","Luns","Martes","Mércores","Xoves","Venres","Sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "kok-IN" : {
       "name" : "Konkani (India)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ओगस्ट","सेप्टेंबर","ओक्टोबर","नोव्हेंबर","डिसेंबर"],
       "daysShort" : ["","","","","","",""],
       "days" : ["आदित्यवार","सोमवार","मंगळार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
       "fixed" : true
       // 01-02-2013
    },
    "si-LK" : {
       "name" : "Sinhala (Sri Lanka)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["ජනවාරි","පෙබරවාරි","මාර්තු","අප්‍රේල්","මැයි","ජූනි","ජූලි","අගෝස්තු","සැප්තැම්බර්","ඔක්තෝබර්","නොවැම්බර්","දෙසැම්බර්"],
       "daysShort" : ["ඉ","ස","අ","බ","බ්‍ර","සි","සෙ"],
       "days" : ["ඉරිදා","සඳුදා","අඟහරුවාදා","බදාදා","බ්‍රහස්පතින්දා","සිකුරාදා","සෙනසුරාදා"],
       "fixed" : true
       // 2013-02-01
    },
    "am-ET" : {
       "name" : "Amharic (Ethiopia)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["ጃንዩወሪ","ፌብሩወሪ","ማርች","ኤፕረል","ሜይ","ጁን","ጁላይ","ኦገስት","ሴፕቴምበር","ኦክተውበር","ኖቬምበር","ዲሴምበር"],
       "daysShort" : ["እ","ሰ","ማ","ረ","ሐ","ዓ","ቅ"],
       "days" : ["እሑድ","ሰኞ","ማክሰኞ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"]
       // 1/2/2013
    },
    "ne-NP" : {
       "name" : "Nepali (Nepal)",
       "dateFormat" : "/MDY",
       "dateFormatFixed" : "False",
       "months" : ["जनवरी","फेब्रुअरी","मार्च","अप्रिल","मे","जुन","जुलाई","अगस्त","सेप्टेम्बर","अक्टोबर","नोभेम्बर","डिसेम्बर"],
       "daysShort" : ["१","२","३","४","५","६","७"],
       "days" : ["आइतबार","सोमबार","मङ्गलबार","बुधबार","बिहीबार","शुक्रबार","शनिबार"]
       // 2/1/2013
    },
    "ps-AF" : {
       "name" : "Pashto (Afghanistan)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["وری","غویی","غبرګولی","چنګاښ","زمری","وږی","تله","لړم","لیندۍ","مرغومی","سلواغه","کب"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""]
       // 1434/3/21
    },
    "fil-PH" : {
       "name" : "Filipino (Philippines)",
       "dateFormat" : "/MDY",
       "dateFormatFixed" : "False",
       "months" : ["Enero","Pebrero","Marso","Abril","Mayo","Hunyo","Hulyo","Agosto","Setyembre","Oktubre","Nobyembre","Disyembre"],
       "daysShort" : ["L","L","M","M","H","B","S"],
       "days" : ["Linggo","Lunes","Martes","Miyerkules","Huwebes","Biyernes","Sabado"]
       // 2/1/2013
    },
    "ha-Latn-NG" : {
       "name" : "Hausa (Latin, Nigeria)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["Janairu","Faburairu","Maris","Afirilu","Mayu","Yuni","Yuli","Agusta","Satumba","Oktoba","Nuwamba","Disamba"],
       "daysShort" : ["L","L","T","L","A","J","A"],
       "days" : ["Lahadi","Litinin","Talata","Laraba","Alhamis","Jumma'a","Asabar"]
       // 1/2/2013
    },
    "yo-NG" : {
       "name" : "Yoruba (Nigeria)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["Oṣù Ṣẹ́rẹ́","Oṣù Èrèlè","Oṣù Ẹrẹ̀nà","Oṣù Ìgbé","Oṣù Ẹ̀bibi","Oṣù Òkúdu","Oṣù Agẹmọ","Oṣù Ògún","Oṣù Owewe","Oṣù Ọ̀wàrà","Oṣù Bélú","Oṣù Ọ̀pẹ̀"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Ọjọ́ Àìkú","Ọjọ́ Ajé","Ọjọ́ Ìsẹ́gun","Ọjọ́rú","Ọjọ́bọ","Ọjọ́ Ẹtì","Ọjọ́ Àbámẹ́ta"]
       // 1/2/2013
    },
    "nso-ZA" : {
       "name" : "Northern Sotho (South Africa)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "True",
       "months" : ["Janaware","Feberware","Matšhe","Aporele","Mei","June","Julae","Agostose","Setemere","Oktobore","Nofemere","Disemere"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Sontaga","Mosupalogo","Labobedi","Laboraro","Labone","Labohlano","Mokibelo"],
       "fixed" : true
       // 01/02/13
    },
    "kl-GL" : {
       "name" : "Kalaallisut (Greenland)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["januari","februari","martsi","aprili","maji","juni","juli","augustusi","septemberi","oktoberi","novemberi","decemberi"],
       "daysShort" : ["S","A","M","P","S","T","A"],
       "days" : ["sabaat","ataasinngorneq","marlunngorneq","pingasunngorneq","sisamanngorneq","tallimanngorneq","arfininngorneq"],
       "fixed" : true
       // 01-02-2013
    },
    "ig-NG" : {
       "name" : "Igbo (Nigeria)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["Jenụwarị","Febrụwarị","Maachị","Eprel","Mee","Juun","Julaị","Ọgọọst","Septemba","Ọktoba","Novemba","Disemba"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Mbọsị Ụka","Mọnde","Tiuzdee","Wenezdee","Tọọzdee","Fraịdee","Satọdee"]
       // 1/2/2013
    },
    "ii-CN" : {
       "name" : "Sichuan Yi (China)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊰꊪꆪ","ꊰꑋꆪ"],
       "daysShort" : ["ꆏ","ꋍ","ꑍ","ꌕ","ꇖ","ꉬ","ꃘ"],
       "days" : ["ꑭꆏꑍ","ꆏꊂꋍ","ꆏꊂꑍ","ꆏꊂꌕ","ꆏꊂꇖ","ꆏꊂꉬ","ꆏꊂꃘ"]
       // 2013/2/1
    },
    "br-FR" : {
       "name" : "Breton (France)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Genver","Cʼhwevrer","Meurzh","Ebrel","Mae","Mezheven","Gouere","Eost","Gwengolo","Here","Du","Kerzu"],
       "daysShort" : ["su","lu","mz","mc","ya","gw","sa"],
       "days" : ["Sul","Lun","Meurzh","Mercʼher","Yaou","Gwener","Sadorn"],
       "fixed" : true
       // 01/02/2013
    },
    "oc-FR" : {
       "name" : "Occitan (France)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["genièr","febrièr","març","abril","mai","junh","julhet","agost","setembre","octòbre","novembre","dezembre"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Dimenge","diluns","dimarç","dimècres","dijòus","divèndres","dissabte"],
       "fixed" : true
       // 01/02/2013
    },
    "sah-RU" : {
       "name" : "Sakha (Russia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Тохсунньу","Олунньу","Кулун тутар","Муус устар","Ыам ыйын","Бэс ыйын","От ыйын","Атырдьых ыйын","Балаҕан ыйын","Алтынньы","Сэтинньи","Ахсынньы"],
       "daysShort" : ["Б","Б","О","С","Ч","Б","С"],
       "days" : ["Баскыһыанньа","Бэнидиэлинньик","Оптуорунньук","Сэрэдэ","Чэппиэр","Бээтиҥсэ","Субуота"],
       "fixed" : true
       // 01.02.2013
    },
    "rw-RW" : {
       "name" : "Kinyarwanda (Rwanda)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["Mutarama","Gashyantare","Werurwe","Mata","Gicuransi","Kamena","Nyakanga","Kanama","Nzeli","Ukwakira","Ugushyingo","Ukuboza"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Ku cyumweru","Kuwa mbere","Kuwa kabiri","Kuwa gatatu","Kuwa kane","Kuwa gatanu","Kuwa gatandatu"]
       // 1/02/2013
    },
    "gd-GB" : {
       "name" : "Scottish Gaelic (United Kingdom)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Am Faoilleach","An Gearran","Am Màrt","An Giblean","An Cèitean","An t-Ògmhios","An t-Iuchar","An Lùnastal","An t-Sultain","An Dàmhair","An t-Samhain","An Dùbhlachd"],
       "daysShort" : ["D","L","M","C","A","H","S"],
       "days" : ["DiDòmhnaich","DiLuain","DiMàirt","DiCiadain","Diardaoin","DihAoine","DiSathairne"],
       "fixed" : true
       // 01/02/2013
    },
    "ar-IQ" : {
       "name" : "Arabic (Iraq)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "zh-CN" : {
       "name" : "Chinese (Simplified)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
       "daysShort" : ["日","一","二","三","四","五","六"],
       "days" : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
       // 2013/2/1
    },
    "de-CH" : {
       "name" : "German (Switzerland)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
       "daysShort" : ["S","M","D","M","D","F","S"],
       "days" : ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
       "fixed" : true
       // 01.02.2013
    },
    "en-GB" : {
       "name" : "English (United Kingdom)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
       "fixed" : true
       // 01/02/2013
    },
    "es-MX" : {
       "name" : "Spanish (Mexico)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "fr-BE" : {
       "name" : "French (Belgium)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
       "fixed" : true
       // 01-02-13
    },
    "it-CH" : {
       "name" : "Italian (Switzerland)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],
       "daysShort" : ["D","L","M","M","G","V","S"],
       "days" : ["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],
       "fixed" : true
       // 01.02.2013
    },
    "nl-BE" : {
       "name" : "Dutch (Belgium)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],
       "daysShort" : ["Z","M","D","W","D","V","Z"],
       "days" : ["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"]
       // 1/02/2013
    },
    "nn-NO" : {
       "name" : "Norwegian Nynorsk (Norway)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"],
       "daysShort" : ["S","M","T","O","T","F","L"],
       "days" : ["søndag","måndag","tysdag","onsdag","torsdag","fredag","laurdag"],
       "fixed" : true
       // 01.02.2013
    },
    "pt-PT" : {
       "name" : "Portuguese (Portugal)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
       "daysShort" : ["D","S","T","Q","Q","S","S"],
       "days" : ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "sv-FI" : {
       "name" : "Swedish (Finland)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"],
       "daysShort" : ["S","M","T","O","T","F","L"],
       "days" : ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"]
       // 1.2.2013
    },
    "az-Cyrl-AZ" : {
       "name" : "Azerbaijani (Cyrillic, Azerbaijan)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["јанвар","феврал","март","апрел","май","ијун","ијул","август","сентјабр","октјабр","нојабр","декабр"],
       "daysShort" : ["7","1","2","3","4","5","6"],
       "days" : ["базар","базар ертәси","чәршәнбә ахшамы","чәршәнбә","ҹүмә ахшамы","ҹүмә","шәнбә"],
       "fixed" : true
       // 01.02.2013
    },
    "ga-IE" : {
       "name" : "Irish (Ireland)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Eanáir","Feabhra","Márta","Aibreán","Bealtaine","Meitheamh","Iúil","Lúnasa","Meán Fómhair","Deireadh Fómhair","Samhain","Nollaig"],
       "daysShort" : ["D","L","M","C","D","A","S"],
       "days" : ["Dé Domhnaigh","Dé Luain","Dé Máirt","Dé Céadaoin","Déardaoin","Dé hAoine","Dé Sathairn"],
       "fixed" : true
       // 01/02/2013
    },
    "ms-BN" : {
       "name" : "Malay (Brunei)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"],
       "daysShort" : ["A","I","S","R","K","J","S"],
       "days" : ["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"],
       "fixed" : true
       // 01/02/2013
    },
    "uz-Cyrl-UZ" : {
       "name" : "Uzbek (Cyrillic, Uzbekistan)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр"],
       "daysShort" : ["Я","Д","С","Ч","П","Ж","Ш"],
       "days" : ["якшанба","душанба","сешанба","чоршанба","пайшанба","жума","шанба"],
       "fixed" : true
       // 01.02.2013
    },
    "bn-BD" : {
       "name" : "Bengali (Bangladesh)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["জানুয়ারী","ফেব্রুয়ারী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],
       "daysShort" : ["র","সো","ম","বু","বৃ","শু","শ"],
       "days" : ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহষ্পতিবার","শুক্রবার","শনিবার"],
       "fixed" : true
       // 01-02-13
    },
    "mn-Mong-CN" : {
       "name" : "Mongolian (Mongolian, China)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["Хулгана","Үхэр","Бар","Туулай","Луу","Могой","Морь","Хонь","Бич","Тахиа","Нохой","Гахай"],
       "daysShort" : ["","","","","","",""],
       "days" : ["ням","даваа","мягмар","лхагва","пүрэв","баасан","бямба"]
       // 2013/2/1
    },
    "ar-EG" : {
       "name" : "Arabic (Egypt)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "zh-HK" : {
       "name" : "Chinese (Traditional, Hong Kong SAR China)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
       "daysShort" : ["日","一","二","三","四","五","六"],
       "days" : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
       // 1/2/2013
    },
    "de-AT" : {
       "name" : "German (Austria)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Jänner","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
       "daysShort" : ["S","M","D","M","D","F","S"],
       "days" : ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
       "fixed" : true
       // 01.02.2013
    },
    "en-AU" : {
       "name" : "English (Australia)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
       // 1/02/2013
    },
    "es-ES" : {
       "name" : "Spanish (Spain)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","X","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "fr-CA" : {
       "name" : "French (Canada)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
       "fixed" : true
       // 2013-02-01
    },
    "se-FI" : {
       "name" : "Northern Sami (Finland)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["ođđajagemánnu","guovvamánnu","njukčamánnu","cuoŋománnu","miessemánnu","geassemánnu","suoidnemánnu","borgemánnu","čakčamánnu","golggotmánnu","skábmamánnu","juovlamánnu"],
       "daysShort" : ["S","M","D","G","D","B","L"],
       "days" : ["aejlege","måanta","däjsta","gaskevahkoe","dåarsta","bearjadahke","laavadahke"]
       // 1.2.2013
    },
    "ar-LY" : {
       "name" : "Arabic (Libya)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "zh-SG" : {
       "name" : "Chinese (Simplified, Singapore)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
       "daysShort" : ["日","一","二","三","四","五","六"],
       "days" : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
       // 1/2/2013
    },
    "de-LU" : {
       "name" : "German (Luxembourg)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
       "daysShort" : ["S","M","D","M","D","F","S"],
       "days" : ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
       "fixed" : true
       // 01.02.2013
    },
    "en-CA" : {
       "name" : "English (Canada)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
       "fixed" : true
       // 2013-02-01
    },
    "es-GT" : {
       "name" : "Spanish (Guatemala)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "fr-CH" : {
       "name" : "French (Switzerland)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
       "fixed" : true
       // 01.02.2013
    },
    "ar-DZ" : {
       "name" : "Arabic (Algeria)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01-02-2013
    },
    "zh-MO" : {
       "name" : "Chinese (Traditional, Macau SAR China)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
       "daysShort" : ["日","一","二","三","四","五","六"],
       "days" : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
       // 1/2/2013
    },
    "de-LI" : {
       "name" : "German (Liechtenstein)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
       "daysShort" : ["S","M","D","M","D","F","S"],
       "days" : ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
       "fixed" : true
       // 01.02.2013
    },
    "en-NZ" : {
       "name" : "English (New Zealand)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
       // 1/02/2013
    },
    "es-CR" : {
       "name" : "Spanish (Costa Rica)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "fr-LU" : {
       "name" : "French (Luxembourg)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
       "fixed" : true
       // 01/02/2013
    },
    "ar-MA" : {
       "name" : "Arabic (Morocco)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01-02-2013
    },
    "en-IE" : {
       "name" : "English (Ireland)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
       "fixed" : true
       // 01/02/2013
    },
    "es-PA" : {
       "name" : "Spanish (Panama)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
       // 1/2/13
    },
    "fr-MC" : {
       "name" : "French (Monaco)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
       "fixed" : true
       // 01/02/2013
    },
    "sr-Latn-BA" : {
       "name" : "Serbian (Latin, Bosnia and Herzegovina)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],
       "daysShort" : ["n","p","u","s","č","p","s"],
       "days" : ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"]
       // 1.2.2013.
    },
    "ar-TN" : {
       "name" : "Arabic (Tunisia)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01-02-2013
    },
    "en-ZA" : {
       "name" : "English (South Africa)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
       "fixed" : true
       // 2013-02-01
    },
    "es-DO" : {
       "name" : "Spanish (Dominican Republic)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
       // 1/2/13
    },
    "sr-Cyrl-BA" : {
       "name" : "Serbian (Cyrillic, Bosnia and Herzegovina)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["јануар","фебруар","март","април","мај","јуни","јули","август","септембар","октобар","новембар","децембар"],
       "daysShort" : ["н","п","у","с","ч","п","с"],
       "days" : ["недеља","понедељак","уторак","сриједа","четвртак","петак","субота"]
       // 1.2.2013.
    },
    "ar-OM" : {
       "name" : "Arabic (Oman)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "en-JM" : {
       "name" : "English (Jamaica)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
       "fixed" : true
       // 01/02/2013
    },
    "es-VE" : {
       "name" : "Spanish (Venezuela)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01-02-2013
    },
    "ar-YE" : {
       "name" : "Arabic (Yemen)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "es-CO" : {
       "name" : "Spanish (Colombia)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "sr-Latn-RS" : {
       "name" : "Serbian (Latin, Serbia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],
       "daysShort" : ["n","p","u","s","č","p","s"],
       "days" : ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"]
       // 1.2.2013.
    },
    "ar-SY" : {
       "name" : "Arabic (Syria)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "en-BZ" : {
       "name" : "English (Belize)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
       "fixed" : true
       // 01/02/2013
    },
    "es-PE" : {
       "name" : "Spanish (Peru)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "sr-Cyrl-RS" : {
       "name" : "Serbian (Cyrillic, Serbia)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],
       "daysShort" : ["н","п","у","с","ч","п","с"],
       "days" : ["недеља","понедељак","уторак","среда","четвртак","петак","субота"]
       // 1.2.2013.
    },
    "ar-JO" : {
       "name" : "Arabic (Jordan)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "en-TT" : {
       "name" : "English (Trinidad and Tobago)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
       "fixed" : true
       // 01/02/2013
    },
    "es-AR" : {
       "name" : "Spanish (Argentina)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "sr-Latn-ME" : {
       "name" : "Serbian (Latin, Montenegro)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],
       "daysShort" : ["n","p","u","s","č","p","s"],
       "days" : ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"]
       // 1.2.2013.
    },
    "ar-LB" : {
       "name" : "Arabic (Lebanon)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "en-ZW" : {
       "name" : "English (Zimbabwe)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
       "fixed" : true
       // 01/02/2013
    },
    "es-EC" : {
       "name" : "Spanish (Ecuador)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "sr-Cyrl-ME" : {
       "name" : "Serbian (Cyrillic, Montenegro)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],
       "daysShort" : ["н","п","у","с","ч","п","с"],
       "days" : ["недеља","понедељак","уторак","среда","четвртак","петак","субота"]
       // 1.2.2013.
    },
    "ar-KW" : {
       "name" : "Arabic (Kuwait)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "en-PH" : {
       "name" : "English (Philippines)",
       "dateFormat" : "/MDY",
       "dateFormatFixed" : "False",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
       // 2/1/2013
    },
    "es-CL" : {
       "name" : "Spanish (Chile)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01-02-2013
    },
    "ar-AE" : {
       "name" : "Arabic (United Arab Emirates)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "es-UY" : {
       "name" : "Spanish (Uruguay)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "ar-BH" : {
       "name" : "Arabic (Bahrain)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "es-PY" : {
       "name" : "Spanish (Paraguay)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "ar-QA" : {
       "name" : "Arabic (Qatar)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
       "daysShort" : ["","","","","","",""],
       "days" : ["","","","","","",""],
       "fixed" : true
       // 01/02/2013
    },
    "en-IN" : {
       "name" : "English (India)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
       "fixed" : true
       // 01-02-2013
    },
    "es-BO" : {
       "name" : "Spanish (Bolivia)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "es-SV" : {
       "name" : "Spanish (El Salvador)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "en-SG" : {
       "name" : "English (Singapore)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["January","February","March","April","May","June","July","August","September","October","November","December"],
       "daysShort" : ["S","M","T","W","T","F","S"],
       "days" : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
       // 1/2/2013
    },
    "es-HN" : {
       "name" : "Spanish (Honduras)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "es-NI" : {
       "name" : "Spanish (Nicaragua)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "es-PR" : {
       "name" : "Spanish (Puerto Rico)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "True",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
       "fixed" : true
       // 01/02/2013
    },
    "es-US" : {
       "name" : "Spanish (United States)",
       "dateFormat" : "/MDY",
       "dateFormatFixed" : "False",
       "months" : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
       "daysShort" : ["D","L","M","M","J","V","S"],
       "days" : ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
       // 2/1/2013
    },
    "sr-Cyrl" : {
       "name" : "Serbian (Cyrillic)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],
       "daysShort" : ["н","п","у","с","ч","п","с"],
       "days" : ["недеља","понедељак","уторак","среда","четвртак","петак","субота"]
       // 1.2.2013.
    },
    "sr-Latn" : {
       "name" : "Serbian (Latin)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],
       "daysShort" : ["n","p","u","s","č","p","s"],
       "days" : ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"]
       // 1.2.2013.
    },
    "az-Cyrl" : {
       "name" : "Azerbaijani (Cyrillic)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["јанвар","феврал","март","апрел","май","ијун","ијул","август","сентјабр","октјабр","нојабр","декабр"],
       "daysShort" : ["7","1","2","3","4","5","6"],
       "days" : ["базар","базар ертәси","чәршәнбә ахшамы","чәршәнбә","ҹүмә ахшамы","ҹүмә","шәнбә"],
       "fixed" : true
       // 01.02.2013
    },
    "zh" : {
       "name" : "Chinese (Simplified)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
       "daysShort" : ["日","一","二","三","四","五","六"],
       "days" : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
       // 2013/2/1
    },
    "nn" : {
       "name" : "Norwegian Nynorsk",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"],
       "daysShort" : ["S","M","T","O","T","F","L"],
       "days" : ["søndag","måndag","tysdag","onsdag","torsdag","fredag","laurdag"],
       "fixed" : true
       // 01.02.2013
    },
    "bs" : {
       "name" : "Bosnian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["januar","februar","mart","april","maj","juni","juli","avgust","septembar","oktobar","novembar","decembar"],
       "daysShort" : ["","","","","","",""],
       "days" : ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"]
       // 1.2.2013
    },
    "az-Latn" : {
       "name" : "Azerbaijani (Latin)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Yanvar","Fevral","Mart","Aprel","May","İyun","İyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr"],
       "daysShort" : ["7","1","2","3","4","5","6"],
       "days" : ["bazar","bazar ertəsi","çərşənbə axşamı","çərşənbə","cümə axşamı","cümə","şənbə"],
       "fixed" : true
       // 01.02.2013
    },
    "uz-Cyrl" : {
       "name" : "Uzbek (Cyrillic)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр"],
       "daysShort" : ["Я","Д","С","Ч","П","Ж","Ш"],
       "days" : ["якшанба","душанба","сешанба","чоршанба","пайшанба","жума","шанба"],
       "fixed" : true
       // 01.02.2013
    },
    "mn-Cyrl" : {
       "name" : "Mongolian (Cyrillic)",
       "dateFormat" : "-YMD",
       "dateFormatFixed" : "True",
       "months" : ["Хулгана","Үхэр","Бар","Туулай","Луу","Могой","Морь","Хонь","Бич","Тахиа","Нохой","Гахай"],
       "daysShort" : ["","","","","","",""],
       "days" : ["ням","даваа","мягмар","лхагва","пүрэв","баасан","бямба"],
       "fixed" : true
       // 2013-02-01
    },
    "zh-Hant" : {
       "name" : "Chinese (Traditional)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
       "daysShort" : ["日","一","二","三","四","五","六"],
       "days" : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
       // 1/2/2013
    },
    "zh-CHT" : {
       "name" : "Chinese (Traditional) Legacy",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
       "daysShort" : ["日","一","二","三","四","五","六"],
       "days" : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
       // 1/2/2013
    },
    "nb" : {
       "name" : "Norwegian Bokmål",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"],
       "daysShort" : ["S","M","T","O","T","F","L"],
       "days" : ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
       "fixed" : true
       // 01.02.2013
    },
    "sr" : {
       "name" : "Serbian",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "False",
       "months" : ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],
       "daysShort" : ["н","п","у","с","ч","п","с"],
       "days" : ["недеља","понедељак","уторак","среда","четвртак","петак","субота"]
       // 1.2.2013.
    },
    "tg-Cyrl" : {
       "name" : "Tajik (Cyrillic)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр"],
       "daysShort" : ["","","","","","",""],
       "days" : ["Якшанбе","Душанбе","Сешанбе","Чоршанбе","Панҷшанбе","Ҷумъа","Шанбе"],
       "fixed" : true
       // 01.02.2013
    },
    "uz-Latn" : {
       "name" : "Uzbek (Latin)",
       "dateFormat" : ".DMY",
       "dateFormatFixed" : "True",
       "months" : ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentyabr","Oktyabr","Noyabr","Dekabr"],
       "daysShort" : ["Y","D","S","C","P","C","S"],
       "days" : ["yakshanba","dushanba","seshanba","chorshanba","payshanba","cuma","shanba"],
       "fixed" : true
       // 01.02.2013
    },
    "mn-Mong" : {
       "name" : "Mongolian (Mongolian)",
       "dateFormat" : "/YMD",
       "dateFormatFixed" : "False",
       "months" : ["Хулгана","Үхэр","Бар","Туулай","Луу","Могой","Морь","Хонь","Бич","Тахиа","Нохой","Гахай"],
       "daysShort" : ["","","","","","",""],
       "days" : ["ням","даваа","мягмар","лхагва","пүрэв","баасан","бямба"]
       // 2013/2/1
    },
    "tzm-Latn" : {
       "name" : "Central Morocco Tamazight (Latin)",
       "dateFormat" : "-DMY",
       "dateFormatFixed" : "True",
       "months" : ["Yennayer","Yebrayer","Mars","Ibrir","Mayyu","Yunyu","Yulyuz","Ɣuct","Cutanbir","Kṭuber","Nwanbir","Dujanbir"],
       "daysShort" : ["A","A","A","A","A","A","A"],
       "days" : ["Asamas","Aynas","Asinas","Akras","Akwas","Asimwas","Asiḍyas"],
       "fixed" : true
       // 01-02-2013
    },
    "ha-Latn" : {
       "name" : "Hausa (Latin)",
       "dateFormat" : "/DMY",
       "dateFormatFixed" : "False",
       "months" : ["Janairu","Faburairu","Maris","Afirilu","Mayu","Yuni","Yuli","Agusta","Satumba","Oktoba","Nuwamba","Disamba"],
       "daysShort" : ["L","L","T","L","A","J","A"],
       "days" : ["Lahadi","Litinin","Talata","Laraba","Alhamis","Jumma'a","Asabar"]
       // 1/2/2013
    }
}

export class Locale {
   constructor(locName) {
      this.locData = localeDefs[locName]
      if (this.locData === undefined ) this.locData = localeDefs['def']

      this.name = this.locData.name
      this.separator= this.locData.dateFormat.substr(0,1); 
      this.partOrder= this.locData.dateFormat.substr(1,4); 
      this.days=this.locData.daysShort
      this.months=this.locData.months;   
      this.dateFormatFixed = this.locData.fixed || false
   }

   fixedFormat(v,f) {
		return (f + v).slice(-f.length)
   }   
   
   datePlaceholder() {
		let fmt
      let s
      let yf, mf, df
      if (this.dateFormatFixed ) {
         yf ="YYYY"
         mf = "MM"
         df = "DD"
      } else {
         yf ="YYYY"
         mf = "M"
         df = "D"
      }
      if (this.partOrder == 'YMD') 
         s = yf + this.separator + mf + this.separator + df
      else if (this.partOrder == 'DMY') 
         s = df + this.separator + mf + this.separator + yf
      else if (this.partOrder == 'MDY') 
         s = mf + this.separator + df + this.separator + yf
      else
         s = yf + '-' + mf + '-' + df
      return s
    }    

   dateToString(d) {
		let fmt
      let s = ""
      let dn

      if (typeof(d)=="string" && ! isNaN(dn = Date.parse(d)) ) { d = new Date(dn) }
      if (d)  {
         if (this.dateFormatFixed ) fmt="00"; else fmt=""
         if (this.partOrder == 'YMD') 
            s = d.getFullYear() + this.separator + this.fixedFormat((d.getMonth()+1 ),fmt) + this.separator + this.fixedFormat(d.getDate(),fmt)
         else if (this.partOrder == 'DMY') 
            s = this.fixedFormat(d.getDate(),fmt) + this.separator + this.fixedFormat((d.getMonth()+1 ),fmt)+ this.separator + d.getFullYear()
         else if (this.partOrder == 'MDY') 
            s = this.fixedFormat((d.getMonth()+1 ),fmt)+ this.separator + this.fixedFormat(d.getDate(),fmt) + this.separator + d.getFullYear()
         else
            s = d.getFullYear() + '-' + (d.getMonth()+1 )+ '-' + d.getDate()
      } 
      return s
    }    

    stringToDate(s) {
        let parts = s.split(this.separator)
        let year, month, day
        let d = null
        if (parts.length == 3) {
            try {
                if (this.partOrder == 'YMD') {
                        year = parseInt(parts[0],10)
                        month = parseInt(parts[1],10)
                        day = parseInt(parts[2],10)
                    }
                else if (this.partOrder == 'DMY') {
                        year = parseInt(parts[2],10)
                        month = parseInt(parts[1],10)
                        day = parseInt(parts[0],10)
                    }
                else if (this.partOrder == 'MDY') {
                        year = parseInt(parts[2],10)
                        month = parseInt(parts[0],10)
                        day = parseInt(parts[1],10)
                    }
                else  {
                        parts = s.split('-')
                        year = parseInt(parts[2],10)
                        month = parseInt(parts[0],10)
                        day = parseInt(parts[1],10)
                    }
                if (! isNaN(year) && !isNaN(month) && ! isNaN(day))  d = new Date(year, month -1, day, 0 ,0 ,0, 0)
                return d
            } catch (e) { alert(e)}
        } 
        return null
    }   
}

