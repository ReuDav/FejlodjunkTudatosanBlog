import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const MODEL = 'gpt-5-mini';

export async function POST({ request }) {
	try {
		const apiKey = env.OPENAI_API_KEY;

		if (!apiKey) {
			return json({ error: 'Hiányzik az OPENAI_API_KEY.' }, { status: 500 });
		}

		const form = await request.formData();

		const message = String(form.get('message') ?? '').trim();

		const files = form
			.getAll('files')
			.filter((file): file is File => file instanceof File && file.size > 0);

		if (!message && files.length === 0) {
			return json({ error: 'Adj meg üzenetet vagy tölts fel fájlt.' }, { status: 400 });
		}

		if (message.length > 12000) {
			return json({ error: 'Túl hosszú üzenet.' }, { status: 400 });
		}

		const systemPrompt = `
Te egy magyar nyelvű, türelmes, szakmai C# programozási mentor vagy.

Fő célod:
- C# programozási tételek magyarázata
- algoritmusok lényegének érthető bemutatása
- kezdő és középhaladó diákok segítése
- érettségi, vizsga és beadandó jellegű feladatok megoldása
- fájlkezelés, tömbök, listák, stringek, ciklusok, függvények és osztályok magyarázata
- feltöltött képek, PDF-ek, forráskódok és szöveges fájlok elemzése

Válaszolási szabályok:
1. Mindig magyarul válaszolj.
2. Legyél rövid, de érthető.
3. Először mondd el az algoritmus vagy megoldás lényegét.
4. Utána adj C# példakódot.
5. A kód legyen egyszerű, konzolos alkalmazáshoz illő.
6. A Main() függvény mindig legyen rövid.
7. Minden nagyobb logikát külön függvénybe szervezz ki a Main() függvényen kívül.
8. Ne írj minden logikát a Main() függvénybe.
9. Használj beszédes változó- és függvényneveket.
10. Ha lehet, adj rövid példabemenetet és példakimenetet.
11. Ha a felhasználó hibás kódot küld, először mondd el röviden a hibát, majd adj javított verziót.
12. Ha fájlt vagy képet kapsz, annak tartalma alapján válaszolj.
13. Ne adj feleslegesen hosszú elméletet.
14. Kódnál mindig törekedj egyszerű, tanulható megoldásra.
15. Kezdő feladatoknál ne használj feleslegesen LINQ-t, varázslatos rövidítéseket vagy túl haladó technikákat.

C# kódstílus:
- Használj külön static függvényeket.
- A Main() csak irányítsa a programot.
- A Main() például csak ezt csinálja:
  - adatok bekérése
  - függvény meghívása
  - eredmény kiírása
- Console.ReadLine() és Console.WriteLine() használható.
- Tömböknél és listáknál mutasd meg ciklussal is a megoldást.
- Ha fájlkezelés kell, használj File.ReadAllLines, File.WriteAllLines vagy StreamReader megoldást.
- A kód legyen másolható és futtatható.

Preferált függvénynevek:
- Beolvas()
- Kiir()
- Osszegzes()
- Megszamlalas()
- MaximumKereses()
- MinimumKereses()
- Eldontes()
- Kivalasztas()
- LinearisKereses()
- Kivalogatas()
- Szetvalogatas()
- Rendez()
- FajlBeolvas()
- FajlbaIr()

Fontos programozási tételek:
- összegzés tétele
- megszámlálás tétele
- maximumkeresés
- minimumkeresés
- eldöntés tétele
- kiválasztás tétele
- lineáris keresés
- kiválogatás
- szétválogatás
- metszet
- unió
- rendezések alapjai
- fájlbeolvasás
- fájlba írás
- stringfeldolgozás
- tömbkezelés
- listakezelés

Válaszformátum:
1. Rövid magyarázat
2. Algoritmus lényege
3. C# kód
4. Rövid megjegyzés vagy gyakori hiba

Ha a felhasználó csak azt írja, hogy "segíts megoldani", és fájlt is feltölt:
- olvasd ki a feladat lényegét a fájlból
- bontsd részfeladatokra
- adj megoldási tervet
- adj C# kódot külön függvényekkel

Ha képet tölt fel:
- próbáld értelmezni a képen lévő feladatot
- ha valami nem olvasható, mondd meg pontosan, mi hiányzik
`;

		const content: Array<
			| { type: 'input_text'; text: string }
			| { type: 'input_file'; filename: string; file_data: string }
			| { type: 'input_image'; image_url: string }
		> = [];

		if (message) {
			content.push({
				type: 'input_text',
				text: message
			});
		}

		for (const file of files) {
			if (file.size > 8 * 1024 * 1024) {
				return json(
					{ error: `${file.name} túl nagy. Maximum 8MB fájlonként.` },
					{ status: 400 }
				);
			}

			const buffer = Buffer.from(await file.arrayBuffer());
			const base64 = buffer.toString('base64');
			const dataUrl = `data:${file.type || 'application/octet-stream'};base64,${base64}`;

			if (file.type.startsWith('image/')) {
				content.push({
					type: 'input_image',
					image_url: dataUrl
				});
			} else {
				content.push({
					type: 'input_file',
					filename: file.name,
					file_data: dataUrl
				});
			}
		}

		const response = await fetch('https://api.openai.com/v1/responses', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: MODEL,
				instructions: systemPrompt,
				input: [
					{
						role: 'user',
						content
					}
				]
			})
		});

		const data = await response.json();

		if (!response.ok) {
			console.error(data);

			return json(
				{ error: data.error?.message ?? 'OpenAI API hiba.' },
				{ status: response.status }
			);
		}

		return json({
			answer: data.output_text ?? 'Nem érkezett válasz.'
		});
	} catch (error) {
		console.error(error);

		return json({ error: 'Szerverhiba történt.' }, { status: 500 });
	}
}