export type AlgoItem = {
	id: number;
	category: string;
	question: string;
	answer: string;
};

export const algoItems: AlgoItem[] = [
	{
		id: 1,
		category: 'Alapok',
		question: 'Mi az algoritmus? Melyek az algoritmus legfontosabb tulajdonságai?',
		answer: `Az algoritmus véges számú, jól meghatározott lépésből álló eljárás, amely egy adott probléma megoldására szolgál.

Legfontosabb tulajdonságai:
- végesség
- meghatározottság
- bemenet
- kimenet
- megvalósíthatóság
- általánosság`
	},
	{
		id: 2,
		category: 'Alapok',
		question: 'Mi a különbség probléma, algoritmus és program között?',
		answer: `A probléma egy absztrakt megoldandó feladat.

Az algoritmus a probléma megoldásának logikai lépéssora.

A program az algoritmus konkrét megvalósítása egy programozási nyelven.`
	},
	{
		id: 3,
		category: 'Alapok',
		question: 'Miért van szükség matematikai háttérre az algoritmusok tanulmányozásához?',
		answer: `A matematikai háttér segít:
- az algoritmus helyességének bizonyításában
- az idő- és tárigény elemzésében
- problémák pontos modellezésében
- gráfok, halmazok, számelméleti feladatok kezelésében`
	},
	{
		id: 4,
		category: 'Alapok',
		question: 'Milyen lépések vezetnek a problémától a programig?',
		answer: `A folyamat:
1. probléma megértése
2. specifikáció
3. algoritmustervezés
4. helyességvizsgálat
5. kódolás
6. tesztelés
7. optimalizálás`
	},
	{
		id: 5,
		category: 'Alapok',
		question: 'Mi az algoritmusterv? Milyen formákban írhatunk le egy algoritmust?',
		answer: `Az algoritmusterv a megoldás logikai vázlata a kódolás előtt.

Leírási formák:
- természetes nyelv
- folyamatábra
- struktogram
- pszeudokód`
	},
	{
		id: 6,
		category: 'Alapok',
		question: 'Mi a különbség folyamatábra és pszeudokód között?',
		answer: `A folyamatábra vizuális, nyilakkal és alakzatokkal írja le az algoritmust.

A pszeudokód szöveges, programszerű leírás, amely könnyebben alakítható valódi kóddá.`
	},
	{
		id: 7,
		category: 'Helyesség',
		question: 'Mi a specifikáció szerepe egy algoritmus megadásában?',
		answer: `A specifikáció pontosan megadja, mit kell az algoritmusnak megoldania.

Rögzíti:
- a bemenet feltételeit
- az elvárt kimenetet
- a bemenet és kimenet kapcsolatát

Nem azt írja le, hogyan kell megoldani, hanem azt, hogy mit kell teljesíteni.`
	},
	{
		id: 8,
		category: 'Helyesség',
		question: 'Mi az előfeltétel és az utófeltétel?',
		answer: `Az előfeltétel az a logikai állítás, amelynek az algoritmus indulása előtt teljesülnie kell.

Az utófeltétel az a logikai állítás, amelynek az algoritmus befejezése után teljesülnie kell.`
	},
	{
		id: 9,
		category: 'Helyesség',
		question: 'Mit jelent az algoritmus helyessége?',
		answer: `Egy algoritmus akkor helyes, ha minden megengedett bemenetre olyan kimenetet ad, amely teljesíti az utófeltételt.`
	},
	{
		id: 10,
		category: 'Helyesség',
		question: 'Mi a különbség részleges és teljes helyesség között?',
		answer: `Részleges helyesség:
Ha az algoritmus befejeződik, akkor helyes eredményt ad.

Teljes helyesség:
Az algoritmus biztosan befejeződik, és helyes eredményt ad.`
	},
	{
		id: 11,
		category: 'Helyesség',
		question: 'Mit jelent a terminálás?',
		answer: `A terminálás azt jelenti, hogy az algoritmus véges számú lépés után befejeződik, tehát nem kerül végtelen ciklusba vagy végtelen rekurzióba.`
	},
	{
		id: 12,
		category: 'Helyesség',
		question: 'Mi a ciklusinvariáns szerepe?',
		answer: `A ciklusinvariáns olyan állítás, amely a ciklus minden ismétlése előtt és után igaz.

Szerepe:
- bizonyítja a ciklus helyességét
- segít megmutatni, hogy a ciklus végén teljesül az utófeltétel`
	},
	{
		id: 13,
		category: 'Tételek',
		question: 'Mit nevezünk alapalgoritmusnak? Mi az összegzés és megszámlálás tételének lényege?',
		answer: `Az alapalgoritmus gyakran ismétlődő részfeladatok megoldására szolgáló séma.

Összegzés:
Egy sorozat elemeinek összegét vagy halmozott értékét határozza meg.

Megszámlálás:
Megszámolja, hány elem teljesít egy adott feltételt.`
	},
	{
		id: 14,
		category: 'Tételek',
		question: 'Mi a különbség eldöntés és kiválasztás között? Milyen feltétel mellett alkalmazható a kiválasztás tétele?',
		answer: `Eldöntés:
Azt vizsgálja, hogy létezik-e adott tulajdonságú elem.

Kiválasztás:
Megkeresi az első adott tulajdonságú elem helyét.

A kiválasztás csak akkor alkalmazható, ha biztosan létezik ilyen elem.`
	},
	{
		id: 15,
		category: 'Tételek',
		question: 'Mi a kiválogatás tételének lényege?',
		answer: `A kiválogatás egy sorozatból kigyűjti azokat az elemeket, amelyek teljesítenek egy adott feltételt.

Az eredmény egy új sorozat lesz, amely csak a megfelelő elemeket tartalmazza.`
	},
	{
		id: 16,
		category: 'Tételek',
		question: 'Mi a különbség kiválogatás és szétválogatás között?',
		answer: `Kiválogatás:
Csak a feltételt teljesítő elemeket gyűjtjük ki.

Szétválogatás:
Minden elemet besorolunk valamelyik csoportba, például megfelelő és nem megfelelő elemekre.`
	},
	{
		id: 17,
		category: 'Tételek',
		question: 'Mi a minimumkiválasztás és a maximumkiválasztás alapelve?',
		answer: `A sorozat első elemét tekintjük kezdetben minimumnak vagy maximumnak.

Ezután végigmegyünk a többi elemen, és ha kisebb/nagyobb elemet találunk, frissítjük a szélsőértéket.`
	},
	{
		id: 18,
		category: 'Tételek',
		question: 'Mi a metszetképzés lényege két sorozat esetén?',
		answer: `A metszet két sorozat közös elemeit tartalmazza.

Lényege:
Az első sorozat elemeiről eldöntjük, hogy szerepelnek-e a második sorozatban. Ha igen, bekerülnek az eredménybe.`
	},
	{
		id: 19,
		category: 'Tételek',
		question: 'Mi az egyesítés (unió) lényege két sorozat esetén?',
		answer: `Az unió az összes olyan elemet tartalmazza, amely legalább az egyik sorozatban szerepel.

Az ismétlődéseket ki kell szűrni.`
	},
	{
		id: 20,
		category: 'Tételek',
		question: 'Mi az összefuttatás lényege, és milyen bemenet esetén használható természetesen?',
		answer: `Az összefuttatás két rendezett sorozatot egyetlen rendezett sorozattá fésül össze.

Természetesen akkor használható, ha mindkét bemeneti sorozat már rendezett.`
	},
	{
		id: 21,
		category: 'Keresés',
		question: 'Mikor használható a bináris keresés?',
		answer: `A bináris keresés csak rendezett sorozaton használható.

Minden lépésben a középső elemet vizsgálja, majd a keresési tartomány egyik felét kizárja.`
	},
	{
		id: 22,
		category: 'Keresés',
		question: 'Miért gyorsabb a bináris keresés a lineáris keresésnél?',
		answer: `A lineáris keresés legrosszabb esetben minden elemet megvizsgál, ezért O(N).

A bináris keresés minden lépésben felezi a keresési tartományt, ezért O(log N).

Például 1 millió elemnél a lineáris keresés akár 1 000 000 lépést is igényelhet, míg a bináris keresés kb. 20 lépést.`
	},
	{
		id: 23,
		category: 'Keresés',
		question: 'Mi a lineáris keresés alapötlete? Mi a strázsás keresés lényege?',
		answer: `Lineáris keresés:
A sorozat elejétől indulva egyesével vizsgáljuk az elemeket, amíg meg nem találjuk a keresett elemet vagy el nem érjük a végét.

Strázsás keresés:
A tömb végére elhelyezzük a keresett értéket őrszemként. Így a ciklusban nem kell külön figyelni a tömb végét, mert a keresett elem biztosan elő fog fordulni.`
	},
	{
		id: 24,
		category: 'Keresés',
		question: 'Mi az előnye a rendezett lineáris keresésnek a sima lineáris kereséshez képest?',
		answer: `Rendezett sorozatban hamarabb megállhatunk.

Ha a keresett értéknél nagyobb elemet találunk, akkor biztosan nincs később a keresett elem, ezért nem kell végigmenni a teljes sorozaton.`
	},
	{
		id: 25,
		category: 'Rendezés',
		question: 'Mikor előnyös a beszúró rendezés?',
		answer: `A beszúró rendezés előnyös:
- majdnem rendezett tömböknél
- kis adathalmazoknál
- online rendezésnél, amikor az elemek egyenként érkeznek`
	},
	{
		id: 26,
		category: 'Rendezés',
		question: 'Mi a buborékrendezés alapötlete?',
		answer: `A buborékrendezés szomszédos elemeket hasonlít össze.

Ha rossz sorrendben vannak, megcseréli őket. A nagyobb elemek fokozatosan a tömb végére kerülnek.`
	},
	{
		id: 27,
		category: 'Rendezés',
		question: 'Mi a kiválasztásos rendezés alapötlete, és mi a fő hátránya?',
		answer: `Alapötlete:
Mindig megkeresi a rendezetlen rész legkisebb elemét, majd a rendezetlen rész elejére cseréli.

Fő hátránya:
Mindig sok összehasonlítást végez, akkor is, ha a tömb már majdnem rendezett.`
	},
	{
		id: 28,
		category: 'Rendezés',
		question: 'Mi a különbség a buborékrendezés, a beszúró rendezés és a kiválasztásos rendezés között alapötlet szerint?',
		answer: `Buborékrendezés:
Szomszédos elemeket cserélget.

Beszúró rendezés:
Az aktuális elemet beszúrja a már rendezett rész megfelelő helyére.

Kiválasztásos rendezés:
Megkeresi a rendezetlen rész minimumát, és a helyére teszi.`
	},
	{
		id: 29,
		category: 'Rendezés',
		question: 'Mit jelent az, hogy egy rendezés stabil, és a tanult alap rendezések közül melyek stabilak?',
		answer: `Egy rendezés stabil, ha az azonos kulcsú elemek eredeti sorrendjét megőrzi.

Stabil:
- buborékrendezés
- beszúró rendezés

Nem stabil:
- kiválasztásos rendezés`
	},
	{
		id: 30,
		category: 'Rendezés',
		question: 'Mit jelent az, hogy egy rendezőalgoritmus helyben rendez?',
		answer: `Egy rendezés helyben rendez, ha nem igényel a bemeneti tömb méretével arányos plusz memóriát.

Csak kevés segédváltozót használ, például cseréhez.`
	},
	{
		id: 31,
		category: 'Számelmélet',
		question: 'Mi az euklideszi algoritmus alapötlete?',
		answer: `Az euklideszi algoritmus két pozitív egész szám legnagyobb közös osztóját határozza meg.

Alapötlete:
lnko(a, b) = lnko(b, a mod b)

A maradékos osztást addig ismételjük, amíg a maradék 0 nem lesz. Az utolsó nem nulla osztó az lnko.`
	},
	{
		id: 32,
		category: 'Számelmélet',
		question: 'Mi a legnagyobb közös osztó fogalma?',
		answer: `Két vagy több egész szám legnagyobb közös osztója az a legnagyobb pozitív egész szám, amely mindegyik számot maradék nélkül osztja.`
	},
	{
		id: 33,
		category: 'Gráfok',
		question: 'Mi a gráf definíciója?',
		answer: `A gráf egy matematikai struktúra, amely csúcsokból és élekből áll.

A csúcsok az objektumokat, az élek pedig a köztük lévő kapcsolatokat jelölik.`
	},
	{
		id: 34,
		category: 'Gráfok',
		question: 'Mi a különbség az irányított és az irányítatlan gráf között?',
		answer: `Irányítatlan gráf:
Az éleknek nincs irányuk, a kapcsolat mindkét irányban értelmezett.

Irányított gráf:
Az éleknek irányuk van, vagyis az egyik csúcsból a másikba vezetnek. Visszafelé csak akkor van út, ha külön él létezik arra is.`
	},
	{
		id: 35,
		category: 'Gráfok',
		question: 'Mi a BFS alapötlete, és mire használható?',
		answer: `A BFS, vagyis szélességi bejárás, egy kezdőcsúcsból rétegenként járja be a gráfot.

Először a közvetlen szomszédokat, majd azok szomszédait vizsgálja.

Sort használ.

Használható:
- legrövidebb utak keresésére súlyozatlan gráfban
- összefüggő komponensek keresésére
- páros gráf vizsgálatára`
	},
	{
		id: 36,
		category: 'Gráfok',
		question: 'Mi a DFS alapötlete, és mire használható?',
		answer: `A DFS, vagyis mélységi bejárás, egy úton minél mélyebbre halad, majd ha zsákutcába ér, visszalép.

Megvalósítható rekurzívan vagy veremmel.

Használható:
- körök detektálására
- topologikus rendezésre
- erősen összefüggő komponensek keresésére
- labirintus- és útkeresési feladatokra`
	},
	{
		id: 37,
		category: 'Gráfok',
		question: 'Mi a különbség a szomszédsági mátrix és a szomszédsági lista között?',
		answer: `Szomszédségi mátrix:
Egy kétdimenziós tömb, amely megmutatja, van-e él két csúcs között.

Előnye:
- nagyon gyors éllekérdezés

Hátránya:
- sok memóriát használ, főleg ritka gráfnál

Szomszédségi lista:
Minden csúcshoz eltároljuk a szomszédait.

Előnye:
- memóriatakarékos ritka gráfoknál
- gyorsan bejárhatók egy csúcs szomszédai

Hátránya:
- lassabb eldönteni, hogy két konkrét csúcs között van-e él`
	}
];